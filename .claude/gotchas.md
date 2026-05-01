# Gotchas

Things in this repo that look broken, redundant, or weird — but are intentional. **Read before "fixing".** If a teammate ever pushed a "cleanup" commit that broke prod, it was probably one of these.

---

## 1. Anti-inspect script in every page `<head>`

```js
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(event) {
  if (event.key === 'F12' ||
      (event.ctrlKey && event.shiftKey && event.key === 'I') ||
      (event.ctrlKey && event.key === 'U')) {
    event.preventDefault();
  }
});
```

Looks like hostile UX. It's a deliberate soft deterrent against casual right-click "Save As" / view-source / inspect. It is **not** real security and will not stop anyone determined.

**Don't remove it** unless explicitly asked. **Do** include it in any new page for consistency. To open DevTools yourself during local dev, use the browser menu (⋮ → More tools → Developer Tools).

---

## 2. AdSense scripts are commented out — not deleted

In `index.html` around lines 121–133 there's a commented-out `<ins class="adsbygoogle">` block, and the page still declares `<meta name="google-adsense-account" content="ca-pub-...">`. Wiki pages may have ad blocks live.

This is intentional state, captured by the commit `feat(ads): disable ads`. Don't delete the commented block (it's there to be re-enabled), and don't strip the `google-adsense-account` meta — AdSense ownership verification depends on it.

**Don't** "clean up dead code" here. **Don't** unilaterally re-enable ads.

---

## 3. Sponsor line-1 has duplicate logos

`index.html` `.line-1-sponsor` lists `HOA_NGHIEM_BRIDAL` and `ANI` **twice each**. Looks like a copy-paste bug. It isn't.

Owl Carousel's `loop: true` needs enough items to fill the viewport before it can rotate. Line-1 currently has only 2 unique sponsors; doubling them gives the carousel 4 slots so the loop animation works smoothly. When more line-1 sponsors are added, the duplicates can be removed — but only when the unique count exceeds the largest responsive `items` value (currently 4 at `≥768px`, see `js/sponsor.js`).

**Don't** dedupe blindly.

---

## 4. Internal navigation uses absolute `https://nguyetquedo.com/...` URLs

Look at `components/navbar.html` and most inter-page links — they're absolute, not relative. Locally this means clicking a navbar link **jumps to production**, which feels broken in dev.

This is an intentional choice (consistent canonicalization, simpler with the `data-page` slug detection in `components.js`). To test navigation locally, manually edit the URL in the address bar or temporarily rewrite a link.

**Don't** rewrite navbar links to relative URLs.

---

## 5. `{BASE_PATH}` placeholders in component HTML

`components/navbar.html` and `components/footer.html` contain literal `{BASE_PATH}` strings:

```html
<img src="{BASE_PATH}images/themes/Logo-Que.png" />
```

If you preview these files directly in a browser, the image 404s. That's expected — `js/components.js` substitutes `{BASE_PATH}` with `''` (root pages) or `'../'` (wiki pages) at load time.

**Don't** "fix" the broken-looking placeholder by hardcoding a path. It must remain `{BASE_PATH}` so the same component HTML works from both `/index.html` and `/wiki/*.html`.

---

## 6. Active nav link's `href` is rewritten to `#`

`js/components.js` `highlightCurrentPage()` does `link.setAttribute('href', '#')` for the matching `data-page`. That looks like a bug ("clicking the current page link goes to top of page instead of the page itself"). It's intentional — when you're already on the page, the link becomes a no-op anchor + the smooth-scroll handler in `home-script.js` cancels the default jump for non-wiki/non-cocau links anyway.

**Don't** rewrite the loader to keep the original `href`.

---

## 7. SVN-Gotham `@font-face` declares the same `.otf` for every `format(...)`

`css/global.css`:

