// Removed BlogPost interface for JS compatibility
import fourierContent from './blogs/01_the-genesis-block.md?raw';

export const blogPosts = [
  {
    slug: "the-genesis-block",
    title: "Blockchains, not Cryptocurrencies",
    excerpt: "",
    content: fourierContent,
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["mathematics", "blockchain", "cryptography"],
    category: "tech"
  }
];

export const getPostsByCategory = (category) => {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};