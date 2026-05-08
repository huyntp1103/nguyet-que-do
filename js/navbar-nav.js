/**
 * Shared navbar behavior: smooth-scroll + scroll-aware navbar styling.
 *
 * Loaded on every page that uses the dynamic navbar, after components.js.
 *
 * Responsibilities:
 *   1. Mark the body with `.is-home` on the homepage so CSS can switch the
 *      navbar to its transparent-over-hero treatment.
 *   2. Toggle `.scrolled` on the navbar after the user scrolls past the hero.
 *   3. Intercept same-page hash-link clicks for smooth scrolling
 *      (cross-page links fall through to default browser navigation).
 */
(function () {
  // --- Page-tier detection ---------------------------------------------------
  function isHomepage() {
    var p = window.location.pathname;
    if (p === '/' || p === '') return true;
    if (p.endsWith('/index.html') || p === '/index.html') return true;
    // Local file:// previews
    if (p.endsWith('/index')) return true;
    return false;
  }

  if (isHomepage()) {
    document.documentElement.setAttribute('data-page-tier', 'home');
    if (document.body) document.body.classList.add('is-home');
    else document.addEventListener('DOMContentLoaded', function () {
      document.body.classList.add('is-home');
    });
  }

  // --- Init when navbar is in the DOM ----------------------------------------
  var initialized = false;

  document.addEventListener('navbarLoaded', init);
  $(document).ready(function () {
    if ($('#navbar').length > 0) init();
  });

  function init() {
    if (initialized) return;
    initialized = true;

    var navHeight = $('#navbar').outerHeight(true);

    // Mark the first nav-link active by default; components.js will override
    // for pages with a matching data-page slug.
    $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');

    // Scroll-aware navbar — toggles .scrolled past a small threshold.
    var navEl = document.getElementById('navbar');
    if (navEl) {
      var threshold = 64;
      var ticking = false;
      function onScroll() {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            if (window.scrollY > threshold) navEl.classList.add('scrolled');
            else navEl.classList.remove('scrolled');
            ticking = false;
          });
          ticking = true;
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    // Smooth-scroll handler for same-page hash links.
    $('#navbar .navbar-nav .nav-item .nav-link').click(function (event) {
      $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
      $(this).addClass('active');

      var href = $(this).attr('href') || '';
      var hashIdx = href.indexOf('#');

      if (hashIdx < 0) return;

      var pageBefore = href.substring(0, hashIdx);
      if (pageBefore && !isSamePage(pageBefore)) return;

      var targetId = href.substring(hashIdx);
      if (targetId === '#') {
        event.preventDefault();
        return;
      }

      var $target = $(targetId);
      if (!$target.length) return;

      event.preventDefault();
      var targetPosition = $target.offset().top;
      if (targetId !== '#footer') targetPosition -= navHeight;
      $('html, body').animate({ scrollTop: targetPosition }, 1000);
    });
  }

  function isSamePage(urlPrefix) {
    var here = window.location.origin + window.location.pathname;
    var a = urlPrefix.replace(/\/$/, '');
    var b = here.replace(/\/$/, '');
    return a === b || a === window.location.origin;
  }
})();
