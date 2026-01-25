/**
 * Component Loader for Navbar and Footer
 * Handles dynamic loading of shared components and current page highlighting
 */
(function() {
  // Determine base path based on current page location
  var basePath = '';
  var currentPage = '';
  
  // Check if we're in a subdirectory (like /wiki/)
  var pathname = window.location.pathname;
  
  if (pathname.includes('/wiki/')) {
    basePath = '../';
    // Extract current page from URL (e.g., "nguyet-que-do-ii" from "/wiki/nguyet-que-do-ii")
    var match = pathname.match(/\/wiki\/([^\/\.]+)/);
    if (match) {
      currentPage = match[1];
    }
  } else if (pathname.includes('/co-cau-nhan-su')) {
    basePath = '';
    currentPage = 'co-cau-nhan-su';
  } else {
    basePath = '';
    currentPage = 'index';
  }

  // Function to load a component
  function loadComponent(placeholderId, componentPath, callback) {
    var placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', basePath + componentPath, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Replace {BASE_PATH} placeholder with actual base path
          var html = xhr.responseText.replace(/\{BASE_PATH\}/g, basePath);
          placeholder.outerHTML = html;
          if (callback) callback();
        } else {
          console.error('Failed to load component: ' + componentPath);
        }
      }
    };
    xhr.send();
  }

  // Function to highlight current page in navigation
  function highlightCurrentPage() {
    if (!currentPage) return;

    // Find all nav links with data-page attribute
    var navLinks = document.querySelectorAll('[data-page]');
    navLinks.forEach(function(link) {
      if (link.getAttribute('data-page') === currentPage) {
        // Replace href with # for current page
        link.setAttribute('href', '#');
        // Add active class for styling
        link.classList.add('active');
        // Optionally add visual indicator
        link.style.fontWeight = 'bold';
      }
    });
  }

  // Load components when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    // Load navbar
    loadComponent('navbar-placeholder', 'components/navbar.html', function() {
      highlightCurrentPage();
      // Trigger custom event when navbar is loaded
      var event = new CustomEvent('navbarLoaded');
      document.dispatchEvent(event);
    });

    // Load footer
    loadComponent('footer-placeholder', 'components/footer.html');
  }
})();