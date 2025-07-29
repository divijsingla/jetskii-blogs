import { Link } from "react-router-dom";
import SuperPage from "@/components/SuperPage";

const Index = () => {
  return (
    <SuperPage isHome>
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
    </SuperPage>
  );
};

export default Index;
