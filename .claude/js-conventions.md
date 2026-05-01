# JavaScript Conventions

## Stack

- **jQuery 3.x** — primary DOM/AJAX library. Wrap code in `$(document).ready(...)` or a top-level IIFE.
- **Bootstrap 4 JS** — modal, carousel, dropdown plugins (loaded after jQuery).
- **Owl Carousel 2** — used only on the homepage sponsor section (loaded only on pages that need it).
- **Vanilla JS for `IntersectionObserver`** — animation triggers don't need jQuery.

No bundler, no modules, no transpiler. Files are loaded via `<script>` tags in order.

## Patterns

### Document-ready wrapper

```js
$(document).ready(function () {
  // setup that touches the DOM
});
```

Use this for anything that queries `$('#some-id')`. For one-off side-effect modules, a top-level IIFE is also acceptable (`components.js` does this).

### Wait for the dynamic navbar before binding to it

The navbar is loaded asynchronously by `components.js`. If you need to attach handlers to navbar elements, listen for the `navbarLoaded` custom event:

```js
document.addEventListener('navbarLoaded', function () {
  initMyThing();
});

// Fallback for cached/already-loaded case:
$(document).ready(function () {
  if ($('#navbar').length > 0) initMyThing();
});
```

`home-script.js` does this for the smooth-scroll nav handler.

### Loading JSON content

```js
$.getJSON('jsons/data.json', function (data) {
  data.forEach(function (item, index) {
    const $el = $(`<div>...${item.field}...</div>`);
    $('#container').append($el);
  });
}).fail(function () {
  console.error('Error loading data');
});
```

Used in `load-data.js` for `timeline.json` and `testimonials.json`. Note JSON paths are written **without** `../`, so this only works from root pages — wiki pages don't load these files.

### IntersectionObserver for animations

Standard pattern — observer adds a class once, then unobserves:

```js
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-up');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.content-slide-up').forEach(el => observer.observe(el));
```

`animation.js` already wires up all four directions (`up`/`down`/`left`/`right`) globally — you usually just need the base class on the element.

> **Bug-aware note**: `animation.js` references an undeclared `observer` (instead of `slideUpObserver`, etc.) inside its callbacks. Animations still work because elements only enter once, but if you copy this code, fix the variable name. Don't replicate the bug.

### Owl Carousel init

Each sponsor row gets its own init with custom `responsive` breakpoints. See `js/sponsor.js`. To add a new horizontal scrolling row, add a new init block keyed on a unique class.

### Bootstrap carousel init

Done in `home-script.js` with `interval` (ms) and `pause: false`:

```js
$('#intro').carousel({ interval: 5 * 1000, pause: false });
```

## Component loader (`js/components.js`)

Already implemented — usually you don't touch it. Read the source if you need to:

- Detect a new URL depth (currently handles `/wiki/`, `/co-cau-nhan-su`, root).
- Add a new dynamic component beyond navbar/footer.
- Change the active-page detection logic.

The loader replaces every `{BASE_PATH}` token in component HTML with the computed prefix (`''` for root, `'../'` for wiki). When you add an asset reference inside `components/navbar.html` or `components/footer.html`, **always use `{BASE_PATH}`** for `src`/`href` of local assets:

```html
<img src="{BASE_PATH}images/themes/Logo-Que.png" alt="..." />
```

For absolute external links (e.g. `https://nguyetquedo.com/wiki/...`), no placeholder is needed.

## Don't

- Don't introduce ES modules, `import`/`export`, or `<script type="module">`.
- Don't add `npm`, `webpack`, `vite`, etc.
- Don't replace jQuery with vanilla JS in existing files unless asked — keep the codebase consistent.
- Don't inline event handlers in HTML (`onclick="..."`) — bind via jQuery.
- Don't use `console.log` for production code; `console.error` is OK for fail callbacks.
