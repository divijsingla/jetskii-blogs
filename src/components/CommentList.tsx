import React, { useEffect, useState } from "react";
import yaml from "js-yaml";

interface Comment {
  _id: string;
  name: string;
  message: string;
  date?: string;
}

interface CommentListProps {
  slug: string;
}


// Statically import all comment files at build time
const allCommentModules = import.meta.glob('/src/comments/*/comment-*.yml', { as: 'raw' });

export const CommentList: React.FC<CommentListProps> = ({ slug }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      try {
        // Filter modules by slug
        const commentPromises = Object.entries(allCommentModules)
          .filter(([path]) => path.includes(`/src/comments/${slug}/`))
          .map(async ([, importFn]) => {
            const raw = await (importFn as () => Promise<string>)();
            const parsed = yaml.load(raw) as Comment;
            return parsed;
          });
        const loaded = await Promise.all(commentPromises);
        // Sort by date descending (newest first)
        loaded.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
        setComments(loaded);
      } catch (err) {
        setComments([]);
      }
      setLoading(false);
    }
    loadComments();
  }, [slug]);

  if (loading) {
    return <div className="text-muted-foreground">Loading comments...</div>;
  }

  if (comments.length === 0) {
    return <div className="text-muted-foreground">No comments yet. Be the first to comment!</div>;
  }

  return (
    <div className="space-y-4 mb-8">
  <hr className="mb-6 border-border" />
      <h3 className="text-lg font-semibold text-[hsl(24,60%,30%)] mb-2">Comments</h3>
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-[hsl(24,60%,92%)] border border-[hsl(24,60%,70%)] rounded p-4 shadow-sm"
        >
          <div className="font-medium text-[hsl(24,60%,30%)]">{comment.name || "Anonymous"}</div>
          <div className="text-sm text-muted-foreground mb-1">
            {comment.date ? new Date(comment.date).toLocaleString() : null}
          </div>
          <div className="text-base text-foreground whitespace-pre-line">{comment.message}</div>
        </div>
      ))}
    </div>
  );
};
