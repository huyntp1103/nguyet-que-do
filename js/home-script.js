// Homepage carousels and stats counter.
// Navbar smooth-scroll behavior lives in js/navbar-nav.js.

$(document).ready(function () {
  $('#intro').carousel({
    interval: 5 * 1000,
    pause: false
  });

  $('#testimonial-carousel').carousel({
    interval: 8 * 1000,
    pause: false
  });
});

// Stats number animation
$(document).ready(function () {
  let observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var target = $(entry.target);
        var maxCount = Number(target.text().substring(0, target.text().length));
        var currentCount = 0;
        var incrementTime = 2 * 1000 / maxCount;

        function updateCount() {
          target.text(currentCount);
          if (currentCount < maxCount) {
            currentCount++;
            setTimeout(updateCount, incrementTime);
          }
        }

        updateCount();
        observer.unobserve(entry.target);
      }
    });
  });

  $('.stats-number').each(function () {
    observer.observe(this);
  });
});
