import React, { useState } from "react";
import { useStaticmanSubmit } from "@/hooks/useStaticmanSubmit";

interface CommentFormProps {
  slug: string;
}

export const CommentForm: React.FC<CommentFormProps> = ({ slug }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { status, error, submit } = useStaticmanSubmit();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      slug,
      name: form.name,
      email: form.email,
      message: form.message,
    });
  };

  if (status === "loading") {
    return (
      <div className="p-4 bg-brand-95 text-brand-20 border border-brand-40 rounded">
        <div className="w-full h-2 mb-3 bg-brand-85 rounded overflow-hidden">
          <div className="h-full bg-brand-40 animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your wit to the server gods...</span>
      </div>
    );
  }

  if (status === "submitted") {
    return <div className="p-4 bg-brand-90 text-brand-20 border border-brand-40 rounded">Nice one! Your comment is awaiting moderation.</div>;
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
      <button type="submit" className="bg-brand hover:bg-brand-25 text-white px-4 py-2 rounded transition-colors">Submit</button>
    </form>
  );
};
