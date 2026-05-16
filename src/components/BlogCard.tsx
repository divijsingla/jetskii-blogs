import { Link } from "react-router-dom";
import { Lock } from "lucide-react";

const BlogCard = ({ post }) => {
  const isProtected = !!post.protected;
  return (
    <article className="py-4">
      <div className="flex flex-row items-start gap-4 sm:gap-6 group sm:flex-nowrap flex-wrap">
        {post.image && (
          <Link to={`/blog/${post.slug}`} tabIndex={-1} className="shrink-0">
            <img
              src={`${import.meta.env.BASE_URL}assets/${post.image}`}
              alt={post.title + " cover"}
              className="w-[90px] h-[90px] sm:w-[120px] sm:h-[120px] md:w-[160px] md:h-[160px] aspect-square object-cover rounded-2xl bg-white"
              loading="lazy"
            />
          </Link>
        )}
        <div className="min-w-0 flex-1">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-baseline gap-2 flex-wrap"
          >
            <h2 className="text-lg text-foreground group-hover:text-[hsl(24,60%,30%)] transition-colors break-words whitespace-normal">
              {post.title}
            </h2>
            {isProtected && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-[hsl(24,60%,30%)] text-[hsl(24,60%,30%)] bg-[hsl(24,60%,95%)] text-xs font-mono shrink-0"
                title={post.protection?.type === "password" ? "Password protected" : "Private"}
                aria-label={post.protection?.type === "password" ? "Password protected" : "Private"}
              >
                <Lock className="h-3 w-3" />
                {post.protection?.type === "password" ? "password" : "private"}
              </span>
            )}
          </Link>
          {/* <p className="mt-1 text-muted-foreground">{post.excerpt}</p> */}
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-x-2 flex-wrap">
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
        </div>
      </div>
    </article>
  );
};

export default BlogCard;