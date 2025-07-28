import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const Index = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Technical Musings & Mathematical Adventures
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Exploring the intersection of mathematics, technology, and creativity. 
            Thoughts on code, algorithms, music theory, and the occasional random idea.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">Latest Posts</h2>
          <div className="grid gap-8">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>

        {/* Empty State for when there are no posts */}
        {blogPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default Index;
