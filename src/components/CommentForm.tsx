import React, { useState } from "react";

interface CommentFormProps {
  slug: string; // Unique identifier for the blog post
}

export const CommentForm: React.FC<CommentFormProps> = ({ slug }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setError("");
    const actionUrl = `https://staticman-g2u2.onrender.com/v3/entry/github/divijsingla/jetskii-blogs/main/comments`;
    const body = JSON.stringify({
      fields: {
        name: form.name,
        email: form.email,
        message: form.message,
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
    }
  };

  if (submitted) {
    return <div className="p-4 bg-green-100 rounded">Thank you! Your comment is awaiting moderation.</div>;
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
