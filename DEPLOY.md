# Deployment Guide for GitHub Pages

This minimalist blog is built with React, TypeScript, and Vite, designed for easy deployment to GitHub Pages.

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```
   Open http://localhost:8080

3. **Build**
   ```bash
   npm run build
   ```

## GitHub Pages Deployment

### Option 1: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

2. In your repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages
   - Folder: / (root)

### Option 2: Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to GitHub Pages using gh-pages:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

## Customization

### Adding New Blog Posts

Edit `src/data/blogPosts.ts` and add new posts to the array:

```typescript
{
  slug: "your-post-slug",
  title: "Your Post Title",
  excerpt: "A brief description...",
  content: `Your markdown content here...`,
  date: "2024-01-15",
  readTime: "5 min read",
  tags: ["tag1", "tag2"],
  category: "tech" // math, music, tech, misc
}
```

### Updating Personal Information

- **Footer links**: Edit `src/components/Footer.tsx`
- **Site title**: Edit `index.html` and `src/components/Navbar.tsx`
- **About text**: Edit the hero section in `src/pages/Index.tsx`

### Design Customization

- **Colors**: Edit `src/index.css` (CSS variables in `:root`)
- **Fonts**: Update the font-family in `src/index.css`
- **Layout**: Modify components in `src/components/`

### Categories

The blog supports four categories:
- **Math**: Mathematical topics, algorithms, theory
- **Music**: Music theory, composition, analysis
- **Tech**: Programming, tools, software development
- **Misc**: Everything else

## File Structure

```
src/
├── components/
│   ├── BlogCard.tsx       # Individual blog post cards
│   ├── BlogLayout.tsx     # Main layout wrapper
│   ├── Footer.tsx         # Site footer
│   └── Navbar.tsx         # Navigation bar
├── data/
│   └── blogPosts.ts       # Blog content and metadata
├── pages/
│   ├── BlogPost.tsx       # Individual post view
│   ├── CategoryPage.tsx   # Category listing
│   ├── Index.tsx          # Homepage
│   └── NotFound.tsx       # 404 page
└── index.css              # Design system and global styles
```

## Features

- 📱 **Responsive**: Works on mobile, tablet, desktop
- 🎨 **Minimalist**: Clean typography and lots of whitespace
- 🏷️ **Tags & Categories**: Organize posts by topic
- ⚡ **Fast**: Static site with optimized build
- 🔍 **SEO Ready**: Proper meta tags and semantic HTML
- ♿ **Accessible**: Semantic markup and keyboard navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Router** for navigation

Perfect for developers, mathematicians, musicians, and anyone who wants a clean, focused blog without the complexity of a CMS.