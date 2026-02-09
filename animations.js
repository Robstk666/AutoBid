// Animations & Preloader

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('main-content');
    const heroTitle = document.querySelector('.hero-title');

    // 1. Initial Load Sequence
    window.onload = () => {
        setTimeout(() => {
            // Hide preloader
            preloader.style.opacity = '0';

            // Show main content
            mainContent.style.opacity = '1';

            // Remove preloader from DOM after transition
            setTimeout(() => {
                preloader.style.display = 'none';

                // Trigger Hero Animations manually to ensure they start after preloader
                document.querySelectorAll('.fade-in-up').forEach(el => {
                    el.classList.add('visible');
                });

                // Trigger logo scroll logic if already scrolled
                if (window.scrollY > 400) {
                    const navLogo = document.querySelector('.nav-logo');
                    if (navLogo) navLogo.classList.add('visible');
                }

            }, 800);

        }, 1500); // Wait 1.5s for logo pulse
    };

    // 2. Scroll Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% visible
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    // Target elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up');
    scrollElements.forEach(el => animateOnScroll.observe(el));

    // 3. Hero Video Loop Control (Custom 3s pause)
    const heroVideo = document.querySelector('.hero-bg-video');
    if (heroVideo) {
        // Ensure native loop is off so 'ended' event fires
        heroVideo.removeAttribute('loop');

        heroVideo.addEventListener('ended', () => {
            setTimeout(() => {
                heroVideo.currentTime = 0;
                heroVideo.play().catch(e => console.error('Replay error:', e));
            }, 3000);
        });
    }

    // 4. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (btn && answer) {
            btn.addEventListener('click', () => {
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            });
        }
    });

    // 4. Glowing Cards Effect (Aceternity Port)
    const glowingCards = document.querySelectorAll('.glowing-card');

    if (glowingCards.length > 0) {
        window.addEventListener('mousemove', (e) => {
            glowingCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Update CSS variables for glow position
                card.style.setProperty('--glow-x', `${x}px`);
                card.style.setProperty('--glow-y', `${y}px`);

                // Optional: Toggle 'active' class based on proximity or hover
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
        });
    }

    // 5. Logo Scroll Animation (Hero -> Header) - SCROLL BASED
    const navLogo = document.querySelector('.nav-logo');
    const heroLogoWrapper = document.getElementById('hero-logo-wrapper');

    if (navLogo) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            // Header logo appears after 400px
            if (scrollY > 400) {
                navLogo.classList.add('visible');
            } else {
                navLogo.classList.remove('visible');
            }

            // Hero logo fades out faster
            if (heroLogoWrapper) {
                // Simple opacity calculation: 1 at 0px, 0 at 300px
                let opacity = 1 - (scrollY / 300);
                if (opacity < 0) opacity = 0;
                heroLogoWrapper.style.opacity = opacity;
                heroLogoWrapper.style.transform = `scale(${1 - (scrollY / 1000)})`; // Slight scale down
            }
        });
    }

    // 6. Glowing Grid Effect (Mouse tracking)
    const glowCards = document.querySelectorAll('.glow-card');
    if (glowCards.length > 0) {
        document.body.addEventListener('mousemove', (e) => {
            glowCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    }

    // 7. Lottie Animation for 'Call' Icon
    const callContainer = document.getElementById('lottie-call-container');
    if (callContainer && typeof lottie !== 'undefined' && typeof callIconData !== 'undefined') {
        const anim = lottie.loadAnimation({
            container: callContainer,
            renderer: 'svg',
            loop: true,
            autoplay: false, // Wait for hover
            animationData: callIconData
        });
        // Show first frame immediately so it's not empty
        anim.addEventListener('DOMLoaded', () => {
            anim.goToAndStop(0, true);
        });

        const card = callContainer.closest('.glowing-card');
        if (card) {
            card.addEventListener('mouseenter', () => anim.play());
            card.addEventListener('mouseleave', () => anim.stop());
        }
    }
    // 8. Lottie Animation for 'Money' Icon
    const moneyContainer = document.getElementById('lottie-money-container');
    if (moneyContainer && typeof lottie !== 'undefined' && typeof moneyIconData !== 'undefined') {
        const animMoney = lottie.loadAnimation({
            container: moneyContainer,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: moneyIconData
        });
        animMoney.addEventListener('DOMLoaded', () => {
            animMoney.goToAndStop(0, true);
        });

        const cardMoney = moneyContainer.closest('.glowing-card');
        if (cardMoney) {
            cardMoney.addEventListener('mouseenter', () => animMoney.play());
            cardMoney.addEventListener('mouseleave', () => animMoney.stop());
        }
    }

    // 8.1 Lottie Animation for 'Services' (Loader) Icon
    const servicesContainer = document.getElementById('lottie-services-container');
    if (servicesContainer && typeof lottie !== 'undefined' && typeof servicesIconData !== 'undefined') {
        const animServices = lottie.loadAnimation({
            container: servicesContainer,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: servicesIconData
        });
        animServices.addEventListener('DOMLoaded', () => {
            animServices.goToAndStop(0, true);
        });

        const cardServices = servicesContainer.closest('.glowing-card');
        if (cardServices) {
            cardServices.addEventListener('mouseenter', () => animServices.play());
            cardServices.addEventListener('mouseleave', () => animServices.stop());
        }
    }

    // 8.2 Lottie Animation for 'Missed Deadlines' Icon
    const deadlinesContainer = document.getElementById('lottie-deadlines-container');
    if (deadlinesContainer && typeof lottie !== 'undefined' && typeof missedDeadlinesData !== 'undefined') {
        const animDeadlines = lottie.loadAnimation({
            container: deadlinesContainer,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: missedDeadlinesData
        });
        animDeadlines.addEventListener('DOMLoaded', () => {
            animDeadlines.goToAndStop(0, true);
        });

        const cardDeadlines = deadlinesContainer.closest('.glowing-card');
        if (cardDeadlines) {
            cardDeadlines.addEventListener('mouseenter', () => animDeadlines.play());
            cardDeadlines.addEventListener('mouseleave', () => animDeadlines.stop());
        }
    }

    // 8.3 Lottie Animation for 'Risk' Icon
    const riskContainer = document.getElementById('lottie-risk-container');
    if (riskContainer && typeof lottie !== 'undefined' && typeof riskData !== 'undefined') {
        const animRisk = lottie.loadAnimation({
            container: riskContainer,
            renderer: 'svg',
            loop: true,
            autoplay: false,
            animationData: riskData
        });
        animRisk.addEventListener('DOMLoaded', () => {
            animRisk.goToAndStop(0, true);
        });

        const cardRisk = riskContainer.closest('.glowing-card');
        if (cardRisk) {
            cardRisk.addEventListener('mouseenter', () => animRisk.play());
            cardRisk.addEventListener('mouseleave', () => animRisk.stop());
        }
    }


    /* ==========================================================================
       9. "Magic Repair" Lens Effect (DOM-based Overlay)
       ========================================================================== */
    const container = document.getElementById("scratch-container");
    const lens = document.getElementById("repair-lens");
    const imgDamaged = document.getElementById("car-damaged");
    const imgFixed = document.getElementById("car-fixed");
    const instruction = document.getElementById("scratch-instruction");

    if (container && lens && imgDamaged && imgFixed) {

        // Function to ensure fixed image matches damaged image dimensions exactly
        const syncDimensions = () => {
            const width = imgDamaged.clientWidth;
            const height = imgDamaged.clientHeight;

            if (width > 0 && height > 0) {
                // Set fixed image to match damaged image size exactly
                imgFixed.style.width = width + 'px';
                imgFixed.style.height = height + 'px';
            }
        };

        // Initialize dimensions
        window.addEventListener('resize', syncDimensions);

        // Also run on load
        if (imgDamaged.complete) {
            syncDimensions();
        } else {
            imgDamaged.onload = syncDimensions;
        }

        // Just in case, poll for a bit
        setTimeout(syncDimensions, 100);
        setTimeout(syncDimensions, 500);

        // Interaction
        container.addEventListener("mousemove", (e) => {
            // Show lens
            lens.style.display = "block";
            if (instruction) instruction.style.opacity = "0";

            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Lens dimensions (200x200 defined in HTML, or read from computed style)
            const lensSize = 200;
            const half = lensSize / 2;

            // Move lens center to mouse
            let lensX = x - half;
            let lensY = y - half;

            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';

            // Move fixed image OPPOSITE to lens to keep it "static" relative to container
            // We want the image inside the lens to start at -lensX, -lensY relative to the lens
            imgFixed.style.left = -lensX + 'px';
            imgFixed.style.top = -lensY + 'px';
        });

        // Touch support
        container.addEventListener("touchmove", (e) => {
            e.preventDefault();
            // Show lens
            lens.style.display = "block";
            if (instruction) instruction.style.opacity = "0";

            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const lensSize = 200;
            const half = lensSize / 2;

            let lensX = x - half;
            let lensY = y - half;

            lens.style.left = lensX + 'px';
            lens.style.top = lensY + 'px';

            imgFixed.style.left = -lensX + 'px';
            imgFixed.style.top = -lensY + 'px';
        }, { passive: false });

        container.addEventListener("mouseleave", () => {
            lens.style.display = "none";
        });

        container.addEventListener("touchend", () => {
            lens.style.display = "none";
        });
    }
});
