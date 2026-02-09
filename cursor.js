/**
 * AutoBid - Sincopecas-inspired interactions
 * Preloader, scroll animations, custom cursor, car repair effect
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. PRELOADER
  // ============================================
  const preloader = document.getElementById('preloader');
  const mainContent = document.getElementById('main-content');

  window.addEventListener('load', () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add('hidden');
      }
    }, 800);
  });

  // Fallback: hide preloader after 3 seconds
  setTimeout(() => {
    if (preloader && !preloader.classList.contains('hidden')) {
      preloader.classList.add('hidden');
    }
  }, 3000);

  // ============================================
  // 2. SCROLL ANIMATIONS (Intersection Observer)
  // ============================================
  const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  scrollElements.forEach(el => {
    scrollObserver.observe(el);
  });

  // ============================================
  // 3. CUSTOM CURSOR
  // ============================================
  // ============================================
  // UNIFIED CURSOR & MASK SYNC ENGINE
  // ============================================
  const cursor = document.getElementById('custom-cursor');
  const carContainer = document.getElementById('car-zone');
  const carReveal = document.getElementById('car-reveal');
  const carDamaged = document.querySelector('.car-damaged');

  // Shared state
  let mouseX = 0;
  let mouseY = 0;
  let isHoveringCar = false;

  // Track mouse globally
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  if (carContainer) {
    carContainer.addEventListener('mouseenter', () => isHoveringCar = true);
    carContainer.addEventListener('mouseleave', () => isHoveringCar = false);
  }

  // Single loop for everything
  function animate() {
    // 1. Update Cursor (Global)
    if (cursor) {
      // Note: We use translate instead of top/left for better performance
      // But CSS puts it at translate(-50%, -50%) to center.
      // So we need to combine them or change CSS.
      // Let's use fixed positioning in CSS and transform here.
      // CSS has: transform: translate(-50%, -50%);
      // We adding position.
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';

      if (isHoveringCar) cursor.classList.add('active');
      else cursor.classList.remove('active');
    }

    // 2. Update Mask (If hovering)
    if (isHoveringCar && carContainer && carReveal && carDamaged) {
      const rect = carContainer.getBoundingClientRect();

      // Calculate relative position based on LATEST mouse coordinates
      // This ensures cursor and mask use exactly the same data point frame-by-frame
      const relX = mouseX - rect.left;
      const relY = mouseY - rect.top;

      const xPercent = (relX / rect.width) * 100;
      const yPercent = (relY / rect.height) * 100;
      const radius = 25;

      const clipPathVal = `circle(${radius}% at ${xPercent}% ${yPercent}%)`;
      const maskVal = `radial-gradient(circle at ${xPercent}% ${yPercent}%, transparent ${radius}%, black ${radius + 0.5}%)`;

      carReveal.style.clipPath = clipPathVal;
      carDamaged.style.webkitMaskImage = maskVal;
      carDamaged.style.maskImage = maskVal;
    } else if (carContainer && carReveal && carDamaged) {
      // Reset when not hovering
      carReveal.style.clipPath = 'circle(0% at 50% 50%)';
      carDamaged.style.webkitMaskImage = 'none';
      carDamaged.style.maskImage = 'none';
    }

    requestAnimationFrame(animate);
  }

  // Start loop
  animate();

  // ============================================
  // 5. SMOOTH ANCHOR SCROLLING
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // 6. HEADER SCROLL EFFECT
  // ============================================
  const header = document.querySelector('.header');
  let lastScrollY = window.scrollY;

  if (header) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(22, 70, 127, 0.15)';
      } else {
        header.style.boxShadow = '0 2px 8px rgba(22, 70, 127, 0.08)';
      }

      lastScrollY = currentScrollY;
    });
  }

  // ============================================
  // 7. FORM INTERACTIONS
  // ============================================
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Visual feedback
      const button = form.querySelector('button[type="submit"]');

      if (button) {
        const originalText = button.textContent;
        button.textContent = 'Отправляем...';
        button.disabled = true;

        // Simulate submission
        setTimeout(() => {
          button.textContent = '✓ Отправлено!';
          button.style.background = '#10B981';

          setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
            button.disabled = false;
            form.reset();
          }, 2000);
        }, 1500);
      }
    });
  });

  // ============================================
  // 8. FILE UPLOAD BOX
  // ============================================
  const fileUploadBox = document.querySelector('.file-upload-box');

  if (fileUploadBox) {
    fileUploadBox.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.multiple = true;
      input.accept = 'image/*';

      input.onchange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
          fileUploadBox.innerHTML = `
                        <span>📷 Выбрано файлов: ${files.length}</span>
                        <small>Нажмите снова, чтобы изменить</small>
                    `;
        }
      };

      input.click();
    });

    // Drag and drop
    ['dragenter', 'dragover'].forEach(eventName => {
      fileUploadBox.addEventListener(eventName, (e) => {
        e.preventDefault();
        fileUploadBox.style.borderColor = '#3B44EC';
        fileUploadBox.style.background = 'rgba(59, 68, 236, 0.05)';
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      fileUploadBox.addEventListener(eventName, (e) => {
        e.preventDefault();
        fileUploadBox.style.borderColor = '';
        fileUploadBox.style.background = '';
      });
    });

    fileUploadBox.addEventListener('drop', (e) => {
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileUploadBox.innerHTML = `
                    <span>📷 Выбрано файлов: ${files.length}</span>
                    <small>Нажмите снова, чтобы изменить</small>
                `;
      }
    });
  }

  console.log('🚀 AutoBid Sincopecas-style interface loaded');
});
