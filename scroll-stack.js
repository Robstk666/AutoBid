
document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    // Increased spacing to avoid overlap issue ("first one runs into second")
    // Previous spacing was 30px. Increased to 60px to match margins and give breathing room.
    const CONFIG = {
        stackOffsetTop: 150, // Sticky top position in pixels
        stackSpacing: 60, // Increased vertical spacing
        scaleReduction: 0.05, // How much cards shrink
    };

    const wrapper = document.querySelector('.scroll-stack-wrapper');
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));

    if (!wrapper || cards.length === 0) return;

    // Reset styles
    wrapper.style.position = 'relative';
    wrapper.style.height = 'auto';
    wrapper.style.paddingBottom = '0';

    // Apply Sticky Logic
    cards.forEach((card, i) => {
        card.style.position = 'sticky';
        card.style.top = `${CONFIG.stackOffsetTop + (i * CONFIG.stackSpacing)}px`;
        card.style.zIndex = i + 1;
        card.style.width = '100%';
        card.style.marginBottom = `${CONFIG.stackSpacing}px`; // Add margin for spacing

        card.style.transition = 'transform 0.1s linear, opacity 0.1s linear';
        card.style.willChange = 'transform, opacity';
    });

    const onScroll = () => {
        cards.forEach((card, i) => {
            const nextCard = cards[i + 1];
            if (!nextCard) {
                // Last card stays full size
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
                return;
            }

            const rect = card.getBoundingClientRect();
            const nextRect = nextCard.getBoundingClientRect();

            const cardHeight = rect.height;
            const nextTopRel = nextRect.top - rect.top;

            const startDist = cardHeight;
            const endDist = CONFIG.stackSpacing;

            let progress = (startDist - nextTopRel) / (startDist - endDist);
            progress = Math.max(0, Math.min(1, progress));

            // Apply scale/opacity based on progress
            const scale = 1 - (progress * CONFIG.scaleReduction);
            const opacity = 1 - (progress * 0.2);

            card.style.transform = `scale(${scale})`;
            card.style.opacity = `${opacity}`;
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
});
