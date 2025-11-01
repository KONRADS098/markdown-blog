# Blazingly Fast Markdown Blog

A lightning-fast, minimalist blogging platform that prioritizes speed and simplicity. Built with Hugo, one of the fastest static site generators available, this blog delivers sub-second page loads while maintaining a content-first approach.

## Features

- ⚡️ Blazingly fast page loads (< 0.5s)
- 📝 Write blog posts in Markdown
- 🚀 Zero JavaScript by default
- 📱 Instant mobile performance
- 🔍 SEO optimized
- 💨 Perfect Lighthouse scores
- 🛠 No build dependencies (single binary)
- 📊 Zero database overhead - content stored in markdown files

## Tech Stack

- **Static Site Generator**: [Hugo](https://gohugo.io/) (written in Go, known as the world's fastest framework for building websites)
- **Frontend**: 
  - Pure HTML and CSS for zero JavaScript overhead
  - Optional vanilla JavaScript for enhanced features
  - Modern CSS features (CSS Grid, Flexbox) for responsive layouts
- **Performance Optimizations**:
  - Automatic image optimization
  - Minified HTML, CSS
  - Instant page loads with prefetching
  - Efficient asset caching

## Project Structure

```
markdown-blog/
├── content/        # Markdown blog posts
├── layouts/        # Hugo templates
├── static/         # Static assets (images, CSS)
├── config.toml     # Hugo configuration
└── public/         # Generated static site
```

## Performance Metrics

- 🏃‍♂️ Build speed: < 1ms per page
- 🚀 Page load time: < 0.5s
- 💯 Perfect Lighthouse scores:
  - Performance: 100
  - Accessibility: 100
  - Best Practices: 100
  - SEO: 100

## Getting Started

1. Install Hugo (single binary, no dependencies)
2. Clone this repository
3. Write posts in `content/posts/`
4. Run `hugo server` for local development
5. Deploy anywhere (Netlify, Vercel, GitHub Pages)

## Writing Posts

Create new posts easily:

```markdown
---
title: My First Post
date: 2025-02-01
description: A brief description
tags: [blog, tech]
---

Write your content here in markdown...
```

## Configuration

The theme is highly customizable through the `config.toml` file. Here are all the available options:

```toml
# Site configuration
baseURL = "/"
title = "Your Name"
languageCode = "en"
theme = "minimal-blog"

[params]
  # Theme colors
  backgroundColor = "#f7f3f0"  # Background color of the site
  textColor = "#2d3436"       # Main text color
  secondaryColor = "#666666"  # Secondary text color (used for dates)
  
  # Typography
  headerFont = "'Space Grotesk', system-ui, sans-serif"  # Font for headers
  bodyFont = "'Fraunces', Georgia, serif"               # Font for body text
  
  # Layout
  maxWidth = "650px"        # Maximum width of the content
  contentPadding = "2rem"   # Padding on the sides
  
  # Date format (uses Go's date formatting)
  dateFormat = "January 2, 2006"  # Format for displaying dates
```

## Adding Content

1. Create a new post:
   ```bash
   hugo new posts/my-post.md
   ```

2. Edit the post's front matter:
   ```yaml
   +++
   title = "My Post Title"
   date = "2025-02-01T17:12:23+01:00"
   description = "A brief description of my post"
   draft = false
   +++
   ```

3. Write your content in Markdown below the front matter.

## Why This Stack?

- **Hugo**: Written in Go, it's the fastest static site generator available, building thousands of pages in milliseconds
- **No JavaScript**: By avoiding JavaScript frameworks, we ensure instant page loads
- **Markdown**: Focus on content, not formatting
- **Static Files**: No server-side processing = fastest possible delivery

## SEO & Accessibility Features

This blog is optimized for search engines and accessibility:

### SEO Optimizations
- ✅ Semantic HTML5 elements (`<article>`, `<nav>`, `<header>`, `<main>`)
- ✅ Meta descriptions and Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Canonical URLs to prevent duplicate content
- ✅ Structured data (JSON-LD) for rich snippets
- ✅ Sitemap.xml and robots.txt
- ✅ Clean, descriptive URLs

### Accessibility Features
- ✅ Proper ARIA labels and landmarks
- ✅ Skip-to-content link for keyboard navigation
- ✅ Semantic heading hierarchy (h1 → h2 → h3)
- ✅ High contrast ratios for text readability
- ✅ Focus indicators for keyboard users
- ✅ Alt text support for images
- ✅ `<time>` elements with machine-readable dates

## Deployment

### Build for Production
```bash
hugo --minify
```

The generated site will be in the `public/` directory.

### Deploy Options
- **Netlify**: Connect your GitHub repo for automatic deploys
- **Vercel**: Zero-config deployment from Git
- **GitHub Pages**: Free hosting with custom domains
- **Cloudflare Pages**: Fast global CDN
- **Any static host**: Just upload the `public/` folder

## Performance Tips

1. **Images**: Place images in `static/images/` and reference with `/images/filename.jpg`
2. **Minification**: Use `hugo --minify` for production builds
3. **Caching**: Configure proper cache headers on your hosting provider
4. **CDN**: Use a CDN for global distribution

## License

MIT License
