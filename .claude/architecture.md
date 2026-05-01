# Architecture

## Repo layout

```
nguyet-que-do/
├── index.html                  # Homepage (intro carousel, about, timeline, stats, sponsors, testimonials, social)
├── co-cau-nhan-su.html         # Org structure page (root level — uses '' base path)
├── CNAME                       # GitHub Pages custom domain (nguyetquedo.com)
├── ads.txt                     # AdSense ownership declaration
├── README.md
│
├── components/                 # Loaded dynamically by js/components.js
│   ├── navbar.html             # Uses {BASE_PATH} placeholder for image src
│   └── footer.html             # Uses {BASE_PATH} placeholder
│
├── wiki/                       # All wiki pages — one level deep, use ../ for assets
│   ├── nguyet-que-do.html      # Overview + table of all Olympia contestants
│   ├── nguyet-que-do-i.html    # Season I (2018)
│   ├── nguyet-que-do-ii.html   # Season II (2019)
│   ├── nguyet-que-do-iii.html  # Season III (2021)
│   ├── nguyet-que-do-iv.html   # Season IV (2022)
│   ├── nguyet-que-do-v.html    # Season V (2023)
│   ├── nguyet-que-do-vi.html   # Season VI (2024)
│   └── nguyet-que-do-vii.html  # Season VII (2025) — current
│
├── css/
│   ├── global.css              # CSS vars, fonts, breakpoints, animations, utility classes
│   ├── bootstrap.min.css       # Bootstrap 4
│   ├── owl.carousel.min.css    # Owl Carousel 2
│   ├── navbar.css              # Site nav
│   ├── footer.css              # Site footer
│   ├── intro.css               # Homepage hero carousel
│   ├── about.css               # Homepage "about" section
│   ├── timeline.css            # Homepage timeline
│   ├── stats.css               # Homepage stats counters
│   ├── sponsor.css             # Homepage sponsors carousel
│   ├── testimonials.css        # Homepage testimonials
│   ├── social.css              # Homepage social icons
│   ├── wiki.css                # All wiki pages
│   └── humans.css              # co-cau-nhan-su (team/staff page)
│
├── js/
│   ├── jquery.min.js           # jQuery 3.x
│   ├── bootstrap.min.js        # Bootstrap 4 JS
│   ├── owl.carousel.min.js     # Owl Carousel 2
│   ├── components.js           # Navbar/footer loader + active-page highlight
│   ├── load-data.js            # Loads timeline.json + testimonials.json into homepage
│   ├── animation.js            # IntersectionObserver-based slide animations
│   ├── sponsor.js              # Owl Carousel init for the 4 sponsor lines
│   ├── home-script.js          # Homepage smooth-scroll nav + stats counter
│   ├── humans-script.js        # co-cau-nhan-su animations
│   ├── wiki-script.js          # Shared wiki interactions
│   └── wiki-season-script.js   # Per-season wiki interactions
│
├── jsons/
│   ├── timeline.json           # [{year, title}] — homepage timeline
│   └── testimonials.json       # [{avatarUrl, name, role, company, projectPrefix, project, quote}]
│
├── images/
│   ├── themes/                 # Branding (Logo-Que.png, Logo-Que-II.png, Background, Thumbnail, Kim-cuong-*)
│   ├── intro/                  # Homepage hero carousel images
│   ├── humans/                 # Staff/team photos for co-cau-nhan-su
│   ├── sponsor/                # line-1/, line-2/, line-3/, line-4/ — sponsors per row
│   ├── testimonials/           # Avatar images
│   └── nqd-{i..vii}/           # Per-season image folders
│
└── fonts/
    └── SVN-Gotham-{Bold,Book}/ # Custom Vietnamese font
```

## Page tiers

There are **two URL depths** that affect path resolution:

| Tier | Examples | Asset prefix | `components.js` basePath |
| --- | --- | --- | --- |
| Root | `index.html`, `co-cau-nhan-su.html` | `css/...`, `js/...`, `images/...` | `''` |
| Wiki | `wiki/*.html` | `../css/...`, `../js/...`, `../images/...` | `'../'` |

`components.js` detects the URL via `window.location.pathname`:

- contains `/wiki/` → `basePath = '../'`, currentPage extracted from `/wiki/<slug>` regex
- contains `/co-cau-nhan-su` → `basePath = ''`, currentPage = `'co-cau-nhan-su'`
- otherwise → `basePath = ''`, currentPage = `'index'`

If you add a new URL depth (e.g., `/articles/foo/`), you **must** update `components.js` to handle it, or the navbar/footer images will 404.

## Component (navbar/footer) loading

1. Page declares `<div id="navbar-placeholder"></div>` and `<div id="footer-placeholder"></div>`.
2. `js/components.js` runs after DOMContentLoaded, fetches `components/navbar.html` and `components/footer.html` via XHR.
3. It replaces every `{BASE_PATH}` token in the response with the computed `basePath`, then swaps the placeholder's `outerHTML`.
4. After the navbar loads, it dispatches a `navbarLoaded` custom event. Page-specific scripts (e.g. `home-script.js`) listen for this so they can attach handlers to navbar elements.
5. Active-page highlight: any link with `data-page="<slug>"` matching `currentPage` gets `class="active"`, `font-weight: bold`, and `href="#"`.

## Animations

`css/global.css` defines four entrance animation pairs:

- `.content-slide-up` ↔ `.slide-up`
- `.content-slide-down` ↔ `.slide-down`
- `.content-slide-left` ↔ `.slide-left`
- `.content-slide-right` ↔ `.slide-right`

The "trigger" class (e.g. `.slide-up`) is added by `js/animation.js` via `IntersectionObserver` (threshold 0.5) when the element scrolls into view, then the observer detaches.

The timeline section has its own observer in `js/load-data.js` that adds `.slide-in-left` / `.slide-in-right` to alternate items.

## SEO / sharing baseline

Every page repeats the same canonical/OG block (URL → `https://nguyetquedo.com`, image → `./images/themes/Thumbnail.jpg`, type → `website`). This is intentional — don't differentiate per-page unless asked.

## Deployment

GitHub Pages on the default branch. `CNAME` pins the custom domain. Pushing to `main` is the deploy. There is no CI, no build, no preview environment.
