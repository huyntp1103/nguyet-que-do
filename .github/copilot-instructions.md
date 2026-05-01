# Copilot Instructions for Nguyệt Quế Đỏ Website

## Project Overview

Nguyệt Quế Đỏ is a static website for a student selection program at THPT Chuyên Quốc Học - Huế school (Vietnam), aimed at selecting representatives for the "Đường lên đỉnh Olympia" TV show.

- **Website URL**: https://nguyetquedo.com
- **Language**: Vietnamese (vi)
- **Type**: Static HTML/CSS/JS website

---

## Project Structure

```
nguyet-que-do/
├── index.html                 # Main homepage
├── co-cau-nhan-su.html        # Organization structure page
├── wiki/                      # Wiki pages for each season
│   ├── nguyet-que-do.html     # Main wiki overview
│   ├── nguyet-que-do-i.html   # Season I details
│   ├── nguyet-que-do-ii.html  # Season II details
│   └── ...                    # Seasons III-VII
├── components/                # Reusable HTML components
│   ├── navbar.html            # Navigation bar (dynamically loaded)
│   └── footer.html            # Footer (dynamically loaded)
├── css/                       # Stylesheets
│   ├── global.css             # Global styles, CSS variables, fonts, animations
│   ├── bootstrap.min.css      # Bootstrap 4 framework
│   ├── navbar.css             # Navigation styling
│   ├── footer.css             # Footer styling
│   ├── intro.css              # Homepage intro/carousel
│   ├── about.css              # About section
│   ├── timeline.css           # Timeline section
│   ├── stats.css              # Statistics section
│   ├── sponsor.css            # Sponsors section
│   ├── testimonials.css       # Testimonials section
│   ├── social.css             # Social media links
│   ├── wiki.css               # Wiki pages styling
│   ├── humans.css             # Team/staff pages styling
│   └── owl.carousel.min.css   # Owl Carousel library
├── js/                        # JavaScript files
│   ├── jquery.min.js          # jQuery library
│   ├── bootstrap.min.js       # Bootstrap 4 JS
│   ├── owl.carousel.min.js    # Owl Carousel library
│   ├── components.js          # Dynamic navbar/footer loader
│   ├── load-data.js           # JSON data loader for timeline/testimonials
│   ├── animation.js           # Scroll animations (IntersectionObserver)
│   ├── sponsor.js             # Sponsor carousel initialization
│   ├── home-script.js         # Homepage specific scripts
│   ├── wiki-script.js         # Wiki pages scripts
│   └── wiki-season-script.js  # Season-specific wiki scripts
├── jsons/                     # JSON data files
│   ├── testimonials.json      # Testimonials data
│   └── timeline.json          # Timeline events data
├── images/                    # Image assets
│   ├── themes/                # Branding, logos, backgrounds
│   ├── intro/                 # Homepage carousel images
│   ├── humans/                # Staff/team photos
│   ├── sponsor/               # Sponsor logos (line-1 to line-4)
│   ├── testimonials/          # Testimonial avatars
│   └── nqd-i/ to nqd-vii/     # Season-specific images
└── fonts/                     # Custom fonts (SVN-Gotham)
```

---

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | - | Page structure |
| CSS3 | - | Styling |
| JavaScript (ES6) | - | Client-side interactivity |
| jQuery | 3.x | DOM manipulation, AJAX |
| Bootstrap | 4.x | Responsive layout, components |
| Owl Carousel | 2.x | Image/sponsor carousels |
| Font Awesome | 4.7 | Icons |
| SVN-Gotham | - | Custom Vietnamese font |

---

## CSS Conventions

### Color Variables (defined in `css/global.css`)

Always use CSS variables for colors:

```css
:root {
    --cream-white: #ebe8e1;
    --cream-orange: #d6cdb0;
    --dark-orange: #b85d36;
    --orange: #e34a25;
    --dark-red: #af2d03;
    --red: #bb2126;
    --dark-yellow: #ee9e2e;
    --yellow: #fbb917;
    --dark-brown: #913f2d;
    --gray: #7a7a7a;
}
```

### Typography

- **Primary font**: `'SVN Gotham', 'Helvetica', sans-serif`
- **Base font size**: `16px` (desktop), `14px` (tablet), `12px` (mobile)
- **Font weights**: `normal` (Book), `bold` (Bold)

### Responsive Breakpoints

Follow Bootstrap 4 breakpoints:

```css
/* Large tablet */
@media screen and (max-width: 991.98px) { }

/* Small tablet */
@media screen and (max-width: 767.98px) { }

/* Mobile */
@media screen and (max-width: 575.98px) { }
```

### Common Utility Classes

```css
/* Section titles */
.section-title        /* Red, 2rem, bold, centered */
.section-sub-title    /* Orange, 1.6rem, bold, centered */
.stroke-title         /* Yellow with red stroke effect */

/* Horizontal lines */
.horizontal-line-red
.horizontal-line-yellow
.horizontal-line-orange

/* Animation classes */
.content-slide-up     /* Slide up on scroll */
.content-slide-down   /* Slide down on scroll */
.content-slide-left   /* Slide from left on scroll */
.content-slide-right  /* Slide from right on scroll */
```

### CSS File Naming

- Use lowercase with hyphens: `section-name.css`
- Each major section has its own CSS file
- Include file in HTML `<head>` before custom JS

---

## JavaScript Conventions

### jQuery Usage

- Use jQuery for DOM manipulation and AJAX
- Wrap code in `$(document).ready()` or IIFE
- Use `$` prefix for jQuery objects

```javascript
$(document).ready(function() {
    // Your code here
});

// Or IIFE for modules
(function() {
    // Module code
})();
```

