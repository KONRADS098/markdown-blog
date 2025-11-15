// Hide header on scroll
(function () {
  const nav = document.querySelector(".reader-nav");
  let lastScrollY = window.scrollY;
  let ticking = false;

  function hideHeader() {
    if (window.scrollY > 50) {
      nav.classList.add("hidden");
    } else {
      nav.classList.remove("hidden");
    }
  }

  function onScroll() {
    lastScrollY = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        hideHeader();
        ticking = false;
      });
      ticking = true;
    }
  }

  if (nav) {
    window.addEventListener("scroll", onScroll, { passive: true });
  }
})();
