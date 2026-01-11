document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Carousel Logic
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    let autoSlide = setInterval(nextSlide, slideInterval);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            showSlide(index);
            autoSlide = setInterval(nextSlide, slideInterval);
        });
    });

    // Tracking Simulation for Slide 3
    const trackingSlide = document.getElementById('slide-tracking');
    if (trackingSlide) {
        trackingSlide.innerHTML = `
            <div class="container">
                <div class="tracking-demo">
                    <div class="hero-content">
                        <h1>Track Shipments in Real-Time</h1>
                        <p>Complete visibility for your cargo from departure to final delivery across Zimbabwe.</p>
                        <div class="tracking-ios-mockup">
                            <div class="mockup-header">
                                <span>Shipment #TRD-8829-ZW</span>
                                <span class="status-badge">IN TRANSIT</span>
                            </div>
                            <div class="mockup-body">
                                <div class="timeline-item active">
                                    <div class="time">10:45 AM</div>
                                    <div class="details">Departed Beitbridge Border Post</div>
                                </div>
                                <div class="timeline-item">
                                    <div class="time">06:20 AM</div>
                                    <div class="details">ZIMRA Clearance Completed</div>
                                </div>
                                <div class="timeline-item">
                                    <div class="time">Yesterday</div>
                                    <div class="details">Arrived at Port of Entry</div>
                                </div>
                            </div>
                        </div>
                        <a href="about.html" class="btn-primary">Try It Now</a>
                    </div>
                </div>
            </div>
        `;

        // Add styling for tracking mockup via JS to keep CSS clean
        const style = document.createElement('style');
        style.innerHTML = `
            .tracking-ios-mockup {
                background: white;
                border-radius: 20px;
                padding: 20px;
                color: var(--navy);
                margin-bottom: 2rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                max-width: 400px;
                transform: rotateX(10deg) rotateY(-5deg);
                animation: float 4s ease-in-out infinite;
                margin-top: 40px;
            }
            .mockup-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid #eee;
                padding-bottom: 15px;
                margin-bottom: 15px;
                font-weight: 700;
                font-size: 0.9rem;
            }
            .status-badge {
                background: var(--lime);
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 0.7rem;
            }
            .timeline-item {
                display: flex;
                gap: 15px;
                margin-bottom: 20px;
                opacity: 0.5;
            }
            .timeline-item.active { opacity: 1; }
            .timeline-item .time { font-size: 0.8rem; font-weight: 700; width: 80px; }
            .timeline-item .details { font-size: 0.9rem; }
            @keyframes float {
                0%, 100% { transform: translateY(0) rotateX(10deg); }
                50% { transform: translateY(-10px) rotateX(5deg); }
            }
        `;
        document.head.appendChild(style);
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active-reveal');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(i => i.classList.remove('active'));

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('mobile-active');

            if (isActive) {
                // Change to close icon
                menuIcon.setAttribute('data-lucide', 'x');
            } else {
                // Change to menu icon
                menuIcon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.querySelector('.stats');

    const countUp = (el) => {
        const target = +el.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps approx
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                el.innerText = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = target;
            }
        };
        updateCount();
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => countUp(counter));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Form Submission Animation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;

            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.background = '#28a745';
                btn.style.color = 'white';
                contactForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
