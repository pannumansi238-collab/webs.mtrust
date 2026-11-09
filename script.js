/**
 * MANSI PANNU — CREATIVE CODE PORTFOLIO
 * Standalone JavaScript (Vanilla JS, no dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation scroll blur effect
    const navbar = document.querySelector('.navbar');
    const onScroll = () => {
        if (window.scrollY > 20) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 2. Mobile Menu Toggle
    const menuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('active');
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 3. Reveal elements on scroll using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // If it contains skill bars, animate their widths
                        const bars = entry.target.querySelectorAll('.skill-bar-fill');
                        bars.forEach((bar) => {
                            const targetWidth = bar.getAttribute('data-width') || '0%';
                            bar.style.width = targetWidth;
                        });
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        revealElements.forEach((el) => observer.observe(el));
    } else {
        // Fallback if IntersectionObserver not supported
        revealElements.forEach((el) => {
            el.classList.add('visible');
            const bars = el.querySelectorAll('.skill-bar-fill');
            bars.forEach((bar) => {
                bar.style.width = bar.getAttribute('data-width') || '0%';
            });
        });
    }

    // 4. Creative Work Lightbox Modal
    const modal = document.getElementById('creativeModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalNote = document.getElementById('modalNote');
    const closeModalBtn = document.getElementById('closeModalBtn');

    const openModal = (item) => {
        if (!modal) return;
        if (modalImg) modalImg.src = item.image;
        if (modalTitle) modalTitle.textContent = item.title;
        if (modalCategory) modalCategory.textContent = item.category;
        if (modalNote) modalNote.textContent = item.note;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove('open');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.creative-card-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal({
                title: btn.getAttribute('data-title') || '',
                category: btn.getAttribute('data-category') || '',
                note: btn.getAttribute('data-note') || '',
                image: btn.getAttribute('data-image') || '',
            });
        });
    });

    closeModalBtn?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const formSuccess = document.getElementById('formSuccess');
    const resetFormBtn = document.getElementById('resetFormBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending…';
            }

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');

            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const message = messageInput ? messageInput.value : '';

            // Simulate sending
            await new Promise((r) => setTimeout(r, 700));

            if (contactForm && formSuccess) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });

        resetFormBtn?.addEventListener('click', () => {
            if (contactForm && formSuccess) {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Send message';
                }
            }
        });
    }
});
