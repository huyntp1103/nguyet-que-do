# DESIGN.md — Nguyệt Quế Đỏ · Cinematic Ceremonial

> Source-of-truth design system for `nguyetquedo.com`. Format follows the
> [awesome-design-md](https://github.com/VoltAgent/awesome-design-md) convention:
> a single Markdown file describing the visual language so AI agents and humans
> can produce pixel-consistent UI without external tooling.

---

## 1. Visual theme & mood

**Direction**: Cinematic Ceremonial — the energy of an Olympia broadcast finale, scaled into a brand site.

**Adjectives that should describe every screen**: ceremonial · prestigious · photographic · warm · confident · *not* "marketing-bright."

**Core moves**:

- **Photography is the hero**, not decorative type. Full-bleed images, dark gradient overlays, large headlines anchored bottom-left.
- **Dark dramatic bands** alternate with cream daylight sections to create rhythm (light → dark → light → dark).
- **Yellow glow + red gradient** are the signature lighting. Used for emphasis, never for whole surfaces.
- **Restraint elsewhere**. Stats, timeline, footer use the heat. Body copy lives in calm cream.

**Anti-mood**: do not aim for Linear/Notion sterility, brutalist, glass-morphism, or gradient SaaS purple. The site is *Vietnamese, ceremonial, Olympia-flavoured*.

---

## 2. Color palette (semantic tokens)

Defined in `css/global.css` `:root`. Semantic tokens layered on the existing brand palette — **never introduce new hex literals**, always reference a token.

### Brand (kept from original)

| Token | Hex | Role |
|---|---|---|
| `--red` | `#bb2126` | Primary accent · CTAs · section titles |
| `--dark-red` | `#af2d03` | Pressed states · gradient stop |
| `--yellow` | `#fbb917` | Highlight · glow · the laurel motif |
| `--dark-yellow` | `#ee9e2e` | Hover for yellow elements |
| `--orange` | `#e34a25` | Tertiary accent (used sparingly) |
| `--cream-white` | `#ebe8e1` | Default page surface |
| `--cream-orange` | `#d6cdb0` | Warm secondary surface |

### Cinematic extensions

| Token | Hex | Role |
|---|---|---|
| `--ink` | `#15110d` | Primary text · dark band base |
| `--ink-soft` | `#3a342e` | Secondary text |
| `--ink-mute` | `#6e655c` | Tertiary text · captions |
| `--deep-red` | `#4a1010` | Dark band gradient stop |
| `--paper` | `#ffffff` | Cards on cream |
| `--surface` | `var(--cream-white)` | Default body surface |
| `--on-dark` | `rgba(255,255,255,0.92)` | Body text on dark bands |
| `--on-dark-mute` | `rgba(255,255,255,0.7)` | Secondary text on dark bands |
| `--border` | `rgba(21,17,13,0.08)` | Hairlines on light |
| `--border-strong` | `rgba(21,17,13,0.16)` | Stronger separators |
| `--border-on-dark` | `rgba(255,255,255,0.15)` | Hairlines on dark |
| `--glow-yellow` | `0 0 40px rgba(251,185,23,0.35)` | Used as box/text-shadow on dark |

### Semantic roles

```
PRIMARY accent       → --red       (links, CTAs, section titles)
HIGHLIGHT            → --yellow    (rules, badges, glow on dark)
SURFACE (default)    → --cream-white + paper texture (Background-white.jpg)
SURFACE (dark band)  → linear-gradient(135deg, --ink → --deep-red)
TEXT (on light)      → --ink → --ink-soft → --ink-mute
TEXT (on dark)       → white → --on-dark → --on-dark-mute
```

### Contrast rules (WCAG AA)

- Body text on cream: `--ink` (≥7:1) ✓
- Body text on dark band: `white` / `--on-dark` (≥7:1) ✓
- Red on cream: AA Large only — **never use `--red` for body copy under 18px**.
- Yellow is decorative on dark, *never* a primary text color.

---

## 3. Typography

Family stays **`SVN Gotham`** (the current custom Vietnamese font). No new typeface. Cinematic treatment comes from **scale, weight, and tracking** — not a new family.

### Scale

| Token | Size | Use |
|---|---|---|
| `--fs-display` | `clamp(2.5rem, 6vw, 5.5rem)` | Hero headline |
| `--fs-4xl` | `3.75rem` | Section openers |
| `--fs-3xl` | `2.75rem` | `.section-title` |
| `--fs-2xl` | `2rem` | Sub-titles |
| `--fs-xl` | `1.5rem` | `.section-sub-title` |
| `--fs-lg` | `1.25rem` | Lede paragraphs |
| `--fs-md` | `1.125rem` | Body large |
| `--fs-base` | `1rem` | Body |
| `--fs-sm` | `0.875rem` | Captions |
| `--fs-xs` | `0.75rem` | Eyebrow / labels |

### Weight & tracking

| Treatment | Weight | Tracking |
|---|---|---|
| Display / hero | 800 | `letter-spacing: -0.025em` |
| Section title | 700 | `letter-spacing: -0.02em` |
| Body | 400 (Book) | `0` |
| Eyebrow / label | 700 | `letter-spacing: 0.2em`, uppercase |
| Stat number | 900 | `letter-spacing: -0.04em` |

### Pairs

- Headlines on dark band: `white` weight 800, optional `text-shadow` with `--glow-yellow`.
- Eyebrows always with a leading short rule: `▬ — ĐỒNG HÀNH`.
- Vietnamese diacritics: keep line-height ≥1.15 on display sizes (the existing `0.98` is fine for hero only).

---

## 4. Spacing & rhythm

8-point grid expressed as rems.

| Token | Value | Use |
|---|---|---|
| `--sp-1` | 0.25rem | Tight gaps |
| `--sp-2` | 0.5rem | Inline gaps |
| `--sp-3` | 0.75rem | Compact padding |
| `--sp-4` | 1rem | Default body gap |
| `--sp-5` | 1.5rem | Card padding |
| `--sp-6` | 2rem | Block gap |
| `--sp-7` | 3rem | Inter-element large |
| `--sp-8` | 5rem | Section padding inner |
| `--sp-9` | 8rem | Section padding outer (desktop) |

**Section vertical padding**: `5rem` mobile → `8rem` desktop.

**Container**: max-width 1200px, `padding-inline: 2rem` mobile, `3rem` desktop.

---

## 5. Components & states

### 5.1 Navbar

- Position: `fixed top:0`.
- **Homepage** (`body.is-home`): transparent over the hero. After 80px scroll, gains class `.scrolled` → dark glass background `rgba(15,11,8,0.85)` with `backdrop-filter: blur(12px)`.
- **All other pages**: solid white with hairline shadow; never transparent.
- Brand title (`#title`) keeps its existing yellow-with-red-stroke treatment when on dark or white; switches to white outline when on transparent over hero.
- Nav links: 0.95rem, weight 500, `--ink-soft` on light, `--on-dark` on dark.
- Active link: `border-bottom: 2px solid --yellow` (replaces the old orange underline).

### 5.2 Hero (`#intro`)

- Full-bleed: `height: 100vh; min-height: 640px`.
- Image: `object-fit: cover` with **Ken Burns** animation (18s, infinite alternate). Honors `prefers-reduced-motion`.
- Overlay: dual gradient — vertical darkening + radial yellow bloom top-right.
- Headline: bottom-left, max-width 56rem, font-size `--fs-display`, weight 800, white, `text-shadow: 0 2px 30px rgba(0,0,0,0.4)`.

### 5.3 Buttons

| Class | Background | Text | Border | Hover |
|---|---|---|---|---|
| `.btn-primary` | `--red` | white | `--red` | bg → `--dark-red`, lift `-1px` |
| `.btn-ghost` | transparent | `--ink` (or white on dark) | `--border-strong` | border → `--ink` |
| `.btn-yellow` | `--yellow` | `--ink` | none | bg → `white`, lift `-1px` |

Radius `--r-pill` (999px). Padding `0.7rem 1.4rem`. Font-weight 600. Transition `var(--t-base)`.

### 5.4 Stats band

- Full-bleed dark gradient (`--ink` → `--deep-red`) using viewport-margin escape from `.container`.
- Each stat: 2px yellow top rule, kim-cuong icon with yellow drop-shadow glow, number weight 900, label uppercase tracked.

### 5.5 Section titles

`.section-title` → font-size `--fs-3xl`, weight 800, `--red` on light bands, `white` on dark bands, letter-spacing `-0.02em`.

`.horizontal-line-red` keeps existing 0.2rem height; on dark bands switches to yellow via `[data-band="dark"]` or specific `#stats` override.

### 5.6 Sponsor logos

- Container `#sponsor-wrapped`: dark gradient band like Stats.
- Each logo tile: `rgba(255,255,255,0.06)` background, `1px rgba(255,255,255,0.1)` border, radius `--r-md`.
- Logos use `filter: brightness(0) invert(1) opacity(0.85)` (white silhouette); on hover the tile fills to white and the filter is removed (full color).
- All four lines kept as-is structurally; only their visual treatment changes.

### 5.7 Timeline

Keeps zig-zag layout from current site. Dot markers gain a yellow glow ring; year text gains a subtle scale-up on hover; entry titles use `--fs-md`.

### 5.8 Testimonials

- Drop the diamond/rotated avatar. Replace with circular avatar at 12rem with a 3px yellow outline at 6px offset.
- Card surface stays cream.
- Quote glyph (`"`/`"`) uses `--orange` and stays large (decorative).
- Carousel indicators: yellow active dot, `--ink-mute` inactive.

### 5.9 Footer

Dark gradient (`--deep-red` → `--ink`). Yellow heading underlines and yellow contact-name highlights kept. Map iframe corners radiused.

---

## 6. Elevation & shadows

| Token | Value | Use |
|---|---|---|
| `--sh-1` | `0 1px 2px rgba(0,0,0,0.06)` | Hairline cards |
| `--sh-2` | `0 8px 24px -8px rgba(0,0,0,0.18)` | Hover cards |
| `--sh-3` | `0 30px 60px -20px rgba(0,0,0,0.25)` | Hero figure / modals |
| `--glow-yellow` | `0 0 40px rgba(251,185,23,0.35)` | Stat numbers, kim-cuong icons |

No drop-shadow on dark surfaces unless yellow-glow.

---

## 7. Motion

| Token | Value | Use |
|---|---|---|
| `--t-fast` | 150ms | Color/opacity flips |
| `--t-base` | 250ms | Default transitions |
| `--t-slow` | 400ms | Layout-shifting hovers |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | All transitions |

**Required**: every animated rule is wrapped in `@media (prefers-reduced-motion: no-preference)` — or a global `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }` guard sits at the bottom of `global.css`.

**Specifics**:

- Hero Ken Burns: 18s, ease-in-out, infinite alternate, paused under `reduce`.
- Navbar transition: `--t-base`.
- Section reveals (existing IntersectionObserver): keep but guarded by reduce.
- No marquee / auto-scroll on body content.

---

## 8. Guardrails (anti-patterns)

- **Don't introduce** new typefaces, neon gradients (purple/teal SaaS), animated emojis, `glassmorphism` cards on light backgrounds, or shimmer placeholders.
- **Don't use** `--yellow` as a body-text color, ever.
- **Don't use** `--red` for body text under 18px.
- **Don't add** more carousels. Hero is the only auto-rotating element.
- **Don't add** ad blocks visually unless `feat(ads): enable` re-instates them.
- **Keep** the anti-inspect script. **Keep** `{BASE_PATH}` placeholders. **Keep** the existing 4 sponsor lines structurally.
- **Don't change** Vietnamese copy, section IDs, or `data-page` slugs.

---

## 9. Responsive behavior

Breakpoints inherited from Bootstrap 4 / `global.css`:

| Range | Behavior |
|---|---|
| `≥1200px` | Full grid; section padding 8rem |
| `992–1199px` | Same; tighter gutters |
| `768–991.98px` | Hero text reduces; about-grid stacks at 991 |
| `576–767.98px` | Stats grid → 2 cols; sponsor 4 lines retained but smaller logos |
| `<576px` | Navbar collapses (Bootstrap default); hero text bottom anchor shifts up; stat numbers `--fs-3xl` |

**Test viewports**: 375 / 768 / 1024 / 1440.

---

## 10. Agent prompt guide

When asked to produce a new section, page, or component for `nguyetquedo.com`:

1. **Reference tokens, never literals.** `var(--red)`, `var(--fs-3xl)`, `var(--sp-7)`.
2. **Light section → dark section** alternation builds rhythm.
3. **Eyebrow + section title + rule** on every section opener (existing pattern).
4. **Photography first**, type second. If a section has no image, give it generous whitespace instead.
5. **Animations**: only `--t-base` opacity/transform fades, guarded by reduced-motion.
6. **Vietnamese first**: all user-facing strings in Vietnamese; keep diacritics; preserve existing copy when restyling.
7. **Don't break** the page-tier system: root pages vs `/wiki/` pages, the `{BASE_PATH}` substitution, the `data-page` slug for active-link highlighting.

When in doubt, mirror the closest existing section in `index.html` and the matching CSS file under `css/`.
