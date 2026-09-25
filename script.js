/* ==========================================
   script.js — Interactive Logic & GSAP Animations
   Enhanced with Particle System, Skill Rings, & Animations
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins (ScrollTrigger is loaded via CDN)
    gsap.registerPlugin(ScrollTrigger);

    // Initialize all components
    initNavbar();
    initCursorGlow();
    initHeroAnimations();
    initDeskLamp();
    initAboutAnimations();
    initSkillRings();
    initTimelineScroll();
    initProjectCards();
    initIDCard();
    initContactForm();
    initParticles();
    initSectionAnimations();
});

/* ==========================================
   1. Navigation Bar Logic
   ========================================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');

    // Add backdrop style on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menu
    function toggleMobileMenu() {
        const isOpen = mobileMenu.classList.toggle('open');
        navToggle.classList.toggle('active', isOpen);
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.toggle('open', isOpen);
        }
    }

    // Close menu
    function closeMobileMenu() {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('open');
        }
    }

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        toggleMobileMenu();
    });

    // Close menu when clicking outside (on the backdrop overlay)
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', () => {
            closeMobileMenu();
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
            
            // Set active class
            if(link.classList.contains('nav-link')) {
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    // Sync active nav links on scroll using ScrollTrigger
    document.querySelectorAll('section').forEach(section => {
        const id = section.getAttribute('id');
        if (!id) return;
        
        ScrollTrigger.create({
            trigger: section,
            start: "top 30%",
            end: "bottom 30%",
            onEnter: () => activateNavLink(id),
            onEnterBack: () => activateNavLink(id)
        });
    });

    function activateNavLink(id) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

/* ==========================================
   2. Cursor Glow Effect
   ========================================== */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
        // Use GSAP for smooth tracking
        gsap.to(glow, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

/* ==========================================
   3. Hero Section Load Animations
   ========================================== */
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    // Initial fade in for content with explicit target states
    const tl = gsap.timeline({
        onComplete: () => {
            gsap.set(['.hero-badge', '.hero-name', '.hero-title', '.hero-actions', '.lamp-container'], {
                clearProps: "opacity,transform"
            });
        }
    });
    
    tl.fromTo('.hero-badge', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    )
    .fromTo('.hero-name', 
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
        "-=0.4"
    )
    .fromTo('.hero-title', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
        "-=0.4"
    )
    .fromTo('.hero-actions', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 
        "-=0.4"
    )
    .fromTo('.lamp-container', 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }, 
        "-=0.5"
    );
}

/* ==========================================
   4. Interactive Desk Lamp — ENHANCED
   ========================================== */
