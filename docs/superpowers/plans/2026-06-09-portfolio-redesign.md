# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic Hyperspace HTML5 UP template with a custom-built portfolio that positions Nourilee as Senior QA Automation Engineer + AI-Augmented QA practitioner, with light/dark mode and an updated downloadable resume.

**Architecture:** Single custom `assets/css/main.css` using CSS custom properties for theming — one toggle switches all colors. No build system, no framework, no jQuery. Seven HTML pages sharing the same CSS and a 20-line `assets/js/theme.js`. Resume generated from `resume.html` via headless Chrome.

**Tech Stack:** HTML5, CSS custom properties, vanilla JS, headless Chrome (PDF generation)

**Spec:** `docs/superpowers/specs/2026-06-09-portfolio-redesign-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `assets/css/main.css` | Full rebuild | Design system: tokens, typography, layout, all components |
| `assets/js/theme.js` | Create new | Dark mode toggle + localStorage persistence |
| `index.html` | Full rebuild | Home: nav, hero, stats bar, 3 pillars, contact, footer |
| `automation.html` | Full rebuild | Test automation detail — outcomes without company names |
| `ai-for-qa.html` | Create new | AI for QA — Claude+Appium, Playwright MCP, GitHub CTAs |
| `consulting.html` | Create new | Consulting — services, process, contact CTA |
| `artifacts.html` | Full rebuild | Portfolio demos — clean cards replacing broken iframes |
| `resume.html` | Create new | Print-optimized resume from resume-rewrite.md content |
| `resume.pdf` | Regenerate | Output of headless Chrome printing resume.html |

---

## Task 1: CSS Design System

**Files:**
- Create/overwrite: `assets/css/main.css`

- [ ] **Step 1: Write the full CSS design system**

Create `assets/css/main.css` with this complete content:

```css
/* ===========================
   DESIGN TOKENS
=========================== */
:root {
  --gradient: linear-gradient(90deg, #7c3aed, #2563eb, #0ea5e9);
  --gradient-start: #7c3aed;
  --gradient-mid:   #2563eb;
  --gradient-end:   #0ea5e9;

  --bg:       #f8fafc;
  --surface:  #ffffff;
  --border:   #e5e7eb;
  --text:     #111827;
  --muted:    #6b7280;
  --subtle:   #9ca3af;
  --ai-tint:  #faf5ff;
  --ai-border: rgba(124,58,237,0.2);
}

[data-theme="dark"] {
  --bg:       #0f0c1d;
  --surface:  #13111f;
  --border:   rgba(255,255,255,0.08);
  --text:     #f9fafb;
  --muted:    rgba(255,255,255,0.55);
  --subtle:   rgba(255,255,255,0.3);
  --ai-tint:  rgba(124,58,237,0.12);
  --ai-border: rgba(167,139,250,0.25);
}

/* ===========================
   RESET & BASE
=========================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; }

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  background: var(--bg);
  color: var(--text);
  transition: background 0.2s, color 0.2s;
}

a { color: inherit; text-decoration: none; }
ul { list-style: none; }
img { max-width: 100%; display: block; }

/* ===========================
   GRADIENT TOP BAR
=========================== */
.gradient-bar {
  height: 3px;
  background: var(--gradient);
  position: sticky;
  top: 0;
  z-index: 100;
}

/* ===========================
   NAVIGATION
=========================== */
.nav {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 3px;
  z-index: 99;
  transition: background 0.2s, border-color 0.2s;
}

.nav-logo {
  font-weight: 800;
  font-size: 14px;
  letter-spacing: -0.3px;
  color: var(--text);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-links a {
  font-size: 13px;
  color: var(--muted);
  transition: color 0.15s;
}
.nav-links a:hover { color: var(--text); }
.nav-links a.active {
  color: var(--gradient-start);
  font-weight: 600;
}

/* Theme toggle pill */
.theme-toggle {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 3px;
  display: flex;
  gap: 2px;
  cursor: pointer;
  transition: background 0.2s;
}
.theme-toggle button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 14px;
  font-size: 12px;
  transition: background 0.15s, box-shadow 0.15s;
}
.theme-toggle button.active {
  background: var(--surface);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

/* ===========================
   HERO
=========================== */
.hero {
  background: linear-gradient(135deg, var(--ai-tint) 0%, #eff6ff 60%, #f0f9ff 100%);
  padding: 64px 32px 48px;
  transition: background 0.2s;
}

[data-theme="dark"] .hero {
  background: linear-gradient(135deg, #1a0533 0%, #0f1a3d 50%, #0c1628 100%);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid var(--ai-border);
  border-radius: 20px;
  padding: 5px 14px;
  margin-bottom: 20px;
  font-size: 11px;
  font-weight: 600;
  color: var(--gradient-start);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 1px 4px rgba(124,58,237,0.1);
}

.hero h1 {
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  letter-spacing: -1px;
  line-height: 1.15;
  margin-bottom: 16px;
  color: var(--text);
}

.gradient-text {
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero p {
  font-size: 15px;
  color: var(--muted);
  max-width: 560px;
  margin-bottom: 28px;
  line-height: 1.8;
}

.btn-group { display: flex; gap: 12px; flex-wrap: wrap; }

.btn-primary {
  background: var(--gradient);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: opacity 0.15s, transform 0.15s;
}
.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

.btn-secondary {
  background: var(--surface);
  color: var(--gradient-start);
  border: 1.5px solid var(--gradient-start);
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  transition: background 0.15s, transform 0.15s;
}
.btn-secondary:hover { background: var(--ai-tint); transform: translateY(-1px); }

/* ===========================
   STATS BAR
=========================== */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--surface);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  transition: background 0.2s;
}

.stat {
  padding: 20px 16px;
  text-align: center;
  border-right: 1px solid var(--border);
}
.stat:last-child { border-right: none; }

.stat-number {
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 4px;
}
.stat-number.purple-blue { background: linear-gradient(90deg,#7c3aed,#2563eb); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-number.blue-sky    { background: linear-gradient(90deg,#2563eb,#0ea5e9); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-number.sky-green   { background: linear-gradient(90deg,#0ea5e9,#10b981); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.stat-number.ai          { background: linear-gradient(90deg,#7c3aed,#a78bfa); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; font-size:18px; }

.stat-label {
  font-size: 11px;
  color: var(--subtle);
}

/* ===========================
   SECTION SHARED
=========================== */
.section {
  padding: 56px 32px;
  background: var(--bg);
  transition: background 0.2s;
}

.section-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--subtle);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.section h2 {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 32px;
  color: var(--text);
}

/* ===========================
   PILLAR CARDS (3-column)
=========================== */
.pillars {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }

.card-purple { border-top: 3px solid #7c3aed; }
.card-blue   { border-top: 3px solid #2563eb; }
.card-ai {
  background: linear-gradient(135deg, var(--ai-tint), #eff6ff);
  border: 1px solid var(--ai-border);
  border-top: 3px solid #a78bfa;
  box-shadow: 0 2px 12px rgba(124,58,237,0.08);
}
[data-theme="dark"] .card-ai {
  background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(37,99,235,0.08));
}

.card-icon { font-size: 28px; margin-bottom: 14px; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
}

.card h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text);
}
.card-ai h3 { color: #7c3aed; }
[data-theme="dark"] .card-ai h3 { color: #a78bfa; }

.card p {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.6;
  margin-bottom: 16px;
}

.card-link {
  font-size: 13px;
  font-weight: 600;
  color: var(--gradient-start);
}
.card-link.blue { color: var(--gradient-mid); }

.badge-new {
  background: var(--gradient);
  color: white;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 10px;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

.badge-in-progress {
  background: var(--ai-tint);
  border: 1px solid var(--ai-border);
  color: var(--gradient-start);
  font-size: 9px;
  font-weight: 600;
  padding: 2px 10px;
  border-radius: 10px;
  white-space: nowrap;
}
[data-theme="dark"] .badge-in-progress {
  background: rgba(124,58,237,0.15);
  color: #a78bfa;
}

/* ===========================
   TECH TAGS
=========================== */
.tags { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 12px; }
.tag {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--muted);
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 20px;
}

/* ===========================
   CONTACT TEASER (dark band)
=========================== */
.contact-teaser {
  background: linear-gradient(135deg, #0f0c1d, #1a0533);
  padding: 48px 32px;
  text-align: center;
}
.contact-teaser h2 {
  font-size: 24px;
  font-weight: 800;
  color: white;
  margin-bottom: 8px;
}
.contact-teaser p {
  font-size: 13px;
  color: rgba(255,255,255,0.5);
  margin-bottom: 24px;
}

/* ===========================
   CONTACT SECTION
=========================== */
.contact-section {
  padding: 56px 32px;
  background: var(--surface);
  transition: background 0.2s;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  max-width: 900px;
}

.contact-section h2 { font-size: 24px; font-weight: 800; margin-bottom: 12px; color: var(--text); }
.contact-section p  { font-size: 14px; color: var(--muted); margin-bottom: 24px; }

.contact-details { display: flex; flex-direction: column; gap: 16px; }
.contact-item h4 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--subtle); margin-bottom: 4px; }
.contact-item a,
.contact-item span { font-size: 14px; color: var(--muted); }
.contact-item a:hover { color: var(--gradient-start); }

.social-icons { display: flex; gap: 12px; margin-top: 4px; }
.social-icons a { font-size: 18px; color: var(--muted); transition: color 0.15s; }
.social-icons a:hover { color: var(--gradient-start); }

/* ===========================
   CONTACT FORM EMBED
=========================== */
.form-embed iframe {
  width: 100%;
  min-height: 500px;
  border: none;
  border-radius: 8px;
}

/* ===========================
   PAGE HERO (inner pages)
=========================== */
.page-hero {
  background: linear-gradient(135deg, var(--ai-tint) 0%, #eff6ff 60%, #f0f9ff 100%);
  padding: 48px 32px 40px;
  transition: background 0.2s;
}
[data-theme="dark"] .page-hero {
  background: linear-gradient(135deg, #1a0533 0%, #0f1a3d 50%, #0c1628 100%);
}
.page-hero h1 {
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 800;
  letter-spacing: -0.8px;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 12px;
}
.page-hero p {
  font-size: 15px;
  color: var(--muted);
  max-width: 600px;
  line-height: 1.8;
}

/* ===========================
   CONTENT SECTION (inner pages)
=========================== */
.content-section {
  padding: 40px 32px;
  background: var(--bg);
  transition: background 0.2s;
}
.content-section + .content-section {
  border-top: 1px solid var(--border);
}

.content-section h2 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: var(--text);
}

.content-section ul {
  list-style: disc;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.content-section ul li {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
}

/* ===========================
   CALLOUT BOX
=========================== */
.callout {
  background: linear-gradient(135deg, var(--ai-tint), #eff6ff);
  border: 1px solid var(--ai-border);
  border-radius: 12px;
  padding: 24px;
  margin: 24px 0;
}
[data-theme="dark"] .callout {
  background: rgba(124,58,237,0.08);
}
.callout-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--gradient-start);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 10px;
}
.callout p {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.7;
  margin: 0;
}

/* ===========================
   GITHUB CTA CARD
=========================== */
.github-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  transition: background 0.2s;
}
.github-card-text h3 { font-size: 15px; font-weight: 700; margin-bottom: 4px; color: var(--text); }
.github-card-text p  { font-size: 13px; color: var(--muted); }
.github-links { display: flex; flex-direction: column; gap: 8px; }
.btn-github {
  background: #111827;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: opacity 0.15s;
}
[data-theme="dark"] .btn-github { background: rgba(255,255,255,0.1); }
.btn-github:hover { opacity: 0.8; }

/* ===========================
   CONSULTING PROCESS STEPS
=========================== */
.process-steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  counter-reset: steps;
}
.process-step {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  position: relative;
  transition: background 0.2s;
}
.step-number {
  font-size: 32px;
  font-weight: 800;
  background: var(--gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
  line-height: 1;
}
.process-step h3 { font-size: 15px; font-weight: 700; margin-bottom: 8px; color: var(--text); }
.process-step p  { font-size: 13px; color: var(--muted); line-height: 1.6; }

/* ===========================
   ARTIFACT CARDS
=========================== */
.artifact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}
.artifact-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
}
.artifact-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.artifact-card h3 { font-size: 15px; font-weight: 700; color: var(--text); }
.artifact-card p  { font-size: 13px; color: var(--muted); line-height: 1.6; flex: 1; }

/* ===========================
   FOOTER
=========================== */
footer {
  background: #13111f;
  padding: 20px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
footer span { font-size: 12px; color: rgba(255,255,255,0.25); }

/* ===========================
   BACK LINK
=========================== */
.back-link {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color 0.15s;
}
.back-link:hover { color: white; }

/* ===========================
   RESPONSIVE
=========================== */
@media (max-width: 768px) {
  .nav { padding: 0 16px; }
  .nav-links { display: none; }

  .hero, .section, .page-hero, .content-section, .contact-section { padding-left: 16px; padding-right: 16px; }

  .stats-bar { grid-template-columns: repeat(2, 1fr); }
  .stat:nth-child(2) { border-right: none; }

  .pillars { grid-template-columns: 1fr; }
  .process-steps { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; }
  .github-card { flex-direction: column; align-items: flex-start; }
  .github-links { flex-direction: row; flex-wrap: wrap; }
}

/* ===========================
   RESUME PRINT STYLES
=========================== */
.resume-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background: white;
  color: #111827;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

@media print {
  body { background: white; }
  .resume-page { padding: 0; max-width: none; }
  .no-print { display: none !important; }
}
```

- [ ] **Step 2: Verify the CSS file was written**

```bash
wc -l assets/css/main.css
```
Expected: ~280+ lines.

- [ ] **Step 3: Commit**

```bash
git add assets/css/main.css
git commit -m "feat: add custom CSS design system with light/dark theme tokens"
```

---

## Task 2: Theme Toggle JS

**Files:**
- Create: `assets/js/theme.js`

- [ ] **Step 1: Create theme.js**

Create `assets/js/theme.js`:

```js
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
```

- [ ] **Step 2: Commit**

```bash
git add assets/js/theme.js
git commit -m "feat: add dark mode toggle with localStorage persistence"
```

---

## Task 3: Home Page

**Files:**
- Overwrite: `index.html`

- [ ] **Step 1: Rewrite index.html**

Overwrite `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nourilee Santos — Senior QA Automation Engineer & AI-Augmented QA</title>
  <meta name="description" content="Senior QA Automation Engineer with 10+ years building test automation across web, mobile, and API. Now bringing AI into the QA workflow." />
  <meta property="og:title" content="Nourilee Santos — Senior QA Automation Engineer & AI-Augmented QA" />
  <meta property="og:description" content="Senior QA Automation Engineer with 10+ years building test automation across web, mobile, and API. Now bringing AI into the QA workflow." />
  <meta property="og:image" content="images/me.jpg" />
  <meta property="og:url" content="https://nourilee.github.io/about-me" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="assets/css/main.css" />
  <script src="assets/js/theme.js"></script>
</head>
<body>

  <div class="gradient-bar"></div>

  <nav class="nav">
    <a href="index.html" class="nav-logo">nourilee.santos</a>
    <div class="nav-links">
      <a href="automation.html">Automation</a>
      <a href="ai-for-qa.html" class="active">AI for QA ✦</a>
      <a href="consulting.html">Consulting</a>
      <a href="artifacts.html">Work</a>
      <a href="#contact">Contact</a>
      <div class="theme-toggle" aria-label="Toggle theme">
        <button data-theme="light" onclick="toggleTheme('light')" class="active">☀️</button>
        <button data-theme="dark"  onclick="toggleTheme('dark')">🌙</button>
      </div>
    </div>
  </nav>

  <section class="hero">
    <div class="hero-badge">Senior QA Automation Engineer · AI-Augmented QA</div>
    <h1>Hi, I'm Nourilee.<br>
      <span class="gradient-text">I build quality into systems —<br>now with AI.</span>
    </h1>
    <p>10+ years building test automation from scratch across web, mobile, and API. Senior engineering role in fintech, taking select consulting engagements. Actively building Claude-powered and Playwright MCP workflows for next-generation QA.</p>
    <div class="btn-group">
      <a href="artifacts.html" class="btn-primary">View My Work</a>
      <a href="resume.pdf" download class="btn-secondary">⬇ Download Resume</a>
    </div>
  </section>

  <div class="stats-bar">
    <div class="stat">
      <div class="stat-number purple-blue">10+</div>
      <div class="stat-label">Years Experience</div>
    </div>
    <div class="stat">
      <div class="stat-number blue-sky">93%</div>
      <div class="stat-label">Faster Regression</div>
    </div>
    <div class="stat">
      <div class="stat-number sky-green">80%</div>
      <div class="stat-label">Regression Coverage</div>
    </div>
    <div class="stat">
      <div class="stat-number ai">AI ✦ QA</div>
      <div class="stat-label">AI-Augmented</div>
    </div>
  </div>

  <section class="section">
    <div class="section-label">What I Do</div>
    <h2>Automation. AI. Quality.</h2>
    <div class="pillars">
      <div class="card card-purple">
        <div class="card-icon">⚙️</div>
        <h3>Test Automation</h3>
        <p>10+ years building automation frameworks from scratch — web, mobile (Android &amp; iOS), and API. Playwright, Appium, WebdriverIO, Selenium. CI/CD integration that actually sticks.</p>
        <a href="automation.html" class="card-link">Learn more →</a>
      </div>
      <div class="card card-ai">
        <div class="card-header">
          <div class="card-icon" style="margin-bottom:0;">🤖</div>
          <span class="badge-new">NEW</span>
        </div>
        <h3>AI for QA ✦</h3>
        <p>Building Claude-powered Appium frameworks and using Playwright MCP for AI-driven exploratory testing. The next generation of QA tooling, built from the ground up.</p>
        <a href="ai-for-qa.html" class="card-link">Explore →</a>
      </div>
      <div class="card card-blue">
        <div class="card-icon">🤝</div>
        <h3>Consulting</h3>
        <p>Select engagements for teams starting from zero or inheriting a framework nobody trusts. Framework setup, automation strategy, and team uplift.</p>
        <a href="consulting.html" class="card-link blue">Get in touch →</a>
      </div>
    </div>
  </section>

  <div class="contact-teaser">
    <h2>Let's work together.</h2>
    <p>nourilee.santos@gmail.com · LinkedIn · GitHub</p>
    <a href="#contact" class="btn-primary">Send a Message</a>
  </div>

  <section id="contact" class="contact-section">
    <div class="contact-grid">
      <div>
        <h2>Get in touch</h2>
        <p>Leave a message through the form. For anything urgent, reach me directly over email or on any of the platforms below.</p>
        <div class="contact-details">
          <div class="contact-item">
            <h4>Email</h4>
            <a href="mailto:nourilee.santos@gmail.com">nourilee.santos@gmail.com</a>
          </div>
          <div class="contact-item">
            <h4>Location</h4>
            <span>Tanza, Cavite, Philippines</span>
          </div>
          <div class="contact-item">
            <h4>Social</h4>
            <div class="social-icons">
              <a href="https://www.linkedin.com/in/nourileesantos/" title="LinkedIn">in</a>
              <a href="https://github.com/nourilee" title="GitHub">gh</a>
              <a href="https://twitter.com/oyiesantos" title="Twitter">tw</a>
            </div>
          </div>
          <div class="contact-item">
            <h4>QA Handbook</h4>
            <a href="https://nourilee.github.io/qa-handbook" target="_blank">nourilee.github.io/qa-handbook</a>
          </div>
        </div>
      </div>
      <div class="form-embed">
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe_8wTMM2lC1-4fJjQP-noMIxIu-p00ivH3nninkP90zPvbiA/viewform?embedded=true"
                frameborder="0" marginheight="0" marginwidth="0" loading="lazy">Loading…</iframe>
      </div>
    </div>
  </section>

  <footer>
    <span>© 2025 Nourilee Santos</span>
    <span>nourilee.github.io/about-me</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `index.html` in a browser. Check:
- Gradient top bar visible
- Hero shows stats bar below with all 4 stats
- Three pillar cards render (AI for QA card is highlighted/tinted)
- Dark mode toggle works — clicking 🌙 switches the page to dark, ☀️ switches back
- "Download Resume" button attempts to download `resume.pdf`
- "View My Work" links to artifacts.html
- Contact form embed loads

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: rebuild home page with hero, stats bar, and pillar cards"
```

---

## Task 4: Test Automation Page

**Files:**
- Overwrite: `automation.html`

- [ ] **Step 1: Rewrite automation.html**

Overwrite `automation.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Test Automation — Nourilee Santos</title>
  <link rel="stylesheet" href="assets/css/main.css" />
  <script src="assets/js/theme.js"></script>
</head>
<body>

  <div class="gradient-bar"></div>

  <nav class="nav">
    <a href="index.html" class="nav-logo">nourilee.santos</a>
    <div class="nav-links">
      <a href="automation.html" class="active">Automation</a>
      <a href="ai-for-qa.html">AI for QA ✦</a>
      <a href="consulting.html">Consulting</a>
      <a href="artifacts.html">Work</a>
      <a href="index.html#contact">Contact</a>
      <div class="theme-toggle">
        <button data-theme="light" onclick="toggleTheme('light')" class="active">☀️</button>
        <button data-theme="dark"  onclick="toggleTheme('dark')">🌙</button>
      </div>
    </div>
  </nav>

  <div class="page-hero">
    <div class="hero-badge">10+ Years · Web · Mobile · API</div>
    <h1>Test Automation</h1>
    <p>I don't just write scripts — I design frameworks that teams can actually maintain and build on. From greenfield builds to framework migrations, here's what that looks like in practice.</p>
  </div>

  <div class="content-section">
    <h2>What I've Built</h2>
    <ul>
      <li>At a recruitment SaaS startup (5.5 years): built the entire automated regression suite from scratch — <strong>~200 test cases covering ~80% of regression scope</strong> — cutting cycle time from 2–3 days to under 3 hours (~93% reduction).</li>
      <li>Grew into <strong>Automation Lead</strong>, overseeing QA engineers, setting standards, and running code reviews across the team.</li>
      <li>Retained post-acquisition specifically to lead migration of the full automation suite to the acquiring company's platform — one of two employees kept.</li>
      <li>At a fintech mobile platform: leading Android automation using Appium and WebdriverIO, expanding regression coverage with cross-device testing on BrowserStack.</li>
      <li>Reviewing and approving automation merge requests across Android, web, and iOS repositories, ensuring consistency and quality across platforms.</li>
      <li>At an enterprise physical security platform: enhanced Selenium-based framework, executed integration and system testing, SQL validation for data integrity.</li>
      <li>At a global enterprise consultancy (6 years): developed automated test suites across multiple client engagements, contributed to framework design and peer reviews.</li>
    </ul>
  </div>

  <div class="content-section">
    <h2>Core Stack</h2>
    <div class="pillars" style="grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));">
      <div class="card card-purple">
        <h3>Web Automation</h3>
        <div class="tags">
          <span class="tag">Playwright</span>
          <span class="tag">Selenium WebDriver</span>
          <span class="tag">WebdriverIO</span>
        </div>
      </div>
      <div class="card card-blue">
        <h3>Mobile Automation</h3>
        <div class="tags">
          <span class="tag">Appium</span>
          <span class="tag">Android</span>
          <span class="tag">iOS</span>
          <span class="tag">BrowserStack</span>
        </div>
      </div>
      <div class="card card-purple">
        <h3>Languages</h3>
        <div class="tags">
          <span class="tag">JavaScript</span>
          <span class="tag">Node.js</span>
          <span class="tag">Java</span>
          <span class="tag">SQL</span>
        </div>
      </div>
      <div class="card card-blue">
        <h3>API Testing</h3>
        <div class="tags">
          <span class="tag">REST API Automation</span>
          <span class="tag">Postman</span>
          <span class="tag">JSON Schema</span>
        </div>
      </div>
      <div class="card card-purple">
        <h3>CI/CD</h3>
        <div class="tags">
          <span class="tag">Jenkins</span>
          <span class="tag">GitHub Actions</span>
          <span class="tag">CircleCI</span>
          <span class="tag">GitLab CI</span>
        </div>
      </div>
      <div class="card card-blue">
        <h3>Frameworks</h3>
        <div class="tags">
          <span class="tag">Cucumber/BDD</span>
          <span class="tag">Page Object Model</span>
          <span class="tag">Hybrid/Modular</span>
        </div>
      </div>
    </div>
  </div>

  <div class="content-section">
    <h2>Approach</h2>
    <p style="font-size:15px;color:var(--muted);line-height:1.8;max-width:680px;">I build frameworks that are readable, maintainable, and actually run in CI — not demo-ware. I care about coverage that means something, test stability, and making sure the team that inherits the framework can understand and extend it without me.</p>
    <div class="callout" style="margin-top:24px;">
      <div class="callout-label">Public Knowledge Base</div>
      <p>I maintain a QA Handbook covering automation strategy, framework design, and best practices — built from real-world experience across multiple products and teams.</p>
    </div>
    <div class="btn-group" style="margin-top:24px;">
      <a href="https://nourilee.github.io/qa-handbook" target="_blank" class="btn-primary">View QA Handbook</a>
      <a href="https://github.com/nourilee" target="_blank" class="btn-secondary">GitHub</a>
    </div>
  </div>

  <footer>
    <a href="index.html" class="back-link">← Back to Home</a>
    <span>© 2025 Nourilee Santos</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `automation.html`. Check:
- No company names anywhere (only role descriptions)
- Core stack cards render in the multi-column grid
- Dark mode toggle carries over from home (localStorage persists)
- QA Handbook button links correctly

- [ ] **Step 3: Commit**

```bash
git add automation.html
git commit -m "feat: rebuild automation page with outcomes and stack cards"
```

---

## Task 5: AI for QA Page

**Files:**
- Create: `ai-for-qa.html`

- [ ] **Step 1: Create ai-for-qa.html**

Create `ai-for-qa.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AI for QA — Nourilee Santos</title>
  <meta name="description" content="Building Claude-powered Appium frameworks and Playwright MCP workflows for AI-augmented QA." />
  <link rel="stylesheet" href="assets/css/main.css" />
  <script src="assets/js/theme.js"></script>
</head>
<body>

  <div class="gradient-bar"></div>

  <nav class="nav">
    <a href="index.html" class="nav-logo">nourilee.santos</a>
    <div class="nav-links">
      <a href="automation.html">Automation</a>
      <a href="ai-for-qa.html" class="active">AI for QA ✦</a>
      <a href="consulting.html">Consulting</a>
      <a href="artifacts.html">Work</a>
      <a href="index.html#contact">Contact</a>
      <div class="theme-toggle">
        <button data-theme="light" onclick="toggleTheme('light')" class="active">☀️</button>
        <button data-theme="dark"  onclick="toggleTheme('dark')">🌙</button>
      </div>
    </div>
  </nav>

  <div class="page-hero">
    <div class="hero-badge">
      <span style="width:8px;height:8px;background:var(--gradient-start);border-radius:50%;display:inline-block;"></span>
      In Development
    </div>
    <h1><span class="gradient-text">AI-Augmented QA</span></h1>
    <p>Test automation has always been about working smarter — writing less, covering more, catching things earlier. AI is the next lever. I'm actively building frameworks that use Claude and Playwright MCP to do things that weren't practical to automate before.</p>
  </div>

  <div class="content-section">
    <div class="section-label">What I'm Building</div>
    <div class="pillars">
      <div class="card card-ai">
        <div class="card-header">
          <div class="card-icon" style="margin-bottom:0;">🤖</div>
          <span class="badge-in-progress">In Progress</span>
        </div>
        <h3>Claude-Powered Appium Framework</h3>
        <p>Using Claude to generate, review, and maintain Appium test scripts. Goal: reduce the manual overhead of mobile test authoring while improving coverage of edge cases that engineers typically miss.</p>
        <div class="tags">
          <span class="tag">Claude API</span>
          <span class="tag">Appium</span>
          <span class="tag">WebdriverIO</span>
          <span class="tag">JavaScript</span>
        </div>
      </div>
      <div class="card card-ai" style="border-top-color:#2563eb;">
        <div class="card-header">
          <div class="card-icon" style="margin-bottom:0;">🔍</div>
          <span class="badge-in-progress" style="border-color:rgba(37,99,235,0.2);color:#2563eb;">In Progress</span>
        </div>
        <h3>Playwright MCP — Exploratory Testing</h3>
        <p>Leveraging Playwright's MCP integration to enable AI-driven exploratory testing — letting an agent navigate, probe, and surface issues that scripted tests miss entirely.</p>
        <div class="tags">
          <span class="tag">Playwright MCP</span>
          <span class="tag">Claude</span>
          <span class="tag">Exploratory QA</span>
        </div>
      </div>
    </div>
  </div>

  <div class="content-section">
    <div class="callout">
      <div class="callout-label">Why This Matters</div>
      <p>Traditional automation scales coverage but still requires an engineer to know what to test and how to write it. AI changes both constraints — it can generate test cases from specs, maintain scripts as UIs change, and explore surfaces that no one thought to script. I'm building these capabilities into the tools I already use every day.</p>
    </div>
  </div>

  <div class="content-section">
    <div class="github-card">
      <div class="github-card-text">
        <h3>Explore My GitHub</h3>
        <p>Demo projects, automation samples, and ongoing experiments.</p>
      </div>
      <div class="github-links">
        <a href="https://github.com/nourilee" target="_blank" class="btn-github">⚡ github.com/nourilee</a>
        <a href="https://github.com/santosn-qa" target="_blank" class="btn-github">⚡ github.com/santosn-qa</a>
      </div>
    </div>
  </div>

  <footer>
    <a href="index.html" class="back-link">← Back to Home</a>
    <span>© 2025 Nourilee Santos</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Open in browser and verify**

Open `ai-for-qa.html`. Check:
- "In Development" badge in hero
- Two project cards render, both marked "In Progress"
- "Why This Matters" callout box renders with purple tint
- Both GitHub buttons link to correct URLs (open in new tab)
- Dark mode toggle works

- [ ] **Step 3: Commit**

```bash
git add ai-for-qa.html
git commit -m "feat: add AI for QA page with Claude+Appium and Playwright MCP"
```

---

## Task 6: Consulting Page

**Files:**
- Create: `consulting.html`

- [ ] **Step 1: Create consulting.html**

Create `consulting.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Consulting — Nourilee Santos</title>
  <meta name="description" content="Select QA automation consulting engagements — framework setup, automation strategy, and team uplift." />
  <link rel="stylesheet" href="assets/css/main.css" />
  <script src="assets/js/theme.js"></script>
</head>
<body>

  <div class="gradient-bar"></div>

  <nav class="nav">
    <a href="index.html" class="nav-logo">nourilee.santos</a>
    <div class="nav-links">
      <a href="automation.html">Automation</a>
      <a href="ai-for-qa.html">AI for QA ✦</a>
      <a href="consulting.html" class="active">Consulting</a>
      <a href="artifacts.html">Work</a>
      <a href="index.html#contact">Contact</a>
      <div class="theme-toggle">
        <button data-theme="light" onclick="toggleTheme('light')" class="active">☀️</button>
        <button data-theme="dark"  onclick="toggleTheme('dark')">🌙</button>
      </div>
    </div>
  </nav>

  <div class="page-hero">
    <div class="hero-badge">Select Engagements · Part-Time</div>
    <h1>QA Automation<br><span class="gradient-text">Consulting</span></h1>
    <p>I take on a small number of part-time engagements to help teams get automation off the ground — or get it back on track. Whether you're starting from zero or inheriting a framework nobody trusts, let's talk.</p>
  </div>

  <div class="content-section">
    <div class="section-label">What I Help With</div>
    <div class="pillars">
      <div class="card card-purple">
        <div class="card-icon">🏗️</div>
        <h3>Framework Setup from Scratch</h3>
        <p>Design and build a test automation framework tailored to your stack — web, mobile, or API. Page Object Model, BDD, or hybrid. CI/CD integrated from day one.</p>
      </div>
      <div class="card card-blue">
        <div class="card-icon">🗺️</div>
        <h3>Automation Strategy &amp; Coverage Planning</h3>
        <p>Risk-based test planning, coverage gap analysis, and a pragmatic roadmap for teams that want to automate but aren't sure where to start or what to prioritise.</p>
      </div>
      <div class="card card-purple">
        <div class="card-icon">👥</div>
        <h3>Team Uplift &amp; Standards</h3>
        <p>Code review, automation standards, and mentoring for QA engineers. For teams that have automation but want it to be more consistent, more maintainable, and more trusted.</p>
      </div>
    </div>
  </div>

  <div class="content-section">
    <div class="section-label">How It Works</div>
    <div class="process-steps">
      <div class="process-step">
        <div class="step-number">01</div>
        <h3>Reach Out</h3>
        <p>Send a message through the contact form or email directly. Describe what you're working on and what's not working.</p>
      </div>
      <div class="process-step">
        <div class="step-number">02</div>
        <h3>Scoping Call</h3>
        <p>A short call to understand your stack, team size, and goals. I'll give you an honest read on what's achievable and what timeline makes sense.</p>
      </div>
      <div class="process-step">
        <div class="step-number">03</div>
        <h3>Engagement</h3>
        <p>Part-time, focused work. I embed with your team, build what needs to be built, and hand it off with documentation and a path forward.</p>
      </div>
    </div>
  </div>

  <div class="contact-teaser">
    <h2>Ready to talk?</h2>
    <p>nourilee.santos@gmail.com</p>
    <a href="index.html#contact" class="btn-primary">Send a Message</a>
  </div>

  <footer>
    <a href="index.html" class="back-link">← Back to Home</a>
    <span>© 2025 Nourilee Santos</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `consulting.html`. Check:
- Three service cards render correctly
- Three numbered process steps render
- "Send a Message" CTA links to `index.html#contact`
- Dark mode works

- [ ] **Step 3: Commit**

```bash
git add consulting.html
git commit -m "feat: add consulting page with services and process steps"
```

---

## Task 7: Portfolio / Artifacts Page

**Files:**
- Overwrite: `artifacts.html`

- [ ] **Step 1: Rewrite artifacts.html**

Overwrite `artifacts.html` with:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sample Work — Nourilee Santos</title>
  <link rel="stylesheet" href="assets/css/main.css" />
  <script src="assets/js/theme.js"></script>
</head>
<body>

  <div class="gradient-bar"></div>

  <nav class="nav">
    <a href="index.html" class="nav-logo">nourilee.santos</a>
    <div class="nav-links">
      <a href="automation.html">Automation</a>
      <a href="ai-for-qa.html">AI for QA ✦</a>
      <a href="consulting.html">Consulting</a>
      <a href="artifacts.html" class="active">Work</a>
      <a href="index.html#contact">Contact</a>
      <div class="theme-toggle">
        <button data-theme="light" onclick="toggleTheme('light')" class="active">☀️</button>
        <button data-theme="dark"  onclick="toggleTheme('dark')">🌙</button>
      </div>
    </div>
  </nav>

  <div class="page-hero">
    <div class="hero-badge">Public Demos · Open Source</div>
    <h1>Sample Work</h1>
    <p>Most of my work lives in client repositories. These are public demos and proof-of-concept projects that demonstrate the frameworks and approaches I use.</p>
  </div>

  <div class="content-section">
    <div class="artifact-grid">

      <div class="artifact-card card-purple" style="border-top:3px solid #7c3aed;">
        <div class="card-icon">🧪</div>
        <h3>WebdriverIO + Cucumber.js</h3>
        <p>End-to-end test automation demo using WebdriverIO with Cucumber BDD. Demonstrates Page Object Model, step definitions, and reporting setup.</p>
        <div class="tags">
          <span class="tag">WebdriverIO</span>
          <span class="tag">Cucumber.js</span>
          <span class="tag">JavaScript</span>
          <span class="tag">BDD</span>
        </div>
        <a href="https://santosn-qa.github.io/wdio-cucumber-js/" target="_blank" class="btn-primary" style="margin-top:8px;text-align:center;">View Demo</a>
      </div>

      <div class="artifact-card" style="border-top:3px solid #2563eb;">
        <div class="card-icon">☕</div>
        <h3>Selenium + Java + Cucumber</h3>
        <p>Test automation framework using Selenium WebDriver with Java and Cucumber BDD. Covers browser automation, hybrid framework design, and CI integration patterns.</p>
        <div class="tags">
          <span class="tag">Selenium</span>
          <span class="tag">Java</span>
          <span class="tag">Cucumber</span>
          <span class="tag">BDD</span>
        </div>
        <a href="https://santosn-qa.github.io/selenium-java-cucumber/" target="_blank" class="btn-primary" style="margin-top:8px;text-align:center;">View Demo</a>
      </div>

      <div class="artifact-card" style="border-top:3px solid #7c3aed;">
        <div class="card-icon">🖥️</div>
        <h3>IBM i Test Automation POC</h3>
        <p>Proof-of-concept presentation demonstrating test automation feasibility for IBM i (AS/400) environments — an early-career project exploring automation for legacy enterprise systems.</p>
        <div class="tags">
          <span class="tag">IBM i</span>
          <span class="tag">Enterprise</span>
          <span class="tag">POC</span>
        </div>
        <a href="https://www.scribd.com/presentation/351981038/Test-Automation-POC-for-IBM-i" target="_blank" class="btn-secondary" style="margin-top:8px;text-align:center;">View on Scribd</a>
      </div>

    </div>
  </div>

  <div class="content-section">
    <div class="github-card">
      <div class="github-card-text">
        <h3>More on GitHub</h3>
        <p>Explore my repositories for more automation experiments, framework samples, and AI for QA work in progress.</p>
      </div>
      <div class="github-links">
        <a href="https://github.com/nourilee" target="_blank" class="btn-github">⚡ github.com/nourilee</a>
        <a href="https://github.com/santosn-qa" target="_blank" class="btn-github">⚡ github.com/santosn-qa</a>
      </div>
    </div>
  </div>

  <footer>
    <a href="index.html" class="back-link">← Back to Home</a>
    <span>© 2025 Nourilee Santos</span>
  </footer>

</body>
</html>
```

- [ ] **Step 2: Verify in browser**

Open `artifacts.html`. Check:
- Three artifact cards render cleanly (no broken iframes)
- "View Demo" buttons link to correct URLs
- GitHub CTA card shows both repo links
- Dark mode works

- [ ] **Step 3: Commit**

```bash
git add artifacts.html
git commit -m "feat: rebuild artifacts page with clean demo cards"
```

---

## Task 8: Resume HTML

**Files:**
- Create: `resume.html`

Content sourced from `career-hub/resume/resume-rewrite.md`.

- [ ] **Step 1: Create resume.html**

Create `resume.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Nourilee Santos — Resume</title>
  <link rel="stylesheet" href="assets/css/main.css" />
  <style>
    body { background: white; }
    .resume-page { max-width: 800px; margin: 0 auto; padding: 48px 40px; }
    .resume-header { margin-bottom: 28px; border-bottom: 2px solid #7c3aed; padding-bottom: 20px; }
    .resume-header h1 { font-size: 28px; font-weight: 800; color: #111827; margin-bottom: 4px; letter-spacing: -0.5px; }
    .resume-header .title { font-size: 15px; color: #6b7280; margin-bottom: 12px; }
    .resume-header .contact-line { font-size: 12px; color: #6b7280; display: flex; flex-wrap: wrap; gap: 12px; }
    .resume-header .contact-line a { color: #7c3aed; text-decoration: none; }
    .resume-section { margin-bottom: 28px; }
    .resume-section h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #7c3aed; margin-bottom: 12px; padding-bottom: 4px; border-bottom: 1px solid #e5e7eb; }
    .resume-section p, .resume-section li { font-size: 13px; color: #374151; line-height: 1.7; }
    .resume-section ul { list-style: disc; padding-left: 18px; display: flex; flex-direction: column; gap: 6px; }
    .job { margin-bottom: 22px; }
    .job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
    .job-title { font-size: 14px; font-weight: 700; color: #111827; }
    .job-company { font-size: 13px; font-weight: 600; color: #7c3aed; }
    .job-meta { font-size: 12px; color: #9ca3af; }
    .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px; }
    .skill-group dt { font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 3px; }
    .skill-group dd { font-size: 12px; color: #6b7280; line-height: 1.5; }
    @media print {
      body { background: white; }
      .resume-page { padding: 0; max-width: none; }
      .no-print { display: none !important; }
      a { color: inherit !important; }
    }
  </style>
</head>
<body>

  <div class="no-print" style="background:#f8fafc;padding:12px 24px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
    <a href="index.html" style="font-size:13px;color:#7c3aed;font-weight:600;">← Back to Portfolio</a>
    <button onclick="window.print()" style="background:linear-gradient(90deg,#7c3aed,#2563eb);color:white;border:none;padding:8px 16px;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer;">Print / Save as PDF</button>
  </div>

  <div class="resume-page">

    <div class="resume-header">
      <h1>Nourilee Santos</h1>
      <div class="title">Senior QA Automation Engineer | Automation Consultant</div>
      <div class="contact-line">
        <span>Cavite, Philippines (Open to Remote)</span>
        <span>+63 915 614 3858</span>
        <a href="mailto:nourilee.santos@gmail.com">nourilee.santos@gmail.com</a>
        <a href="https://linkedin.com/in/nourileesantos" target="_blank">linkedin.com/in/nourileesantos</a>
        <a href="https://github.com/nourilee" target="_blank">github.com/nourilee</a>
        <a href="https://nourilee.github.io/about-me" target="_blank">nourilee.github.io/about-me</a>
      </div>
    </div>

    <div class="resume-section">
      <h2>Professional Summary</h2>
      <p>Senior QA Automation Engineer with 10+ years of experience building test automation from the ground up across web, mobile, and enterprise platforms. Currently in a senior engineering role at a fintech company while taking on select consulting engagements to help teams kickstart automation. Deep expertise in Playwright, Selenium, WebdriverIO, and Appium with JavaScript/Java stacks — from framework design to CI/CD integration. Proven track record of cutting regression cycle times by 90%+, scaling coverage to 80%, and leading QA teams through acquisition and platform migration. Actively building AI-augmented QA tooling using Claude and Playwright MCP.</p>
    </div>

    <div class="resume-section">
      <h2>Core Technical Skills</h2>
      <dl class="skills-grid">
        <div class="skill-group">
          <dt>Automation</dt>
          <dd>Playwright · Selenium WebDriver · WebdriverIO · Appium (Android &amp; iOS) · Cucumber/BDD · Page Object Model · Hybrid/Modular Frameworks</dd>
        </div>
        <div class="skill-group">
          <dt>Languages</dt>
          <dd>JavaScript (Node.js) · Java · SQL</dd>
        </div>
        <div class="skill-group">
          <dt>API Testing</dt>
          <dd>REST API Automation · Postman · JSON Schema Validation · API Chaining &amp; Auth</dd>
        </div>
        <div class="skill-group">
          <dt>CI/CD &amp; DevOps</dt>
          <dd>Jenkins · CircleCI · GitLab CI · GitHub Actions · Git</dd>
        </div>
        <div class="skill-group">
          <dt>Platforms</dt>
          <dd>BrowserStack · IBM i (AS/400)</dd>
        </div>
        <div class="skill-group">
          <dt>AI for QA</dt>
          <dd>Claude API · Playwright MCP · AI-assisted test generation</dd>
        </div>
        <div class="skill-group">
          <dt>Methodologies</dt>
          <dd>Agile/Scrum · Risk-Based Testing · Regression Strategy · TDD/BDD</dd>
        </div>
      </dl>
    </div>

    <div class="resume-section">
      <h2>Professional Experience</h2>

      <div class="job">
        <div class="job-header">
          <span class="job-company">First Digital Finance Corporation (FDFC)</span>
          <span class="job-meta">Remote (Philippines) · Aug 2024 – Present</span>
        </div>
        <div class="job-title">Senior QA Automation Engineer</div>
        <ul>
          <li>Lead test automation maintenance for the Android automation team using Appium and WebdriverIO.</li>
          <li>Expand automated regression coverage within an existing mobile framework, improving release confidence across Android, web, and iOS.</li>
          <li>Execute regression test suites per release using BrowserStack across multiple device configurations.</li>
          <li>Review and approve merge requests across Android, web, and iOS automation repositories.</li>
          <li>Concurrent: advising 1–2 early-stage projects on automation strategy and framework setup on a part-time basis.</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-company">Harver (formerly LaunchPad Recruits)</span>
          <span class="job-meta">Remote · Jan 2019 – Aug 2024 (5.5 years)</span>
        </div>
        <div class="job-title">QA Automation Engineer → Automation Lead</div>
        <ul>
          <li>Built the company's automated regression suite from scratch — ~200 test cases covering ~80% of regression scope.</li>
          <li>Reduced regression cycle time by ~93%: from 2–3 days of manual effort to under 3 hours of automated runs.</li>
          <li>Promoted to Automation Lead, overseeing 1–2 QA engineers, setting automation standards, and leading code reviews.</li>
          <li>Integrated automation into CI/CD pipelines, enabling continuous regression runs before each release.</li>
          <li>One of two employees retained by Harver post-acquisition; led migration of LaunchPad's automation suite to Harver's platform.</li>
          <li>Implemented API validations supporting end-to-end scenarios across multiple service integrations.</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-company">RightCrowd Software Inc.</span>
          <span class="job-meta">Pasig, Philippines · Aug 2017 – Dec 2018</span>
        </div>
        <div class="job-title">Senior Software QA Automation Engineer</div>
        <ul>
          <li>Enhanced Selenium-based automation framework, increasing regression coverage for access management workflows.</li>
          <li>Executed integration and system testing across multiple environments.</li>
          <li>Performed SQL database validation ensuring data integrity across identity and access records.</li>
        </ul>
      </div>

      <div class="job">
        <div class="job-header">
          <span class="job-company">IBM Solutions Delivery Inc.</span>
          <span class="job-meta">Quezon City, Philippines · Sep 2011 – Aug 2017 (6 years)</span>
        </div>
        <div class="job-title">Senior IT Specialist, Test &amp; Development</div>
        <ul>
          <li>Senior contributor on enterprise application delivery projects for IBM's global clients across the full SDLC.</li>
          <li>Developed test cases, technical/functional specifications, and estimates across multiple client engagements.</li>
          <li>Developed automated test suites and contributed to framework design.</li>
          <li>Assumed lead responsibilities on delegation from Project Manager, overseeing quality of team deliverables.</li>
        </ul>
      </div>
    </div>

    <div class="resume-section">
      <h2>Education &amp; Training</h2>
      <div class="job">
        <div class="job-header">
          <span class="job-company">De La Salle University – Dasmariñas (DLSU-D)</span>
          <span class="job-meta">2003</span>
        </div>
        <div class="job-title">BS Computer Science</div>
      </div>
      <div class="job" style="margin-top:12px;">
        <div class="job-title" style="margin-bottom:6px;">Professional Development (IBM Global Business Services)</div>
        <ul>
          <li>DevOps Technical Workshop — August 2016</li>
          <li>LEAN Workshop — March 2015</li>
          <li>Taking the Stage: Women Leadership Seminar — August 2014</li>
        </ul>
      </div>
    </div>

    <div class="resume-section">
      <h2>Links</h2>
      <div class="contact-line" style="font-size:13px;color:#6b7280;">
        <a href="https://linkedin.com/in/nourileesantos">LinkedIn</a>
        <a href="https://github.com/nourilee">GitHub (nourilee)</a>
        <a href="https://github.com/santosn-qa">GitHub (santosn-qa)</a>
        <a href="https://nourilee.github.io/about-me">Portfolio</a>
        <a href="https://nourilee.github.io/qa-handbook">QA Handbook</a>
      </div>
    </div>

  </div>

</body>
</html>
```

- [ ] **Step 2: Verify resume.html in browser**

Open `resume.html`. Check:
- Clean single-column layout with purple accent line
- All four jobs render with correct dates and bullets
- Skills grid renders in multiple columns
- "Print / Save as PDF" button triggers browser print dialog
- "Back to Portfolio" link works

- [ ] **Step 3: Commit**

```bash
git add resume.html
git commit -m "feat: add print-optimized resume.html from rewritten content"
```

---

## Task 9: Generate resume.pdf

**Files:**
- Regenerate: `resume.pdf`

- [ ] **Step 1: Generate PDF via headless Chrome**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --print-to-pdf="/Users/nourileesantos/Projects/about-me/resume.pdf" \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  "file:///Users/nourileesantos/Projects/about-me/resume.html"
```

Expected output: `Printing URL: file:///...resume.html` and `resume.pdf` appears in project root.

- [ ] **Step 2: Verify PDF**

```bash
ls -lh resume.pdf
```

Expected: file exists, size > 50KB.

Open `resume.pdf` to visually confirm layout renders correctly — all sections visible, no truncation, purple accent heading lines present.

- [ ] **Step 3: Commit**

```bash
git add resume.pdf
git commit -m "feat: regenerate resume.pdf from updated resume.html"
```

---

## Task 10: Final Wiring & Verification

- [ ] **Step 1: Remove old Hyperspace JS files from index.html if still referenced**

Check each HTML file for any lingering references to old JS files:

```bash
grep -r "scrollex\|scrolly\|breakpoints\|util.js\|noscript" \
  index.html automation.html ai-for-qa.html consulting.html artifacts.html resume.html
```

Expected: no matches. If any found, remove those `<script>` tags.

- [ ] **Step 2: Cross-page navigation smoke test**

Open `index.html` in browser and click through every nav link:
- Automation → `automation.html` loads
- AI for QA ✦ → `ai-for-qa.html` loads
- Consulting → `consulting.html` loads
- Work → `artifacts.html` loads
- Contact → scrolls to contact form on index
- Logo → returns to index
- "Back to Home" in footer of each page → returns to index

- [ ] **Step 3: Dark mode persistence test**

1. Open `index.html`, toggle to dark mode
2. Navigate to `automation.html` — should still be in dark mode
3. Reload the page — should still be in dark mode (localStorage persisted)
4. Toggle back to light — should persist back to light

- [ ] **Step 4: Mobile responsiveness check**

Open DevTools → toggle device toolbar → set to 375px width. Check:
- Stats bar wraps to 2×2 grid
- Pillar cards stack vertically
- Nav links hide (acceptable — mobile nav enhancement is out of scope)
- Hero text and buttons remain readable

- [ ] **Step 5: Final commit**

```bash
git add -A
git status
git commit -m "feat: complete portfolio redesign — custom CSS, light/dark, AI for QA, new resume"
```

---

## Self-Review Notes

- All 5 main pages (index, automation, ai-for-qa, consulting, artifacts) covered ✓
- resume.html + PDF generation covered ✓
- No company names on site pages (only resume.html which is appropriate) ✓
- No "Available for consulting" anywhere ✓
- "In Progress" badges on AI projects, no "Local" ✓
- Dark mode toggle in all navs using same `theme.js` + `toggleTheme()` ✓
- Both GitHub repos linked in ai-for-qa.html and artifacts.html ✓
- Google Form embed preserved in index.html ✓
- QA Handbook link preserved in automation.html and index.html contact section ✓
- Resume download button on index.html hero links to `resume.pdf` with `download` attribute ✓
- All CSS class names used in HTML match definitions in main.css ✓
