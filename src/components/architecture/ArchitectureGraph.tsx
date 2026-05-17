import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  NodeMouseHandler,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";

import GraphControls from "./GraphControls";
import { NodeCard } from "./NodeCard";
import {
  ArchNodeData,
  useArchitectureGraph,
} from "./useArchitectureGraph";
import type { ArchitectureGraph, Granularity } from "./types";

const nodeTypes = { arch: NodeCard };

interface Props {
  graph: ArchitectureGraph;
}

const ArchitectureGraphInner = ({ graph }: Props) => {
  const [granularity, setGranularity] = useState<Granularity>("file");
  const [showExternals, setShowExternals] = useState(true);
  const [depth, setDepth] = useState<number>(-1);
  const [search, setSearch] = useState("");

  // Default root: the entry file declared in meta
  const defaultRootId = useMemo(() => {
    const entry = graph.meta.entry;
    const candidate = `file::${entry}`;
    const hit = graph.nodes.find((n) => n.id === candidate);
    return hit?.id ?? null;
  }, [graph]);

  const [rootNodeId, setRootNodeId] = useState<string | null>(defaultRootId);

  const rootName = useMemo(() => {
    if (!rootNodeId) return null;
    return graph.nodes.find((n) => n.id === rootNodeId)?.name ?? null;
  }, [graph, rootNodeId]);

  const totalCount = useMemo(
    () => ({ nodes: graph.nodes.length, edges: graph.edges.length }),
    [graph],
  );

  const { nodes, edges, visibleCount } = useArchitectureGraph({
    graph,
    granularity,
    showExternals,
    depth,
    search,
    rootNodeId,
  });

  const onNodeClick: NodeMouseHandler = useCallback((_, node: Node<ArchNodeData>) => {
    setRootNodeId(node.id);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      <GraphControls
        granularity={granularity}
        onGranularityChange={setGranularity}
        showExternals={showExternals}
        onShowExternalsChange={setShowExternals}
        depth={depth}
        onDepthChange={setDepth}
        search={search}
        onSearchChange={setSearch}
        rootName={rootName}
        visibleCount={visibleCount}
        totalCount={totalCount}
        meta={graph.meta}
      />
      <div
        className="relative h-[calc(100vh-180px)] min-h-[480px] w-full overflow-hidden rounded-2xl border-2 border-brand-80 bg-card"
        style={{ contain: "layout paint" }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.1}
          maxZoom={2}
          onNodeClick={onNodeClick}
          proOptions={{ hideAttribution: true }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="hsl(24 60% 85%)" />
          <MiniMap pannable zoomable nodeColor={() => "hsl(24 60% 70%)"} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
};

const ArchitectureGraphView = (props: Props) => (
  <ReactFlowProvider>
    <ArchitectureGraphInner {...props} />
  </ReactFlowProvider>
);

export default ArchitectureGraphView;
