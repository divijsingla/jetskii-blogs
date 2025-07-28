// Removed BlogPost interface for JS compatibility
import fourierContent from './blogs/01_fourier-transforms-intuition.md?raw';

export const blogPosts = [
  {
    slug: "fourier-transforms-intuition",
    title: "Building Intuition for Fourier Transforms",
    excerpt: "Exploring the mathematical beauty behind one of the most powerful tools in signal processing, from first principles to practical applications.",
    content: fourierContent,
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["mathematics", "signal-processing", "fourier"],
    category: "math"
  }
];

export const getPostsByCategory = (category) => {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};