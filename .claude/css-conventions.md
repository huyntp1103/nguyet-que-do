# CSS Conventions

## Color palette (always use variables)

Defined in `css/global.css`:

```css
:root {
  --cream-white:  #ebe8e1;
  --cream-orange: #d6cdb0;
  --dark-orange:  #b85d36;
  --orange:       #e34a25;
  --dark-red:     #af2d03;
  --red:          #bb2126;
  --dark-yellow:  #ee9e2e;
  --yellow:       #fbb917;
  --dark-brown:   #913f2d;
  --gray:         #7a7a7a;
}
```

**Always reference via `var(--name)`**. Don't introduce new hex literals — if a new shade is needed, ask first or add it as a variable.

## Typography

- Family: `'SVN Gotham', 'Helvetica', sans-serif` (set globally on `*` in `global.css`).
- Custom font: SVN-Gotham, two weights — Book (`normal`) and Bold (`bold`). Files in `fonts/SVN-Gotham-{Bold,Book}/`.
- Base size on `<html>`:
  - `≥992px`: 16px
  - `768–991.98px`: 16px
  - `576–767.98px`: 14px
  - `<576px`: 12px
- **Use `rem`** for font sizes and most spacing so they scale with the breakpoint base size.

## Responsive breakpoints (Bootstrap 4)

```css
/* Large tablet */
@media screen and (max-width: 991.98px) { /* ≤lg */ }

/* Small tablet */
@media screen and (max-width: 767.98px) { /* ≤md */ }

/* Mobile */
@media screen and (max-width: 575.98px) { /* ≤sm */ }
```

Match this exact form when adding new media queries.

## Utility classes (defined in `global.css`)

### Section titles

| Class | Effect |
| --- | --- |
| `.section-title` | 2rem, bold, red, centered |
| `.section-sub-title` | 1.6rem, bold, orange, centered |
| `.stroke-title` | yellow fill with 1px red stroke (decorative) |

### Horizontal dividers

| Class | Color |
| --- | --- |
| `.horizontal-line-red` | red |
| `.horizontal-line-yellow` | yellow |
| `.horizontal-line-orange` | orange |

All are `width: 50%; height: 0.2rem; margin: 1rem auto;`.

### Scroll-in animations

Add the **base** class to the markup — `js/animation.js` adds the **trigger** class when the element enters viewport (threshold 0.5).

| Base | Trigger | Direction |
| --- | --- | --- |
| `.content-slide-up` | `.slide-up` | from bottom |
| `.content-slide-down` | `.slide-down` | from top |
| `.content-slide-left` | `.slide-left` | from left |
| `.content-slide-right` | `.slide-right` | from right |

The base class sets `opacity: 0` + a `transform`; the trigger reverts to `opacity: 1; transform: none;` over 0.5s.

## File organization

- **One CSS file per logical section** of the homepage (e.g. `intro.css`, `about.css`, `timeline.css`, `stats.css`, `sponsor.css`, `testimonials.css`, `social.css`).
- `wiki.css` is shared across all wiki pages.
- `humans.css` is for `co-cau-nhan-su.html`.
- Bootstrap and Owl Carousel CSS are vendored — **don't edit `*.min.css` files**.
- Import order in HTML: `bootstrap.min.css` → font-awesome (CDN) → `global.css` → `navbar.css` → `footer.css` → page-specific files. Owl carousel CSS is imported just before its JS, near the bottom.

## Naming

- Lowercase with hyphens for both files and selectors: `section-name.css`, `.section-title`, `.sponsor-logo`.
- IDs match the section name: `#sponsor-wrapped`, `#testimonials`, `#stats`, `#footer`.
- BEM is **not** used — selectors are flat and descriptive.

## When you need to add a new style

1. If the section already has a CSS file, add the rule there.
2. If it's a new section, create `css/<section>.css` and link it in the page `<head>` after `global.css`.
3. If it's a truly global utility, extend `global.css` (and document it here).
4. Reuse existing CSS variables. Reuse existing utility classes (`.content-slide-up`, `.section-title`, etc.) before writing new ones.
