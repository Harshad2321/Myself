// ===============================================
//    INDUSTRY-LEVEL PORTFOLIO JAVASCRIPT
//    Modern, Interactive & Career-Ready
// ===============================================

// ===== GLOBAL VARIABLES =====
let isLoaded = false;
let currentFilter = 'all';

// ===== CERTIFICATES DATA =====
const certificates = [
    {
        name: "Python Programming",
        issuer: "Simplilearn",
        date: "2024",
        path: "Certificates/Harshad Agrawal Python(simplilearn).pdf",
        icon: "🐍"
    },
    {
        name: "Data Structures & Algorithms",
        issuer: "Professional Course",
        date: "2024",
        path: "Certificates/Harshad Agrawal_Data Structures & Algorithms Course For Beginners.pdf",
        icon: "⚡"
    },
    {
        name: "Basic AI-ML",
        issuer: "AI/ML Institute",
        date: "2024",
        path: "Certificates/Basic Of AI-ML.pdf",
        icon: "🤖"
    },
    {
        name: "2 Fast 2 Hack Winner",
        issuer: "National Hackathon",
        date: "2025",
        path: "Certificates/2 FAST 2 HACK.pdf",
        icon: "🏆"
    },
    {
        name: "EXERGY IIT Kanpur",
        issuer: "IIT Kanpur",
        date: "2024",
        path: "Certificates/exergy-iitk.png",
        icon: "🎓"
    },
    {
        name: "Go4Youth Program",
        issuer: "Youth Development",
        date: "2024",
        path: "Certificates/IN12103479_go4youth_certificate_compressed.pdf",
        icon: "🌟"
    },
    {
        name: "ICFAMEAD Certification",
        issuer: "ICFAMEAD",
        date: "2024",
        path: "Certificates/Certificate ICFAMEAD.pdf",
        icon: "📜"
    },
    {
        name: "Nation Building Certificate",
        issuer: "Government Program",
        date: "2024",
        path: "Certificates/CERTIFICATE OF NATION BUILDING.pdf",
        icon: "🏛️"
    },
    {
        name: "Campus Ambassador",
        issuer: "eDC IIT Roorkee",
        date: "2024",
        path: "Certificates/Campus_Ambassador_Offer_Letter_eDC.pdf",
        icon: "👨‍💼"
    },
    {
        name: "SQL Advanced",
        issuer: "Database Certification",
        date: "2024",
        path: "Certificates/sql_advanced certificate.pdf",
        icon: "🗄️"
    },
    {
        name: "CSS Basics",
        issuer: "Web Development",
        date: "2024",
        path: "Certificates/css(basic) certificate.pdf",
        icon: "🎨"
    },
    {
        name: "Hedera Blockchain",
        issuer: "Hedera Network",
        date: "2024",
        path: "Certificates/Hedera Certification.pdf",
        icon: "⛓️"
    }
];

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ===== INITIALIZE APPLICATION =====
function initializeApp() {
    setupCustomCursor();
    setupNavigation();
    setupMobileNavigation();
    setupThemeToggle();
    setupTypedText();
    setupScrollAnimations();
    setupProjectFilters();
    setupCertificates();
    setupContactForm();
    setupCounters();
    setupScrollIndicator();
    setupResponsiveFeatures();
    
    // Mark as loaded
    isLoaded = true;
    console.log('🚀 Portfolio initialized successfully!');
}

// ===== CUSTOM CURSOR =====
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
    });
    
    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
    
    // Hover effects
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

// ===== NAVIGATION =====
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scroll for navigation
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
    
    // Update active navigation on scroll
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
        
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        }
    });
}

