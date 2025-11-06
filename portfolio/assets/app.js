// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const typingText = document.getElementById('typing-text');
const particlesCanvas = document.getElementById('particles-canvas');

// Typing animation data
const typingSkills = [
  'Ethical_Hacking',
  'Network_Security', 
  'Penetration_Testing',
  'Incident_Response',
  'Security_Automation'
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// Particle system
class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.init();
  }

  init() {
    // Create particle container
    this.container = document.createElement('div');
    this.container.style.position = 'absolute';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '100%';
    this.container.style.pointerEvents = 'none';
    this.canvas.appendChild(this.container);

    // Create particles
    this.createParticles();
    this.animate();
    this.bindEvents();
  }

  createParticles() {
    const particleCount = window.innerWidth < 768 ? 30 : 50;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 3 + 1 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = this.getRandomColor();
      particle.style.borderRadius = '50%';
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      
      const particleData = {
        element: particle,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: parseFloat(particle.style.width)
      };
      
      this.particles.push(particleData);
      this.container.appendChild(particle);
      this.updateParticlePosition(particleData);
    }
  }

  getRandomColor() {
    const colors = [
      'rgba(0, 255, 255, 0.6)',
      'rgba(0, 255, 65, 0.4)',
      'rgba(139, 92, 246, 0.5)',
      'rgba(255, 255, 255, 0.3)'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  updateParticlePosition(particle) {
    particle.element.style.left = particle.x + 'px';
    particle.element.style.top = particle.y + 'px';
  }

  animate() {
    this.particles.forEach(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= window.innerWidth) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
      }
      if (particle.y <= 0 || particle.y >= window.innerHeight) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));
      }

      // Mouse interaction
      const dx = this.mouseX - particle.x;
      const dy = this.mouseY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx -= (dx / distance) * force * 0.01;
        particle.vy -= (dy / distance) * force * 0.01;
      }

      // Apply some friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;

      this.updateParticlePosition(particle);
    });

    requestAnimationFrame(() => this.animate());
  }

  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }

  handleResize() {
    // Remove existing particles
    this.particles.forEach(particle => {
      particle.element.remove();
    });
    this.particles = [];
    
    // Recreate particles for new screen size
    this.createParticles();
  }
}

// Mobile Navigation Toggle
function toggleMobileNav() {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
  
  // Add aria-expanded for accessibility
  const isExpanded = navMenu.classList.contains('active');
  navToggle.setAttribute('aria-expanded', isExpanded);
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
  navMenu.classList.remove('active');
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
}

// Typing Animation
function typeText() {
  if (!typingText) return;
  
  const currentSkill = typingSkills[typingIndex];
  
  if (isDeleting) {
    typingText.textContent = currentSkill.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typingText.textContent = currentSkill.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }
  
  if (!isDeleting && charIndex === currentSkill.length) {
    // Finished typing, start deleting after pause
    isDeleting = true;
    typingSpeed = 2000; // Pause before deleting
  } else if (isDeleting && charIndex === 0) {
    // Finished deleting, move to next skill
    isDeleting = false;
    typingIndex = (typingIndex + 1) % typingSkills.length;
    typingSpeed = 500; // Pause before typing next skill
  }
  
  setTimeout(typeText, typingSpeed);
}

// Enhanced smooth scrolling function
function smoothScrollTo(targetId) {
  const targetSection = document.querySelector(targetId);
  
  if (targetSection) {
    const navHeight = document.querySelector('.navbar').offsetHeight || 64;
    const targetPosition = targetSection.offsetTop - navHeight - 10;
    
    // Use native smooth scrolling if available
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      // Fallback for older browsers
      smoothScrollPolyfill(targetPosition);
    }
    
    // Update active navigation link
    updateActiveNavLink(targetId);
  }
}

// Smooth scrolling for navigation links
function smoothScroll(e) {
  const targetId = this.getAttribute('href');
  
  // Only handle internal links that start with #
  if (!targetId || !targetId.startsWith('#')) {
    return; // Let the default behavior handle external links
  }
  
  // Prevent default for internal links
  e.preventDefault();
  
  // Close mobile menu if open
  closeMobileNav();
  
  // Perform smooth scroll
  smoothScrollTo(targetId);
}

