import { FormEvent, useState } from "react";
import { STATICMAN_SUBSCRIBERS_ENDPOINT } from "@/config/staticman";
import { useStaticmanSubmit } from "@/hooks/useStaticmanSubmit";

type SubscribeStatus = "idle" | "loading" | "success" | "error";

const BlogSubscribeFooter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const { submit } = useStaticmanSubmit();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const ok = await submit(
        {
          slug: "newsletter",
          fields: {
            email: email.trim().toLowerCase(),
            sourceSlug: window.location.pathname,
          },
        },
        STATICMAN_SUBSCRIBERS_ENDPOINT,
      );

      if (!ok) throw new Error("Subscription failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Could not save your email right now.");
    }
  };

  return (
    <section className="mt-10 pt-4 border-t border-border/70">
      <p className="text-xs text-muted-foreground mb-3">
        if you want a ping for new posts, drop your email here.
      </p>
      <form className="flex flex-wrap items-center gap-2" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={email}
          required
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-8 px-2 rounded border border-border bg-background text-sm"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-8 px-3 rounded border border-brand text-brand text-xs font-mono hover:bg-brand hover:text-white transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "saving..." : "notify me"}
        </button>
      </form>
      {status === "success" && (
        <p className="text-xs text-green-700 mt-2">done. you are on the list.</p>
      )}
      {status === "error" && (
        <p className="text-xs text-red-700 mt-2">{errorMessage}</p>
      )}
    </section>
  );
};

export default BlogSubscribeFooter;
