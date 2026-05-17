import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { cn } from "@/lib/utils";
import type { ArchNodeData } from "./useArchitectureGraph";
import type { NodeKind } from "./types";

const KIND_ACCENT: Record<NodeKind, string> = {
  file: "border-l-brand-60",
  component: "border-l-brand-30",
  hook: "border-l-brand-40",
  function: "border-l-brand-70",
  const: "border-l-brand-80",
  class: "border-l-brand-30",
  interface: "border-l-brand-70",
  type: "border-l-brand-70",
  enum: "border-l-brand-60",
  "default-export": "border-l-brand-25",
  external: "border-l-muted-foreground",
};

const KIND_LABEL: Record<NodeKind, string> = {
  file: "file",
  component: "component",
  hook: "hook",
  function: "function",
  const: "const",
  class: "class",
  interface: "interface",
  type: "type",
  enum: "enum",
  "default-export": "default export",
  external: "external",
};

function subtitleFor(data: ArchNodeData): string | null {
  const { arch } = data;
  if (arch.kind === "file") return arch.path ?? null;
  if (arch.kind === "external") return arch.source ?? null;
  return arch.file ?? null;
}

const NodeCardImpl = ({ data, selected }: NodeProps<ArchNodeData>) => {
  const { arch, matched, dimmed } = data;
  const accent = KIND_ACCENT[arch.kind] ?? "border-l-brand-60";
  const subtitle = subtitleFor(data);

  return (
    <div
      className={cn(
        "group relative w-[220px] rounded-lg border-2 border-l-4 bg-card text-card-foreground shadow-sm",
        "border-brand-80 px-3 py-2 transition-all",
        accent,
        arch.kind === "external" ? "bg-muted/40 italic" : "",
        matched && "ring-2 ring-brand ring-offset-2 ring-offset-background",
        selected && "ring-2 ring-brand-40 ring-offset-2 ring-offset-background",
        dimmed && "opacity-40",
      )}
    >
      <Handle type="target" position={Position.Left} className="!h-2 !w-2 !bg-brand-60" />
      <div className="flex items-baseline justify-between gap-2">
        <div className="truncate text-sm text-brand-20">{arch.name}</div>
        <span className="shrink-0 text-[10px] italic text-muted-foreground">
          {KIND_LABEL[arch.kind]}
        </span>
      </div>
      {subtitle ? (
        <div className="mt-0.5 truncate text-[10px] text-muted-foreground">{subtitle}</div>
      ) : null}
      <Handle type="source" position={Position.Right} className="!h-2 !w-2 !bg-brand-60" />
    </div>
  );
};

export const NodeCard = memo(NodeCardImpl);
