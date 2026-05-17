import { cn } from "@/lib/utils";
import type { Granularity } from "./types";

interface GraphControlsProps {
  granularity: Granularity;
  onGranularityChange: (g: Granularity) => void;
  showExternals: boolean;
  onShowExternalsChange: (v: boolean) => void;
  depth: number; // -1 = unlimited
  onDepthChange: (d: number) => void;
  search: string;
  onSearchChange: (q: string) => void;
  rootName: string | null;
  visibleCount: { nodes: number; edges: number };
  totalCount: { nodes: number; edges: number };
  meta: { entry: string; commit: string | null; generatedAt: string; toolVersion: string };
}

const GRANULARITY_OPTIONS: { id: Granularity; label: string; hint: string }[] = [
  { id: "file", label: "File", hint: "one node per source file" },
  { id: "component", label: "Component", hint: "files + React components + hooks" },
  { id: "function", label: "Function", hint: "+ plain functions" },
  { id: "all", label: "All symbols", hint: "consts, types, interfaces too" },
];

const DEPTHS = [-1, 1, 2, 3, 4, 5] as const;

const GraphControls = ({
  granularity,
  onGranularityChange,
  showExternals,
  onShowExternalsChange,
  depth,
  onDepthChange,
  search,
  onSearchChange,
  rootName,
  visibleCount,
  totalCount,
  meta,
}: GraphControlsProps) => {
  return (
    <aside className="flex w-full flex-col gap-5 rounded-2xl border-2 border-brand-80 bg-brand-95 p-4 text-brand-20 lg:max-w-[260px]">
      <div>
        <h2 className="text-base font-semibold text-brand">Architecture</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          DFS from <span className="italic">{meta.entry}</span>. Stops at external imports.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Granularity</div>
        <div className="flex flex-wrap gap-1.5">
          {GRANULARITY_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onGranularityChange(opt.id)}
              title={opt.hint}
              className={cn(
                "rounded-md border border-brand-80 px-2.5 py-1 text-xs transition-colors",
                granularity === opt.id
                  ? "bg-brand text-white border-brand"
                  : "bg-card hover:bg-brand-90",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center justify-between text-xs">
          <span className="uppercase tracking-wider text-muted-foreground">Show externals</span>
          <input
            type="checkbox"
            checked={showExternals}
            onChange={(e) => onShowExternalsChange(e.target.checked)}
            className="h-4 w-4 accent-brand"
          />
        </label>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-muted-foreground">
          <span>Depth from root</span>
          <span className="text-brand">{depth < 0 ? "all" : depth}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {DEPTHS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => onDepthChange(d)}
              className={cn(
                "rounded-md border border-brand-80 px-2 py-1 text-xs transition-colors",
                depth === d
                  ? "bg-brand text-white border-brand"
                  : "bg-card hover:bg-brand-90",
              )}
            >
              {d < 0 ? "∞" : d}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-muted-foreground">
          Root: <span className="italic">{rootName ?? "(none — pick by clicking)"}</span>
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="arch-search" className="text-[11px] uppercase tracking-wider text-muted-foreground">
          Search
        </label>
        <input
          id="arch-search"
          type="search"
          placeholder="name or path…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="rounded-md border border-brand-80 bg-card px-2.5 py-1.5 text-sm focus:border-brand focus:outline-none"
        />
      </div>

      <div className="border-t border-brand-80 pt-3 text-[11px] text-muted-foreground">
        <div>
          Showing <span className="text-brand">{visibleCount.nodes}</span> /{" "}
          {totalCount.nodes} nodes,{" "}
          <span className="text-brand">{visibleCount.edges}</span> / {totalCount.edges} edges
        </div>
        <div className="mt-1">
          {meta.commit ? `commit ${meta.commit} · ` : ""}
          codearchview {meta.toolVersion}
        </div>
        <div className="mt-0.5 truncate" title={meta.generatedAt}>
          generated {meta.generatedAt.replace("T", " ").replace("+00:00", "Z")}
        </div>
      </div>

      <div className="border-t border-brand-80 pt-3">
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">Legend</div>
        <ul className="space-y-1 text-[11px]">
          <li className="flex items-center gap-2"><span className="inline-block h-px w-6 bg-brand-60" /> imports</li>
          <li className="flex items-center gap-2"><span className="inline-block h-px w-6 bg-brand" /> renders</li>
          <li className="flex items-center gap-2"><span className="inline-block h-px w-6 bg-brand-40" /> calls</li>
          <li className="flex items-center gap-2">
            <span className="inline-block h-px w-6 border-t border-dashed border-brand-70" />{" "}
            uses-type
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default GraphControls;
