/**
 * Advanced Portfolio Script
 * Enhanced with modern JavaScript practices and improved functionality:
 * - Async/await for cleaner async operations
 * - Promise-based loading sequence
 * - Performance optimizations with debounce/throttle
 * - Accessibility improvements
 * - Enhanced animations and interactions
 * - Security features with toggle option
 * - Dynamic components and lazy loading
 */

// Utility functions
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const throttle = (func, limit) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Loader and Initial Page Load with Modern Promise Handling
document.addEventListener('DOMContentLoaded', async () => {
    const loader = document.querySelector('.loader');
    
    try {
        // Create a promise for loading essential resources
        const loadEssentials = new Promise(resolve => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });

        // Wait for essential resources
        await loadEssentials;
        
        // Fade out loader with animation
        loader.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Hide loader and initialize portfolio
        loader.style.display = 'none';
        await initializePortfolio();
        
        // Check for URL hash to scroll to section
        if (window.location.hash) {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const headerOffset = document.querySelector('nav').offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    } catch (error) {
        console.error('Loading error:', error);
        // Fallback in case of loading error
        loader.style.display = 'none';
        showNotification('Some resources failed to load. Please refresh the page.', 'error');
    }
});

// Main initialization function using async/await
async function initializePortfolio() {
    // Initialize all components in parallel for better performance
    await Promise.all([
        initThemeToggle(),
        initParticleBackground(),
        init3DCube()
    ]);
    
    // Initialize other components that don't need to be awaited
    protectEmail();
    initSmoothScrolling();
    initBackToTopButton();
    initMobileMenu();
    initFormValidation();
    initAnimations();
    initResumeButton();
    initCertificatesModal();
    initSkillsTabs();
    initProjectsFilter();
    initDynamicTagline();
    initIntersectionObserver();
    
    // Conditionally initialize security features
    const securityEnabled = localStorage.getItem('security-enabled') !== 'false';
    if (securityEnabled) {
        initSecurity();
    }
    
    // Track page performance
    trackPagePerformance();
    
    // Emit custom event when portfolio is ready
    window.dispatchEvent(new CustomEvent('portfolio-ready'));
}

// Enhanced Email Protection
function protectEmail() {
    const emailElements = document.querySelectorAll('.email-protect');
    emailElements.forEach(el => {
        // Only encode if not already encoded
        if (!el.hasAttribute('data-encoded')) {
            const originalEmail = el.textContent || el.getAttribute('data-email');
            if (originalEmail) {
                const encodedEmail = btoa(originalEmail);
                el.setAttribute('data-encoded', encodedEmail);
                el.textContent = `${originalEmail.split('@')[0].slice(0, 3)}...@...${originalEmail.split('@')[1].slice(-4)}`;
                el.setAttribute('title', 'Click to copy email address');
                el.classList.add('clickable');
                
                // Add aria attributes for accessibility
                el.setAttribute('role', 'button');
                el.setAttribute('tabindex', '0');
                el.setAttribute('aria-label', 'Copy email address to clipboard');
            }
        }
        
        // Add event listeners if not already added
        if (!el.hasAttribute('data-listener')) {
            el.setAttribute('data-listener', 'true');
            
            // Handle both click and keyboard interaction
            const handleCopy = (e) => {
                if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                
                try {
                    const decodedEmail = atob(el.getAttribute('data-encoded'));
                    navigator.clipboard.writeText(decodedEmail)
                        .then(() => {
                            showNotification('Email copied to clipboard!', 'success');
                            // Visual feedback
                            el.classList.add('copied');
                            setTimeout(() => el.classList.remove('copied'), 1000);
                        })
                        .catch(err => {
                            console.error('Failed to copy email', err);
                            // Fallback method for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = decodedEmail;
                            textArea.style.position = 'fixed';
                            document.body.appendChild(textArea);
                            textArea.focus();
                            textArea.select();
                            
                            try {
                                document.execCommand('copy');
                                showNotification('Email copied to clipboard!', 'success');
                            } catch (err) {
                                showNotification('Please copy this email: ' + decodedEmail, 'info');
                            }
                            
                            document.body.removeChild(textArea);
                        });
                } catch (err) {
                    showNotification('Failed to decode email', 'error');
                }
            };
            
            el.addEventListener('click', handleCopy);
            el.addEventListener('keydown', handleCopy);
        }
    });
}

