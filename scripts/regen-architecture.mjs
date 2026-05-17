#!/usr/bin/env node
// Regenerates `src/data/architecture.json` by invoking the external
// `codearchview` Python tool (https://github.com/divijsingla/codearchview).
//
// Graceful by design: if Python, the language server, or the tool
// itself is unavailable, we print a warning and exit 0 so the build
// proceeds with the previously committed JSON.  This keeps the repo
// buildable for contributors who don't have the Python toolchain.
//
// Override behaviour with env vars:
//   CAV_SKIP=1        - skip regeneration entirely (useful in CI)
//   CAV_STRICT=1      - hard-fail the build on any error
//   CAV_PYTHON=path   - explicit python interpreter (defaults: ./.venv/bin/python, python3, python)
//   CAV_REF=ref       - git ref / tag of codearchview to install (default: main)
//   CAV_LOCAL=path    - install from a local path instead of git

import { spawnSync } from "node:child_process";
import { existsSync, statSync } from "node:fs";
import { resolve } from "node:path";

const REPO_ROOT = process.cwd();
const OUT = resolve(REPO_ROOT, "src/data/architecture.json");
const ENTRY = "src/main.tsx";
const TSCONFIG = "tsconfig.app.json";

const STRICT = process.env.CAV_STRICT === "1";
const REF = process.env.CAV_REF || "main";
const LOCAL = process.env.CAV_LOCAL;
const PIP_TARGET = LOCAL
  ? LOCAL
  : `git+https://github.com/divijsingla/codearchview@${REF}`;

function ok(msg) { console.log(`[codearchview] ${msg}`); }
function info(msg) { console.log(`[codearchview] ${msg}`); }
function fail(msg) {
  if (STRICT) {
    console.error(`[codearchview] STRICT mode — ${msg}`);
    process.exit(1);
  }
  console.warn(`[codearchview] ${msg} — keeping existing ${OUT}.`);
  process.exit(0);
}

if (process.env.CAV_SKIP === "1") {
  info("CAV_SKIP=1 set — skipping architecture regeneration");
  process.exit(0);
}

// --- locate a python interpreter ---------------------------------------------
function findPython() {
  if (process.env.CAV_PYTHON) return process.env.CAV_PYTHON;
  const venvPy = resolve(REPO_ROOT, ".venv/bin/python");
  if (existsSync(venvPy)) return venvPy;
  for (const c of ["python3", "python"]) {
    const r = spawnSync(c, ["--version"], { stdio: "ignore" });
    if (r.status === 0) return c;
  }
  return null;
}

const python = findPython();
if (!python) fail("no python3 interpreter found (set CAV_PYTHON or create .venv/)");

// --- check typescript-language-server ----------------------------------------
const lspCheck = spawnSync("typescript-language-server", ["--version"], { stdio: "ignore" });
if (lspCheck.status !== 0) {
  fail("typescript-language-server not on PATH (npm i -g typescript typescript-language-server)");
}

// --- ensure codearchview is installed / up to date ---------------------------
// We only attempt a fresh install when CAV_LOCAL is unset or the
// installed version differs from CAV_REF.  Idempotent in the common
// case (no network call required on subsequent builds).
function isInstalled() {
  const r = spawnSync(python, ["-c", "import codearchview"], { stdio: "ignore" });
  return r.status === 0;
}

if (!isInstalled() || process.env.CAV_FORCE_INSTALL === "1") {
  info(`installing codearchview from ${PIP_TARGET}`);
  const install = spawnSync(python, ["-m", "pip", "install", "-q", "-U", PIP_TARGET], {
    stdio: "inherit",
  });
  if (install.status !== 0) fail(`pip install failed (exit ${install.status})`);
}

// --- run the tool ------------------------------------------------------------
const args = [
  "-m", "codearchview",
  "--entry", ENTRY,
  "--project-root", ".",
  "--tsconfig", TSCONFIG,
  "--out", OUT,
];

const run = spawnSync(python, args, { stdio: "inherit" });
if (run.status !== 0) fail(`codearchview exited with status ${run.status}`);

if (!existsSync(OUT)) fail("codearchview produced no output");
try {
  const size = statSync(OUT).size;
  ok(`regenerated ${OUT} (${(size / 1024).toFixed(1)} KB)`);
} catch {
  ok(`regenerated ${OUT}`);
}
