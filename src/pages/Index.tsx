import { Link } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";

const Index = () => {
  return (
    <BlogLayout>
      <div className="max-w-2xl px-2 py-4">
        <img src="/assets/heading.png" alt="Heading" className="w-full max-w-xl mb-4 opacity-5" />
        <div className="flex gap-0 mb-2">
          <img src="/assets/drawing.jpeg" alt="Money" className="w-72 h-72 object-cover opacity-100" />
        </div>
        <div className="space-y-1 text-base">
          <p>
            This is a space for my thoughts on technology, startups, and
            anything else that I find interesting.
          </p>
          <p>
            You can find my latest posts on the{" "}
            <Link to="/blog" className="text-primary hover:text-primary/80">
              blog
            </Link>
            .
          </p>
        </div>
      </div>
    </BlogLayout>
  );
};

export default Index;
