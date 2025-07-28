import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import BlogLayout from "@/components/BlogLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Button>
        </Link>
      </div>
    </BlogLayout>
  );
};

export default NotFound;
