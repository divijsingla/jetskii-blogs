

import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/blogPosts";
import { Button } from "@/components/ui/button";
import SuperPage from "@/components/SuperPage";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  console.log(post.content)
  if (!post) {
    return (
      <SuperPage isHome>
        <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </SuperPage>
    );
  }

  return (
    <SuperPage
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      tags={post.tags}
      content={post.content}
    />
  );
};

export default BlogPost;