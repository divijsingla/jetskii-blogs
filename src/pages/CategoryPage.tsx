import { useParams } from "react-router-dom";
import BlogLayout from "@/components/BlogLayout";
import BlogCard from "@/components/BlogCard";
import { getPostsByCategory } from "@/data/blogPosts";

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const posts = category ? getPostsByCategory(category) : [];
  
  const categoryTitles: Record<string, string> = {
    math: "Mathematics",
    music: "Music",
    tech: "Technology", 
    misc: "Miscellaneous"
  };

  const categoryTitle = category ? categoryTitles[category] || category : "Unknown Category";

  return (
    <BlogLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            {categoryTitle}
          </h1>
          <p className="text-lg text-muted-foreground">
            {posts.length} post{posts.length !== 1 ? 's' : ''} in this category
          </p>
        </div>

        <div className="grid gap-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No posts in this category yet.</p>
          </div>
        )}
      </div>
    </BlogLayout>
  );
};

export default CategoryPage;