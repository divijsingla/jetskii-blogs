import { useMemo } from "react";
import type { Edge, Node } from "reactflow";
import { MarkerType } from "reactflow";
import dagre from "dagre";
import type {
  ArchEdge,
  ArchitectureGraph,
  ArchNode,
  EdgeKind,
  Granularity,
  NodeKind,
} from "./types";

export interface UseArchitectureGraphOptions {
  graph: ArchitectureGraph;
  granularity: Granularity;
  showExternals: boolean;
  depth: number; // -1 for unlimited
  search: string;
  rootNodeId?: string | null;
}

interface ArchNodeData {
  arch: ArchNode;
  matched: boolean;
  dimmed: boolean;
}

const NODE_WIDTH = 220;
const NODE_HEIGHT = 56;

const SYMBOL_KINDS_FOR_GRANULARITY: Record<Granularity, Set<NodeKind>> = {
  file: new Set<NodeKind>(["file"]),
  component: new Set<NodeKind>(["file", "component", "hook"]),
  function: new Set<NodeKind>(["file", "component", "hook", "function", "default-export"]),
  all: new Set<NodeKind>([
    "file",
    "component",
    "hook",
    "function",
    "const",
    "class",
    "interface",
    "type",
    "enum",
    "default-export",
  ]),
};

function keepNodeForGranularity(node: ArchNode, granularity: Granularity, showExternals: boolean) {
  if (node.kind === "external") return showExternals;
  return SYMBOL_KINDS_FOR_GRANULARITY[granularity].has(node.kind);
}

/**
 * Collapse a symbol-level edge into a file-level edge when the
 * granularity hides symbol nodes.  Returns null if the edge should
 * disappear entirely (e.g. both endpoints filtered out).
 */
function collapseEdge(
  edge: ArchEdge,
  byId: Map<string, ArchNode>,
  keptIds: Set<string>,
): ArchEdge | null {
  let src = edge.source;
  let dst = edge.target;

  if (!keptIds.has(src)) {
    const arch = byId.get(src);
    if (arch?.file) src = `file::${arch.file}`;
  }
  if (!keptIds.has(dst)) {
    const arch = byId.get(dst);
    if (arch?.file) dst = `file::${arch.file}`;
  }

  if (!keptIds.has(src) || !keptIds.has(dst)) return null;
  if (src === dst && edge.kind !== "contains") return null;
  if (edge.kind === "contains") return null; // suppressed (file -> symbol structural)

  return { source: src, target: dst, kind: edge.kind };
}

/**
 * BFS from `root` over the (undirected) edges; return the set of
 * node ids reachable within `depth` hops.
 */
function neighborhood(
  rootId: string,
  edges: { source: string; target: string }[],
  depth: number,
): Set<string> {
  const adj = new Map<string, Set<string>>();
  for (const e of edges) {
    if (!adj.has(e.source)) adj.set(e.source, new Set());
    if (!adj.has(e.target)) adj.set(e.target, new Set());
    adj.get(e.source)!.add(e.target);
    adj.get(e.target)!.add(e.source);
  }

  const visited = new Set<string>([rootId]);
  let frontier: string[] = [rootId];
  for (let d = 0; d < depth; d += 1) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const n of adj.get(id) ?? []) {
        if (!visited.has(n)) {
          visited.add(n);
          next.push(n);
        }
      }
    }
    if (next.length === 0) break;
    frontier = next;
  }
  return visited;
}

function layout(nodes: Node<ArchNodeData>[], edges: Edge[]): Node<ArchNodeData>[] {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: "LR", ranksep: 80, nodesep: 24, marginx: 24, marginy: 24 });
  g.setDefaultEdgeLabel(() => ({}));

  for (const n of nodes) {
    g.setNode(n.id, { width: NODE_WIDTH, height: NODE_HEIGHT });
  }
  for (const e of edges) {
    g.setEdge(e.source, e.target);
  }
  dagre.layout(g);

  return nodes.map((n) => {
    const pos = g.node(n.id);
    return {
      ...n,
      position: { x: pos.x - NODE_WIDTH / 2, y: pos.y - NODE_HEIGHT / 2 },
    };
  });
}

