# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary: employers and recruiters** filling senior or lead QA automation roles. They are screening a candidate, usually from a LinkedIn profile, an application, or a shared link, often with little time. Their job is to decide quickly whether Nourilee is credible at senior level: real experience, measurable outcomes, a current stack, and work they can inspect.

**Secondary: consulting prospects.** These are engineering or QA leads at teams starting automation from zero, inheriting a framework nobody trusts, or needing a strategy before they build. Where the two audiences pull in different directions, the employer audience wins.

## Product Purpose

A personal portfolio and resume site for Nourilee Santos, Senior QA Automation Engineer and AI-augmented QA practitioner, hosted at nourilee.github.io/about-me. It presents 10+ years of building test automation from scratch across web, mobile, and API, plus current AI-for-QA work.

Success means the visitor goes on to inspect or follow up:
- opens the GitHub repos, live demo reports, or the QA Handbook;
- downloads `resume.pdf` (tracked as a GA4 event);
- connects on LinkedIn.

The contact form and email still exist, but they are not the measure of success.

## Positioning

Nourilee builds automation suites from nothing that last. The proof is concrete: a ~200-case regression suite covering ~80% of regression scope, which cut cycles from 2–3 days to under 3 hours (~93%). Nourilee grew into Automation Lead and was retained after an acquisition specifically to migrate the suite. That record is now being extended into AI-augmented QA: a Claude-powered Appium framework and Playwright MCP exploratory testing. The position is senior-hands-on, not "QA tester": frameworks that run in CI and that the inheriting team can extend.

## Operating Context

- Visitors arrive from LinkedIn, job applications, GitHub, and direct links. They skim the hero and stats, then go into a detail page or straight to the resume.
- Pages: `index.html` (home), `automation.html`, `ai-for-qa.html`, `consulting.html`, `artifacts.html` (sample work), `resume.html` (print source), `resume.pdf`. `elements.html`, `generic.html`, and `iseries.html` are leftovers from the Hyperspace template.
- External destinations: github.com/nourilee, github.com/santosn-qa, nourilee.github.io/qa-handbook, linkedin.com/in/nourileesantos, and a Google Form embed for contact.
- The site has a light/dark theme toggle, persisted in `localStorage`.

## Capabilities and Constraints

- **Stack (binding):** plain static HTML/CSS with minimal vanilla JS, deployed to GitHub Pages from this repo. No framework, no build step, no jQuery.
- **Analytics (binding):** Google Analytics 4 and Microsoft Clarity are on every page, along with event tracking (such as resume download clicks). Any change must keep them working.
- **Resume pipeline (binding):** `resume.pdf` is always regenerated from `resume.html` with headless Chrome. The two must stay in sync, and `resume.html` stays print-optimized.
- **Privacy rules (binding):**
  - No phone number in any page's HTML. It appears only in `resume.pdf`, injected by `scripts/build-resume-pdf.sh` from the git-ignored `.resume-phone`.
  - No employer or client names anywhere on the site except `resume.html`. Work is described by role context and outcomes, for example "a recruitment SaaS startup" or "a fintech mobile platform". The current role is "senior engineering role in fintech".
  - No "Available for consulting" badge. Consulting is framed as "select engagements".
  - AI projects are labeled "In Progress" only, with no overclaiming and no implied employer or source.
- **Metrics:** use only the sourced figures: 10+ years, ~93% regression reduction (2–3 days → under 3 hours), ~80% regression coverage, ~200 test cases.
- **Undecided:** whether to delete the leftover template pages (`elements.html`, `generic.html`, `iseries.html`).

## Brand Commitments

- Name and wordmark: Nourilee Santos / `nourilee.santos`.
- Role line: "Senior QA Automation Engineer · AI-Augmented QA".
- Locked hero tagline: "I build quality into systems — now with AI."
- Voice: first person, direct, and pragmatic. It favors outcomes over adjectives and is skeptical of "demo-ware".

## Evidence on Hand

- Outcome metrics and role history: `automation.html`, `resume.html`, `resume.pdf`.
- Public projects with case studies on `artifacts.html`: TaskFlow (nourilee/taskflow, the owner's own system under test), the Playwright auth-flow suite (live HTML report) and DemoQA TypeScript suite, Android Appium + WebdriverIO (nourilee/my-demo-appium), and Stripe payment flows in WebdriverIO + Cucumber.js and Selenium + Java + Cucumber. Also listed: Appium + SpecFlow (C#) and an IBM i automation POC on Scribd.
- Not for the site: private repositories, anything client- or employer-named (for example the Vitals repositories), and the Little Hello app (owner's choice).
- QA Handbook: nourilee.github.io/qa-handbook.
- No photo: the owner chose not to show a portrait on the site or in link previews (decided 2026-11-07).
- **Absent, so never fabricate:** testimonials, client logos or names, consulting case studies, pricing or rates, certifications not listed on the resume, and shipped results from the AI projects.

## Product Principles

1. **Proof over promise.** Every claim points to a metric, a repo, a report, or the resume.
2. **Senior signal first.** Design for a recruiter's quick scan: role, outcomes, and stack must be legible within seconds.
3. **Privacy is non-negotiable.** Outcomes and context, never names, outside the resume.
4. **Honest about what's in progress.** AI work is presented as current exploration, not finished product.
5. **Simple, durable, inspectable.** Static, fast, and maintainable by hand, much like the frameworks Nourilee builds.

## Accessibility & Inclusion

Target WCAG 2.2 AA across all pages and both themes, including any text placed over a gradient, keyboard and focus behavior for the nav and theme toggle, and a usable, readable printed resume.
