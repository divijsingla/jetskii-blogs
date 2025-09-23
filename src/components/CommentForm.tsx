import React, { useState } from "react";

interface CommentFormProps {
  slug: string; // Unique identifier for the blog post
}

export const CommentForm: React.FC<CommentFormProps> = ({ slug }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const actionUrl = `https://staticman-g2u2.onrender.com/v3/entry/github/divijsingla/jetskii-blogs/main/comments`;
    const body = JSON.stringify({
      fields: {
        name: form.name,
        email: form.email,
        message: form.message
      },
      options: {
        slug
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
      } else {
        setError("Failed to submit comment. Please try again later.");
      }
    } catch (err) {
      setError("Failed to submit comment. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return (
      <div className="p-4 bg-[hsl(24,60%,95%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded">
        <div className="w-full h-2 mb-3 bg-[hsl(24,60%,85%)] rounded overflow-hidden">
          <div className="h-full bg-[hsl(24,60%,40%)] animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your wit to the server gods...</span>
      </div>
    );
  }
/* Add this to your global CSS (e.g., index.css or tailwind.css) if not already present:
@keyframes loading-bar {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
.animate-loading-bar {
  animation: loading-bar 1.2s linear infinite;
  will-change: transform;
}
*/

  if (submitted) {
    return <div className="p-4 bg-[hsl(24,60%,90%)] text-[hsl(24,60%,20%)] border border-[hsl(24,60%,40%)] rounded">Nice one! Your comment is awaiting moderation.</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-8">
      <div>
        <label className="block mb-1 font-medium">Name*</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email (optional, never shown)</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block mb-1 font-medium">Comment*</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      {error && <div className="text-red-600">{error}</div>}
  <button type="submit" className="bg-[hsl(24,60%,30%)] hover:bg-[hsl(24,60%,25%)] text-white px-4 py-2 rounded transition-colors">Submit</button>
    </form>
  );
};
