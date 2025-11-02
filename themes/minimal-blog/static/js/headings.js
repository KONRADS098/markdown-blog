// Make headings with IDs clickable to copy anchor links
document.addEventListener("DOMContentLoaded", function () {
  const headings = document.querySelectorAll("h1[id], h2[id], h3[id]");

  headings.forEach((heading) => {
    heading.addEventListener("click", function () {
      const id = this.getAttribute("id");
      // Remove trailing slash if present before adding anchor
      const pathname = window.location.pathname.replace(/\/$/, "");
      const url = window.location.origin + pathname + "#" + id;

      // Update browser URL without scrolling
      history.pushState(null, null, "#" + id);

      // Copy to clipboard
      navigator.clipboard
        .writeText(url)
        .then(() => {
          // Optional: Could add visual feedback here
          console.log("Link copied to clipboard:", url);
        })
        .catch((err) => {
          console.error("Failed to copy link:", err);
        });
    });
  });
});
