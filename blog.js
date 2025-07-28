#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BLOGS_DIR = path.join(__dirname, 'src', 'data', 'blogs');
const BLOGPOSTS_FILE = path.join(__dirname, 'src', 'data', 'blogPosts.ts');

function padNumber(num) {
  return num.toString().padStart(2, '0');
}

function getNextBlogNumber() {
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.match(/^\d+_.+\.md$/));
  if (files.length === 0) return 1;
  const numbers = files.map(f => parseInt(f.split('_')[0], 10));
  return Math.max(...numbers) + 1;
}

function createBoilerplate(slug) {
  return `---\ntitle: ""
excerpt: ""
tags: []
category: ""
---\n\n# ${slug}\n\nWrite your blog here...\n`;
}

function init() {
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
    console.log('Created blogs directory.');
  } else {
    console.log('Blogs directory already exists.');
  }
}

function newBlog(slug) {
  if (!fs.existsSync(BLOGS_DIR)) init();
  const num = getNextBlogNumber();
  const filename = `${padNumber(num)}_${slug}.md`;
  const filepath = path.join(BLOGS_DIR, filename);
  if (fs.existsSync(filepath)) {
    console.error('Blog file already exists:', filename);
    process.exit(1);
  }
  fs.writeFileSync(filepath, createBoilerplate(slug));
  console.log('Created new blog:', filename);
}

function ask(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, ans => { rl.close(); resolve(ans); }));
}

function getReadTime(content) {
  const words = content.split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function postBlog(slug) {
  const files = fs.readdirSync(BLOGS_DIR).filter(f => f.endsWith(`_${slug}.md`));
  if (files.length === 0) {
    console.error('No blog file found for slug:', slug);
    process.exit(1);
  }
  const filename = files[0];
  const filepath = path.join(BLOGS_DIR, filename);
  let content = fs.readFileSync(filepath, 'utf-8');
  let meta = { title: '', excerpt: '', tags: [], category: '' };
  // Extract YAML frontmatter
  const match = content.match(/^---([\s\S]*?)---/);
  if (match) {
    const lines = match[1].split('\n');
    for (let line of lines) {
      if (line.startsWith('title:')) meta.title = line.replace('title:', '').trim().replace(/^"|"$/g, '');
      if (line.startsWith('excerpt:')) meta.excerpt = line.replace('excerpt:', '').trim().replace(/^"|"$/g, '');
      if (line.startsWith('tags:')) meta.tags = JSON.parse(line.replace('tags:', '').trim().replace(/'/g, '"') || '[]');
      if (line.startsWith('category:')) meta.category = line.replace('category:', '').trim().replace(/^"|"$/g, '');
    }
  }
  // Prompt for missing fields
  if (!meta.title) meta.title = await ask('Title: ');
  if (!meta.excerpt) meta.excerpt = await ask('Excerpt: ');
  if (!meta.tags.length) meta.tags = (await ask('Tags (comma separated): ')).split(',').map(t => t.trim()).filter(Boolean);
  if (!meta.category) meta.category = await ask('Category: ');
  // Update frontmatter
  const newFrontmatter = `---\ntitle: "${meta.title}"
excerpt: "${meta.excerpt}"
tags: ${JSON.stringify(meta.tags)}
category: "${meta.category}"
---`;
  content = content.replace(/^---([\s\S]*?)---/, newFrontmatter);
  fs.writeFileSync(filepath, content);
  // Calculate date and read time
  const date = new Date().toISOString().slice(0, 10);
  const readTime = getReadTime(content) + ' min read';
  // Update blogPosts.ts
  let blogPostsContent = fs.readFileSync(BLOGPOSTS_FILE, 'utf-8');
  const importLine = `import ${slug}Content from './blogs/${filename}?raw';`;
  if (!blogPostsContent.includes(importLine)) {
    blogPostsContent = importLine + '\n' + blogPostsContent;
  }
  // Add to blogPosts array
  const postObj = `  {\n    slug: "${slug}",\n    title: "${meta.title}",\n    excerpt: "${meta.excerpt}",\n    content: ${slug}Content,\n    date: "${date}",\n    readTime: "${readTime}",\n    tags: ${JSON.stringify(meta.tags)},\n    category: "${meta.category}"\n  },\n`;
  blogPostsContent = blogPostsContent.replace(/(export const blogPosts = \[\n)/, `$1${postObj}`);
  fs.writeFileSync(BLOGPOSTS_FILE, blogPostsContent);
  console.log('Posted blog and updated blogPosts.ts');
}

async function main() {
  const [,, cmd, arg] = process.argv;
  if (cmd === 'init') {
    init();
  } else if (cmd === 'new' && arg) {
    newBlog(arg);
  } else if (cmd === 'post' && arg) {
    await postBlog(arg);
  } else {
    console.log('Usage: blog <init|new <slug>|post <slug>>');
  }
}

main();
