# Deployment Guide

This document explains how to deploy your Hugo blog to GitHub Pages.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Automatic Deployment (Recommended)](#automatic-deployment-recommended)
- [Manual Deployment](#manual-deployment)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Performance](#performance)

## Overview

Your blog uses **GitHub Actions** for automatic deployment to GitHub Pages. Every time you push to the `main` branch, the site is automatically built and deployed.

### Deployment Flow

```
Local Changes
    ↓
git add .
git commit -m "Your message"
git push origin main
    ↓
GitHub Actions Triggered
    ↓
Hugo Build (~3-5s)
    ↓
Deploy to GitHub Pages
    ↓
Live at https://konradsokolowski.com 🚀
```

## Prerequisites

### 1. GitHub Pages Setup

Ensure GitHub Pages is enabled for your repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Source**: GitHub Actions
   - This should already be configured

### 2. Custom Domain (Optional)

Your blog is configured for `konradsokolowski.com`:

1. Add a `CNAME` file in `/static/` with your domain (already done)
2. Configure DNS records with your domain provider:
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   Value: 185.199.109.153
   Value: 185.199.110.153
   Value: 185.199.111.153
   
   Type: CNAME
   Name: www
   Value: KONRADS098.github.io
   ```
3. Enable HTTPS in GitHub Pages settings

## Automatic Deployment (Recommended)

### How It Works

The workflow is defined in `.github/workflows/hugo.yml` and runs automatically on every push to `main`.

### Deployment Steps

#### 1. Make Changes Locally

```bash
# Edit your content
cd /path/to/markdown-blog

# Create a new blog post
hugo new thoughts/my-new-post.md

# Edit the post
code content/thoughts/my-new-post.md

# Preview locally
hugo server -D
# Visit http://localhost:1313
```

#### 2. Commit and Push

```bash
# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Add new blog post: My New Post"

# Push to main branch
git push origin main
```

#### 3. Monitor Deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. Watch the "Deploy Hugo site to Pages" workflow run
4. Build typically completes in 3-10 seconds
5. Your site will be live shortly after

### What Happens During Deployment

```yaml
1. Checkout code ✓
2. Setup Hugo 0.142.0 Extended ✓
3. Restore build cache (makes builds faster) ✓
4. Configure GitHub Pages ✓
5. Build with: hugo --minify --gc ✓
6. Save cache for next build ✓
7. Upload build artifacts ✓
8. Deploy to GitHub Pages ✓
```

### Build Performance

| Build Type | Duration | Notes |
|------------|----------|-------|
| First build | ~10s | No cache available |
| Subsequent builds | ~3-5s | Cache restored |
| Failed build | ~5s | Fast feedback |

## Manual Deployment

If you need to deploy manually (not recommended for regular use):

### Option 1: Trigger Workflow Manually

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Select "Deploy Hugo site to Pages"
4. Click **Run workflow**
5. Choose the `main` branch
6. Click **Run workflow**

### Option 2: Build and Deploy Locally

```bash
# Build the site
hugo --minify --gc

# The site is now in ./public/
# You can upload this directory to any static hosting service

# For GitHub Pages manual deployment:
# (Not recommended - use Actions instead)
git subtree push --prefix public origin gh-pages
```

## Configuration

### Build Configuration (`hugo.toml`)

```toml
baseURL = "https://konradsokolowski.com/"
languageCode = "en"
title = "Konrad Sokołowski"
theme = "minimal-blog"

# Performance optimizations
disableKinds = ["taxonomy", "term", "RSS"]
enableGitInfo = false
enableEmoji = false
disableHugoGeneratorInject = true
```

### Workflow Configuration (`.github/workflows/hugo.yml`)

Key settings:

```yaml
env:
  HUGO_VERSION: 0.142.0  # Match your local version

# Build command
hugo --minify --gc --baseURL "${{ steps.pages.outputs.base_url }}/"
```

### Important Files for Deployment

| File | Purpose |
|------|---------|
| `hugo.toml` | Site configuration |
| `.github/workflows/hugo.yml` | Deployment workflow |
| `static/CNAME` | Custom domain configuration |
| `static/robots.txt` | SEO configuration |

## Troubleshooting

### Build Fails

#### Error: "Hugo version mismatch"

**Solution**: Update Hugo version in `.github/workflows/hugo.yml`:

```yaml
env:
  HUGO_VERSION: 0.142.0  # Match your local version
```

#### Error: "Page not found after deployment"

**Solution**: Check baseURL in `hugo.toml`:

```toml
baseURL = "https://konradsokolowski.com/"
```

#### Error: "CSS/JS not loading"

**Solution**: Ensure build uses `--minify`:

```bash
hugo --minify --gc
```

### Deployment Doesn't Trigger

1. **Check workflow file exists**: `.github/workflows/hugo.yml`
2. **Verify you pushed to main**:
   ```bash
   git branch  # Should show * main
   git push origin main
   ```
3. **Check Actions tab** on GitHub for error messages

### Site Not Updating

1. **Clear browser cache**: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
2. **Check deployment status** in Actions tab
3. **Verify CNAME file** exists in `static/CNAME`
4. **Wait a few minutes** - DNS propagation can take time

### Custom Domain Not Working

1. **Verify CNAME file**:
   ```bash
   cat static/CNAME
   # Should output: konradsokolowski.com
   ```

2. **Check DNS records** with your domain provider

3. **Enable HTTPS** in GitHub Pages settings

4. **Wait 24-48 hours** for DNS propagation

## Performance

### Build Optimization

Your workflow includes several optimizations:

1. **Caching**: Hugo cache is saved between builds
2. **Garbage Collection**: `--gc` flag removes unused files
3. **Minification**: `--minify` reduces file sizes
4. **Concurrency**: Prevents duplicate builds

### Monitoring Build Times

Check build duration in GitHub Actions:

1. Go to **Actions** tab
2. Click on a workflow run
3. Expand the "Build with Hugo" step
4. Check execution time

### Typical Build Times

```
First deployment:     ~10 seconds
Subsequent deploys:   ~3-5 seconds
Cache hit rate:       ~95%
```

## Best Practices

### 1. Always Test Locally First

```bash
# Preview changes before pushing
hugo server -D
```

### 2. Use Meaningful Commit Messages

```bash
# Good ✓
git commit -m "Add post about Hugo deployment"
git commit -m "Fix typo in markdown-tips post"
git commit -m "Update site description in config"

# Bad ✗
git commit -m "update"
git commit -m "fix"
git commit -m "changes"
```

### 3. Check Build Status

Always verify the deployment succeeded:
- Green checkmark ✓ in GitHub Actions
- Visit your live site to confirm changes

### 4. Keep Hugo Version Synced

Match the version in workflow with your local version:

```bash
# Check local version
hugo version

# Update .github/workflows/hugo.yml if needed
```

## Quick Reference

### Common Commands

```bash
# Create new post
hugo new thoughts/my-post.md

# Preview locally
hugo server -D

# Build for production
hugo --minify --gc

# Deploy (via git push)
git add .
git commit -m "Your message"
git push origin main
```

### Important URLs

- **Live Site**: https://konradsokolowski.com
- **Repository**: https://github.com/KONRADS098/markdown-blog
- **GitHub Actions**: https://github.com/KONRADS098/markdown-blog/actions
- **GitHub Pages Settings**: https://github.com/KONRADS098/markdown-blog/settings/pages

## Support

### Need Help?

1. **Check GitHub Actions logs** for build errors
2. **Review Hugo documentation**: https://gohugo.io/documentation/
3. **Check workflow examples**: https://github.com/peaceiris/actions-hugo

### Making Changes to Deployment

If you need to modify the deployment process:

1. Edit `.github/workflows/hugo.yml`
2. Test changes by pushing to a feature branch first
3. Monitor the Actions tab for any errors
4. Merge to main once verified

---

**Last Updated**: November 1, 2025  
**Hugo Version**: 0.142.0  
**Deployment**: GitHub Actions → GitHub Pages
