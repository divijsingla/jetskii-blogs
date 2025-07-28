
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import BlogLayout from "@/components/BlogLayout";
import { getPostBySlug } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import MarkdownPreview from '@uiw/react-markdown-preview';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  console.log(post.content)
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
      <article className="max-w-6xl px-2 py-8 mx-auto flex flex-col items-center">
        {/* Post Header */}
        <header className="mb-8 w-full flex flex-col items-center">
          <h1 className="text-3xl font-bold text-[hsl(24,60%,30%)] mb-2">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mb-2">
            <div className="text-sm text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time>
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm">
              <span className="mr-1 text-[hsl(24,60%,30%)]">tags:</span>
              {post.tags.map((tag: string) => (
                <code
                  key={tag}
                  className="geek-tag px-2 py-1 rounded text-sm transition-all duration-200 text-[hsl(24,60%,30%)] border-[hsl(24,60%,30%)]"
                >
                  {tag}
                </code>
              ))}
            </div>
          )}
        </header>

        {/* Post Content */}
        <div 
          className="prose max-w-none text-base font-mono text-foreground bg-transparent w-full flex justify-center"
          style={{ fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}
        >
          <div className="w-full" style={{ maxWidth: '70rem' }}>
            <MarkdownPreview 
              source={post.content} 
              style={{ background: 'transparent', fontFamily: 'inherit', color: 'inherit', fontSize: '1rem' }}
              className="!bg-transparent !text-foreground !font-mono !text-base"
            />
          </div>
        </div>
      </article>
    </BlogLayout>
  );
};

export default BlogPost;