// Security Features with Toggle Option
function initSecurity() {
    // Right-click protection
    document.addEventListener('contextmenu', (e) => {
        // Allow right-click on specific elements that might need it
        const allowedElements = ['A', 'BUTTON'];
        if (allowedElements.includes(e.target.tagName)) return true;
        
        e.preventDefault();
        showNotification('Right-click is disabled for content protection.', 'warning');
        return false;
    });

    // Prevent text selection on non-form elements
    document.addEventListener('selectstart', (e) => {
        // Allow selection in form elements and code blocks
        const allowedElements = ['INPUT', 'TEXTAREA', 'PRE', 'CODE'];
        if (allowedElements.includes(e.target.tagName) || 
            e.target.closest('pre') || 
            e.target.closest('code')) return true;
        
        e.preventDefault();
        return false;
    });

    // Block dev tools shortcuts
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
            showNotification('Developer tools access is restricted.', 'warning');
            return false;
        }
    });

    // Protect images
    const images = document.querySelectorAll('img:not(.allowed-drag)');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        img.setAttribute('draggable', 'false');
        
        // Add CSS to prevent saving with drag-drop
        img.style.userSelect = 'none';
        img.style.webkitUserSelect = 'none';
    });
    
    // Add security settings toggle in footer for administrator
    const securityToggle = document.createElement('div');
    securityToggle.className = 'security-toggle hidden';
    securityToggle.innerHTML = `
        <button id="toggle-security" class="admin-only">
            <i class="fas fa-shield-alt"></i> <span>Disable Security</span>
        </button>
    `;
    
    document.body.appendChild(securityToggle);
    
    // Add secret key press combination to show security toggle
    let keySequence = [];
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    
    document.addEventListener('keydown', (e) => {
        keySequence.push(e.key);
        keySequence = keySequence.slice(-secretCode.length);
        
        if (keySequence.join(',') === secretCode.join(',')) {
            securityToggle.classList.toggle('hidden');
        }
    });
    
    // Toggle security on button click
    document.getElementById('toggle-security')?.addEventListener('click', () => {
        const isEnabled = localStorage.getItem('security-enabled') !== 'false';
        localStorage.setItem('security-enabled', isEnabled ? 'false' : 'true');
        
        showNotification(`Security features ${isEnabled ? 'disabled' : 'enabled'}. Refreshing...`, 'info');
        setTimeout(() => window.location.reload(), 1500);
    });
}

// Enhanced Theme Toggle with System Preference Detection and Smooth Transitions
async function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme-preference');
    let currentTheme = 'light';

    // Set initial theme with smooth transition
    if (storedTheme) {
        currentTheme = storedTheme;
        document.body.classList.toggle('dark-mode', storedTheme === 'dark');
    } else if (darkModeMediaQuery.matches) {
        currentTheme = 'dark';
        document.body.classList.add('dark-mode');
    }
    
    // Update theme icon and meta theme color
    updateThemeUI(currentTheme);
    
    // Theme toggle handler with animation
    themeToggle.addEventListener('click', () => {
        // Add transition class for smooth color changes
        document.documentElement.classList.add('theme-transition');
        
        // Toggle theme
        document.body.classList.toggle('dark-mode');
        currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        
        // Update UI and store preference
        updateThemeUI(currentTheme);
        localStorage.setItem('theme-preference', currentTheme);
        
        // Remove transition class after animation completes
        setTimeout(() => {
            document.documentElement.classList.remove('theme-transition');
        }, 300);
        
        // Refresh particles if they exist
        refreshParticles(currentTheme === 'dark');
        
        // Custom event for theme change
        window.dispatchEvent(new CustomEvent('theme-changed', { 
            detail: { theme: currentTheme } 
        }));
    });

    // Listen for system theme changes
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme-preference')) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.body.classList.toggle('dark-mode', e.matches);
            updateThemeUI(currentTheme);
        }
    });
    
    // Helper function to update theme UI elements
    function updateThemeUI(theme) {
        // Update toggle button icon
        themeToggle.innerHTML = theme === 'dark' 
            ? '<i class="fas fa-sun" aria-hidden="true"></i><span class="sr-only">Switch to Light Mode</span>' 
            : '<i class="fas fa-moon" aria-hidden="true"></i><span class="sr-only">Switch to Dark Mode</span>';
        
        // Update meta theme color for browser UI
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#222222' : '#ffffff');
        }
    }
}

