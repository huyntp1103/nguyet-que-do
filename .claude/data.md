# JSON Data Files

The homepage pulls dynamic content from `jsons/`. Both files are arrays of objects, in display order.

## `jsons/timeline.json`

Schema:

```json
[
  {
    "year":  "DD/MM/YYYY",
    "title": "HTML string — bold parts in <strong>...</strong>"
  }
]
```

- `year` is a date label (used as-is in the timeline pill); the format `DD/MM/YYYY` is consistent across existing entries.
- `title` allows inline HTML. Standard tags in use: `<strong>` for emphasized names, `<br>` for line breaks. Keep markup minimal.
- Entries render alternating left/right via `index % 2` in `js/load-data.js`. Order in the array == visual order top-to-bottom.

When adding a new milestone:

1. Append the entry at the end of the array (chronological).
2. Validate JSON (no trailing commas, double quotes only).
3. Names of contestants typically wrapped in `<strong>` for the achievement to read naturally.

## `jsons/testimonials.json`

Schema:

```json
[
  {
    "avatarUrl":     "images/testimonials/{Name}.jpg",
    "name":          "Bạn|Anh|Chị {Full Name}",
    "role":          "Quán quân|Á quân|Trưởng BTC|...",
    "company":       "Nguyệt Quế Đỏ {Roman}",
    "projectPrefix": "Free-form prefix text",
    "project":       "Project name (rendered <strong>)",
    "quote":         "Vietnamese quote, <br> for line breaks"
  }
]
```

Render template (in `js/load-data.js`):

> {name} - {role} **{company}**
> {projectPrefix} **{project}**
> "{quote}"

Notes:

- `avatarUrl` is **relative to the homepage** (`images/...` without `../`). All testimonial avatars live in `images/testimonials/`.
- The avatar is rotated 45° via inline style; pre-cropped square images look best.
- `quote` accepts `<br>` for paragraph breaks. No other HTML in current entries.
- The Bootstrap carousel indicators in `index.html` are hard-coded for **5 slides** (`<li>` elements with `data-slide-to="0..4"`). If you change the number of testimonials, update the indicator `<ol>` in `index.html` to match — otherwise indicator dots will be wrong.

## Adding a new testimonial

1. Drop avatar at `images/testimonials/{Name}.jpg` (kebab-case file name, e.g. `Phan-Le-Thuc-Bao.jpg`).
2. Append an object to `jsons/testimonials.json`.
3. Update the indicator `<ol>` count in `index.html` if the total changed.
4. Validate JSON syntax.
