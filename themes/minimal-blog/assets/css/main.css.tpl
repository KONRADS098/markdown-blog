/* Base styles */
:root {
  --max-width: {{ site.Params.maxWidth | default "650px" }};
  --text-color: {{ site.Params.textColor | default "#2d3436" }};
  --background-color: {{ site.Params.backgroundColor | default "#f7f3f0" }};
  --secondary-color: {{ site.Params.secondaryColor | default "#666" }};
  --header-font: {{ site.Params.headerFont | default "'Space Grotesk', system-ui, sans-serif" }};
  --body-font: {{ site.Params.bodyFont | default "'Fraunces', Georgia, serif" }};
  --content-padding: {{ site.Params.contentPadding | default "2rem" }};
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  color: var(--text-color);
  font-family: var(--body-font);
  line-height: 1.6;
  background-color: var(--background-color);
  padding: 0 var(--content-padding);
}

header, main {
  max-width: var(--max-width);
  margin: 0 auto;
}

/* Typography */
.name-link {
  text-decoration: none;
}

.name-link:hover {
  opacity: 0.8;
}

.name {
  font-family: var(--header-font);
  font-size: 2rem;
  font-weight: 500;
}

h1, h2, h3, .post-title {
  font-family: var(--header-font);
  font-weight: 500;
}

h1, .post-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

p {
  margin-bottom: 0.75rem;
}

/* Links */
a {
  color: var(--text-color);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: all 0.2s ease;
}

a:hover {
  text-decoration-thickness: 2px;
  opacity: 0.8;
}

/* Blog posts */
.post-item {
  margin-bottom: 0.5rem;
}

.post-date {
  font-family: var(--header-font);
  color: var(--secondary-color);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

/* Lists */
ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.25rem;
}

/* Responsive */
@media (max-width: 700px) {
  :root {
    --content-padding: 1rem;
  }

  body {
    font-size: 16px;
  }
  
  .name {
    font-size: 2rem;
  }
  
  h1, .post-title {
    font-size: 1.5rem;
  }
}
