// --- Anonymous Prompt Form Component ---
function AnonymousPromptForm({ slug, promptTitle }) {
  const [response, setResponse] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSubmitted(false);
    const actionUrl = `https://staticman-g2u2.onrender.com/v3/entry/github/divijsingla/jetskii-blogs/main/comments`;
    const body = JSON.stringify({
      fields: {
        name: "MUSINGS-2",
        email: "",
        message: response
      },
      options: {
        slug: slug
      }
    });
    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      if (res.ok) {
        setSubmitted(true);
        setResponse("");
      } else {
        setError("Failed to submit response. Please try again later.");
      }
    } catch (err) {
      setError("Failed to submit response. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-4 bg-[hsl(24,60%,95%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded mb-8">
        <div className="w-full h-2 mb-3 bg-[hsl(24,60%,85%)] rounded overflow-hidden">
          <div className="h-full bg-[hsl(24,60%,40%)] animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your response to the server gods...</span>
      </div>
    );
  }
  if (submitted) {
    return (
      <div className="p-4 bg-[hsl(24,60%,90%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded mb-8">
        Got it, I'll reflect on it for sure! Thanks!
      </div>
    );
  }
  return (
    <form className="mb-8 flex flex-col gap-2" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="anonymous-prompt-response" className="font-semibold text-[hsl(24,60%,30%)]">{promptTitle}</label>
      <div className="flex flex-row gap-2 w-full">
        <input
          id="anonymous-prompt-response"
          type="text"
          value={response}
          onChange={e => setResponse(e.target.value)}
          placeholder="Your honest, anonymous answer..."
          className="border border-[hsl(24,60%,80%)] rounded px-3 py-2 w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-[hsl(24,60%,60%)]"
          required
        />
        <button
          type="submit"
          className="bg-[hsl(24,60%,30%)] hover:bg-[hsl(24,60%,25%)] text-white px-4 py-2 rounded transition-colors"
        >
          Submit
        </button>
      </div>
      <div className="mt-1 text-xs italic text-muted-foreground">
Most probably you’ve met me, coz this blog website is not famous, lol. But even if not, based on my writings or whatever you know about me.      </div>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </form>
  );
}


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
So, type your name and step in, if you're one of the special ones, you'll be able to read this.</div>
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
      {/* Anonymous Prompt Form for musings-2 */}
      {post.anonymousPrompt && (
        <div className="mt-10">
          <hr className="border-t border-[hsl(24,60%,80%)] mb-8" />
          <AnonymousPromptForm slug={post.slug} promptTitle={post.anonymousPrompt.title} />
        </div>
      )}
      {/* Render extra images at the end if present */}
      {post.extraImages && post.extraImages.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          {/* First image full width with caption */}
          <div className="w-full flex flex-col items-center mb-6">
            <img
              src={`${import.meta.env.BASE_URL}assets/${post.extraImages[0]}`}
              alt={`Attached 1`}
              className="rounded-lg shadow border border-[hsl(24,60%,30%)] w-full max-w-3xl max-h-96 object-cover"
            />
            {post.imageCaptions && post.imageCaptions[post.extraImages[0]] && (
              <p className="text-center text-[hsl(24,60%,30%)] italic mt-2 font-medium">
                {post.imageCaptions[post.extraImages[0]]}
              </p>
            )}
          </div>
          {/* Middle images in pairs with captions */}
          <div className="flex flex-wrap gap-6 justify-center">
            {post.extraImages.slice(1, post.extraImages.length - 1).map((img, idx) => (
              <div key={idx + 1} className="flex flex-col items-center mb-4">
                <img
                  src={`${import.meta.env.BASE_URL}assets/${img}`}
                  alt={`Attached ${idx + 2}`}
                  className="rounded-lg shadow border border-[hsl(24,60%,30%)] max-w-xs max-h-80 object-cover"
                />
                {post.imageCaptions && post.imageCaptions[img] && (
                  <p className="text-center text-[hsl(24,60%,30%)] italic mt-2 font-medium max-w-xs">
                    {post.imageCaptions[img]}
                  </p>
                )}
              </div>
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