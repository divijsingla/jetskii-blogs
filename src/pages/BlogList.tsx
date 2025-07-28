import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogPosts";

const BlogList = () => {
  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Blog Posts
          </h1>
          <p className="text-lg text-muted-foreground">
            {blogPosts.length} post{blogPosts.length !== 1 ? 's' : ''} • Latest first
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
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

export default BlogList;