// Smooth Scrolling with Header Offset and Performance Optimization
function initSmoothScrolling() {
    const header = document.querySelector('nav');
    const scrollLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    scrollLinks.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile menu if open
                const mobileMenu = document.querySelector('.mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                // Calculate scroll position
                const headerOffset = header.offsetHeight;
                const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                
                // Update URL without reload
                history.pushState(null, null, targetId);

                // Smooth scroll
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Add active state to menu item
                document.querySelectorAll('.nav-links a').forEach(item => {
                    item.classList.remove('active');
                });
                anchor.classList.add('active');
            }
        });
    });
    
    // Update active menu item on scroll
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', debounce(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - header.offsetHeight - 10;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = '#' + section.getAttribute('id');
            }
        });
        
        document.querySelectorAll('.nav-links a').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === current) {
                item.classList.add('active');
            }
        });
    }, 100));
}

// Enhanced Back to Top Button with Smooth Animation and Accessibility
function initBackToTopButton() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;
    
    // Ensure proper attributes for accessibility
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.setAttribute('role', 'button');
    backToTop.setAttribute('tabindex', '0');
    
    // Show/hide back to top button with throttling
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
            backToTop.setAttribute('aria-hidden', 'false');
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
            backToTop.setAttribute('aria-hidden', 'true');
        }
    }, 200));

    // Smooth scroll to top with click and keyboard events
    const scrollToTop = (e) => {
        if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    backToTop.addEventListener('click', scrollToTop);
    backToTop.addEventListener('keydown', scrollToTop);
}

// Enhanced Mobile Menu with Accessibility and Animation
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const focusableElements = mobileMenu?.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    
    if (!menuToggle || !mobileMenu || !closeMenu) return;
    
    // Set proper ARIA attributes
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-controls', 'mobile-menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    
    // Open menu handler
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.setAttribute('aria-hidden', 'false');
        
        // Prevent body scrolling when menu is open
        document.body.style.overflow = 'hidden';
        
        // Focus first element
        if (focusableElements && focusableElements.length > 0) {
            setTimeout(() => {
                focusableElements[0].focus();
            }, 100);
        }
    });

    // Close menu handler
    const closeMenuHandler = () => {
        mobileMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        menuToggle.focus(); // Return focus to toggle button
    };
    
    closeMenu.addEventListener('click', closeMenuHandler);
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            e.target !== menuToggle) {
            closeMenuHandler();
        }
    });
    
    // Close on escape key
    mobileMenu.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenuHandler();
        }
    });
    
    // Trap focus inside mobile menu
    if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        mobileMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }
}

