// Runs in <head> before first paint, so the page never flashes the wrong theme.
// A same-origin file (not inline) keeps the CSP free of 'unsafe-inline'.
// Colours and color-scheme come from CSS ([data-theme]); this only picks the theme.
(function () {
  var stored = null;
  try {
    stored = localStorage.getItem('theme');
  } catch {
    /* Storage blocked: follow the system setting. */
  }
  var theme =
    stored === 'dark' || stored === 'light'
      ? stored
      : window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
  document.documentElement.dataset.theme = theme;
  // Both media-scoped theme-color tags carry the chosen colour, whatever the system says.
  var metas = document.querySelectorAll('meta[name="theme-color"]');
  for (var i = 0; i < metas.length; i++) {
    metas[i].setAttribute('content', theme === 'dark' ? '#141619' : '#f4f4f1');
  }
})();
