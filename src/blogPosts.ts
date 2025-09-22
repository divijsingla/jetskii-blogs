// Removed BlogPost interface for JS compatibility
import intro from './blogs/01_test-blog.md?raw';
import rocket from './blogs/02_test-blog-2.md?raw';
import schedule from './blogs/02_test-blog-3.md?raw';

export const blogPosts = [
  {
    slug: "rocket",
    title: "Massless rockets can't go to space (test blog)",
    excerpt: "",
    content: rocket,
    date: "15 September 2025",
    readTime: "10 min read",
    tags: [],
    category: "misc",
    image: "cars.jpeg"
  },
  {
    slug: "schedule",
    title: "My Schedule (test blog)",
    excerpt: "",
    content: schedule,
    date: "28 August 2025",
    readTime: "10 min read",
    tags: [],
    category: "misc",
    image: "guitar.jpeg"
  },
  {
    slug: "intro",
    title: "Randomness (test blog)",
    excerpt: "",
    content: intro,
    date: "29 July 2025",
    readTime: "8 min read",
    tags: [],
    category: "misc",
    image: "mystery.jpeg"
  },
];

export const getPostsByCategory = (category) => {
  if (category === "all") return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug) => {
  return blogPosts.find(post => post.slug === slug);
};