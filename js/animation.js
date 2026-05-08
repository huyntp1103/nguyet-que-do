/**
 * Scroll-triggered reveal animations.
 *
 * Each `.content-slide-{up,down,left,right}` element starts off-screen
 * (handled by CSS). When it enters the viewport at >=10%, the matching
 * trigger class (.slide-{up,...}) is added and the observer detaches.
 *
 * Honors `prefers-reduced-motion`: when reduced motion is requested, all
 * elements are revealed immediately without animation.
 */
$(document).ready(function () {
    var reduced = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // If the user prefers reduced motion, reveal everything up front
    // and don't bother attaching observers.
    if (reduced) {
        document.querySelectorAll(
            '.content-slide-up, .content-slide-down, .content-slide-left, .content-slide-right'
        ).forEach(function (el) {
            el.classList.add('slide-up', 'slide-down', 'slide-left', 'slide-right');
        });
        return;
    }

    var directions = [
        { base: '.content-slide-up',    trigger: 'slide-up' },
        { base: '.content-slide-down',  trigger: 'slide-down' },
        { base: '.content-slide-left',  trigger: 'slide-left' },
        { base: '.content-slide-right', trigger: 'slide-right' },
    ];

    directions.forEach(function (d) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add(d.trigger);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(d.base).forEach(function (el) {
            observer.observe(el);
        });
    });
});
