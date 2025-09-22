import { Link } from "react-router-dom";
import SuperPage from "@/components/SuperPage";

const Index = () => {
  return (
    <SuperPage isHome>
      <p>
        This is a five thousand years old website from the future.
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
