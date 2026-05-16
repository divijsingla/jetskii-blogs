import { useState } from "react";
import { STATICMAN_ENDPOINT } from "@/config/staticman";

export type StaticmanStatus = "idle" | "loading" | "submitted" | "error";

interface SubmitArgs {
  slug: string;
  name: string;
  message: string;
  email?: string;
}

export function useStaticmanSubmit() {
  const [status, setStatus] = useState<StaticmanStatus>("idle");
  const [error, setError] = useState("");

  async function submit(args: SubmitArgs) {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch(STATICMAN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            name: args.name,
            email: args.email ?? "",
            message: args.message,
          },
          options: { slug: args.slug },
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("submitted");
    } catch {
      setStatus("error");
      setError("Failed to submit. Please try again later.");
    }
  }

  return {
    status,
    error,
    submit,
    reset: () => {
      setStatus("idle");
      setError("");
    },
  };
}
