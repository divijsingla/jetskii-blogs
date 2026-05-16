import React from "react";
import { assetUrl } from "@/lib/assets";
import type { RestrictedImage } from "@/types/blog";

interface BlogImageGalleryProps {
  extraImages?: string[];
  imageCaptions?: Record<string, string>;
  restrictedImages?: RestrictedImage[];
  unlockedCredential?: string | null;
}

const BlogImageGallery: React.FC<BlogImageGalleryProps> = ({
  extraImages,
  imageCaptions,
  restrictedImages,
  unlockedCredential,
}) => {
  if (!extraImages || extraImages.length === 0) return null;

  const enteredName = unlockedCredential?.trim().toLowerCase() ?? "";

  return (
    <section className="mt-12 border-t border-border pt-8">
      {/* First image full width with caption */}
      <div className="w-full flex flex-col items-center mb-6">
        <img
          src={assetUrl(extraImages[0])}
          alt="Attached 1"
          className="rounded-lg shadow border border-brand w-full max-w-3xl max-h-96 object-cover"
        />
        {imageCaptions?.[extraImages[0]] && (
          <p className="text-center text-brand italic mt-2 font-medium">
            {imageCaptions[extraImages[0]]}
          </p>
        )}
      </div>

      {/* Middle images in pairs with captions */}
      <div className="flex flex-wrap gap-6 justify-center">
        {extraImages.slice(1, extraImages.length - 1).map((img, idx) => (
          <div key={idx + 1} className="flex flex-col items-center mb-4">
            <img
              src={assetUrl(img)}
              alt={`Attached ${idx + 2}`}
              className="rounded-lg shadow border border-brand max-w-xs max-h-80 object-cover"
            />
            {imageCaptions?.[img] && (
              <p className="text-center text-brand italic mt-2 font-medium max-w-xs">
                {imageCaptions[img]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Last image full width, only if more than one image */}
      {extraImages.length > 1 && (
        <div className="w-full flex justify-center mt-6">
          <img
            src={assetUrl(extraImages[extraImages.length - 1])}
            alt={`Attached ${extraImages.length}`}
            className="rounded-lg shadow border border-brand w-full max-w-3xl max-h-96 object-cover"
          />
        </div>
      )}

      {/* Restricted images, only for allowed names */}
      {restrictedImages && restrictedImages.length > 0 && (
        <div className="w-full flex justify-center mt-6 overflow-auto">
          {restrictedImages.map((imgObj, idx) => {
            if (
              enteredName &&
              imgObj.allowedNames.some((n) => n.toLowerCase() === enteredName)
            ) {
              return (
                <img
                  key={idx}
                  src={assetUrl(imgObj.src)}
                  alt={`Restricted ${idx + 1}`}
                  className="rounded-lg shadow border border-brand h-auto w-auto max-w-full"
                  style={{ display: 'block', margin: '0 auto' }}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </section>
  );
};

export default BlogImageGallery;