// ===== THEME TOGGLE =====
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('.theme-icon');
    
    if (!themeToggle || !themeIcon) return;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Add click animation
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ===== MOBILE NAVIGATION =====
function setupMobileNavigation() {
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileBackdrop = document.getElementById('mobileBackdrop');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    
    if (!mobileToggle || !mobileMenu || !mobileBackdrop) return;
    
    let isMenuOpen = false;
    
    // Toggle mobile menu
    function toggleMobileMenu() {
        isMenuOpen = !isMenuOpen;
        
        mobileToggle.classList.toggle('active', isMenuOpen);
        mobileMenu.classList.toggle('active', isMenuOpen);
        mobileBackdrop.classList.toggle('active', isMenuOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
        
        // Update ARIA attributes
        mobileToggle.setAttribute('aria-expanded', isMenuOpen);
        mobileMenu.setAttribute('aria-hidden', !isMenuOpen);
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        if (isMenuOpen) {
            toggleMobileMenu();
        }
    }
    
    // Event listeners
    mobileToggle.addEventListener('click', toggleMobileMenu);
    mobileBackdrop.addEventListener('click', closeMobileMenu);
    
    // Close menu when clicking on navigation items
    mobileNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Close menu first
            closeMobileMenu();
            
            // Then scroll to section
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
    
    // Update active mobile nav item on scroll
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
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            closeMobileMenu();
        }
    });
    
    // Close menu on window resize if screen becomes large
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && isMenuOpen) {
            closeMobileMenu();
        }
    });
}

// ===== RESPONSIVE FEATURES =====
function setupResponsiveFeatures() {
    // Optimize animations for mobile devices
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || isReducedMotion) {
        // Disable custom cursor on mobile
        const cursor = document.getElementById('cursor');
        const follower = document.getElementById('cursor-follower');
        
        if (cursor) cursor.style.display = 'none';
        if (follower) follower.style.display = 'none';
        
        // Enable default cursor for body
        document.body.style.cursor = 'default';
        
        // Reduce animation durations
        document.documentElement.style.setProperty('--transition', 'all 0.2s ease');
    }
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) {
                mobileToggle.click();
            }
        }
        
        // Recalculate viewport height for mobile browsers
        setTimeout(() => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }, 100);
    });
    
    // Set initial viewport height
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update viewport height on resize
    window.addEventListener('resize', debounce(() => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, 100));
    
    // Touch event optimization
    if ('ontouchstart' in window) {
        // Add touch-friendly hover effects
        document.addEventListener('touchstart', function() {}, {passive: true});
        
        // Prevent zoom on double tap for better UX
        let lastTouchEnd = 0;
        document.addEventListener('touchend', (event) => {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    // Performance optimization for scroll events
    let ticking = false;
    
    function updateOnScroll() {
        // Update scroll-dependent elements here
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar');
        
        if (navbar) {
            if (scrolled > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }, {passive: true});
}

// ===== TYPED TEXT EFFECT =====
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
    
    new Typed('#typed-text', {
        strings: strings,
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    // Initialize ScrollReveal
    const sr = ScrollReveal({
        distance: '30px',
        duration: 800,
        easing: 'ease-in-out',
        reset: false
    });
    
    // Animate sections
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

// ===== ANIMATED COUNTERS =====
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

// ===== PROJECT FILTERS =====
function setupProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            
            // Filter projects
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

// ===== CERTIFICATES =====
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
                    📄 View Certificate (PDF)
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

// ===== MODAL MANAGEMENT =====
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

// ===== CONTACT FORM =====
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!validateForm(data)) return;
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <span class="btn-icon">⏳</span>';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual implementation)
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

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Styles
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
        backgroundColor: type === 'success' ? '#10b981' : 
                        type === 'error' ? '#ef4444' : '#3b82f6'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// ===== SCROLL INDICATOR =====
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

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle scroll events
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

// Debounce resize events
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

// ===== ACCESSIBILITY ENHANCEMENTS =====
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        document.getElementById('home')?.focus();
    }
    
    // Navigate through nav items with arrow keys
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

// ===== CONSOLE BRANDING =====
console.log(`
%c🚀 Harshad Agrawal - Portfolio
%cBuilt with passion using vanilla HTML, CSS & JavaScript
%cInterested in the code? Check it out on GitHub!
`, 
'color: #3b82f6; font-size: 24px; font-weight: bold;',
'color: #64748b; font-size: 14px;',
'color: #10b981; font-size: 12px;'
);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Portfolio Error:', e.error);
    // Could integrate with error reporting service here
});

// ===== EXPORT FOR DEBUGGING =====
window.portfolioDebug = {
    certificates,
    currentFilter,
    isLoaded,
    showNotification,
    openCertificateModal
};