# Portfolio Redesign — Design Spec
**Date:** 2026-06-09  
**Project:** nourilee.github.io/about-me

---

## Goal

Redesign Nourilee Santos's personal portfolio from the generic Hyperspace HTML5 UP template into a distinctive, custom-built site that:
- Positions her as **Senior QA Automation Engineer + AI-Augmented QA practitioner**, not just a "QA tester"
- Speaks to two audiences simultaneously: **consulting clients** (teams needing automation help) and **employers/recruiters** (senior engineering roles)
- Surfaces key metrics as the immediate hook: 10+ years, 93% faster regression, 80% coverage
- Introduces a credible **"AI for QA"** track featuring her Claude + Appium and Playwright MCP work
- Delivers an updated, downloadable **resume PDF** generated from rewritten content
- Includes a **light/dark mode toggle**

---

## What We're NOT Changing

- The Google Form contact embed (stays in contact section)
- Social links (GitHub, LinkedIn, Twitter, Instagram, Facebook)
- QA Handbook link (nourilee.github.io/qa-handbook)
- Domain / deployment (GitHub Pages, same repo)

---

## Privacy Rules (Applied Throughout)

- **No employer names** anywhere in the site — current role described as "Senior engineering role in fintech"
- **No client names** — work described by outcomes and stack, not by company
- **No "Available for consulting"** badge — role title carries positioning without telegraphing availability
- **AI projects tagged "In Progress"** only — no location/source implied

---

## Site Structure

| File | Status | Purpose |
|------|--------|---------|
| `index.html` | Full rebuild | Home — nav, hero, stats bar, 3 pillars, contact, footer |
| `automation.html` | Full rebuild | Test Automation detail page |
| `ai-for-qa.html` | **New** | AI for QA — Claude+Appium, Playwright MCP, GitHub links |
| `consulting.html` | **New** | Consulting — what's offered, how to engage |
| `artifacts.html` | Full rebuild | Portfolio demos — cleaned layout, GitHub repo links |
| `resume.html` | **New** | Print-optimized HTML resume (source for PDF generation) |
| `resume.pdf` | Regenerate | Generated from `resume.html` via headless Chrome |
| `assets/css/main.css` | Full rebuild | Single custom CSS file replacing Hyperspace CSS |

**Removed dependencies:** jQuery, Hyperspace JS files (`scrollex`, `scrolly`, `browser`, `breakpoints`, `util`, `main.js`). Replaced with minimal vanilla JS for the dark mode toggle.

---

## Design System

### Color Palette

```css
/* Gradient — used for headings, buttons, accent bars */
--gradient-start: #7c3aed;   /* purple */
--gradient-mid:   #2563eb;   /* blue */
--gradient-end:   #0ea5e9;   /* sky */

/* Light mode */
--bg:        #f8fafc;
--surface:   #ffffff;
--border:    #e5e7eb;
--text:      #111827;
--muted:     #6b7280;
--subtle:    #9ca3af;
--ai-tint:   #faf5ff;        /* purple-tinted card bg */

/* Dark mode */
--bg:        #0f0c1d;
--surface:   #13111f;
--border:    rgba(255,255,255,0.08);
--text:      #f9fafb;
--muted:     rgba(255,255,255,0.55);
--subtle:    rgba(255,255,255,0.3);
--ai-tint:   rgba(124,58,237,0.12);
```

