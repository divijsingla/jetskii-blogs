import { readdir, readFile } from "node:fs/promises";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import nodemailer from "nodemailer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const SUBSCRIBERS_DIR = resolve(ROOT, "src/subscribers");

const args = process.argv.slice(2);
const getArg = (name, fallback = "") => {
  const arg = args.find((entry) => entry.startsWith(`--${name}=`));
  if (!arg) return fallback;
  return arg.slice(name.length + 3);
};

const subject = getArg("subject", "New blog published");
const postUrl = getArg("postUrl", "http://localhost:5173/blog");
const dryRun = getArg("dryRun", "true") !== "false";
const heroImageUrl = getArg("heroImageUrl", "https://picsum.photos/1200/420");
const content = getArg(
  "content",
  "A new post is live. Come read it when you have a minute.",
);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function buildHtmlEmail() {
  return `
  <div style="margin:0;padding:0;background:#f8f8f8;font-family:Inter,Arial,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="640" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #ececec;">
            <tr>
              <td>
                <img src="${heroImageUrl}" alt="New blog post banner" style="width:100%;display:block;max-height:280px;object-fit:cover;" />
              </td>
            </tr>
            <tr>
              <td style="padding:24px;">
                <h1 style="margin:0 0 12px 0;color:#222;font-size:22px;line-height:1.3;">${subject}</h1>
                <p style="margin:0 0 20px 0;color:#444;font-size:15px;line-height:1.7;">${content}</p>
                <a href="${postUrl}" style="display:inline-block;padding:10px 16px;background:#7c3aed;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;">Read the post</a>
                <p style="margin:22px 0 0 0;color:#666;font-size:12px;line-height:1.6;">
                  You are receiving this because you subscribed via the blog notify form.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
  `.trim();
}

function buildTextEmail() {
  return `${subject}\n\n${content}\n\nRead: ${postUrl}\n`;
}

async function collectSubscriberFiles(dirPath) {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = resolve(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await collectSubscriberFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && [".yml", ".yaml"].includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function readUniqueEmails() {
  const files = await collectSubscriberFiles(SUBSCRIBERS_DIR).catch(() => []);
  const unique = new Set();

  for (const filePath of files) {
    try {
      const raw = await readFile(filePath, "utf8");
      const parsed = yaml.load(raw);
      const email = String(parsed?.email ?? "").trim().toLowerCase();
      if (EMAIL_REGEX.test(email)) unique.add(email);
    } catch {
      // Ignore malformed files; keep going.
    }
  }

  return [...unique];
}

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error("Missing SMTP env vars. Required: SMTP_HOST, SMTP_USER, SMTP_PASS");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function main() {
  const recipients = await readUniqueEmails();
  if (recipients.length === 0) {
    console.log("No subscriber emails found under src/subscribers.");
    console.log("Submit through Staticman notify form first, then run again.");
    return;
  }

  console.log(`Loaded ${recipients.length} unique subscriber email(s) from Staticman files.`);
  console.log(`Subject: ${subject}`);
  console.log(`Post URL: ${postUrl}`);
  console.log(`Hero image URL: ${heroImageUrl}`);
  console.log(dryRun ? "Mode: dry run (no real email send)" : "Mode: live SMTP send");
  console.log("");

  const html = buildHtmlEmail();
  const text = buildTextEmail();

  if (dryRun) {
    console.log("Preview HTML template generated (image top + content).");
    console.log("Run with --dryRun=false and SMTP env vars to send real emails.");
    console.log("");
    for (const email of recipients) {
      const message = `[local-mailer] ${subject}\nTo: ${email}\nRead: ${postUrl}\n`;
      console.log(message);
    }
    return;
  }

  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || "";
  if (!from) {
    throw new Error("Missing sender address. Set EMAIL_FROM or SMTP_USER.");
  }

  const transporter = createTransporter();
  await transporter.verify();

  let sentCount = 0;
  for (const email of recipients) {
    await transporter.sendMail({
      from,
      to: email,
      subject,
      text,
      html,
    });
    sentCount += 1;
    console.log(`Sent: ${email}`);
  }
  console.log(`Done. Sent ${sentCount} email(s).`);
}

main().catch((error) => {
  console.error("Failed to run local email sender.", error);
  process.exitCode = 1;
});