function initDeskLamp() {
    const lampContainer = document.getElementById('lamp-container');
    const lampSwitchBtn = document.getElementById('lamp-switch-btn');
    const pullChainLine = document.getElementById('pull-chain-line');
    const pullChainKnob = document.getElementById('pull-chain-knob');
    const heroDescription = document.getElementById('hero-description');
    
    const savedState = localStorage.getItem('lampState');
    let lampIsOn = savedState === 'on';

    // Synchronize initial document body state immediately to avoid screen flash
    if (lampIsOn) {
        document.body.classList.add('lamp-on');
        gsap.set(heroDescription, { filter: "brightness(1.2)" });
    } else {
        document.body.classList.remove('lamp-on');
        gsap.set(heroDescription, { filter: "brightness(0.6)" });
    }

    // Toggle Light Function
    function toggleLamp(playChainAnimation = false) {
        lampIsOn = !lampIsOn;
        
        if (lampIsOn) {
            document.body.classList.add('lamp-on');
            localStorage.setItem('lampState', 'on');
            
            // Trigger text reveal animation
            gsap.fromTo(heroDescription, 
                { opacity: 0.2, filter: "brightness(0.6)" }, 
                { opacity: 1, filter: "brightness(1.2)", duration: 0.8, ease: "power2.out" }
            );

            // Subtle bulb flicker effect on turn on
            gsap.fromTo('#lamp-bulb-glow, #light-beam', 
                { opacity: 0 },
                { opacity: 1, duration: 0.15, repeat: 3, yoyo: true, onComplete: () => {
                    gsap.set('#lamp-bulb-glow, #light-beam', { clearProps: "opacity" });
                }}
            );
            
            // Emit light particles effect
            emitLampParticles();
        } else {
            document.body.classList.remove('lamp-on');
            localStorage.setItem('lampState', 'off');
            gsap.to(heroDescription, {
                filter: "brightness(0.6)",
                duration: 0.5
            });
        }

        // Chain pull visual click effect
        if (playChainAnimation) {
            const chainTl = gsap.timeline();
            chainTl.to([pullChainLine, pullChainKnob], {
                y: 15,
                duration: 0.12,
                ease: "power1.in"
            })
            .to([pullChainLine, pullChainKnob], {
                y: -3,
                duration: 0.15,
                ease: "power2.out"
            })
            .to([pullChainLine, pullChainKnob], {
                y: 0,
                duration: 0.4,
                ease: "elastic.out(1, 0.3)"
            });
        }
    }
    
    // Small sparkle particles when lamp turns on
    function emitLampParticles() {
        const container = lampContainer;
        if (!container) return;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #fbbf24;
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 8px #fbbf24;
            `;
            container.appendChild(sparkle);
            
            const angle = (Math.PI * 2 / 8) * i;
            const dist = 60 + Math.random() * 40;
            
            gsap.fromTo(sparkle, 
                { 
                    x: container.offsetWidth / 2, 
                    y: container.offsetHeight * 0.35,
                    opacity: 1,
                    scale: 1
                },
                {
                    x: container.offsetWidth / 2 + Math.cos(angle) * dist,
                    y: container.offsetHeight * 0.35 + Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 0,
                    duration: 0.6 + Math.random() * 0.4,
                    ease: "power2.out",
                    onComplete: () => sparkle.remove()
                }
            );
        }
    }

    // Event listeners
    if (lampSwitchBtn) {
        lampSwitchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLamp(false);
        });
    }

    if (pullChainKnob) {
        pullChainKnob.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleLamp(true);
        });
    }

    if (lampContainer) {
        lampContainer.addEventListener('click', () => {
            toggleLamp(true);
        });
    }

    // Auto turn-on after 2 seconds only on first visit (when no preference has been saved yet)
    setTimeout(() => {
        if (savedState === null && !lampIsOn) {
            toggleLamp(true);
        }
    }, 2000);
}

/* ==========================================
   5. About Section Animations
   ========================================== */
function initAboutAnimations() {
    // Fade in text titles
    document.querySelectorAll('.text-reveal').forEach(title => {
        gsap.to(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // About Content layout blocks fade-in
    gsap.to('.about-graphics', {
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to('.about-text', {
        scrollTrigger: {
            trigger: '.about-section',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    });
}

/* ==========================================
   6. Skills Ring Animation (Circular Progress)
   ========================================== */
function initSkillRings() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillRingFills = document.querySelectorAll('.skill-ring-fill');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const circumference = 2 * Math.PI * 52; // 326.73

    // Animate rings on scroll into view
    skillRingFills.forEach(ring => {
        const percent = parseInt(ring.getAttribute('data-percent')) || 0;
        const offset = circumference - (circumference * percent / 100);
        
        // Set initial state
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = circumference;
        
        ScrollTrigger.create({
            trigger: ring.closest('.skill-card'),
            start: "top 90%",
            onEnter: () => {
                gsap.to(ring, {
                    strokeDashoffset: offset,
                    duration: 1.5,
                    ease: "power2.out"
                });
            }
        });
    });

    // Staggered card fade-in on scroll
    gsap.to('.skill-card', {
        scrollTrigger: {
            trigger: '.skills-grid',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.7)"
    });

    // Skills Category Filter Tabs
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');
            
            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'flex';
                    gsap.fromTo(card, 
                        { opacity: 0, scale: 0.9, y: 15 }, 
                        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }
                    );
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        onComplete: () => { card.style.display = 'none'; }
                    });
                }
            });
        });
    });
}

/* ==========================================
   7. Timeline Scroll Animations
   ========================================== */
function initTimelineScroll() {
    const leftItems = document.querySelectorAll('.timeline-item.left-item');
    const rightItems = document.querySelectorAll('.timeline-item.right-item');
    const isMobile = window.matchMedia('(max-width: 900px)').matches;

    leftItems.forEach(item => {
        // Animate the timeline-item itself since it has fade-in class
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });
        
        // On mobile, animate vertically (y: 30) instead of horizontally (x: -50) to prevent overflow-x scrollbars
        const startState = isMobile ? { y: 30, x: 0, opacity: 0.5 } : { x: -50, y: 0, opacity: 0.5 };
        const endState = isMobile ? { y: 0, x: 0, opacity: 1 } : { x: 0, y: 0, opacity: 1 };
        
        // Stagger or slide the interior content
        gsap.fromTo(item.querySelector('.timeline-content'), 
            startState,
            {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
                ...endState,
                duration: 0.85,
                ease: "power2.out"
            }
        );
    });

    rightItems.forEach(item => {
        // Animate the timeline-item itself since it has fade-in class
        gsap.to(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
        });

        // On mobile, animate vertically (y: 30) instead of horizontally (x: 50) to prevent overflow-x scrollbars
        const startState = isMobile ? { y: 30, x: 0, opacity: 0.5 } : { x: 50, y: 0, opacity: 0.5 };
        const endState = isMobile ? { y: 0, x: 0, opacity: 1 } : { x: 0, y: 0, opacity: 1 };

        // Stagger or slide the interior content
        gsap.fromTo(item.querySelector('.timeline-content'), 
            startState,
            {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                },
                ...endState,
                duration: 0.85,
                ease: "power2.out"
            }
        );
    });
}

/* ==========================================
   8. Project Cards Tilt & Modals
   ========================================== */
function initProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCloses = document.querySelectorAll('.modal-close');

    // 1. Staggered reveal for cards
    gsap.to('.project-card', {
        scrollTrigger: {
            trigger: '.projects-grid',
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    // 2. Custom 3D Tilt Effect on hover (Only for desktop devices that support hover interaction)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) {
        cards.forEach(card => {
            const inner = card.querySelector('.project-card-inner');
            
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                // Calculate mouse coordinates relative to card center (normalized between -1 and 1)
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                
                // Maximum tilt angle (in degrees)
                const maxTilt = 10;
                
                // Rotate card on X and Y based on cursor position
                gsap.to(inner, {
                    rotateY: x * maxTilt,
                    rotateX: -y * maxTilt,
                    scale: 1.02,
                    transformPerspective: 1000,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                // Reset rotation back to 0
                gsap.to(inner, {
                    rotateY: 0,
                    rotateX: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
            });
        });
    }

    // 3. Modal Opening (All devices)
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);

            if (targetModal && modalOverlay) {
                // Prevent background scrolling
                document.body.style.overflow = 'hidden';
                
                modalOverlay.classList.add('active');
                targetModal.classList.add('active');
                
                // Animate elements inside the modal
                gsap.fromTo(targetModal.querySelector('.modal-header'), 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.4, delay: 0.2 }
                );
                
                gsap.fromTo(targetModal.querySelectorAll('.modal-body > *'), 
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.3 }
                );
            }
        });
    });

    // 4. Modal Closing
    function closeModal() {
        const activeModal = document.querySelector('.modal-box.active');
        if (activeModal && modalOverlay) {
            modalOverlay.classList.remove('active');
            activeModal.classList.remove('active');
            
            // Re-enable body scroll
            document.body.style.overflow = 'auto';
        }
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            // If click is on the overlay mask itself, close modal
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    modalCloses.forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    });

    // Escape key press closes modals
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

/* ==========================================
   9. ID Card Swinging & Flipping
   ========================================== */
function initIDCard() {
    const cardContainer = document.getElementById('id-card-container');
    const idCard = document.getElementById('id-card');
    
    if (!cardContainer || !idCard) return;

    // Scroll entry effect
    gsap.from('.idcard-viewport', {
        scrollTrigger: {
            trigger: '.idcard-viewport',
            start: "top 80%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
    });

    // Flip card when clicked (All devices)
    cardContainer.addEventListener('click', (e) => {
        // Prevent click events inside download links/social links from reflipping the card
        if (e.target.closest('a')) {
            return;
        }
        
        idCard.classList.toggle('flipped');
        
        // Animation feedback
        gsap.to(cardContainer, {
            scale: 1.05,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut"
        });
    });

    // Hover effect: add inertia to pendulum swing on mouse hover (Only for hoverable desktop screens)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) {
        cardContainer.addEventListener('mouseenter', () => {
            // Stop current css keyframe animation gently and let JS add mouse follow tilt
            cardContainer.style.animationPlayState = 'paused';
        });

        cardContainer.addEventListener('mousemove', (e) => {
            const rect = cardContainer.getBoundingClientRect();
            // Calculate coordinate offsets relative to center
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            // Tilt the whole container based on mouse movement (representing pendulum motion)
            gsap.to(cardContainer, {
                rotate: x * 6,
                y: y * 8,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        cardContainer.addEventListener('mouseleave', () => {
            // Resume pendulum keyframe animation smoothly
            gsap.to(cardContainer, {
                rotate: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, 0.3)",
                onComplete: () => {
                    cardContainer.style.animationPlayState = 'running';
                }
            });
        });
    }
}

/* ==========================================
   10. Contact Form Validation & Toast Notification
   ========================================== */
async function loadEnv() {
    try {
        if (window.location.protocol === 'file:') return null;
        const response = await fetch('./.env');
        if (!response.ok) return null;
        const text = await response.text();
        const env = {};
        text.split(/\r?\n/).forEach(line => {
            const trimmedLine = line.trim();
            // Skip comments and empty lines
            if (!trimmedLine || trimmedLine.startsWith('#')) return;
            const parts = trimmedLine.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                let value = parts.slice(1).join('=').trim();
                // Strip optional quotes
                if ((value.startsWith('"') && value.endsWith('"')) || 
                    (value.startsWith("'") && value.endsWith("'"))) {
                    value = value.substring(1, value.length - 1);
                }
                env[key] = value;
            }
        });
        return env;
    } catch (e) {
        console.error("Error loading .env file:", e);
        return null;
    }
}

async function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
    const toast = document.getElementById('toast-notification');

    if (!form || !submitBtn) return;

    // Load credentials from .env file asynchronously
    const env = await loadEnv() || {};
    const EMAILJS_PUBLIC_KEY = env.EMAILJS_PUBLIC_KEY || "HP9YXLtWt5CKcVuA1"; 
    const EMAILJS_SERVICE_ID = env.EMAILJS_SERVICE_ID || "service_b4zp8aw";
    const EMAILJS_TEMPLATE_ID = env.EMAILJS_TEMPLATE_ID || "template_2askcu9";

    // Initialize EmailJS browser SDK if keys are configured
    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY,
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Show loading state
        submitBtn.disabled = true;
        if (btnText && btnLoader) {
            btnText.classList.add('hidden');
            btnLoader.classList.remove('hidden');
        }

        // Helper function for successful form submission
        function handleSuccess() {
            submitBtn.disabled = false;
            if (btnText && btnLoader) {
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
            }

            // Show Toast Notification
            if (toast) {
                toast.classList.add('active');
                
                // Hide Toast after 4 seconds
                setTimeout(() => {
                    toast.classList.remove('active');
                }, 4000);
            }

            // Clear inputs
            form.reset();
        }

        // Helper function for failed form submission
        function handleFailure() {
            submitBtn.disabled = false;
            if (btnText && btnLoader) {
                btnText.classList.remove('hidden');
                btnLoader.classList.add('hidden');
            }
        }

        // 2. Check configuration and submit to EmailJS
        const isEmailJSConfigured = 
            typeof emailjs !== 'undefined' && 
            EMAILJS_PUBLIC_KEY !== "YOUR_PUBLIC_KEY" && 
            EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID" && 
            EMAILJS_TEMPLATE_ID !== "YOUR_TEMPLATE_ID";

        if (isEmailJSConfigured) {
            emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
                .then(() => {
                    handleSuccess();
                }, (error) => {
                    console.error('EmailJS Error:', error);
                    alert("Failed to send message. Please check console errors or contact me directly.");
                    handleFailure();
                });
        } else {
            // Fallback: Simulate API Request locally during development
            console.log("EmailJS is not fully configured. Running in simulated fallback mode...");
            setTimeout(() => {
                handleSuccess();
            }, 1500);
        }
    });

    // Slide in section elements
    gsap.to('.contact-info-panel', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: "top 80%",
        },
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power2.out"
    });

    gsap.to('.contact-form-panel', {
        scrollTrigger: {
            trigger: '.contact-section',
            start: "top 80%",
        },
        opacity: 1,
        x: 0,
        duration: 0.85,
        ease: "power2.out"
    });
}

/* ==========================================
   11. Floating Particle System
   ========================================== */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resize();
    window.addEventListener('resize', resize);
    
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            this.pulseOffset = Math.random() * Math.PI * 2;
            // Color palette: indigo, violet, cool blue
            const colors = [
                [129, 140, 248],  // indigo
                [167, 139, 250],  // violet
                [96, 165, 250],   // blue
                [244, 114, 182],  // pink
            ];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        
        update(time) {
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
            
            // Pulsing opacity
            this.currentOpacity = this.opacity * (0.6 + 0.4 * Math.sin(time * this.pulseSpeed + this.pulseOffset));
        }
        
        draw() {
            const [r, g, b] = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity})`;
            ctx.fill();
            
            // Subtle glow effect
            if (this.size > 1.2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.currentOpacity * 0.1})`;
                ctx.fill();
            }
        }
    }
    
    // Create particles (fewer on mobile for performance)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 30 : 60;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    let startTime = Date.now();
    
    function animate() {
        const time = Date.now() - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Only draw when lamp is on for visual integration
        const isLampOn = document.body.classList.contains('lamp-on');
        const targetOpacity = isLampOn ? 0.6 : 0.15;
        canvas.style.opacity = targetOpacity;
        
        particles.forEach(p => {
            p.update(time);
            p.draw();
        });
        
        // Draw connecting lines between nearby particles
        if (!isMobile) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < 120) {
                        const lineOpacity = (1 - dist / 120) * 0.08;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(129, 140, 248, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
        }
        
        animId = requestAnimationFrame(animate);
    }
    
    animate();
}

/* ==========================================
   12. Additional Section Animations
   ========================================== */
function initSectionAnimations() {
    // Tech cloud badges staggered reveal
    gsap.to('.tech-cloud', {
        scrollTrigger: {
            trigger: '.tech-cloud',
            start: "top 85%",
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    });
    
    // Stagger tech badges
    gsap.from('.tech-badge', {
        scrollTrigger: {
            trigger: '.badge-container',
            start: "top 85%",
        },
        opacity: 0,
        y: 10,
        scale: 0.9,
        duration: 0.5,
        stagger: 0.05,
        ease: "back.out(1.7)"
    });
    
    // Highlight numbers count-up animation
    document.querySelectorAll('.highlight-number').forEach(el => {
        const text = el.textContent;
        const numMatch = text.match(/[\d.]+/);
        if (!numMatch) return;
        
        const targetNum = parseFloat(numMatch[0]);
        const suffix = text.replace(numMatch[0], '');
        const isFloat = text.includes('.');
        
        ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(el, 
                    { innerText: 0 },
                    {
                        innerText: targetNum,
                        duration: 1.5,
                        ease: "power2.out",
                        snap: { innerText: isFloat ? 0.1 : 1 },
                        onUpdate: function() {
                            const current = parseFloat(gsap.getProperty(el, "innerText"));
                            el.textContent = (isFloat ? current.toFixed(1) : Math.round(current)) + suffix;
                        }
                    }
                );
            },
            once: true
        });
    });
    
    // Footer fade in
    gsap.from('.footer-bottom', {
        scrollTrigger: {
            trigger: '.footer',
            start: "top 95%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out"
    });
}
