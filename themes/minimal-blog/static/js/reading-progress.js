// Reading Progress Indicator
(function () {
  let progressBar = null;
  let progressContainer = null;

  function createProgressBar() {
    progressContainer = document.createElement("div");
    progressContainer.className = "reading-progress";

    progressBar = document.createElement("div");
    progressBar.className = "reading-progress-bar";

    progressContainer.appendChild(progressBar);
    document.body.insertBefore(progressContainer, document.body.firstChild);
  }

  function updateProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    const scrollableHeight = documentHeight - windowHeight;
    const progress = (scrollTop / scrollableHeight) * 100;

    if (progressBar) {
      progressBar.style.width = Math.min(progress, 100) + "%";
    }

    // Show/hide based on scroll position
    if (progressContainer) {
      if (scrollTop > 100) {
        progressContainer.classList.add("visible");
      } else {
        progressContainer.classList.remove("visible");
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    // Only show on article pages
    const isArticle = document.querySelector("article") !== null;
    if (isArticle) {
      createProgressBar();
      updateProgress();

      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress, { passive: true });
    }
  });
})();