// Enhanced Form Validation with Real-time Feedback and Accessibility
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Form Submission State
    let isSubmitting = false;

    // Real-time validation with debounce
    inputs.forEach(input => {
        // Add aria-invalid attribute
        input.setAttribute('aria-invalid', 'false');
        
        // Add descriptive labels for screen readers
        const existingError = input.nextElementSibling?.classList.contains('error-message') 
            ? input.nextElementSibling 
            : document.createElement('div');
            
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            existingError.classList.add('error-message');
            existingError.id = `${input.id}-error`;
            existingError.setAttribute('aria-live', 'polite');
            input.parentNode.insertBefore(existingError, input.nextSibling);
            input.setAttribute('aria-describedby', existingError.id);
        }
        
        // Real-time validation with debounce
        const debouncedValidate = debounce(() => {
            validateInput(input);
            updateSubmitButton();
        }, 300);
        
        input.addEventListener('input', debouncedValidate);
        input.addEventListener('blur', () => {
            validateInput(input);
            updateSubmitButton();
        });
    });

    // Form submission with loading state and error handling
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm() && !isSubmitting) {
            isSubmitting = true;
            submitButton.disabled = true;
            
            // Save original button text
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            try {
                // Show feedback during simulated send
                showNotification('Sending your message...', 'info');
                
                // Simulate form submission with artificial delay
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success handling
                form.reset();
                
                // Clear validation states after reset
                inputs.forEach(input => {
                    input.classList.remove('invalid', 'valid');
                    input.setAttribute('aria-invalid', 'false');
                    const errorElement = document.getElementById(`${input.id}-error`);
                    if (errorElement) {
                        errorElement.textContent = '';
                        errorElement.style.display = 'none';
                    }
                });
                
                showNotification('Message sent successfully!', 'success');
                
                // Fire custom event for tracking
                window.dispatchEvent(new CustomEvent('form-submitted', {
                    detail: { formId: form.id, success: true }
                }));
            } catch (error) {
                console.error('Form submission error:', error);
                showNotification('Failed to send message. Please try again.', 'error');
                
                // Fire custom event for tracking
                window.dispatchEvent(new CustomEvent('form-submitted', {
                    detail: { formId: form.id, success: false, error }
                }));
            } finally {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                isSubmitting = false;
            }
        } else {
            // If form is invalid, show all errors
            inputs.forEach(validateInput);
            
            // Focus the first invalid field
            const firstInvalid = form.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            
            showNotification('Please fix the errors in the form.', 'warning');
        }
    });

    // Input validation with enhanced feedback
    function validateInput(input) {
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (input.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(value);
                errorMessage = 'Please enter a valid email address';
                break;
            case 'text':
                if (input.id === 'name') {
                    isValid = value.length >= 2;
                    errorMessage = 'Please enter your name (minimum 2 characters)';
                } else if (input.id === 'subject') {
                    isValid = value.length >= 5;
                    errorMessage = 'Please enter a subject (minimum 5 characters)';
                } else {
                    isValid = value.length >= 2;
                    errorMessage = 'This field is required';
                }
                break;
            case 'textarea':
                isValid = value.length >= 10;
                errorMessage = 'Please enter at least 10 characters';
                break;
            case 'tel':
                const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
                isValid = phoneRegex.test(value) || value === '';
                errorMessage = 'Please enter a valid phone number or leave empty';
                break;
        }

        updateInputStatus(input, isValid, errorMessage);
        return isValid;
    }

    // Update input validation UI with proper accessibility
    function updateInputStatus(input, isValid, errorMessage) {
        const errorElement = document.getElementById(`${input.id}-error`);
        
        if (!errorElement) return;
        
        // Update input status
        input.classList.toggle('invalid', !isValid);
        input.classList.toggle('valid', isValid && input.value.trim() !== '');
        input.setAttribute('aria-invalid', !isValid);
        
        // Update error message
        errorElement.textContent = isValid ? '' : errorMessage;
        errorElement.style.display = isValid ? 'none' : 'block';
    }

    // Validate entire form
    function validateForm() {
        const requiredInputs = form.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (!validateInput(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // Update submit button state
    function updateSubmitButton() {
        if (!submitButton) return;
        
        const requiredInputs = form.querySelectorAll('[required]');
        let allValid = true;
        
        requiredInputs.forEach(input => {
            if (input.classList.contains('invalid') || input.value.trim() === '') {
                allValid = false;
            }
        });
        
        submitButton.disabled = !allValid;
        submitButton.classList.toggle('btn-disabled', !allValid);
    }
}

// Enhanced GSAP Animations with ScrollTrigger
function initAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP is not loaded, animations will not work');
        return;
    }
    
    // Hero section animations
    const heroElements = {
        title: document.querySelector('#hero h1'),
        tagline: document.querySelector('.dynamic-tagline'),
        cta: document.querySelector('.cta-button'),
        scrollDown: document.querySelector('.scroll-down')
    };
    
    if (heroElements.title) {
        gsap.from(heroElements.title, { 
            duration: 1, 
            y: -50, 
            opacity: 0, 
            ease: 'power3.out' 
        });
    }
    
    if (heroElements.tagline) {
        gsap.from(heroElements.tagline, { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            delay: 0.5, 
            ease: 'power3.out' 
        });
    }
    
    if (heroElements.cta) {
        gsap.from(heroElements.cta, { 
            duration: 1, 
            y: 50, 
            opacity: 0, 
            delay: 1, 
            ease: 'power3.out' 
        });
    }
    
    if (heroElements.scrollDown) {
        gsap.from(heroElements.scrollDown, { 
            duration: 1, 
            y: 20, 
            opacity: 0, 
            delay: 1.5, 
            ease: 'power3.out' 
        });
        
        // Add pulse animation
        gsap.to(heroElements.scrollDown, {
            y: 10,
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: 'power1.inOut'
        });
    }

    // Check for ScrollTrigger plugin
    if (gsap.ScrollTrigger) {
        // Section reveal animations
        gsap.utils.toArray('section').forEach(section => {
            // Skip hero section as it's already animated
            if (section.id === 'hero') return;
            
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 20%',
                    toggleActions: 'play none none reverse'
                }
            });
            
            // Heading animation
            const heading = section.querySelector('h2');
            if (heading) {
                timeline.from(heading, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            }
            
            // Content staggered animation
            const contentElements = section.querySelectorAll('p, .card, .project-item, .skill-item, .certificate-card');
            if (contentElements.length > 0) {
                timeline.from(contentElements, {
                    opacity: 0,
                    y: 50,
                    stagger: 0.1,
                    duration: 0.6,
                    ease: 'power2.out'
                }, "-=0.4");
            }
        });
        
        // Parallax elements
        gsap.utils.toArray('.parallax').forEach(element => {
            gsap.to(element, {
                y: () => element.getAttribute('data-speed') || '100',
                ease: 'none',
                scrollTrigger: {
                    trigger: element.parentElement,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }
}

// Three.js 3D Cube with Responsive Design
function init3DCube() {
    // Check if Three.js is available
    if (typeof THREE === 'undefined') {
        console.warn('THREE.js is not loaded, 3D cube will not work');
        return;
    }
    
    const container = document.getElementById('cube-container') || document.getElementById('hero');
    if (!container) return;
    
    // Create renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create canvas element and append to container
    const canvas = renderer.domElement;
    canvas.classList.add('cube-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none'; // Allow clicking through the canvas
    container.style.position = 'relative';
    container.appendChild(canvas);
    
    // Set up scene
const scene = new THREE.Scene();

// Create camera with responsive FOV
const fov = window.innerWidth < 768 ? 90 : 75;
const camera = new THREE.PerspectiveCamera(
  fov, 
  container.clientWidth / container.clientHeight, 
  0.1, 
  1000
);
camera.position.z = 5;

// Create cube with enhanced materials and effects
function init3DCube() {
  // Check if Three.js is available
  if (typeof THREE === 'undefined') {
    console.warn('THREE.js is not loaded, 3D cube will not work');
    return Promise.resolve();
  }
  
  return new Promise((resolve) => {
    const container = document.getElementById('cube-container') || document.getElementById('hero');
    if (!container) return resolve();
    
    // Create renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true,
      antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create canvas element and append to container
    const canvas = renderer.domElement;
    canvas.classList.add('cube-canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none'; // Allow clicking through the canvas
    container.style.position = 'relative';
    container.appendChild(canvas);
    
    // Set up the scene and camera
    const scene = new THREE.Scene();
    
    // Create camera with responsive FOV
    const fov = window.innerWidth < 768 ? 90 : 75;
    const camera = new THREE.PerspectiveCamera(
      fov, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Create dynamic materials based on theme
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Create textures and materials
    const materials = [];
    
    // Function to create cube materials based on theme
    function createMaterials(isDark) {
      // Create base color and emissive color based on theme
      const baseColor = isDark ? 0x3a3a3a : 0xf5f5f5;
      const emissiveColor = isDark ? 0x222222 : 0xdddddd;
      const edgeColor = isDark ? 0x4285f4 : 0x2979ff; // Glowing blue edges
      
      // Create texture loader
      const textureLoader = new THREE.TextureLoader();
      
      // Skills/technologies to display on cube faces
      const skills = [
        { text: 'JavaScript', icon: 'fab fa-js' },
        { text: 'React', icon: 'fab fa-react' },
        { text: 'Node.js', icon: 'fab fa-node-js' },
        { text: 'HTML5', icon: 'fab fa-html5' },
        { text: 'CSS3', icon: 'fab fa-css3-alt' },
        { text: 'Git', icon: 'fab fa-git-alt' }
      ];
      
      // Create dynamic canvas textures
      return skills.map((skill, index) => {
        // Create canvas for texture
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        
        // Fill background
        ctx.fillStyle = isDark ? '#222222' : '#ffffff';
        ctx.fillRect(0, 0, 256, 256);
        
        // Draw border
        ctx.strokeStyle = isDark ? '#444444' : '#dddddd';
        ctx.lineWidth = 8;
        ctx.strokeRect(10, 10, 236, 236);
        
        // Draw skill text
        ctx.fillStyle = isDark ? '#ffffff' : '#333333';
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.text, 128, 180);
        
        // Create texture from canvas
        const texture = new THREE.CanvasTexture(canvas);
        texture.needsUpdate = true;
        
        // Create material with texture
        return new THREE.MeshStandardMaterial({
          map: texture,
          transparent: true,
          opacity: 0.9,
          color: baseColor,
          emissive: emissiveColor,
          emissiveIntensity: 0.2,
          metalness: 0.3,
          roughness: 0.7,
          side: THREE.DoubleSide
        });
      });
    }
    
    // Create initial materials
    materials.push(...createMaterials(isDarkMode));
    
    // Create cube geometry
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    
    // Apply materials to cube
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(
      isDarkMode ? 0x404040 : 0x808080
    );
    scene.add(ambientLight);
    
    // Add directional light
    const dirLight = new THREE.DirectionalLight(
      isDarkMode ? 0xffffff : 0xffffff, 
      0.8
    );
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    
    // Add point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(
      isDarkMode ? 0x4285f4 : 0x2979ff, 
      1, 
      10
    );
    pointLight1.position.set(2, 2, 2);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(
      isDarkMode ? 0x00c853 : 0x00e676, 
      1, 
      10
    );
    pointLight2.position.set(-2, -2, -2);
    scene.add(pointLight2);
    
    // Add cube edge highlighting with LineSegments
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: isDarkMode ? 0x4285f4 : 0x2979ff,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.8
    });
    const wireframe = new THREE.LineSegments(edges, lineMaterial);
    cube.add(wireframe);
    
    // Animation variables
    let rotationSpeed = 0.005;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isHovered = false;
    
    // Mouse movement effect
    container.addEventListener('mousemove', (event) => {
      // Calculate mouse position relative to container
      const rect = container.getBoundingClientRect();
      mouseX = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
      mouseY = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
      
      // Adjust rotation targets based on mouse position
      targetRotationX = mouseY * 0.5;
      targetRotationY = mouseX * 0.5;
      
      isHovered = true;
    });
    
    // Reset rotation when mouse leaves
    container.addEventListener('mouseleave', () => {
      isHovered = false;
    });
    
    // Handle theme changes
    window.addEventListener('theme-changed', (e) => {
      const isDark = e.detail.theme === 'dark';
      
      // Update lights
      ambientLight.intensity = isDark ? 0.3 : 0.5;
      dirLight.intensity = isDark ? 0.7 : 0.9;
      
      // Update edge color
      lineMaterial.color.set(isDark ? 0x4285f4 : 0x2979ff);
      
      // Update materials
      const newMaterials = createMaterials(isDark);
      for (let i = 0; i < 6; i++) {
        cube.material[i] = newMaterials[i];
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.fov = window.innerWidth < 768 ? 90 : 75;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      // Smooth rotation
      if (isHovered) {
        cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.05;
        cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.05;
      } else {
        // Auto-rotation when not hovered
        cube.rotation.x += rotationSpeed;
        cube.rotation.y += rotationSpeed * 1.5;
      }
      
      // Gentle floating motion
      cube.position.y = Math.sin(Date.now() * 0.001) * 0.2;
      
      // Gently pulse the edge highlight
      wireframe.material.opacity = 0.5 + Math.sin(Date.now() * 0.002) * 0.2;
      
      renderer.render(scene, camera);
    }
    
    // Start animation
    animate();
    
    // Complete promise when initialization is done
    resolve();
  });
}

// Initialize particle background for added visual effect
function initParticleBackground() {
  return new Promise((resolve) => {
    const container = document.getElementById('particles-container') || document.getElementById('hero');
    if (!container) return resolve();
    
    // Check if particles.js is available
    if (typeof particlesJS === 'undefined') {
      console.warn('particles.js is not loaded, particle background will not work');
      return resolve();
    }
    
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Configure particles based on theme
    const particleConfig = {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: isDarkMode ? '#ffffff' : '#000000'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.2,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: isDarkMode ? '#ffffff' : '#000000',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    };
    
    // Initialize particles.js
    particlesJS('particles-container', particleConfig);
    
    // Create particle container if it doesn't exist
    if (!document.getElementById('particles-container')) {
      const particlesContainer = document.createElement('div');
      particlesContainer.id = 'particles-container';
      particlesContainer.style.position = 'absolute';
      particlesContainer.style.top = '0';
      particlesContainer.style.left = '0';
      particlesContainer.style.width = '100%';
      particlesContainer.style.height = '100%';
      particlesContainer.style.zIndex = '0';
      particlesContainer.style.pointerEvents = 'none';
      container.style.position = 'relative';
      container.insertBefore(particlesContainer, container.firstChild);
      
      // Initialize particles.js again after creating container
      particlesJS('particles-container', particleConfig);
    }
    
    resolve();
  });
}

// Refresh particles on theme change
function refreshParticles(isDarkMode) {
  if (typeof particlesJS === 'undefined') return;
  
  const particlesContainer = document.getElementById('particles-container');
  if (!particlesContainer) return;
  
  // Update particle colors based on theme
  particlesJS('particles-container', {
    particles: {
      color: {
        value: isDarkMode ? '#ffffff' : '#000000'
      },
      line_linked: {
        color: isDarkMode ? '#ffffff' : '#000000'
      }
    }
  });
}
