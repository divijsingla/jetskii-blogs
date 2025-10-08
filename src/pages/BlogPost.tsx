

import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug } from "@/blogPosts";
import { Button } from "@/components/ui/button";
import SuperPage from "@/components/SuperPage";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [name, setName] = React.useState("");
  const [allowed, setAllowed] = React.useState(false);
  const [error, setError] = React.useState("");

  if (!post) {
    return (
      <SuperPage isHome>
        <h1 className="text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </SuperPage>
    );
  }

  // Protected mode logic
  if (post.protected && !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(24,60%,94%)]">
        <div className="w-full max-w-sm p-8 rounded-lg shadow-lg border border-[hsl(24,60%,30%)] bg-white">
          <form
            onSubmit={e => {
              e.preventDefault();
              if (post.allowedNames.some(n => n.toLowerCase() === name.trim().toLowerCase())) {
                setAllowed(true);
                setError("");
              } else {
                setError("Sorry, you are not allowed to view this blog.");
              }
            }}
          >
            <label htmlFor="name" className="block text-lg font-medium text-[hsl(24,60%,30%)] mb-4 text-center">Enter your name to continue</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              className="border border-[hsl(24,60%,30%)] px-3 py-2 rounded w-full mb-2 focus:outline-none focus:ring-2 focus:ring-[hsl(24,60%,30%)] text-center"
              required
            />
            <div className="text-sm text-[hsl(24,60%,30%)] mb-4 text-center">Yeah, this isn't some top-tier encryption, it's actually pretty shitty. But that's the point.
It's not about security; it's about effort.
The fact that I sat down to code this page at 2AM just so only a few names could open it, that's me saying you matter. <br />
So, type your name and step in, if you're one of the special ones</div>
            <Button type="submit" className="w-full bg-[hsl(24,60%,30%)] text-white hover:bg-[hsl(24,60%,20%)]">Enter</Button>
          </form>
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      </div>
    );
  }

  // Show blog content if not protected or allowed
  return (
    <SuperPage
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      tags={post.tags}
      content={post.content}
      image={post.image}
    >
      {/* Render extra images at the end if present */}
      {post.extraImages && post.extraImages.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          {/* First image full width */}
          <div className="w-full flex justify-center mb-6">
            <img
              src={`${import.meta.env.BASE_URL}assets/${post.extraImages[0]}`}
              alt={`Attached 1`}
              className="rounded-lg shadow border border-[hsl(24,60%,30%)] w-full max-w-3xl max-h-96 object-cover"
            />
          </div>
          {/* Middle images in pairs */}
          <div className="flex flex-wrap gap-6 justify-center">
            {post.extraImages.slice(1, post.extraImages.length - 1).map((img, idx) => (
              <img
                key={idx + 1}
                src={`${import.meta.env.BASE_URL}assets/${img}`}
                alt={`Attached ${idx + 2}`}
                className="rounded-lg shadow border border-[hsl(24,60%,30%)] max-w-xs max-h-80 object-cover"
              />
            ))}
          </div>
          {/* Last image full width, only if more than one image */}
          {post.extraImages.length > 1 && (
            <div className="w-full flex justify-center mt-6">
              <img
                src={`${import.meta.env.BASE_URL}assets/${post.extraImages[post.extraImages.length - 1]}`}
                alt={`Attached ${post.extraImages.length}`}
                className="rounded-lg shadow border border-[hsl(24,60%,30%)] w-full max-w-3xl max-h-96 object-cover"
              />
            </div>
          )}
          {/* Restricted images, only for allowed names */}
          {post.restrictedImages && post.restrictedImages.length > 0 && (
            <div className="w-full flex justify-center mt-6 overflow-auto">
              {post.restrictedImages.map((imgObj, idx) => {
                // Only show if name matches allowedNames (case-insensitive)
                if (name && imgObj.allowedNames.some(n => n.toLowerCase() === name.trim().toLowerCase())) {
                  return (
                    <img
                      key={idx}
                      src={`${import.meta.env.BASE_URL}assets/${imgObj.src}`}
                      alt={`Restricted ${idx + 1}`}
                      className="rounded-lg shadow border border-[hsl(24,60%,30%)] h-auto w-auto max-w-full"
                      style={{ display: 'block', margin: '0 auto' }}
                    />
                  );
                }
                return null;
              })}
            </div>
          )}
        </section>
      )}
      {/* Minimalist Comment Section */}
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-4 text-[hsl(24,60%,30%)]">Want to say something?</h2>
        <CommentForm slug={slug ?? ""} />
        <div className="mt-10">
          <CommentList slug={slug ?? ""} />
        </div>
      </section>
    </SuperPage>
  );
};

export default BlogPost;