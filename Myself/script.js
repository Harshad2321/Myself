let isLoaded = false;
let currentFilter = 'all';

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.menu-btn');
    const mobileMenu = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileClose = document.querySelector('.mobile-close');
    
    function toggleMobileMenu() {
        if (mobileToggle) mobileToggle.classList.toggle('active');
        if (mobileMenu) mobileMenu.classList.toggle('active');
        if (mobileOverlay) mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileMenu && mobileMenu.classList.contains('active') ? 'hidden' : '';
    }
    
    function closeMobileMenu() {
        if (mobileToggle) mobileToggle.classList.remove('active');
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (mobileToggle) mobileToggle.addEventListener('click', toggleMobileMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking on nav links
    document.querySelectorAll('.mobile-nav-item').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.main-header');
    
    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateNavbar);
    
    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-item, .mobile-nav-item');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // Theme toggle
    const themeToggle = document.querySelector('.theme-btn');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    function toggleTheme() {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';
        
        if (isDark) {
            body.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    
    if (savedTheme === 'light' && themeIcon) {
        themeIcon.textContent = '🌙';
    }
    
    // Add theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    
    // Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

const certificates = [
    {
        name: "Python Programming",
        issuer: "Simplilearn",
        date: "2024",
        path: "Certificates/Harshad Agrawal Python(simplilearn).pdf",
        icon: "PY"
    },
    {
        name: "Data Structures & Algorithms",
        issuer: "Professional Course",
        date: "2024",
        path: "Certificates/Harshad Agrawal_Data Structures & Algorithms Course For Beginners.pdf",
        icon: "DS"
    },
    {
        name: "Basic AI-ML",
        issuer: "AI/ML Institute",
        date: "2024",
        path: "Certificates/Basic Of AI-ML.pdf",
        icon: "AI"
    },
    {
        name: "2 Fast 2 Hack Winner",
        issuer: "National Hackathon",
        date: "2025",
        path: "Certificates/2 FAST 2 HACK.pdf",
        icon: "WN"
    },
    {
        name: "EXERGY IIT Kanpur",
        issuer: "IIT Kanpur",
        date: "2024",
        path: "Certificates/exergy-iitk.png",
        icon: "IIT"
    },
    {
        name: "Go4Youth Program",
        issuer: "Youth Development",
        date: "2024",
        path: "Certificates/IN12103479_go4youth_certificate_compressed.pdf",
        icon: "YD"
    },
    {
        name: "ICFAMEAD Certification",
        issuer: "ICFAMEAD",
        date: "2024",
        path: "Certificates/Certificate ICFAMEAD.pdf",
        icon: "IC"
    },
    {
        name: "Nation Building Certificate",
        issuer: "Government Program",
        date: "2024",
        path: "Certificates/CERTIFICATE OF NATION BUILDING.pdf",
        icon: "NB"
    },
    {
        name: "Campus Ambassador",
        issuer: "eDC IIT Roorkee",
        date: "2024",
        path: "Certificates/Campus_Ambassador_Offer_Letter_eDC.pdf",
        icon: "CA"
    },
    {
        name: "SQL Advanced",
        issuer: "Database Certification",
        date: "2024",
        path: "Certificates/sql_basic certificate.pdf",
        icon: "SQL"
    },
    {
        name: "Hedera Blockchain",
        issuer: "Hedera Network",
        date: "2024",
        path: "Certificates/Hedera Certification.pdf",
        icon: "BC"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initializeAdvancedFeatures();
});

function initializeApp() {
    setupCustomCursor();
    setupNavigation();
    setupMobileNavigation();
    setupThemeToggle();
    setupTypedText();
    setupScrollAnimations();
    setupProjectFilters();
    // setupCertificates(); // Disabled - using static HTML instead
    setupContactForm();
    setupCounters();
    setupScrollIndicator();
    setupResponsiveFeatures();
    
    isLoaded = true;
    console.log('Portfolio initialized successfully!');
}

function setupCustomCursor() {
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    
    if (!cursor || !follower) return;
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.opacity = '1';
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        follower.style.opacity = '1';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    document.querySelectorAll('a, button, .project-card, .cert-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            follower.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        });
    });
}

function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
        
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function setupMobileNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    if (!mobileToggle || !mobileMenu || !mobileBackdrop) return;
    
    let isMenuOpen = false;
    
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        mobileToggle.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        mobileBackdrop.classList.toggle('active', isMenuOpen);
        
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    }
    
    function closeMobileMenu() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileBackdrop.addEventListener('click', closeMobileMenu);
    
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            closeMobileMenu();
            
            setTimeout(() => {
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 300);
        });
    });
    
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        mobileNavItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀' : '🌙';
    }
}