const EDGE_COLORS: Record<EdgeKind, string> = {
  imports: "hsl(24 60% 60%)",
  renders: "hsl(24 60% 30%)",
  calls: "hsl(24 60% 45%)",
  "uses-type": "hsl(24 30% 60%)",
  contains: "hsl(24 30% 80%)",
};

const EDGE_DASHED: Partial<Record<EdgeKind, boolean>> = {
  "uses-type": true,
};

export function useArchitectureGraph({
  graph,
  granularity,
  showExternals,
  depth,
  search,
  rootNodeId,
}: UseArchitectureGraphOptions): {
  nodes: Node<ArchNodeData>[];
  edges: Edge[];
  visibleCount: { nodes: number; edges: number };
} {
  return useMemo(() => {
    const byId = new Map(graph.nodes.map((n) => [n.id, n]));

    // 1) Filter by kind (granularity + externals toggle)
    const keptIds = new Set<string>(
      graph.nodes
        .filter((n) => keepNodeForGranularity(n, granularity, showExternals))
        .map((n) => n.id),
    );

    // 2) Collapse / drop edges
    const collapsed: ArchEdge[] = [];
    for (const e of graph.edges) {
      const c = collapseEdge(e, byId, keptIds);
      if (c !== null) collapsed.push(c);
    }

    // Dedupe edges by (src, dst, kind)
    const edgeKey = (e: ArchEdge) => `${e.source}|${e.target}|${e.kind}`;
    const dedupedEdges = Array.from(
      new Map(collapsed.map((e) => [edgeKey(e), e])).values(),
    );

    // 3) Optional depth-limited neighborhood
    let visibleIds = keptIds;
    if (depth >= 0 && rootNodeId && keptIds.has(rootNodeId)) {
      visibleIds = neighborhood(rootNodeId, dedupedEdges, depth);
    }

    // 4) Search highlight
    const q = search.trim().toLowerCase();
    const matchedIds = new Set<string>();
    if (q) {
      for (const id of visibleIds) {
        const n = byId.get(id);
        if (!n) continue;
        const hay = `${n.name} ${n.path ?? ""} ${n.file ?? ""}`.toLowerCase();
        if (hay.includes(q)) matchedIds.add(id);
      }
    }

    const visibleArchNodes = Array.from(visibleIds)
      .map((id) => byId.get(id))
      .filter((n): n is ArchNode => Boolean(n));

    const visibleEdges = dedupedEdges.filter(
      (e) => visibleIds.has(e.source) && visibleIds.has(e.target),
    );

    // 5) Build React Flow nodes / edges
    const rfNodes: Node<ArchNodeData>[] = visibleArchNodes.map((arch) => ({
      id: arch.id,
      type: "arch",
      position: { x: 0, y: 0 },
      data: {
        arch,
        matched: q ? matchedIds.has(arch.id) : false,
        dimmed: q.length > 0 && !matchedIds.has(arch.id),
      },
    }));

    const rfEdges: Edge[] = visibleEdges.map((e) => ({
      id: `${e.source}->${e.target}|${e.kind}`,
      source: e.source,
      target: e.target,
      type: "smoothstep",
      animated: false,
      label: undefined,
      style: {
        stroke: EDGE_COLORS[e.kind],
        strokeWidth: 1.25,
        strokeDasharray: EDGE_DASHED[e.kind] ? "4 3" : undefined,
        opacity: q ? 0.35 : 0.85,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: EDGE_COLORS[e.kind],
        width: 14,
        height: 14,
      },
      data: { kind: e.kind },
    }));

    const positioned = layout(rfNodes, rfEdges);

    return {
      nodes: positioned,
      edges: rfEdges,
      visibleCount: { nodes: positioned.length, edges: rfEdges.length },
    };
  }, [graph, granularity, showExternals, depth, search, rootNodeId]);
}

export type { ArchNodeData };
