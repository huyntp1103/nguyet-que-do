/**
 * Shared navbar click + smooth-scroll handler.
 *
 * Load this on every page that uses the dynamic navbar, after components.js.
 * It auto-initializes when the navbar finishes loading (or immediately if it
 * is already in the DOM).
 *
 * Behavior:
 *   - Clicks on links pointing to a hash on the CURRENT page are intercepted
 *     and smooth-scrolled (offset by the fixed navbar height, except #footer).
 *   - Clicks on links pointing to a different page (or with no hash at all)
 *     fall through to the browser's default navigation.
 *   - href="#" (dropdown toggles, placeholder items) is a no-op (preventDefault).
 *   - Bad anchors (#nonexistent) fall through to the browser.
 */
(function () {
  var initialized = false;

  document.addEventListener('navbarLoaded', init);
  $(document).ready(function () {
    if ($('#navbar').length > 0) init();
  });

  function init() {
    if (initialized) return;
    initialized = true;

    var navHeight = $('#navbar').outerHeight(true);

    // Mark the first nav-link active by default. components.js will override
    // this for the page that matches data-page.
    $('#navbar .navbar-nav .nav-item .nav-link:first').addClass('active');

    $('#navbar .navbar-nav .nav-item .nav-link').click(function (event) {
      $('#navbar .navbar-nav .nav-item .nav-link').removeClass('active');
      $(this).addClass('active');

      var href = $(this).attr('href') || '';
      var hashIdx = href.indexOf('#');

      // No hash → cross-page link, let the browser navigate.
      if (hashIdx < 0) return;

      // Has a hash, but URL points elsewhere → let the browser navigate.
      var pageBefore = href.substring(0, hashIdx);
      if (pageBefore && !isSamePage(pageBefore)) return;

      var targetId = href.substring(hashIdx);

      // Bare "#" (dropdown toggles, placeholder items) → no-op.
      if (targetId === '#') {
        event.preventDefault();
        return;
      }

      var $target = $(targetId);
      if (!$target.length) return; // anchor not on this page → let browser try

      event.preventDefault();
      var targetPosition = $target.offset().top;
      if (targetId !== '#footer') targetPosition -= navHeight;
      $('html, body').animate({ scrollTop: targetPosition }, 1000);
    });
  }

  // Treat trailing-slash variants and origin-only as equivalent to the
  // current page URL.
  function isSamePage(urlPrefix) {
    var here = window.location.origin + window.location.pathname;
    var a = urlPrefix.replace(/\/$/, '');
    var b = here.replace(/\/$/, '');
    return a === b || a === window.location.origin;
  }
})();
