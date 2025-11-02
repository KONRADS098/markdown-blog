+++
title = "Simple, Fast, Powerful"
date = 2025-11-02
series_order = 1
draft = false
+++

<div class="tldr">
<strong>TLDR:</strong> Hugo gives you everything you need for a blog without the complexity. Static generation means <mark>fast builds</mark> and <mark>zero runtime dependencies</mark>. No database, no server, just markdown and templates.
</div>

# Building with Hugo: Simple, Fast, Powerful

Most blogging platforms are overcomplicated. WordPress needs a database, server-side rendering, and constant updates. Medium locks your content behind their platform. Static site generators solve this, but many add unnecessary complexity.

Hugo gets it right. Write in markdown, define templates, run `hugo`, and you have a site. No build pipeline to configure. No JavaScript framework to learn. No runtime to manage.

## Why Hugo?

**It's actually simple.** One binary, no dependencies. Install Hugo and you're done. Compare this to JavaScript-based generators that need Node, npm, a dozen packages, and configuration files for everything.

**It's genuinely fast.** Hugo builds thousands of pages in seconds. The entire site rebuilds instantly during development. No waiting for webpack, no hot module replacement complexity. Just immediate feedback.

**It has what you need.** Built-in features for blogs without pulling in plugins. Syntax highlighting, RSS feeds, sitemaps, reading time, taxonomies. All included, all optional.

> The minimalist approach means fewer things to break. No npm audit warnings,
> no dependency version conflicts, no security patches for abandoned packages.

## The Architecture

Hugo's model is straightforward. Content goes in markdown files. Templates control how content renders. Assets get processed and copied. Everything outputs to a `public` folder ready to deploy.

**Content structure** maps to URLs automatically. A file at `content/thoughts/post-name.md` becomes `/thoughts/post-name/`. No routing configuration needed. The filesystem is the router.

**Templates** use Go's template language. It's not fancy, but it works. You get variables, conditionals, loops, and partials. That's enough for any blog layout.

**Frontmatter** adds metadata to content. Title, date, custom fields, whatever you need. Hugo makes it available in templates. The system is extensible without configuration complexity.

## What I Built

This blog uses Hugo with a custom theme. The core features took minimal code.

**Series support** groups related posts. Each series has a parent page with cascade frontmatter that automatically applies metadata to all posts in that series. Posts declare a `series_order` and inherit the series name and color. The templates handle navigation and grouping automatically.

```toml
# Series parent _index.md
[cascade]
series = "Context Engineering"
series_color = "#f59e0b"
```

```toml
# Individual post
series_order = 1
# Inherits series name and color from parent
```

**Reading time** uses Hugo's built-in `.ReadingTime` variable. One line in the template, one parameter in config. No custom calculation needed.

**Math rendering** with KaTeX took two additions. A CDN script tag and a passthrough configuration for `$` delimiters. Inline and block equations work everywhere.

**Syntax highlighting** is built in. Hugo processes code blocks at build time. No JavaScript runtime highlighting needed. Fast, reliable, supports every language.

## The Templates

The minimal theme has four main templates. Homepage, list pages, single posts, and series navigation. Each is under 100 lines.

**Single post template** includes the series navigation partial if the post belongs to a series. Reading time shows in the header. Content renders with proper typography. That's it.

**List templates** group posts by series when they exist. Series posts show in numbered order with colored borders. Regular posts display chronologically. Same template handles both homepage and section lists.

**Series navigation** shows which part of a series you're reading. Lists all posts in the series with the current one highlighted. Uses the series color from frontmatter for visual consistency.

The templates use Hugo's filtering and grouping functions. `.Site.RegularPages` gets all posts, `where` filters by criteria, `sort` orders by `series_order`. Declarative, readable, no complex logic needed.

## What You Don't Need

**No JavaScript framework.** The site works without JavaScript. Progressive enhancement adds features like table of contents navigation, but everything functions without it.

**No build tools.** Hugo handles asset processing. CSS gets minified and fingerprinted automatically. No webpack configuration, no build pipeline setup.

**No database.** Content lives in git. Version control is built in. Collaboration uses pull requests. Backup is pushing to a remote. Rollback is `git revert`. Simple, robust, familiar.

**No hosting complexity.** Static files deploy anywhere. GitHub Pages, Netlify, Cloudflare Pages, even S3. No server to configure, no uptime to monitor, no security patches to apply.

## The Result

I have a blog that builds in milliseconds, deploys as static files, and costs nothing to host. Writing happens in markdown with proper version control. The codebase is ~300 lines of templates and CSS.

Hugo gave me everything needed without the complexity tax. No framework churn, no dependency updates, no security patches. Just content and simple templates.

Sometimes simple is enough. Often it's better.
