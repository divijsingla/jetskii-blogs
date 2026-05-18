import { useState } from "react";
import { useParams } from "react-router-dom";
import { getPostBySlug } from "@/blogPosts";
import { getProtection } from "@/lib/protection";
import SuperPage from "@/components/SuperPage";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import AnonymousPromptForm from "@/components/blog/AnonymousPromptForm";
import BlogImageGallery from "@/components/blog/BlogImageGallery";
import BlogPostNotFound from "@/components/blog/BlogPostNotFound";
import BlogSubscribeFooter from "@/components/blog/BlogSubscribeFooter";
import ProtectionGate from "@/components/blog/ProtectionGate";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const [unlockedCredential, setUnlockedCredential] = useState<string | null>(null);

  if (!post) return <BlogPostNotFound />;

  const protection = getProtection(post);
  if (protection && unlockedCredential === null) {
    return <ProtectionGate protection={protection} onUnlock={setUnlockedCredential} />;
  }

  return (
    <SuperPage
      title={post.title}
      date={post.date}
      readTime={post.readTime}
      tags={post.tags}
      content={post.content}
      image={post.image}
    >
      {post.anonymousPrompt && (
        <div className="mt-10">
          <hr className="border-t border-brand-80 mb-8" />
          <AnonymousPromptForm slug={post.slug} promptTitle={post.anonymousPrompt.title} />
        </div>
      )}

      <BlogImageGallery
        extraImages={post.extraImages}
        imageCaptions={post.imageCaptions}
        restrictedImages={post.restrictedImages}
        unlockedCredential={unlockedCredential}
      />

      <BlogSubscribeFooter />

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-xl font-semibold mb-4 text-brand">Want to say something?</h2>
        <CommentForm slug={slug ?? ""} />
        <div className="mt-10">
          <CommentList slug={slug ?? ""} />
        </div>
      </section>
    </SuperPage>
  );
};

export default BlogPost;