// Update active navigation link
function updateActiveNavLink(targetId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === targetId) {
      link.classList.add('active');
    }
  });
}

// Scroll spy - highlight active section in navigation
function scrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      updateActiveNavLink(`#${sectionId}`);
    }
  });
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
    }
  });
}

// Add fade-in class to elements that should animate on scroll
function initScrollAnimations() {
  const animateElements = [
    '.about-main',
    '.feature-card',
    '.project-card',
    '.skill-category',
    '.cert-card',
    '.skills-terminal',
    '.contact-content > *',
    '.action-card'
  ];
  
  animateElements.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((element, index) => {
      element.classList.add('fade-in');
      element.style.transitionDelay = `${index * 0.1}s`;
    });
  });
}

// Navbar background on scroll
function handleNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(26, 27, 46, 0.98)';
    navbar.style.borderBottom = '1px solid rgba(0, 255, 255, 0.2)';
  } else {
    navbar.style.background = 'rgba(26, 27, 46, 0.95)';
    navbar.style.borderBottom = '1px solid rgba(45, 46, 74, 1)';
  }
}

// Handle external links - add target="_blank" if not already set
function handleExternalLinks() {
  const links = document.querySelectorAll('a[href^="http"], a[href^="mailto"]');
  
  links.forEach(link => {
    if (!link.hasAttribute('target') && link.getAttribute('href').startsWith('http')) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

// Enhanced hover effects for cards with glowing borders
function initHoverEffects() {
  const cards = document.querySelectorAll('.card, .project-card, .feature-card, .skill-category, .action-card, .cert-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
      this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Special effects for skill items
  const skillItems = document.querySelectorAll('.skill-item');
  skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(0, 255, 255, 0.2)';
      this.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.background = 'rgba(0, 255, 255, 0.1)';
      this.style.boxShadow = 'none';
    });
  });
}

// Keyboard navigation for accessibility
function handleKeyboardNavigation(e) {
  // Handle escape key to close mobile menu
  if (e.key === 'Escape' && navMenu.classList.contains('active')) {
    closeMobileNav();
  }
  
  // Handle enter/space on nav toggle
  if ((e.key === 'Enter' || e.key === ' ') && e.target === navToggle) {
    e.preventDefault();
    toggleMobileNav();
  }
}

// Debounce function for performance
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

// Enhanced button interactions
function initButtonEffects() {
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      if (this.classList.contains('btn--primary')) {
        this.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.4)';
      } else if (this.classList.contains('btn--outline')) {
        this.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.4)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.boxShadow = 'none';
    });
    
    // Click effect
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Add ripple animation CSS
function addRippleStyles() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

// Performance monitoring and optimization
function initPerformanceOptimizations() {
  // Optimize scroll events with debouncing
  const debouncedScrollSpy = debounce(scrollSpy, 100);
  const debouncedScrollAnimations = debounce(handleScrollAnimations, 100);
  const debouncedNavbarScroll = debounce(handleNavbarScroll, 50);
  
  window.addEventListener('scroll', () => {
    debouncedScrollSpy();
    debouncedScrollAnimations();
    debouncedNavbarScroll();
  }, { passive: true });
  
  // Optimize resize events
  window.addEventListener('resize', debounce(() => {
    handleScrollAnimations();
  }, 250), { passive: true });
}

// Error handling wrapper
function safeExecute(func, fallback = () => {}) {
  try {
    func();
  } catch (error) {
    console.warn('Error executing function:', error);
    fallback();
  }
}

// Terminal-style console message
function displayTerminalWelcome() {
  const styles = {
    title: 'color: #00ffff; font-size: 16px; font-weight: bold;',
    subtitle: 'color: #00ff41; font-size: 14px;',
    info: 'color: #8b5cf6; font-size: 12px;'
  };
  
  console.log('%c> whoami', styles.title);
  console.log('%cAlex Rodriguez | Cybersecurity Enthusiast', styles.subtitle);
  console.log('%c> System Status: Online 🔒', styles.info);
  console.log('%c> Security Level: Maximum', styles.info);
  console.log('%c> Welcome to my portfolio terminal!', styles.info);
}

