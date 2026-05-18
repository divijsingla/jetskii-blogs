import { useState } from "react";
import { STATICMAN_ENDPOINT } from "@/config/staticman";

export type StaticmanStatus = "idle" | "loading" | "submitted" | "error";

interface SubmitArgs {
  slug: string;
  name?: string;
  message?: string;
  email?: string;
  fields?: Record<string, string>;
}

export function useStaticmanSubmit() {
  const [status, setStatus] = useState<StaticmanStatus>("idle");
  const [error, setError] = useState("");

  async function submit(args: SubmitArgs, endpoint: string = STATICMAN_ENDPOINT) {
    setStatus("loading");
    setError("");
    try {
      const fields = args.fields ?? {
        name: args.name ?? "",
        email: args.email ?? "",
        message: args.message ?? "",
      };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields,
          options: { slug: args.slug },
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setStatus("submitted");
      return true;
    } catch {
      setStatus("error");
      setError("Failed to submit. Please try again later.");
      return false;
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
