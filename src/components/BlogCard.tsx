import { Link } from "react-router-dom";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="py-4">
      <Link to={`/blog/${post.slug}`}>
        <h2 className="text-lg text-foreground hover:text-primary">
          {post.title}
        </h2>
      </Link>
      {/* <p className="mt-1 text-muted-foreground">{post.excerpt}</p> */}
      <div className="mt-2 text-sm text-muted-foreground flex items-center gap-x-2">
        <time dateTime={post.date}>{post.date}</time>
        <span>&middot;</span>
        <div className="flex flex-wrap gap-x-2">
          {post.tags.map((tag, idx) => (
            <span key={tag}>
              {tag}
              {idx < post.tags.length - 1 ? "," : ""}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;