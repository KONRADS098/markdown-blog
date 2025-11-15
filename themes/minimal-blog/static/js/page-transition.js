// E-ink Page Transition Effect
(function () {
  let transitionOverlay = null;

  function createTransitionOverlay() {
    transitionOverlay = document.createElement("div");
    transitionOverlay.className = "page-transition";
    document.body.appendChild(transitionOverlay);
  }

  function triggerPageTransition() {
    if (transitionOverlay) {
      transitionOverlay.classList.add("flash");
      setTimeout(() => {
        transitionOverlay.classList.remove("flash");
      }, 400);
    }
  }

  // Intercept link clicks for transition effect
  function handleLinkClick(e) {
    const link = e.target.closest("a");
    if (!link) return;

    // Only apply to internal navigation
    const href = link.getAttribute("href");
    if (
      !href ||
      href.startsWith("#") ||
      href.startsWith("http") ||
      link.target === "_blank"
    ) {
      return;
    }

    e.preventDefault();
    triggerPageTransition();

    setTimeout(() => {
      window.location.href = href;
    }, 200);
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", function () {
    createTransitionOverlay();

    // Apply to navigation links
    document.addEventListener("click", handleLinkClick);

    // Trigger on page load (back/forward)
    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        triggerPageTransition();
      }
    });
  });
})();
