import type { Protection } from "@/types/blog";

export const privateBlogProtection: Protection = {
  type: "password",
  values: ["Divij@123"],
  label: "Enter the password to read",
  placeholder: "Password",
  message: "This is a private blog.",
  errorMessage: "That's not it. Try again.",
};
