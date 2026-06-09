(function () {
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored) root.setAttribute('data-theme', stored);

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    document.querySelectorAll('.theme-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === t);
    });
  }

  window.toggleTheme = function (t) { setTheme(t); };

  document.addEventListener('DOMContentLoaded', function () {
    const current = root.getAttribute('data-theme') || 'light';
    document.querySelectorAll('.theme-toggle button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.theme === current);
    });
  });
})();
