// Removed BlogPost interface for JS compatibility
import intro from './blogs/01_test-blog.md?raw';
import rocket from './blogs/02_test-blog-2.md?raw';
import schedule from './blogs/02_test-blog-3.md?raw';
import paperchase from './blogs/04_paper-chase.md?raw';
import basis from './blogs/05_basis.md?raw';
import asileave from './blogs/04_as-i-leave.md?raw';
import musings1 from './blogs/06_musings-1.md?raw';

export const blogPosts = [
  {
    slug: "musings-1",
    title: "Wanna fall wide awake",
    excerpt: "",
    content: musings1,
    date: "",
    readTime: "10 min read",
    tags: ["no need to rhyme", "im not free"],
    category: "musings",
    image: "wanna_fall_wide_awake.jpeg"
  },
  {
    slug: "basis-of-effortlessness",
    title: "Effortlessness",
    excerpt: "",
    content: basis,
    date: "18 October 2025",
    readTime: "10 min read",
    tags: ["conflicts", "choices"],
    category: "misc",
    image: "scenery.jpeg"
  },
  {
    slug: "a-special-one",
    title: "A special one, for the special ones",
    excerpt: "",
    content: asileave,
    date: "8 October 2025",
    readTime: "10 min read",
    tags: ["goodbye", "emo"],
    category: "misc",
    image: "heart.jpeg",
    protected: true,
    allowedNames: ["Rohan", "Vinayak", "Aditi", "Daksh", "Hitesh", "Gautam", "Ujjawal"],
    extraImages: [
      "memories_blr/02_wp.jpeg",
      "memories_blr/03_wp.jpeg",
      "memories_blr/07_wp.jpeg",
      "memories_blr/04_wp.jpeg",
      "memories_blr/01_wp.jpeg",
      "memories_blr/05_wp.jpeg"
    ],
    imageCaptions: {
      "memories_blr/02_wp.jpeg": "Last Sunday, despite Daksh having a fever and Hitesh just returning exhausted from a Mysore trip, they still made time to come see me before I leave",
      "memories_blr/03_wp.jpeg": "Despite me ditching Gautam a day before, he still came to meet me even though he had to leave for a trip the next day",
    },
    restrictedImages: [
      {
        src: "memories_blr/06_wp.jpeg",
        allowedNames: ["Rohan", "Vinayak", "Aditi", "Daksh", "Hitesh", "Gautam", "Ujjawal"]
      }
    ]
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
    image: "car_and_bus_2.jpeg",
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
    image: "el_metador.jpeg"
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