// Initialize theme and accessibility
function initAccessibility() {
  // Add ARIA labels and roles where needed
  if (navToggle) {
    navToggle.setAttribute('aria-label', 'Toggle navigation menu');
    navToggle.setAttribute('role', 'button');
    navToggle.setAttribute('tabindex', '0');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  
  // Add skip link for screen readers
  const skipLink = document.createElement('a');
  skipLink.href = '#home';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'skip-link';
  skipLink.style.position = 'absolute';
  skipLink.style.left = '-9999px';
  skipLink.style.top = '0';
  skipLink.style.zIndex = '999999';
  skipLink.style.background = '#00ffff';
  skipLink.style.color = '#0a0b1a';
  skipLink.style.padding = '8px 16px';
  skipLink.style.textDecoration = 'none';
  skipLink.addEventListener('focus', () => {
    skipLink.style.left = '6px';
    skipLink.style.top = '6px';
  });
  skipLink.addEventListener('blur', () => {
    skipLink.style.left = '-9999px';
  });
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Smooth scroll fallback for older browsers
function smoothScrollPolyfill(targetPosition) {
  const start = window.pageYOffset;
  const startTime = performance.now();
  const duration = 800; // Animation duration in ms
  
  function scroll() {
    const now = performance.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    
    const currentPosition = start + (targetPosition - start) * easeOut;
    window.scrollTo(0, currentPosition);
    
    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  }
  
  requestAnimationFrame(scroll);
}

// Initialize all functionality
function init() {
  // Display terminal welcome message
  displayTerminalWelcome();
  
  // Basic functionality
  handleExternalLinks();
  initScrollAnimations();
  initAccessibility();
  addRippleStyles();
  
  // Initialize particle system
  if (particlesCanvas) {
    safeExecute(() => {
      new ParticleSystem(particlesCanvas);
    });
  }
  
  // Event listeners
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', toggleMobileNav);
    navToggle.addEventListener('keydown', handleKeyboardNavigation);
  }
  
  // Navigation links with improved event handling
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      // Remove any existing event listeners and add new one
      link.removeEventListener('click', smoothScroll);
      link.addEventListener('click', smoothScroll);
    }
  });
  
  // Also handle clicks on the hero action buttons
  const heroActionButtons = document.querySelectorAll('.hero-actions .btn[href^="#"]');
  heroActionButtons.forEach(button => {
    button.addEventListener('click', smoothScroll);
  });
  
  // Global keyboard navigation
  document.addEventListener('keydown', handleKeyboardNavigation);
  
  // Start typing animation
  if (typingText) {
    safeExecute(() => {
      setTimeout(typeText, 1000); // Start after 1 second
    });
  }
  
  // Performance optimized scroll handlers
  initPerformanceOptimizations();
  
  // Enhanced interactions
  initHoverEffects();
  initButtonEffects();
  
  // Initial scroll position check
  setTimeout(() => {
    safeExecute(() => {
      scrollSpy();
      handleScrollAnimations();
      handleNavbarScroll();
    });
  }, 100);
  
  // Set initial active nav link based on hash
  if (window.location.hash) {
    updateActiveNavLink(window.location.hash);
  }
}

// Handle page visibility for performance
document.addEventListener('visibilitychange', () => {
  const animationElements = document.querySelectorAll('*');
  if (document.hidden) {
    // Pause animations when page is hidden
    animationElements.forEach(el => {
      if (el.style.animationPlayState !== undefined) {
        el.style.animationPlayState = 'paused';
      }
    });
  } else {
    // Resume animations when page is visible
    animationElements.forEach(el => {
      if (el.style.animationPlayState !== undefined) {
        el.style.animationPlayState = 'running';
      }
    });
  }
});

// Ensure DOM is loaded before initializing
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page load completion
window.addEventListener('load', () => {
  document.body.classList.remove('loading');
  
  // Trigger any animations that should start after page load
  setTimeout(() => {
    handleScrollAnimations();
  }, 100);
});

// Export functions for potential external use or debugging
window.portfolioUtils = {
  updateActiveNavLink,
  scrollSpy,
  handleScrollAnimations,
  toggleMobileNav,
  closeMobileNav,
  typeText,
  ParticleSystem,
  smoothScrollTo
};