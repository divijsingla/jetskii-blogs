import type { BlogPost, Protection } from "@/types/blog";

export function getProtection(post: BlogPost | undefined): Protection | null {
  if (!post?.protected || !post.protection) return null;
  return post.protection;
}

export function matchesProtection(credential: string, protection: Protection): boolean {
  const entered = credential.trim().toLowerCase();
  return protection.values.some((v) => String(v).toLowerCase() === entered);
}
