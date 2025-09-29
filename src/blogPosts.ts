// Removed BlogPost interface for JS compatibility
import intro from './blogs/01_test-blog.md?raw';
import rocket from './blogs/02_test-blog-2.md?raw';
import schedule from './blogs/02_test-blog-3.md?raw';
import paperchase from './blogs/04_paper-chase.md?raw';

export const blogPosts = [
  {
    slug: "paper-chase",
    title: "Paper chase",
    excerpt: "",
    content: paperchase,
    date: "15 September 2025",
    readTime: "10 min read",
    tags: ["eternal green", "money"],
    category: "tech",
    image: "cars.jpeg"
  },
  {
    slug: "massless-rockets",
    title: "Massless rockets can't go to space",
    excerpt: "",
    content: rocket,
    date: "15 September 2025",
    readTime: "10 min read",
    tags: ["overthinking", "thought experiment"],
    category: "misc",
    image: "cars.jpeg"
  },
  {
    slug: "my-schedule",
    title: "My Schedule",
    excerpt: "",
    content: schedule,
    date: "28 August 2025",
    readTime: "10 min read",
    tags: ["timetable", "tabletime"],
    category: "misc",
    image: "guitar.jpeg"
  },
  {
    slug: "intro",
    title: "Randomness",
    excerpt: "",
    content: intro,
    date: "29 July 2025",
    readTime: "8 min read",
    tags: ["intro", "hello world"],
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