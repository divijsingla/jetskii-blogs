import type { CategoryId } from "@/data/categories";

export type ProtectionType = "password" | "names";

export interface Protection {
  type: ProtectionType;
  values: string[];
  label: string;
  placeholder?: string;
  message?: string;
  errorMessage?: string;
}

export interface RestrictedImage {
  src: string;
  allowedNames: string[];
}

export interface AnonymousPrompt {
  title: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  category: CategoryId;
  image: string;
  protected?: boolean;
  protection?: Protection;
  anonymousPrompt?: AnonymousPrompt;
  extraImages?: string[];
  imageCaptions?: Record<string, string>;
  restrictedImages?: RestrictedImage[];
}
