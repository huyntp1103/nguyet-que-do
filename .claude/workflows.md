# Common Workflows

Cookbook for the recurring tasks on this site. Each recipe lists exactly which files to touch.

---

## Add a new top-level page

Example: a "Contestants" page at `/contestants.html`.

1. **Copy** `co-cau-nhan-su.html` as the starting template (closest cousin).
2. **Rename** the file to `contestants.html` at repo root.
3. Update in the `<head>`:
   - `<title>` and the `<meta name="description">`
   - Page-specific keywords if relevant
4. Keep the **anti-inspect script**, **navbar/footer placeholders**, and the standard CSS/JS imports.
5. **Add navigation** in `components/navbar.html`:
   - New `<li class="nav-item"><a class="nav-link" href="https://nguyetquedo.com/contestants" data-page="contestants">Contestants</a></li>`
   - The `data-page` slug must equal the file basename (without `.html`).
6. **Update `js/components.js`** if the URL pattern is non-standard (root pages without `.html` like `/contestants` work automatically; subdirectory pages need a new branch in the path detection).
7. **Test** by serving the site locally and clicking the new nav link.

---

## Add a new wiki season (e.g., Nguyệt Quế Đỏ VIII)

1. **Copy** `wiki/nguyet-que-do-vii.html` → `wiki/nguyet-que-do-viii.html`. Don't start from scratch.
2. Update the page in place:
   - `<title>`, descriptions, headings, year, contestant names, photos.
3. **Create** `images/nqd-viii/` and add the season's images there. Reference them with `../images/nqd-viii/...`.
4. **Add to the navbar** (`components/navbar.html`) inside the **Wiki** dropdown:
   ```html
   <li class="nav-item">
     <a class="nav-link" href="https://nguyetquedo.com/wiki/nguyet-que-do-viii" data-page="nguyet-que-do-viii">Nguyệt Quế Đỏ VIII</a>
   </li>
   ```
5. **Update the wiki overview** (`wiki/nguyet-que-do.html`):
   - Add a `<li>` link under "Các mùa Nguyệt Quế Đỏ".
   - Add new contestant rows to the Olympia table if applicable.
6. **Update homepage stats** (`index.html` `#stats`) only if the totals changed (sponsors, contestants, finals, TV bridges).
7. **Add a timeline entry** in `jsons/timeline.json` for the new season's final.
8. (Optional) **Add a testimonial** in `jsons/testimonials.json`. If so, also bump the indicator `<ol>` count in `index.html`.

---

## Add a new sponsor logo

1. Place the logo in the right tier folder: `images/sponsor/line-{1..4}/{NAME}.png` (UPPERCASE_UNDERSCORE filename).
2. In `index.html`, find the matching `.line-N-sponsor .owl-carousel` block and append:
   ```html
   <div class="sponsor-logo">
     <img src="images/sponsor/line-N/NAME.png" alt="{Brand name}" class="sponsor-image" />
   </div>
   ```
3. If the logo's aspect ratio looks off, add an inline width override (`style="width: 70%"`) — match the existing pattern.
4. Update the homepage stats counter for "Đối tác đồng hành" if the total partner count changed.

---

## Add a new timeline entry

1. Append to `jsons/timeline.json`:
   ```json
   { "year": "DD/MM/YYYY", "title": "<strong>Name</strong> achievement description" }
   ```
2. Keep entries in chronological order (the array order is the visual order).
3. Validate JSON (no trailing commas).

---

## Add a new testimonial

1. Crop a square avatar; save as `images/testimonials/{Name}.jpg` (kebab-case, e.g. `Phan-Le-Thuc-Bao.jpg`).
2. Append to `jsons/testimonials.json`:
   ```json
   {
     "avatarUrl": "images/testimonials/Name.jpg",
     "name": "Bạn Tên Đầy Đủ",
     "role": "Quán quân",
     "company": "Nguyệt Quế Đỏ X",
     "projectPrefix": "Currently at",
     "project": "Some Org",
     "quote": "Vietnamese quote.<br>Second paragraph."
   }
   ```
3. **Update the indicator count** in `index.html` (`#testimonial-carousel .carousel-indicators`):
   ```html
   <li data-target="#testimonial-carousel" data-slide-to="N" class="active"></li>
   ```
   The number of `<li>` elements must equal the number of testimonials.

---

## Update homepage stats numbers

Stats are hardcoded in `index.html` `#stats` section as `<p class="stats-number">N</p>`. The number animates from 0 to N via `js/home-script.js`. To update: edit the four numbers in `index.html`. No JS/CSS changes needed.

Existing labels:

- `Thí sinh dự thi` (Contestants)
- `Đối tác đồng hành` (Sponsors)
- `Vòng nguyệt quế` (Laurel wreaths / finals)
- `Cầu truyền hình` (TV broadcast bridges)

---

## Update navbar / footer

Edit `components/navbar.html` or `components/footer.html` directly. Remember:

- Use `{BASE_PATH}` for any local asset `src`/`href` so it resolves on both root and `/wiki/` pages.
- Internal page links use absolute `https://nguyetquedo.com/...` URLs (preserve the existing pattern).
- New page links inside the Wiki dropdown should carry a `data-page` attribute matching their slug.

No need to touch every page — components load dynamically.

---

## Local preview

```bash
cd nguyet-que-do
python3 -m http.server 8000
# open http://localhost:8000/
```

Test:

- The navbar/footer load and show the active page in bold.
- Wiki page assets resolve (no 404 in DevTools network tab — open DevTools manually since the anti-inspect script tries to block it; on Chrome you can open via menu).
- JSON-driven sections (timeline, testimonials) populate.
- Sponsor carousels auto-scroll.

---

## Deploy

`git push origin main`. GitHub Pages serves from the default branch with the `CNAME` file pinning `nguyetquedo.com`. There is no preview environment.

Before pushing:

```bash
git status
git diff
# Manually verify the changed page in a browser.
```