function setupResponsiveFeatures() {
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || isReducedMotion) {
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');
        
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        
        document.body.style.cursor = 'default';
        
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
    
    window.addEventListener('orientationchange', () => {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) {
                mobileToggle.click();
            }
        }
        
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    window.addEventListener('resize', debounce(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100));
    
    if ('ontouchstart' in window) {
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
}

function setupTypedText() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const strings = [
        'intelligent solutions.',
        'modern web apps.',
        'AI/ML systems.',
        'user experiences.',
        'scalable backends.',
        'beautiful interfaces.'
    ];
    
    if (typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: strings,
            typeSpeed: 200,
            backSpeed: 150,
            backDelay: 4000,
            startDelay: 1000,
            fadeOut: false,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            smartBackspace: false
        });
    }
}

function setupScrollAnimations() {
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            distance: '30px',
            duration: 800,
            easing: 'ease-in-out',
            reset: false
        });
        
        sr.reveal('.hero-content', { origin: 'left', delay: 200 });
        sr.reveal('.hero-visual', { origin: 'right', delay: 400 });
        sr.reveal('.section-title', { origin: 'top', delay: 100 });
        sr.reveal('.about-text', { origin: 'left', delay: 200 });
        sr.reveal('.skills-section', { origin: 'right', delay: 300 });
        sr.reveal('.timeline-item', { origin: 'bottom', interval: 200 });
        sr.reveal('.project-card', { origin: 'bottom', interval: 200 });
        sr.reveal('.cert-card', { origin: 'bottom', interval: 100 });
        sr.reveal('.contact-content', { origin: 'bottom', delay: 200 });
    }
}

function setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => observer.observe(counter));
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }
}

