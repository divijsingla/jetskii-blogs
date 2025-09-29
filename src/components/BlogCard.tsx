import { Link } from "react-router-dom";

const BlogCard = ({ post }) => {
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
          <Link to={`/blog/${post.slug}`}>
            <h2 className="text-lg text-foreground group-hover:text-[hsl(24,60%,30%)] transition-colors break-words whitespace-normal">
              {post.title}
            </h2>
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