import BlogLayout from "@/components/BlogLayout";
import BlogListSection from "@/components/BlogListSection";
import { blogPosts } from "@/data/blogPosts";

const BlogList = () => {
  return (
    <BlogLayout>
      <BlogListSection
        posts={blogPosts}
        headerLines={[
          `Found ${blogPosts.length} entries${blogPosts.length !== 1 ? "s" : ""}  • Sorted by descending date`,
          "If you also think date sorted blog posts are boring, click here."
        ]}
        compact
      />
    </BlogLayout>
  );
};

export default BlogList;