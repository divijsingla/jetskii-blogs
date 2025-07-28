import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return (
      <BlogLayout>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
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
        </div>
      </BlogLayout>
    );
  }

  return (
    <BlogLayout>
      <article className="max-w-4xl mx-auto px-6 py-8">
        {/* Back Navigation */}
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-6">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <time dateTime={post.date}>{post.date}</time>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{post.readTime}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-medium blog-tag rounded-full text-foreground"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="leading-relaxed text-foreground"
            dangerouslySetInnerHTML={{ 
              __html: post.content
                .replace(/\n/g, '<br />')
                .replace(/```([^`]+)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto"><code>$1</code></pre>')
                .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
                .replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4">$1</h1>')
                .replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
                .replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-4 mb-2">$1</h3>')
                .replace(/^\*\*(.*)\*\*/gm, '<strong>$1</strong>')
                .replace(/^\*(.*)\*/gm, '<em>$1</em>')
            }}
          />
        </div>

        {/* Navigation */}
        <footer className="mt-16 pt-8 border-t border-border">
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to all posts
            </Button>
          </Link>
        </footer>
      </article>
    </BlogLayout>
  );
};

export default BlogPost;