import { useMemo, useState } from "react";
import { parse } from "date-fns";
import BlogLayout from "@/components/BlogLayout";
import BlogListSection from "@/components/BlogListSection";
import { blogPosts } from "@/blogPosts";
import type { BlogPost } from "@/types/blog";

type SortView = "date" | "tech" | "curated";

const DATE_VIEW_LABEL = "By date";
const TECH_VIEW_LABEL = "Tech flow";
const CURATED_VIEW_LABEL = "If you're here for the first time.";

const TECH_FLOW_SLUG_ORDER = [
  "codearchview",
  "massless-rockets",
  "my-schedule",
  "intro",
  "basis-of-effortlessness",
  "a-special-one",
  "musings-3",
  "musings-1",
  "musings-2",
] as const;

const FIRST_TIME_SLUG_ORDER = [
  "my-schedule",
  "intro",
  "basis-of-effortlessness",
  "codearchview",
  "massless-rockets",
  "musings-3",
  "musings-1",
  "musings-2",
  "a-special-one",
] as const;

const parseDate = (value: string) => {
  if (!value.trim()) return Number.NEGATIVE_INFINITY;
  const parsed = parse(value, "d MMMM yyyy", new Date());
  const timestamp = parsed.getTime();
  return Number.isNaN(timestamp) ? Number.NEGATIVE_INFINITY : timestamp;
};

const sortByDateDesc = (posts: BlogPost[]) =>
  [...posts].sort((a, b) => parseDate(b.date) - parseDate(a.date));

const sortByCustomFlow = (posts: BlogPost[], slugOrder: readonly string[]) => {
  const bySlug = new Map(posts.map((post) => [post.slug, post] as const));
  const ordered = slugOrder.map((slug) => bySlug.get(slug)).filter((post): post is BlogPost => Boolean(post));
  const remaining = posts.filter((post) => !slugOrder.includes(post.slug)).sort((a, b) => parseDate(b.date) - parseDate(a.date));
  return [...ordered, ...remaining];
};

const sortByTechFlow = (posts: BlogPost[]) => sortByCustomFlow(posts, TECH_FLOW_SLUG_ORDER);

const sortByCuratedFlow = (posts: BlogPost[]) => sortByCustomFlow(posts, FIRST_TIME_SLUG_ORDER);

const BlogList = () => {
  const [view, setView] = useState<SortView>("date");

  const posts = useMemo(() => {
    if (view === "tech") return sortByTechFlow(blogPosts);
    if (view === "curated") return sortByCuratedFlow(blogPosts);
    return sortByDateDesc(blogPosts);
  }, [view]);

  const activeLabel = view === "date" ? DATE_VIEW_LABEL : view === "tech" ? TECH_VIEW_LABEL : CURATED_VIEW_LABEL;

  return (
    <BlogLayout>
      <div className="max-w-4xl px-2 pt-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setView("date")}
            className={`px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
              view === "date"
                ? "bg-brand text-white border-brand"
                : "bg-transparent text-muted-foreground border-border hover:border-brand hover:text-brand"
            }`}
          >
            {DATE_VIEW_LABEL}
          </button>
          {/* <button
            type="button"
            onClick={() => setView("tech")}
            className={`px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
              view === "tech"
                ? "bg-brand text-white border-brand"
                : "bg-transparent text-muted-foreground border-border hover:border-brand hover:text-brand"
            }`}
          >
            {TECH_VIEW_LABEL}
          </button> */}
          <button
            type="button"
            onClick={() => setView("curated")}
            className={`px-3 py-1 rounded-full border text-xs font-mono transition-colors ${
              view === "curated"
                ? "bg-brand text-white border-brand"
                : "bg-transparent text-muted-foreground border-border hover:border-brand hover:text-brand"
            }`}
          >
            {CURATED_VIEW_LABEL}
          </button>
        </div>
      </div>
      <BlogListSection
        posts={posts}
        headerLines={[
          `Found ${posts.length} entr${posts.length !== 1 ? "ies" : "y"}  • ${activeLabel}`,
          view === "tech"
            ? "Path for builders: start with systems and code, then wander into life notes."
            : view === "curated"
              ? "New here? This path gives a smooth first pass through the blog."
              : "Classic newest-first reading order.",
        ]}
        compact
      />
    </BlogLayout>
  );
};

export default BlogList;