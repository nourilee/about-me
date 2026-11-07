(function () {
  const root = document.documentElement;
  let stored = null;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  // Motion is opt-in by environment: only when the visitor allows it.
  const motionOK = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  if (motionOK) root.classList.add('motion-ok');

  function syncToggle(t) {
    document.querySelectorAll('.theme-toggle button').forEach(function (btn) {
      const on = btn.dataset.theme === t;
      btn.classList.toggle('active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('theme', t); } catch (e) {}
    syncToggle(t);
  }

  window.toggleTheme = function (t) { setTheme(t); };

  document.addEventListener('DOMContentLoaded', function () {
    syncToggle(root.getAttribute('data-theme') || 'light');

    // Accessible mobile menu (pages that opt in with data-nav-toggle)
    const toggle = document.querySelector('[data-nav-toggle]');
    const menu = toggle && document.getElementById(toggle.getAttribute('aria-controls'));
    if (toggle && menu) {
      const setOpen = function (open) {
        menu.classList.toggle('nav-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      };
      toggle.addEventListener('click', function () { setOpen(!menu.classList.contains('nav-open')); });
      menu.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('nav-open')) { setOpen(false); toggle.focus(); }
      });
    }

    // Reveals: headings rise from a mask, lists arrive item by item.
    // Content is visible by default; this only arms when it can complete.
    if (motionOK && 'IntersectionObserver' in window) {
      const targets = document.querySelectorAll('.section, .case, [data-stagger]');
      const seen = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-seen'); seen.unobserve(entry.target); }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
      root.classList.add('reveal-ready');
      targets.forEach(function (el) { seen.observe(el); });
    }

    // Tool strip drifts with the page scroll (visitor-driven, so it never runs on its own).
    const track = document.querySelector('.ticker-track');
    if (track && motionOK) {
      let ticking = false;
      const strip = track.parentElement;
      const move = function () {
        ticking = false;
        const r = strip.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        const half = track.scrollWidth / 2;
        const shift = (window.scrollY * 0.35) % half;
        track.style.transform = 'translate3d(' + (-shift) + 'px,0,0)';
      };
      window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(move); } }, { passive: true });
      move();
    }

    // 404: put the address that failed into the bug report.
    const missing = document.querySelector('[data-missing-path]');
    if (missing) missing.textContent = decodeURIComponent(location.pathname);

    // One authored moment: the "after" bar collapses to its real length when seen.
    const compare = document.querySelector('.compare');
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (compare && !reduce && 'IntersectionObserver' in window) {
      compare.classList.add('is-armed');
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            requestAnimationFrame(function () { compare.classList.add('is-in'); });
            io.disconnect();
          }
        });
      }, { threshold: 0.6 });
      io.observe(compare);
    }
  });
})();
