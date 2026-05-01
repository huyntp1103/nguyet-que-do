# CLAUDE.md — Nguyệt Quế Đỏ

Static Vietnamese website for the "Nguyệt Quế Đỏ" program at THPT Chuyên Quốc Học – Huế (selects representatives for "Đường lên đỉnh Olympia"). Live at <https://nguyetquedo.com>.

## TL;DR for Claude

- **Stack**: plain HTML5 + CSS3 + jQuery 3.x + Bootstrap 4 + Owl Carousel 2 + Font Awesome 4.7. No build step. No framework. No package manager.
- **Language of UI content**: Vietnamese (`<html lang="vi">`). Keep user-facing strings in Vietnamese; comments/code identifiers in English are fine.
- **Hosting**: GitHub Pages (CNAME → `nguyetquedo.com`). Just commit + push to `main` to deploy.
- **Run locally**: any static file server from repo root, e.g. `python3 -m http.server 8000` then open `http://localhost:8000/`.
- **Don't**: introduce a build system, npm dependencies, frameworks (React/Vue/etc.), TypeScript, CSS preprocessors, or bundlers. Don't replace jQuery with vanilla JS in existing files unless asked.
- **Do**: follow the existing patterns. New pages copy the structure of existing ones. Use CSS variables, `rem` units, the navbar/footer placeholder pattern, and JSON-driven content where applicable.

## Where to look

Detailed conventions live in [.claude/](.claude/). Read the file that matches the task — don't load all of them.

- [.claude/architecture.md](.claude/architecture.md) — repo layout, page types, asset loading model, base-path scheme
- [.claude/html-conventions.md](.claude/html-conventions.md) — page template, meta/SEO, section patterns, navbar/footer wiring
- [.claude/css-conventions.md](.claude/css-conventions.md) — color variables, typography, breakpoints, utility classes
- [.claude/js-conventions.md](.claude/js-conventions.md) — jQuery patterns, components loader, animations, JSON loading
- [.claude/data.md](.claude/data.md) — JSON schemas (`timeline.json`, `testimonials.json`)
- [.claude/images.md](.claude/images.md) — image folders, naming, sponsor lines
- [.claude/workflows.md](.claude/workflows.md) — recipes: add a new page, new season, new sponsor, new timeline entry, new testimonial
- [.claude/seasons.md](.claude/seasons.md) — season inventory (I–VII), wiki page conventions
- [.claude/gotchas.md](.claude/gotchas.md) — **read before "fixing" anything that looks broken or redundant** (intentional weirdness)
- [.claude/commit-style.md](.claude/commit-style.md) — commit message conventions used in this repo

## Quick orientation

```text
index.html              → homepage
co-cau-nhan-su.html     → org-structure page (root-level)
wiki/nguyet-que-do*.html → wiki overview + per-season pages (one level deep, use ../ paths)
components/             → navbar.html, footer.html (loaded dynamically via components.js)
css/                    → global.css holds variables/typography/utilities; one file per section
js/                     → vanilla jQuery; components.js loads navbar/footer; animation.js drives scroll effects
jsons/                  → timeline.json, testimonials.json (homepage data)
images/                 → themes/, intro/, humans/, sponsor/line-{1..4}/, testimonials/, nqd-{i..vii}/
fonts/                  → SVN-Gotham (Book + Bold)
```

## Hard rules (do not violate)

1. **CSS variables, not hex literals.** Use `var(--red)`, `var(--yellow)`, etc. from `css/global.css`. See [.claude/css-conventions.md](.claude/css-conventions.md).
2. **`rem` units for typography**, so the global `html { font-size }` breakpoints scale text correctly.
3. **Navbar + footer are dynamic.** Pages must include `<div id="navbar-placeholder"></div>` and `<div id="footer-placeholder"></div>` and load `js/components.js`. Never inline navbar/footer markup into a page.
4. **`{BASE_PATH}` placeholder** in component HTML is required for assets that need to resolve from both root pages and `/wiki/` pages. `components.js` substitutes it.
5. **Wiki pages live in `/wiki/` and reference assets with `../`** prefixes for CSS/JS/images.
6. **Every page** needs the standard SEO/OG meta block and the anti-inspect script (kept consistent with existing pages — see [.claude/html-conventions.md](.claude/html-conventions.md)).
7. **All `<img>` need `alt` text in Vietnamese.**
8. **Nav-link highlighting** uses `data-page="<slug>"`; the slug must match the URL segment.
9. **Don't commit secrets, API keys, or analytics IDs** beyond what's already in the repo (AdSense pub ID is intentional, public).
10. **Don't add a `package.json`, `node_modules/`, or build tooling.** This is a zero-build static site by design.

## Important context

- **Anti-inspect script** (disables right-click, F12, Ctrl+Shift+I, Ctrl+U) is in every page's `<head>`. Keep it. It's a soft deterrent, not real security.
- **Ads** (AdSense `ca-pub-7685319641265970`) are currently disabled (commented out) on the homepage. Wiki pages may have ad blocks. Don't unilaterally re-enable or remove without instruction.
- **GitHub Pages serves URLs without `.html`**, so internal links use forms like `/wiki/nguyet-que-do-vii` (no extension).
- **`nguyetquedo.com` absolute links** are used throughout the navbar and inter-page links — preserve this when editing.

## When you're unsure

- Find the closest existing example (another season's wiki page, another section in `index.html`) and mirror its structure.
- If a task isn't covered by the files in `.claude/`, ask before inventing a new pattern.
