// Initialize Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Scroll Stack Logic
document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.scroll-stack-wrapper');
    const cards = document.querySelectorAll('.scroll-stack-card');

    if (!wrapper || cards.length === 0) return;

    const stickyTop = 150; // The 'top' value in CSS
    const gap = 30; // Gap between pinned cards

    // Set initial sticky tops to create the stack offset
    cards.forEach((card, index) => {
        card.style.top = `${stickyTop + index * gap}px`;
        card.style.zIndex = index + 1;
    });

    const updateCards = (scrollTop) => {
        // Get absolute position of wrapper relative to document
        // We calculate this dynamically or cache it? Dynamically is safer for reflows, but slightly slower.
        // Given Lenis, let's cache it and update on resize if needed, or just calc every frame (modern browsers handle it fine).
        const wrapperRect = wrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top + scrollTop;

        cards.forEach((card, index) => {
            // Original position of card in document flow
            const cardTop = wrapperTop + card.offsetTop;

            // The scroll position where this card starts sticking
            // It sticks when (cardTop - scrollTop) = (stickyTop + index * gap)
            const stickPoint = cardTop - (stickyTop + index * gap);

            // How far have we scrolled past the stick point?
            const scrollDistance = scrollTop - stickPoint;

            if (scrollDistance > 0) {
                // We are scrolling past the stick point.
                // Scale down based on distance.
                // Scale = 1 - (scrollDistance / 1000) * 0.1
                let scale = 1 - (scrollDistance / 1000) * 0.1;
                // Clamp scale
                if (scale < 0.85) scale = 0.85;

                // Blur
                let blur = (scrollDistance / 500) * 5;
                if (blur > 5) blur = 5;

                // Opacity fade for very old cards
                let opacity = 1 - (scrollDistance / 1500);
                if (opacity < 0.4) opacity = 0.4;

                card.style.transform = `scale(${scale})`;
                card.style.filter = `blur(${blur}px)`;
                // card.style.opacity = opacity;
                // Opacity might conflict with stacking visibility, keeping it simple
            } else {
                card.style.transform = `scale(1)`;
                card.style.filter = `blur(0px)`;
                // card.style.opacity = 1;
            }
        });
    };

    lenis.on('scroll', (e) => {
        updateCards(e.scroll);
    });
});
