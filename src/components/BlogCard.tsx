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
    <article className="py-8 post-divider group">
      {/* Terminal-style header */}
      <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2 font-mono">
        <span className="text-primary">$</span>
        <span>cat posts/{post.slug}.md</span>
        <span className="text-muted-foreground">|</span>
        <time dateTime={post.date}>{post.date}</time>
        <span>({post.readTime})</span>
      </div>
      
      {/* Title with terminal styling */}
      <Link to={`/blog/${post.slug}`} className="group/title">
        <h2 className="text-2xl font-bold text-foreground mb-3 group-hover/title:text-primary transition-colors duration-200">
          <span className="text-muted-foreground text-lg mr-2">//</span>
          {post.title}
          <span className="opacity-0 group-hover/title:opacity-100 transition-opacity text-primary ml-1">_</span>
        </h2>
      </Link>
      
      {/* Excerpt */}
      <div className="text-muted-foreground mb-4 leading-relaxed">
        <span className="text-xs text-muted-foreground mr-2">→</span>
        {post.excerpt}
      </div>
      
      {/* Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <code
              key={tag}
              className="geek-tag px-2 py-1 rounded text-xs transition-all duration-200"
            >
              {tag}
            </code>
          ))}
        </div>
        
        <Link
          to={`/blog/${post.slug}`}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors group/link"
        >
          <span className="group-hover/link:mr-2 transition-all">read</span>
          <span className="text-terminal-green">--more</span>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;