```css
src: url('.../SVN-Gotham-Bold.otf');
src: url('.../SVN-Gotham-Bold.otf') format('embedded-opentype'),
     url('.../SVN-Gotham-Bold.otf') format('woff2'),
     url('.../SVN-Gotham-Bold.otf') format('woff'),
     url('.../SVN-Gotham-Bold.otf') format('truetype'),
     url('.../SVN-Gotham-Bold.otf') format('opentype');
```

It's the same OTF file claimed as five different formats. This is technically wrong — the browser ends up using the first one it can decode (OpenType). It works in every modern browser. Converting the font to actual woff2/woff would be an *improvement*, not a *fix* — touch only if asked, and verify the licensed font allows redistribution in those formats.

**Don't** delete the redundant `src:` declarations thinking they're a typo.

---

## 8. JSON paths in `js/load-data.js` are root-relative (no `../`)

```js
$.getJSON('jsons/testimonials.json', ...)
$.getJSON('jsons/timeline.json', ...)
```

This works on `index.html` (root) but would 404 from any `/wiki/` page. Intentional — the testimonials and timeline carousels are **homepage-only** features. The script is just not loaded from wiki pages.

**Don't** "fix" the path to `../jsons/...` or use `window.location` to compute it. If you ever do need this data on a wiki page, write a basePath-aware helper instead of mutating the existing strings.

---

## 9. Testimonial carousel indicators are hardcoded to 5

`index.html` (`#testimonial-carousel .carousel-indicators`) has exactly **5** `<li>` elements with `data-slide-to="0..4"`, but the actual slides come from `jsons/testimonials.json` at runtime. If the JSON has more or fewer than 5 entries, indicators will be wrong (extra dots that target nothing, or missing dots for some slides).

This is brittle by design — the maintainer keeps the JSON at exactly 5 entries. When updating testimonials, **either** keep it at 5, **or** update the indicator `<ol>` count to match. See [data.md](data.md).

---

## 10. `js/animation.js` references an undeclared `observer` inside callbacks

Each block declares `slideUpObserver` / `slideDownObserver` / `slideLeftObserver` / `slideRightObserver`, but the callback body calls `observer.unobserve(entry.target)` — without the directional prefix. This is a genuine bug carried over from a copy-paste. The `classList.add(...)` line runs first, so the animation still triggers; the failed `unobserve` throws but doesn't visibly break anything because the elements only intersect once anyway.

**Status**: known bug, but harmless. If you fix it, fix all four blocks at once and verify in DevTools that no ReferenceErrors fire on scroll. Not a priority — flagged here so a future reader doesn't think it's something they just broke.

---

## 11. The 2020 season gap is not a missing file

There is no Nguyệt Quế Đỏ 2020 — Season III ran in 2021 due to COVID-19. The season list goes I (2018), II (2019), III (2021), IV (2022), V (2023), VI (2024), VII (2025). If someone reports "the 2020 wiki page is missing," that's expected.

---

## 12. `body { padding-top: 5rem }` for the fixed navbar

`global.css` adds `padding-top: 5rem` on `body` to keep content out from under the fixed navbar. If you remove the navbar's `position: fixed` (e.g., experimenting with sticky), update this padding too — otherwise pages get a giant blank gap up top.

---

## 13. No build step — keep it that way

There's no `package.json`, no `node_modules/`, no bundler, no postcss. CSS and JS files are loaded as-is. Adding any tooling is a behavior change, not a refactor; don't introduce it without discussion.

The site is hosted on GitHub Pages directly from `main` — `git push` is the deploy, no CI runs anything.

---

## 14. `co-cau-nhan-su.html` is at the **root**, not under `/wiki/`

It's a content page about org structure but lives next to `index.html`, not in the wiki tree. `components.js` has a special branch for it (`else if (pathname.includes('/co-cau-nhan-su'))`). If you ever move it into `/wiki/`, you must update `components.js` and every absolute link.

---

## 15. `wiki/nguyet-que-do.html` is the wiki *overview*, not a season

Don't confuse it with the season pages (`-i`, `-ii`, …, `-vii`). It carries the all-seasons Olympia contestants table and the list of season links. Treat it as the wiki home page.
