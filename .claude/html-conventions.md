# HTML Conventions

## Standard page template (root level)

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{Page Title} - Nguyệt Quế Đỏ</title>
  <link rel="icon" href="images/themes/Logo-Que-II.png">
  <meta name="google-adsense-account" content="ca-pub-7685319641265970">

  <!-- SEO -->
  <meta name="description" content="..." />
  <meta name="keywords" content="Nguyệt Quế Đỏ, Đường lên đỉnh Olympia, Olympia, Trường THPT chuyên Quốc Học Huế, Quốc Học Huế, ..." />
  <meta name="robots" content="index, follow" />

  <!-- Open Graph -->
  <meta property="og:title" content="Nguyệt Quế Đỏ - THPT chuyên Quốc Học Huế" />
  <meta property="og:description" content="..." />
  <meta property="og:image" content="./images/themes/Thumbnail.jpg" />
  <meta property="og:url" content="https://nguyetquedo.com" />
  <meta property="og:type" content="website" />

  <!-- Canonical -->
  <link rel="canonical" href="https://nguyetquedo.com" />

  <!-- CSS -->
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="css/global.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="css/footer.css">
  <!-- + page-specific CSS -->

  <!-- Anti-inspect (kept for consistency on every page) -->
  <script>
    document.addEventListener('contextmenu', event => event.preventDefault());
    document.addEventListener('keydown', function(event) {
      if (event.key === 'F12' ||
          (event.ctrlKey && event.shiftKey && event.key === 'I') ||
          (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
      }
    });
  </script>
</head>
<body>
  <div id="navbar-placeholder"></div>

  <!-- page content -->

  <div id="footer-placeholder"></div>

  <!-- jQuery + Bootstrap -->
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <!-- Components loader must run before page-specific scripts that touch the navbar -->
  <script src="js/components.js"></script>

  <!-- Owl Carousel (only if needed on this page) -->
  <link rel="stylesheet" href="css/owl.carousel.min.css" />
  <script src="js/owl.carousel.min.js"></script>

  <!-- page-specific JS -->
</body>
</html>
```

## Wiki page differences

Pages in `/wiki/` use `../` for every local asset:

```html
<link rel="stylesheet" href="../css/bootstrap.min.css">
<link rel="stylesheet" href="../css/global.css">
<link rel="stylesheet" href="../css/navbar.css">
<link rel="stylesheet" href="../css/footer.css">
<link rel="stylesheet" href="../css/wiki.css">
...
<script src="../js/jquery.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/components.js"></script>
<script src="../js/wiki-script.js"></script>
<script src="../js/wiki-season-script.js"></script>
```

The components loader auto-detects `/wiki/` and uses `basePath = '../'` for the navbar/footer assets.

## Section patterns

### Container section (centered, with title)

```html
<div id="section-name" class="container mb-5">
  <p class="section-title">SECTION TITLE</p>
  <div class="horizontal-line-red"></div>
  <p class="content-slide-up">Subtitle / lead text</p>
  <!-- content -->
</div>
```

### Jumbotron section (full-width background)

```html
<div id="section-name" class="jumbotron">
  <div class="container">
    <!-- content -->
  </div>
</div>
```

### Bootstrap grid

```html
<div class="row d-flex flex-row align-items-center">
  <div class="col-md-4 col-xs-6">...</div>
  <div class="col-md-8 col-xs-6">...</div>
</div>
```

## Navbar links

When adding a new internal link to `components/navbar.html`:

- Use the absolute production URL: `href="https://nguyetquedo.com/<path>"`. The site uses absolute links throughout the navbar.
- Add `data-page="<slug>"` where `<slug>` matches the file basename without extension (`co-cau-nhan-su`, `nguyet-que-do-vii`, etc.). `components.js` highlights it on the active page.
- New season pages need a new `<li>` inside the **Wiki** dropdown.

## Carousels

### Bootstrap carousel (hero / testimonials)

```html
<div id="carousel-id" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">...</div>
    <div class="carousel-item">...</div>
  </div>
</div>
```

Initialized in `home-script.js` with `interval` and `pause: false`.

### Owl Carousel (sponsor rows)

```html
<div class="row mb-3 line-N-sponsor">
  <div class="owl-carousel owl-theme">
    <div class="sponsor-logo">
      <img src="images/sponsor/line-N/{NAME}.png" alt="..." class="sponsor-image" />
    </div>
    <!-- more sponsor-logo entries -->
  </div>
</div>
```

`sponsor.js` initializes 4 lines (`.line-1-sponsor` … `.line-4-sponsor`) with different responsive `items` counts. To add a new logo, place the file in `images/sponsor/line-N/` and add a `.sponsor-logo` block.

## Image attributes

- Always provide `alt` in Vietnamese (or the brand/sponsor name).
- Width usually given as a percentage (`width="100%"`) so it scales with the column.
- For full-width hero images, prefer the existing `intro` carousel pattern; for content blocks, use Bootstrap columns.
