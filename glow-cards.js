document.addEventListener('DOMContentLoaded', () => {
    const glowCards = document.querySelectorAll('.glow-card');

    const syncPointer = (e) => {
        const x = e.clientX;
        const y = e.clientY;
        const xp = (x / window.innerWidth).toFixed(2);
        const yp = (y / window.innerHeight).toFixed(2);

        glowCards.forEach(card => {
            card.style.setProperty('--x', x.toFixed(2));
            card.style.setProperty('--y', y.toFixed(2));
            card.style.setProperty('--xp', xp);
            card.style.setProperty('--yp', yp);
        });
    };

    document.addEventListener('pointermove', syncPointer);
});
