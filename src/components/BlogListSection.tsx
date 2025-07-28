import BlogCard from "@/components/BlogCard";

interface BlogListSectionProps {
  posts: any[];
  headerLines: string[];
  emptyState?: string;
  compact?: boolean;
}

const BlogListSection = ({ posts, headerLines, emptyState, compact }: BlogListSectionProps) => (
  <div className={`max-w-4xl ${compact ? 'px-2 py-4' : 'px-6 py-8'}`}>
    <div className={compact ? 'mb-4' : 'mb-8'}>
      {headerLines.map((line, i) => (
        <p key={i} className="text-muted-foreground font-mono text-sm">
          {line}
        </p>
      ))}
    </div>
    <div>
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
    {posts.length === 0 && (
      <div className="text-center py-16">
        <p className="text-muted-foreground">{emptyState || "No posts found."}</p>
      </div>
    )}
  </div>
);

export default BlogListSection;
