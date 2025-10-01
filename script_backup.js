// ===== PORTFOLIO JAVASCRIPT - PROFESSIONAL INTERACTIVE FEATURES =====

// ===== DOM ELEMENTS =====
const themeToggle = document.getElementById('mode-toggle');
const navbar = document.querySelector('.navbar');
const backToTopBtn = document.getElementById('backToTop');
const certificateModal = document.getElementById('certificateModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.querySelector('.modal-close');
const contactForm = document.getElementById('contactForm');
const loadingScreen = document.getElementById('loadingScreen');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

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
    issuer: "Course Certification",
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
    name: "2 Fast 2 Hack",
    issuer: "Hackathon Winner",
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
    name: "Go4Youth Certificate",
    issuer: "Go4Youth Program",
    date: "2024",
    path: "Certificates/IN12103479_go4youth_certificate_compressed.pdf",
    icon: "🌟"
  },
  {
    name: "ICFAMEAD Certificate",
    issuer: "ICFAMEAD",
    date: "2024",
    path: "Certificates/Certificate ICFAMEAD.pdf",
    icon: "📜"
  },
  {
    name: "Nation Building",
    issuer: "Government Initiative",
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
    name: "SQL Basics",
    issuer: "Database Certification",
    date: "2024",
    path: "Certificates/sql_basic certificate.pdf",
    icon: "🗄️"
  },
  {
    name: "Hedera Certification",
    issuer: "Hedera Network",
    date: "2024",
    path: "Certificates/Hedera Certification.pdf",
    icon: "⛓️"
  },
  {
    name: "Troubleshoot Ideathon 2025",
    issuer: "Ideathon Competition",
    date: "2025",
    path: "Certificates/Troubleshoot Ideathon 2025.pdf",
    icon: "💡"
  }
];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Show loading screen briefly
  setTimeout(() => {
    hideLoadingScreen();
  }, 1500);

  // Initialize all features
  initializeTheme();
  initializeNavigation();
  initializeScrollEffects();
  initializeCertificates();
  initializeContactForm();
  initializeMobileMenu();
  initializeAnimations();
  
  console.log('🚀 Portfolio loaded successfully!');
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
  loadingScreen.classList.add('hidden');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
  }, 500);
}

// ===== THEME MANAGEMENT =====
function initializeTheme() {
  // Load saved theme or default to light
  const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('portfolio-theme', newTheme);
  
  // Add visual feedback
  themeToggle.style.transform = 'scale(0.9)';
  setTimeout(() => {
    themeToggle.style.transform = 'scale(1)';
  }, 150);
}

// ===== NAVIGATION =====
function initializeNavigation() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  // Update active navigation on scroll
  window.addEventListener('scroll', updateActiveNavigation);
}

function handleNavClick(e) {
  e.preventDefault();
  const targetId = e.target.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
    window.scrollTo({
      top: offsetTop,
      behavior: 'smooth'
    });
  }
  
  // Close mobile menu if open
  if (window.innerWidth <= 768) {
    toggleMobileMenu();
  }
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
  window.addEventListener('scroll', handleScroll);
  
  // Initialize Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
  // Observe all sections for animations
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

