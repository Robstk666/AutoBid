// SCROLL STACK (Ported from React)
// Using Lenis for smooth scrolling

document.addEventListener('DOMContentLoaded', () => {
    // Configuration
    const CONFIG = {
        itemDistance: 100, // Distance between items in stack
        itemScale: 0.03, // Scale difference per item
        itemStackDistance: 30, // Visual stack offset
        stackPosition: '20%', // Where the stack locks
        scaleEndPosition: '10%', // Where scaling finishes
        baseScale: 0.85, // Starting scale for cards
        rotationAmount: 0, // Optional rotation
        blurAmount: 0, // Optional blur
    };

    const container = document.querySelector('.scroll-stack-section');
    const scrollerRef = document.querySelector('.scroll-stack-wrapper');
    if (!container || !scrollerRef) return;

    // Use window scrolling for this implementation as it wraps a section of the main page
    // The provided React code had 'useWindowScroll' option. We'll simulate that environment.
    // However, the CSS `scroll-stack-wrapper` has `overflow: hidden`. We might need to change structure.
    // Let's check the HTML structure in index.html.
    // The current structure is: section#benefits > .container > .scroll-stack-wrapper > .scroll-stack-card
    // The React code expects a "scroll-stack-inner" with lots of padding. Let's adjust HTML first if needed.

    // Actually, let's implement the logic using the existing structure but injecting the spacer.
    // We need to initialize Lenis globally or for this section. The existing site uses Lenis (from animations.js likely).
    // Let's assume global Lenis is active or we create a new one if not.
    // Wait, animations.js usually initializes Lenis on window.
    // We will hook into the window scroll event.

    const cards = Array.from(document.querySelectorAll('.scroll-stack-card'));
    const spacer = document.createElement('div');
    spacer.className = 'scroll-stack-end';
    spacer.style.height = '1px';
    spacer.style.width = '100%';
    // The spacer needs to be far down to allow scrolling.
    // The React code has `pb-[50rem]` on inner.
    scrollerRef.appendChild(spacer);

    // Add padding to wrapper to allow scroll space
    // scrollerRef.style.paddingBottom = '50rem'; // We can set this in CSS or here
    // The React code pins items based on window scroll.

    // Helper: Parse percentage
    const parsePercentage = (value, total) => {
        if (typeof value === 'string' && value.includes('%')) {
            return (parseFloat(value) / 100) * total;
        }
        return parseFloat(value);
    };

    const calculateProgress = (scrollTop, start, end) => {
        if (scrollTop < start) return 0;
        if (scrollTop > end) return 1;
        return (scrollTop - start) / (end - start);
    };

    const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY;
    };

    // Main Update Function
    const updateTransforms = () => {
        const scrollTop = window.scrollY;
        const viewportHeight = window.innerHeight;

        const stackPosPx = parsePercentage(CONFIG.stackPosition, viewportHeight);
        const scaleEndPx = parsePercentage(CONFIG.scaleEndPosition, viewportHeight);

        const endOffset = getOffset(spacer); // Position of the bottom marker

        // Pin end boundary: when the bottom of the section reaches middle of screen?
        // The React code uses: `pinEnd = endElementTop - containerHeight / 2`
        const pinEnd = endOffset - viewportHeight / 2;

        cards.forEach((card, i) => {
            const cardTop = getOffset(card); // Initial position (static)

            // Logic from React:
            // triggerStart = cardTop - stackPosition - (distance * i)
            const triggerStart = cardTop - stackPosPx - (CONFIG.itemStackDistance * i);
            const triggerEnd = cardTop - scaleEndPx;

            const pinStart = triggerStart;

            // Scaling
            const scaleProgress = calculateProgress(scrollTop, triggerStart, triggerEnd);
            const targetScale = CONFIG.baseScale + (i * CONFIG.itemScale);
            // Interpolate between 1 and targetScale
            // React: scale = 1 - scaleProgress * (1 - targetScale)
            const scale = 1 - scaleProgress * (1 - targetScale);

            // Translation (Pinning)
            let translateY = 0;
            const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

            if (isPinned) {
                // Pin it: counteract scroll + visual stack offset
                // React: scrollTop - cardTop + stackPosition + stackDistance*i
                translateY = scrollTop - cardTop + stackPosPx + (CONFIG.itemStackDistance * i);
            } else if (scrollTop > pinEnd) {
                // Release at bottom
                // React: pinEnd - cardTop + stackPosition + stackDistance*i
                translateY = pinEnd - cardTop + stackPosPx + (CONFIG.itemStackDistance * i);
            }

            // Apply
            card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`;
            card.style.zIndex = i + 1;

            // Optional: Opacity/Blur for cards "behind"
            // The top card (closest to view) should be clear.
            // Simplified: no blur for now, just stacking.
        });
    };

    // Attach to scroll
    window.addEventListener('scroll', updateTransforms);
    window.addEventListener('resize', updateTransforms);

    // Initial call
    // We need to wait for layout to settle?
    setTimeout(updateTransforms, 100);
});
