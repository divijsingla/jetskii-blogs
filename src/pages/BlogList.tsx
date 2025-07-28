import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const BlogList = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Terminal-style header */}
        <div className="mb-16">
          <div className="text-sm text-muted-foreground mb-4 font-mono">
            <span className="text-primary">$</span> ls -la ~/blog/posts/
          </div>
          
          <div className="ascii-art mb-6 text-muted-foreground">
{`┌─────────────────────┐
│   digital.journal  │
└─────────────────────┘`}
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-2 terminal-cursor">
            /dev/thoughts
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Found {blogPosts.length} entries • Sorted by --date-desc
          </p>
        </div>

        {/* Blog Posts - Raw list style */}
        <div className="space-y-0 border-l-2 border-divider pl-0">
          {blogPosts.map((post, index) => (
            <div key={post.slug} className="relative">
              <BlogCard post={post} />
              {index < blogPosts.length - 1 && (
                <div className="h-px bg-divider/30 ml-6"></div>
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="ascii-art mb-4">
{`    ¯\\_(ツ)_/¯`}
            </div>
            <p className="text-muted-foreground font-mono">// TODO: Write more posts</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default BlogList;