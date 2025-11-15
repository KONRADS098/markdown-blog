// Font Size and Line Height Controls
(function () {
  const FONT_SIZE_KEY = "reader-font-scale";
  const LINE_HEIGHT_KEY = "reader-line-height-scale";

  const MIN_FONT_SCALE = 0.85;
  const MAX_FONT_SCALE = 1.3;
  const FONT_STEP = 0.05;

  const MIN_LINE_HEIGHT_SCALE = 0.9;
  const MAX_LINE_HEIGHT_SCALE = 1.2;
  const LINE_HEIGHT_STEP = 0.05;

  // Load saved preferences
  function loadPreferences() {
    const fontScale = parseFloat(localStorage.getItem(FONT_SIZE_KEY) || "1");
    const lineHeightScale = parseFloat(
      localStorage.getItem(LINE_HEIGHT_KEY) || "1"
    );

    document.documentElement.style.setProperty("--font-scale", fontScale);
    document.documentElement.style.setProperty(
      "--line-height-scale",
      lineHeightScale
    );
  }

  // Adjust font size
  function adjustFontSize(increase) {
    const root = document.documentElement;
    const currentScale =
      parseFloat(getComputedStyle(root).getPropertyValue("--font-scale")) || 1;

    let newScale = increase
      ? currentScale + FONT_STEP
      : currentScale - FONT_STEP;
    newScale = Math.max(MIN_FONT_SCALE, Math.min(MAX_FONT_SCALE, newScale));

    root.style.setProperty("--font-scale", newScale);
    localStorage.setItem(FONT_SIZE_KEY, newScale);
  }

  // Initialize
  loadPreferences();

  document.addEventListener("DOMContentLoaded", function () {
    const fontSizeUp = document.querySelector(".font-size-up");
    const fontSizeDown = document.querySelector(".font-size-down");

    if (fontSizeUp) {
      fontSizeUp.addEventListener("click", () => adjustFontSize(true));
    }

    if (fontSizeDown) {
      fontSizeDown.addEventListener("click", () => adjustFontSize(false));
    }
  });
})();
