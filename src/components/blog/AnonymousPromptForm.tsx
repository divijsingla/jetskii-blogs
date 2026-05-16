import React from "react";
import { useStaticmanSubmit } from "@/hooks/useStaticmanSubmit";

interface AnonymousPromptFormProps {
  slug: string;
  promptTitle: string;
}

const AnonymousPromptForm: React.FC<AnonymousPromptFormProps> = ({ slug, promptTitle }) => {
  const [response, setResponse] = React.useState("");
  const { status, error, submit } = useStaticmanSubmit();
  const loading = status === "loading";
  const submitted = status === "submitted";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submit({
      slug,
      name: "MUSINGS-2",
      message: response,
    });
  };

  if (loading) {
    return (
      <div className="p-4 bg-brand-95 text-brand-20 border border-brand-40 rounded mb-8">
        <div className="w-full h-2 mb-3 bg-brand-85 rounded overflow-hidden">
          <div className="h-full bg-brand-40 animate-loading-bar" style={{ width: '100%' }}></div>
        </div>
        <span>Sending your response to the server gods...</span>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="p-4 bg-brand-90 text-brand-20 border border-brand-40 rounded mb-8">
        Got it, I'll reflect on it for sure! Thanks!
      </div>
    );
  }

  return (
    <form className="mb-8 flex flex-col gap-2" onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="anonymous-prompt-response" className="font-semibold text-brand">{promptTitle}</label>
      <div className="flex flex-row gap-2 w-full">
        <input
          id="anonymous-prompt-response"
          type="text"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Your honest, anonymous answer..."
          className="border border-brand-80 rounded px-3 py-2 w-full sm:w-[32rem] focus:outline-none focus:ring-2 focus:ring-brand-60"
          required
        />
        <button
          type="submit"
          className="bg-brand hover:bg-brand-25 text-white px-4 py-2 rounded transition-colors"
        >
          Submit
        </button>
      </div>
      <div className="mt-1 text-xs italic text-muted-foreground">
        Most probably you’ve met me, coz this blog website is not famous, lol. But even if not, based on my writings or whatever you know about me.
      </div>
      {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
    </form>
  );
};

export default AnonymousPromptForm;
