import { Link } from "react-router-dom";
import { Calendar, Clock } from "lucide-react";

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
    <article className="bg-card border border-border rounded-lg p-6 blog-shadow hover:blog-shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Calendar size={14} />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <div className="flex items-center space-x-1">
            <Clock size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
      
      <Link to={`/blog/${post.slug}`} className="group">
        <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      
      <p className="text-muted-foreground mb-4 leading-relaxed">
        {post.excerpt}
      </p>
      
      <div className="flex items-center justify-between">
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
        
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          Read more →
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;