### Component Loader Pattern

Dynamic components use `{BASE_PATH}` placeholder for relative paths:

```html
<!-- In component HTML -->
<img src="{BASE_PATH}images/themes/Logo-Que.png" />

<!-- Replaced by components.js -->
basePath = '../';  // For wiki pages
basePath = '';     // For root pages
```

### Animation Pattern

Use IntersectionObserver for scroll animations:

```javascript
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.content-slide-up').forEach(el => {
    observer.observe(el);
});
```

### JSON Data Loading

```javascript
$.getJSON('jsons/data.json', function(data) {
    data.forEach(function(item, index) {
        // Process and append to DOM
    });
}).fail(function() {
    console.error('Error loading data');
});
```

---

## HTML Conventions

### Page Template Structure

```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Nguyệt Quế Đỏ</title>
    <link rel="icon" href="images/themes/Logo-Que-II.png">
    
    <!-- SEO Meta Tags -->
    <meta name="description" content="..." />
    <meta name="keywords" content="..." />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph -->
    <meta property="og:title" content="..." />
    <meta property="og:description" content="..." />
    <meta property="og:image" content="./images/themes/Thumbnail.jpg" />
    <meta property="og:url" content="https://nguyetquedo.com" />
    <meta property="og:type" content="website" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://nguyetquedo.com" />
    
    <!-- CSS -->
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="css/global.css">
    <link rel="stylesheet" href="css/navbar.css">
    <link rel="stylesheet" href="css/footer.css">
    <!-- Page-specific CSS -->
</head>
<body>
    <!-- Navbar placeholder -->
    <div id="navbar-placeholder"></div>

    <!-- Page content -->
    
    <!-- Footer placeholder -->
    <div id="footer-placeholder"></div>

    <!-- JS -->
    <script src="js/jquery.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/components.js"></script>
    <!-- Page-specific JS -->
</body>
</html>
```

### Wiki Pages (in /wiki/ directory)

- Use relative paths with `../` prefix for assets
- Include `data-page` attribute for navigation highlighting

```html
<link rel="stylesheet" href="../css/bootstrap.min.css">
<script src="../js/jquery.min.js"></script>
```

### Bootstrap Grid Usage

```html
<div class="container">
    <div class="row d-flex flex-row align-items-center">
        <div class="col-md-4 col-xs-6">...</div>
        <div class="col-md-8 col-xs-6">...</div>
    </div>
</div>
```

### Section Pattern

```html
<div id="section-name" class="container mb-5">
    <p class="section-title">SECTION TITLE</p>
    <div class="horizontal-line-red"></div>
    <!-- Section content -->
</div>
```

### Jumbotron Sections (full-width backgrounds)

```html
<div id="section-name" class="jumbotron">
    <div class="container">
        <!-- Content -->
    </div>
</div>
```

---

## Image Naming Conventions

- Use kebab-case: `Image-Name.jpg`
- Capitalize first letter of each word: `Ban-To-Chuc.jpg`
- Use appropriate extensions: `.jpg`, `.JPG`, `.png`
- Sponsor images organized in `line-1/`, `line-2/`, etc.

---

## JSON Data Structure

### Timeline (`jsons/timeline.json`)

```json
[
    {
        "year": "DD/MM/YYYY",
        "title": "HTML content with <strong>bold</strong> text"
    }
]
```

### Testimonials (`jsons/testimonials.json`)

```json
[
    {
        "avatarUrl": "images/testimonials/Name.jpg",
        "name": "Full Name",
        "role": "Role/Position",
        "company": "Organization Name",
        "projectPrefix": "Additional info prefix",
        "project": "Additional info",
        "quote": "Quote text with <br> for line breaks"
    }
]
```

---

## Component Usage

### Navbar Navigation

Add `data-page` attribute for active page highlighting:

```html
<a class="nav-link" href="url" data-page="page-name">Link Text</a>
```

### Carousel (Bootstrap)

```html
<div id="carousel-id" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
        <div class="carousel-item active">...</div>
        <div class="carousel-item">...</div>
    </div>
</div>
```

### Owl Carousel (Sponsors)

```html
<div class="owl-carousel owl-theme">
    <div class="sponsor-logo">
        <img src="..." class="sponsor-image" />
    </div>
</div>
```

---

## Best Practices

1. **Always use CSS variables** for colors instead of hardcoded values
2. **Use rem units** for font sizes (responsive across breakpoints)
3. **Add animation classes** (`content-slide-up`, etc.) for scroll effects
4. **Load components dynamically** using placeholders and `components.js`
5. **Store dynamic data in JSON** files and load with jQuery
6. **Use Bootstrap grid** for responsive layouts
7. **Include all meta tags** for SEO and social sharing
8. **Add `alt` attributes** to all images
9. **Use Vietnamese** for user-facing content
10. **Follow existing patterns** when adding new sections or pages

---

## Adding New Pages

1. Copy template structure from existing page
2. Update `<title>`, meta tags, and canonical URL
3. Add navbar placeholder: `<div id="navbar-placeholder"></div>`
4. Add footer placeholder: `<div id="footer-placeholder"></div>`
5. Include required CSS files (global.css, navbar.css, footer.css)
6. Include required JS files (jquery, bootstrap, components.js)
7. For wiki pages, use `../` prefix for all asset paths
8. Add `data-page` attribute if page should be highlighted in nav

---

## Security Notes

The website includes protection against right-click and dev tools:

```javascript
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function(event) {
    if (event.key === 'F12' || 
        (event.ctrlKey && event.shiftKey && event.key === 'I') || 
        (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
    }
});
```

Include this script in `<head>` for all public pages.
