import BlogLayout from "@/components/BlogLayout";
import ArchitectureGraphView from "@/components/architecture/ArchitectureGraph";
import architectureJson from "@/data/architecture.json";
import type { ArchitectureGraph } from "@/components/architecture/types";

const graph = architectureJson as unknown as ArchitectureGraph;

const ArchitecturePage = () => {
  return (
    <BlogLayout>
      <div className="mx-auto w-full max-w-[1400px] px-3 py-4">
        <ArchitectureGraphView graph={graph} />
      </div>
    </BlogLayout>
  );
};

export default ArchitecturePage;