function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(-20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function setupCertificates() {
    const certContainer = document.getElementById('certContainer');
    if (!certContainer) return;
    
    certificates.forEach((cert, index) => {
        const certCard = createCertificateCard(cert, index);
        certContainer.appendChild(certCard);
    });
}

function createCertificateCard(cert, index) {
    const card = document.createElement('div');
    card.className = 'cert-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <div class="cert-icon">
            ${cert.icon}
        </div>
        <h3>${cert.name}</h3>
        <p class="cert-issuer">${cert.issuer}</p>
        <p class="cert-date">${cert.date}</p>
    `;
    
    card.addEventListener('click', () => openCertificateModal(cert));
    
    return card;
}

function openCertificateModal(cert) {
    const modal = document.getElementById('certificateModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    
    if (!modal || !modalTitle || !modalImage) return;
    
    modalTitle.textContent = cert.name;
    
    if (cert.path.endsWith('.pdf')) {
        modalImage.style.display = 'none';
        modalTitle.innerHTML = `
            <h3>${cert.name}</h3>
            <p>${cert.issuer} • ${cert.date}</p>
            <div style="margin-top: 20px;">
                <a href="${cert.path}" target="_blank" class="btn btn-primary">
                    View Certificate (PDF)
                </a>
            </div>
        `;
    } else {
        modalImage.src = cert.path;
        modalImage.style.display = 'block';
        modalImage.alt = `${cert.name} Certificate`;
    }
    
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

document.addEventListener('click', (e) => {
    const modal = document.getElementById('certificateModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (e.target === modal || e.target === modalClose) {
        closeCertificateModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCertificateModal();
    }
});

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        if (!validateForm(data)) return;
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!data.name?.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!data.subject?.trim()) {
        showNotification('Please enter a subject.', 'error');
        return false;
    }
    
    if (!data.message?.trim()) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        backgroundColor: type === 'success' ? '#00ff88' : 
                        type === 'error' ? '#ff4757' : '#00d4ff'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === 'm') {
        document.getElementById('home')?.focus();
    }
    
    const focusedElement = document.activeElement;
    if (focusedElement?.classList.contains('nav-item')) {
        const navItems = Array.from(document.querySelectorAll('.nav-item'));
        const currentIndex = navItems.indexOf(focusedElement);
        
        if (e.key === 'ArrowRight' && currentIndex < navItems.length - 1) {
            e.preventDefault();
            navItems[currentIndex + 1].focus();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            e.preventDefault();
            navItems[currentIndex - 1].focus();
        }
    }
});

window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
});

function initializeAdvancedFeatures() {
    setupParticleSystem();
    setupDynamicBackground();
    setupAdvancedAnimations();
    setupKeyboardShortcuts();
    setupPerformanceOptimizations();
    setupEasterEggs();
}

function setupParticleSystem() {
    const hero = document.querySelector('.hero-section');
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-system';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(59, 130, 246, 0.5);
            border-radius: 50%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
    
    hero.appendChild(particleContainer);
}

function setupDynamicBackground() {
    const hero = document.querySelector('.hero-section');
    let mouseX = 0, mouseY = 0;
    
    hero.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) * 100;
        mouseY = (e.clientY / window.innerHeight) * 100;
        
        hero.style.background = `
            radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at top, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)
        `;
    });
}

function setupAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.project-card, .cert-card, .timeline-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add CSS for slideInUp animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'k':
                    e.preventDefault();
                    document.getElementById('mobileToggle')?.click();
                    break;
                case '/':
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    break;
                case 'h':
                    e.preventDefault();
                    document.querySelector('#home')?.scrollIntoView({ behavior: 'smooth' });
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            closeCertificateModal();
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu?.classList.contains('active')) {
                document.getElementById('mobileToggle')?.click();
            }
        }
    });
}

function setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const preloadLinks = [
        './LOGOS/profile-pic.png',
        './LOGOS/github.png',
        './LOGOS/linkedin.png'
    ];
    
    preloadLinks.forEach(href => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = href;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

function setupEasterEggs() {
    let konamiCode = [];
    const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
    
    // Triple click easter egg
    let clickCount = 0;
    const logo = document.querySelector('.nav-logo');
    
    logo?.addEventListener('click', (e) => {
        clickCount++;
        setTimeout(() => { clickCount = 0; }, 500);
        
        if (clickCount === 3) {
            e.preventDefault();
            showSecretMessage();
        }
    });
}

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s ease-in-out';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            25% { filter: hue-rotate(90deg); }
            50% { filter: hue-rotate(180deg); }
            75% { filter: hue-rotate(270deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 2000);
    
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
}

function showSecretMessage() {
    const messages = [
        '🏆 2 Fast 2 Hack Winner - Ready to innovate!',
        '🎯 100% Success Rate - Quality guaranteed!',
        '🚀 IIT Programs Alumni - Excellence in coding!',
        '⚡ Award-winning developer at your service!',
        '🌟 National hackathon champion - Let\'s build something amazing!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    showNotification(randomMessage, 'success');
}

// Removed duplicate typing setup - using setupTypedText() instead

window.portfolioDebug = {
    certificates,
    currentFilter,
    isLoaded,
    showNotification,
    openCertificateModal,
    initializeAdvancedFeatures,
    setupParticleSystem,
    setupDynamicBackground
};

// Certificate viewing and downloading functions
function openCertificate(certPath) {
    // Open PDF in a new window/tab
    window.open(certPath, '_blank');
}

function downloadCert(certPath) {
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = certPath;
    link.download = certPath.split('/').pop(); // Extract filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Make functions globally available
window.openCertificate = openCertificate;
window.downloadCert = downloadCert;