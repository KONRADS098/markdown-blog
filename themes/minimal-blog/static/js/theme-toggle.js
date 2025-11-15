// E-reader Theme Toggle
(function () {
  const STORAGE_KEY = "reader-theme";
  const themes = ["light", "sepia", "dark"];

  // Get saved theme or default to light
  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || "light";
  }

  // Apply theme to document
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  // Cycle to next theme
  function cycleTheme() {
    const currentTheme = getSavedTheme();
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    applyTheme(nextTheme);
  }

  // Apply saved theme on load
  applyTheme(getSavedTheme());

  // Add theme toggle button on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    const themeButton = document.querySelector(".theme-toggle");
    if (themeButton) {
      themeButton.addEventListener("click", cycleTheme);
    }
  });
})();
