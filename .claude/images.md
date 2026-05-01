# Images

## Folder map

```
images/
├── themes/         # Branding: logos, backgrounds, decorative diamonds, thumbnails
│   ├── Logo-Que.png        # Main logo (used in navbar)
│   ├── Logo-Que-II.png     # Alt logo (favicon, footer, about)
│   ├── Background-white.jpg
│   ├── Thumbnail.jpg       # OG share image (referenced from every page)
│   └── Kim-cuong-{1..4}.png # Stats section diamond icons
│
├── intro/          # Homepage hero carousel slides
├── humans/        # co-cau-nhan-su staff/team photos + Co-cau-nhan-su.png org chart
├── testimonials/  # Square avatar images (rotated 45° by CSS)
│
├── sponsor/        # Sponsors, organized by row
│   ├── line-1/    # Top tier (largest logos) — 4 items typical
│   ├── line-2/    # ~9 items
│   ├── line-3/    # ~10 items
│   └── line-4/    # ~22 items (smallest)
│
└── nqd-{i..vii}/   # Per-season images (used by wiki/nguyet-que-do-{i..vii}.html)
```

## Naming

- **Kebab-case, capitalized words**: `Phu-Duc-vo-dich.JPG`, `Ban-To-Chuc.jpg`, `Logo-Que-II.png`.
- Sponsor folders use **uppercase + underscores** for filenames: `HOA_NGHIEM_BRIDAL.png`, `T&P_GROUP.png`. Match the existing convention per folder.
- Mix of `.jpg`, `.JPG`, `.png` is present. Prefer `.png` for logos/transparent assets and `.jpg` for photos. Keep an existing extension when replacing a file.
- File names typically encode the subject in Vietnamese with diacritics stripped (`Chung-ket-Nguyet-Que-Do-VII.jpg`).

## Sizing guidance

- Hero/intro images are landscape; the overlay text and ratio is handled by `intro.css`.
- Sponsor logos auto-fit to their `.sponsor-image` slot. Some logos use inline `style="width: 70%"` overrides — see `T&P_GROUP.png` in `index.html`. Use sparingly when a logo's aspect ratio doesn't match the row's auto-fit.
- Avatars (testimonials) should be square; CSS rotates them 45° and adds a 1px black border.

## When adding a sponsor

1. Drop the logo into the appropriate `images/sponsor/line-N/` folder. Pick a row by visual prominence (line-1 = biggest, line-4 = smallest).
2. Add a `<div class="sponsor-logo">...<img class="sponsor-image" /></div>` block inside that row's `.owl-carousel` in `index.html`.
3. If the logo's natural aspect ratio looks wrong, add an inline `style="width: NN%"` to compensate — match the existing override style.
4. Owl Carousel auto-loops; no JS change required if you reuse an existing line.

## Don't

- Don't commit huge unoptimized originals (>2MB). Compress images if needed.
- Don't reorganize existing folders without instruction — many filenames are referenced by hard-coded paths in HTML.
- Don't use unicode/diacritics in filenames; stick to ASCII kebab-case.
