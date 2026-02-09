
// SCROLL STACK (Simplified & Optimized Deck Animation)

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.scroll-stack-wrapper');
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));

    if (!wrapper || cards.length === 0) return;

    // Configuration
    const STACK_OFFSET_TOP = 150; // Sticky top position in pixels
    const SCROLL_PER_CARD = window.innerHeight * 0.6; // Scroll distance to clear one card

    // Set total wrapper height to allow scrolling through all cards
    // This creates the scrollable area.
    const totalHeight = SCROLL_PER_CARD * (cards.length + 1) + window.innerHeight; // Added buffer
    wrapper.style.height = `${totalHeight}px`;
    wrapper.style.position = 'relative';

    // Initial Styles for Cards
    cards.forEach((card, i) => {
        card.style.position = 'sticky';
        card.style.top = `${STACK_OFFSET_TOP}px`;
        card.style.width = '100%';
        card.style.zIndex = cards.length - i; // Stack order: First is top (highest z-index)
        card.style.transformOrigin = 'center top';
        card.style.transition = 'none'; // Remove transition for smooth scroll scrub
        card.style.willChange = 'transform, opacity';
    });

    const onScroll = () => {
        const rect = wrapper.getBoundingClientRect();
        // Calculate scroll progress relative to the wrapper hitting the sticky point
        // When rect.top is at STACK_OFFSET_TOP, we start.
        // We want positive progress: how far have we scrolled PAST the start point?
        // rect.top decreases as we scroll down.
        const scrollProgressPx = STACK_OFFSET_TOP - rect.top;

        if (scrollProgressPx < 0) {
            // Not yet reached the sticky point. Reset all to initial stack.
            cards.forEach((card, i) => {
                const y = i * 15; // Visual stack offset (15px per card)
                const scale = 1 - (i * 0.05); // Visual scale reduction
                card.style.transform = `translateY(${y}px) scale(${scale})`;
                card.style.opacity = '1';
            });
            return;
        }

        cards.forEach((card, i) => {
            // Each card's animation window starts at i * SCROLL_PER_CARD
            const myStart = i * SCROLL_PER_CARD;

            if (scrollProgressPx >= myStart) {
                // I am active or leaving (or gone)
                // Calculate progress within my window (0 to 1+)
                const activeProgress = (scrollProgressPx - myStart) / SCROLL_PER_CARD;

                if (activeProgress > 1) {
                    // Fully left
                    // Move way up off screen.
                    card.style.transform = `translateY(-150vh) scale(1)`;
                    card.style.opacity = '0';
                } else {
                    // Currently leaving animation
                    // Move UP and Fade Out
                    const y = -activeProgress * (window.innerHeight * 0.8);
                    const opacity = 1 - activeProgress;
                    const scale = 1; // Keep full scale while leaving

                    card.style.transform = `translateY(${y}px) scale(${scale})`;
                    card.style.opacity = `${opacity}`;
                }
            } else {
                // I am waiting in the stack
                // Visual position depends on how close I am to becoming active.
                // Distance in pixels from my start:
                const distPx = myStart - scrollProgressPx;
                // Convert to "steps" away (visual index)
                // e.g. if I am 1 full scroll away, stepsAway = 1.
                const stepsAway = distPx / SCROLL_PER_CARD;

                // Visual stack offset logic:
                // As card above leaves (stepsAway goes 1 -> 0), I move up (15px -> 0px) and grow (0.95 -> 1.0).

                const y = stepsAway * 15; // 15px per step
                const scale = 1 - (stepsAway * 0.05);

                // Clamp scale to prevent weirdness if scrolling fast
                const safeScale = Math.max(0.5, Math.min(1, scale));

                card.style.transform = `translateY(${y}px) scale(${safeScale})`;
                card.style.opacity = '1';
            }
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll(); // Initial paint
});
