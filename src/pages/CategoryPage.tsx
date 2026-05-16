import { useParams } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogListSection from "@/components/BlogListSection";
import { getPostsByCategory } from "@/blogPosts";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const posts = category ? getPostsByCategory(category) : [];

  return (
    <BlogLayout>
      <BlogListSection
        posts={posts}
        headerLines={[
          `Found ${posts.length} entries • Sorted by descending date`,
          // "If you also think date sorted blog posts are boring, click here."
        ]}
        emptyState="No posts in this category yet."
        compact
      />
    </BlogLayout>
  );
};

export default CategoryPage;