function handleScroll() {
  const scrollTop = window.scrollY;
  const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  
  // Navbar background effect with theme support
  if (scrollTop > 50) {
    if (isDarkMode) {
      navbar.style.background = 'rgba(15, 23, 42, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
  } else {
    if (isDarkMode) {
      navbar.style.background = 'rgba(15, 23, 42, 0.95)';
      navbar.style.boxShadow = 'none';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }
  
  // Back to top button
  if (scrollTop > 300) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

function animateOnScroll(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}

// ===== BACK TO TOP =====
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== CERTIFICATES SECTION =====
function initializeCertificates() {
  const certContainer = document.getElementById('certContainer');
  
  certificates.forEach((cert, index) => {
    const certCard = createCertificateCard(cert, index);
    certContainer.appendChild(certCard);
  });
}

function createCertificateCard(cert, index) {
  const card = document.createElement('div');
  card.className = 'certificate-card';
  card.style.animationDelay = `${index * 0.1}s`;
  
  card.innerHTML = `
    <div class="certificate-icon">
      ${cert.icon}
    </div>
    <h3>${cert.name}</h3>
    <p class="certificate-issuer">${cert.issuer}</p>
    <p class="certificate-date">${cert.date}</p>
  `;
  
  card.addEventListener('click', () => openCertificateModal(cert));
  
  return card;
}

function openCertificateModal(cert) {
  modalTitle.textContent = cert.name;
  
  // Handle both PDF and image files
  if (cert.path.endsWith('.pdf')) {
    modalImage.style.display = 'none';
    document.querySelector('.modal-body').innerHTML = `
      <h3>${cert.name}</h3>
      <p class="certificate-issuer">${cert.issuer} • ${cert.date}</p>
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
  
  certificateModal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}

// ===== MODAL MANAGEMENT =====
modalClose.addEventListener('click', closeCertificateModal);
certificateModal.addEventListener('click', (e) => {
  if (e.target === certificateModal) {
    closeCertificateModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certificateModal.style.display === 'block') {
    closeCertificateModal();
  }
});

function closeCertificateModal() {
  certificateModal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// ===== CONTACT FORM =====
function initializeContactForm() {
  contactForm.addEventListener('submit', handleFormSubmission);
  
  // Add real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearFieldError);
  });
}

function handleFormSubmission(e) {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Validate form
  if (!validateForm(data)) {
    return;
  }
  
  // Show loading state
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;
  
  // Simulate form submission (replace with actual implementation)
  setTimeout(() => {
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

function validateForm(data) {
  let isValid = true;
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showFieldError('email', 'Please enter a valid email address');
    isValid = false;
  }
  
  // Required fields validation
  const requiredFields = ['name', 'email', 'subject', 'message'];
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      showFieldError(field, 'This field is required');
      isValid = false;
    }
  });
  
  return isValid;
}

function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  
  if (field.hasAttribute('required') && !value) {
    showFieldError(field.name, 'This field is required');
  } else if (field.type === 'email' && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field.name, 'Please enter a valid email address');
    }
  }
}

function clearFieldError(e) {
  const field = e.target;
  const errorElement = document.querySelector(`#${field.name}-error`);
  if (errorElement) {
    errorElement.remove();
  }
  field.style.borderColor = '';
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const existingError = document.querySelector(`#${fieldName}-error`);
  
  if (existingError) {
    existingError.textContent = message;
  } else {
    const errorElement = document.createElement('div');
    errorElement.id = `${fieldName}-error`;
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.25rem';
    
    field.parentNode.appendChild(errorElement);
  }
  
  field.style.borderColor = '#ef4444';
}

// ===== MOBILE MENU =====
function initializeMobileMenu() {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
}

function toggleMobileMenu() {
  navMenu.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
  
  // Animate hamburger menu
  const spans = mobileMenuToggle.querySelectorAll('span');
  spans.forEach((span, index) => {
    span.style.transform = navMenu.classList.contains('active') 
      ? `rotate(${index === 1 ? 45 : -45}deg)` 
      : 'rotate(0deg)';
  });
}

// ===== ANIMATIONS =====
function initializeAnimations() {
  // Add initial animation states
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Hero section immediate animation
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    setTimeout(() => {
      heroSection.style.opacity = '1';
      heroSection.style.transform = 'translateY(0)';
    }, 200);
  }
}

// ===== NOTIFICATION SYSTEM =====
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
    fontWeight: '500',
    zIndex: '10000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease',
    backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'
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
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
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

// Replace scroll event listener with throttled version
window.removeEventListener('scroll', handleScroll);
window.addEventListener('scroll', throttle(handleScroll, 16));

// ===== ACCESSIBILITY FEATURES =====
document.addEventListener('keydown', (e) => {
  // Skip to main content with Alt+M
  if (e.altKey && e.key === 'm') {
    document.querySelector('#home').focus();
  }
  
  // Navigate through sections with arrow keys when navbar is focused
  const focusedElement = document.activeElement;
  if (focusedElement.classList.contains('nav-link')) {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const currentIndex = navLinks.indexOf(focusedElement);
    
    if (e.key === 'ArrowRight' && currentIndex < navLinks.length - 1) {
      e.preventDefault();
      navLinks[currentIndex + 1].focus();
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
      e.preventDefault();
      navLinks[currentIndex - 1].focus();
    }
  }
});

// ===== EASTER EGG =====
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.keyCode);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    showNotification('🎉 Konami Code activated! You found the easter egg!', 'success');
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
  @keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
  }
`;
document.head.appendChild(style);

// ===== CONSOLE BRANDING =====
console.log(`
%c🚀 Harshad Agrawal Portfolio
%cBuilt with ❤️ using HTML, CSS & JavaScript
%cInterested in the code? Check it out on GitHub!
`, 
'color: #3182ce; font-size: 24px; font-weight: bold;',
'color: #718096; font-size: 14px;',
'color: #10b981; font-size: 12px;'
);

// ===== EXPORT FOR DEBUGGING =====
window.portfolioDebug = {
  certificates,
  showNotification,
  toggleTheme,
  openCertificateModal
};
