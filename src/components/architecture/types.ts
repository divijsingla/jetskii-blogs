export type NodeKind =
  | "file"
  | "component"
  | "hook"
  | "function"
  | "const"
  | "class"
  | "interface"
  | "type"
  | "enum"
  | "default-export"
  | "external";

export type EdgeKind = "contains" | "imports" | "calls" | "renders" | "uses-type";

export type ExternalSource = "npm" | "node" | "browser" | "asset" | "unresolved";

export interface ArchNode {
  id: string;
  kind: NodeKind;
  name: string;
  path?: string;
  file?: string;
  loc?: { startLine: number; endLine: number };
  exported?: boolean;
  source?: ExternalSource;
}

export interface ArchEdge {
  source: string;
  target: string;
  kind: EdgeKind;
}

export interface ArchitectureGraph {
  meta: {
    entry: string;
    commit: string | null;
    generatedAt: string;
    tool: string;
    toolVersion: string;
  };
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export type Granularity = "file" | "component" | "function" | "all";