### Typography
- **Font stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` (no web font overhead)
- **Hero headings:** 800 weight, gradient text via `-webkit-background-clip: text`
- **Body:** 400 weight, 16px base, 1.7 line-height
- **Labels/tags:** 700 weight, uppercase, letter-spacing: 0.5px

### Key Components
- **Gradient top bar:** 3px `height`, full width, always visible
- **Stats bar:** 4 equal columns — 10+, 93%, 80%, AI✦QA — below the hero, gradient text
- **Section cards:** white surface, 1px border, 3px colored top border accent, subtle shadow
- **Mode toggle:** pill in nav, ☀️/🌙 icons, CSS variables swap on `[data-theme="dark"]`
- **CTA buttons:** primary = gradient fill; secondary = gradient outline

---

## Page Designs

### `index.html` — Home

1. **Gradient top bar** (3px)
2. **Nav:** `nourilee.santos` wordmark left | Automation · AI for QA ✦ · Consulting · Work · Contact right | mode toggle
3. **Hero:** Role badge ("Senior QA Automation Engineer · AI-Augmented QA") → H1 "Hi, I'm Nourilee. / I build quality into systems — now with AI." → tagline (no employer names, mentions "senior engineering role in fintech") → two CTAs: "View My Work" + "⬇ Download Resume"
4. **Stats bar:** 10+ Years | 93% Faster Regression | 80% Regression Coverage | AI✦QA
5. **Three pillars section:** "What I Do" label → H2 "Automation. AI. Quality." → 3 cards:
   - ⚙️ Test Automation (purple top border)
   - 🤖 AI for QA ✦ (purple/blue gradient card, "NEW" badge, highlighted)
   - 🤝 Consulting (blue top border)
6. **Contact teaser:** dark gradient band → "Let's work together." → email/LinkedIn/GitHub → "Send a Message" button scrolls to contact form
7. **Contact section:** Google Form embed (existing) + contact details
8. **Footer:** copyright + URL

### `automation.html` — Test Automation

- Same nav + gradient bar
- Page hero: "Test Automation" H1 + lead paragraph
- **What I've Built** section: bullet outcomes — company names replaced with role descriptions: "At a recruitment SaaS startup (5.5 years)...", "At a fintech mobile platform...", "At an enterprise security platform...", "At a global enterprise consultancy (6 years)..."
- **Core Stack** section: tech tags grid (Playwright, Selenium, WebdriverIO, Appium, JS, Java, REST API, CI/CD tools)
- **Approach** paragraph (from current site, kept)
- CTA links to QA Handbook + GitHub

### `ai-for-qa.html` — AI for QA (New)

- "IN DEVELOPMENT" role badge
- H1: "AI-Augmented QA" (gradient text)
- Intro paragraph: why AI is the next lever for QA
- **What I'm Building:** two project cards
  - 🤖 Claude-Powered Appium Framework (badge: "In Progress") — description, tags: Claude API, Appium, WebdriverIO, JavaScript
  - 🔍 Playwright MCP — Exploratory Testing (badge: "In Progress") — description, tags: Playwright MCP, Claude, Exploratory QA
- **Why This Matters** callout box
- **Explore My GitHub** card: two dark buttons linking to github.com/nourilee and github.com/santosn-qa

### `consulting.html` — Consulting (New)

- H1: "Select Consulting Engagements"
- Lead: who this is for — teams starting from zero, inheriting an untrusted framework, or needing strategy before building
- Copy adapted from resume-rewrite.md consulting mention: "Advising early-stage projects on automation strategy and framework setup on a part-time basis"
- **What I help with:** 3 service cards
  - Framework setup from scratch (web, mobile, API)
  - Automation strategy + risk-based coverage planning
  - Team uplift — code review, standards, mentoring
- **How it works:** 3-step process: reach out → scoping call → engagement
- Contact CTA → scrolls to Google Form

### `artifacts.html` — Portfolio Demos

- H1: "Sample Work"
- Clean card layout for each demo (replacing broken iframe-heavy layout):
  - WebdriverIO + Cucumber.js demo (link + description)
  - Selenium + Java + Cucumber demo (link + description)
  - IBM i Test Automation POC (Scribd embed, kept)
- GitHub exploration CTA (both repos)

### `resume.html` — Printable Resume (New)

- Print-optimized single-column layout, no nav/footer
- Content sourced from `resume-rewrite.md`:
  - Header: name, title, location, contact, links
  - Professional Summary
  - Core Technical Skills
  - Professional Experience (4 roles, outcomes-focused, no company confidentiality issues — these are already in the rewrite doc)
  - Education & Training
- `@media print` CSS removes all UI chrome
- Used as source for `resume.pdf` generation

---

## Resume PDF Generation

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless \
  --print-to-pdf=/Users/nourileesantos/Projects/about-me/resume.pdf \
  --no-pdf-header-footer \
  --print-to-pdf-no-header \
  file:///Users/nourileesantos/Projects/about-me/resume.html
```

Run after `resume.html` is built. Output replaces existing `resume.pdf`.

---

## Content Rules

- **Metrics always sourced from resume-rewrite.md:** 10+ years, ~93% regression reduction (2–3 days → under 3 hours), ~80% regression coverage, ~200 test cases
- **Company names in resume.html only** — nowhere else on the site
- **AI projects:** described accurately as in-progress, no overclaiming
- **Hero tagline (locked):** "I build quality into systems — now with AI."

---

## Technical Notes

- Single `assets/css/main.css` — CSS custom properties handle both themes
- Dark mode toggle: `document.documentElement.setAttribute('data-theme', 'dark')` — persisted to `localStorage`
- No jQuery, no Hyperspace JS — vanilla JS only (~20 lines)
- All pages: responsive, mobile-friendly grid collapses to single column
- Existing images (`me.jpg`, stock photos) reused where relevant; no new images required
- `resume.pdf` download: `<a href="resume.pdf" download>` on the hero button
