
// SCROLL STACK (Simplified Sticky Cards)

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.scroll-stack-wrapper');
    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));

    if (!wrapper || cards.length === 0) return;

    // Reset styles
    wrapper.style.height = 'auto';
    wrapper.style.paddingBottom = '0'; // No extra space below

    // Apply Sticky Logic
    cards.forEach((card, i) => {
        card.style.position = 'sticky';
        card.style.top = `${150 + i * 15}px`; // Stick with slight offset
        card.style.marginBottom = '20px';
        card.style.zIndex = i + 1;
        // Clean transforms
        card.style.transform = 'none';
        card.style.opacity = '1';
    });
});
