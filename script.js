// script.js

// Loader and Initial Page Load with Promise-based loading
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    
    // Create a promise for loading essential resources
    const loadEssentials = new Promise((resolve) => {
        window.addEventListener('load', resolve);
    });

    // Chain loading sequences
    loadEssentials
        .then(() => {
            // Fade out loader
            loader.style.opacity = '0';
            return new Promise(resolve => setTimeout(resolve, 500));
        })
        .then(() => {
            loader.style.display = 'none';
            // Initialize all features
            initializePortfolio();
        })
        .catch(error => {
            console.error('Loading error:', error);
            loader.style.display = 'none';
        });
});

// Main initialization function
function initializePortfolio() {
    protectEmail();
    disableSecurity();
    initThemeToggle();
    initSmoothScrolling();
    initBackToTopButton();
    initMobileMenu();
    initFormValidation();
    initAnimations();
    init3DCube();
    initParticleBackground();
    initResumeButton();
    initCertificatesModal();
}

// Email Protection and Security Enhancements
function protectEmail() {
    const emailElements = document.querySelectorAll('.email-protect');
    emailElements.forEach(el => {
        const encodedEmail = btoa(el.textContent);
        el.setAttribute('data-encoded', encodedEmail);
        el.textContent = encodedEmail.slice(0, 10) + '...';
        
        el.addEventListener('click', (e) => {
            const decodedEmail = atob(e.target.getAttribute('data-encoded'));
            navigator.clipboard.writeText(decodedEmail)
                .then(() => {
                    showNotification('Email copied to clipboard!', 'success');
                })
                .catch(err => {
                    showNotification('Failed to copy email', 'error');
                    console.error('Failed to copy email', err);
                });
        });
    });
}

// Disable Right-Click, Inspect, and Text Selection
function disableSecurity() {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showNotification('Right-click is disabled on this site.', 'warning');
        return false;
    });

    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });

    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
            showNotification('Developer tools are disabled.', 'warning');
            return false;
        }
    });

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        img.setAttribute('draggable', 'false');
    });
}

// Enhanced Theme Toggle with System Preference Detection
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const storedTheme = localStorage.getItem('theme-preference');

    // Set initial theme
    if (storedTheme) {
        document.body.classList.toggle('dark-mode', storedTheme === 'dark');
        themeToggle.textContent = storedTheme === 'dark' ? '☀️' : '🌙';
    } else if (darkModeMediaQuery.matches) {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        themeToggle.textContent = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme-preference', isDark ? 'dark' : 'light');
        
        // Trigger particle refresh if dark mode changes
        if (window.pJSDom && window.pJSDom[0]) {
            const particlesConfig = getParticlesConfig(isDark);
            window.pJSDom[0].pJS.fn.vendors.destroyParticles();
            window.pJSDom[0].pJS.fn.vendors.draw();
        }
    });

    // Listen for system theme changes
    darkModeMediaQuery.addListener((e) => {
        if (!localStorage.getItem('theme-preference')) {
            document.body.classList.toggle('dark-mode', e.matches);
            themeToggle.textContent = e.matches ? '☀️' : '🌙';
        }
    });
}

// Smooth Scrolling with Header Offset
function initSmoothScrolling() {
    const header = document.querySelector('nav');
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const headerOffset = header.offsetHeight;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Back to Top Button with Smooth Scroll
function initBackToTopButton() {
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        backToTop.style.opacity = window.scrollY > 500 ? '1' : '0';
        backToTop.style.visibility = window.scrollY > 500 ? 'visible' : 'hidden';
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Mobile Menu with Gestures
function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    let touchStartX = 0;
    let touchEndX = 0;

    function toggleMenu(show) {
        mobileMenu.style.transform = show ? 'translateX(0)' : 'translateX(100%)';
        document.body.style.overflow = show ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', () => toggleMenu(true));
    closeMenu.addEventListener('click', () => toggleMenu(false));

    // Touch gesture handling
    mobileMenu.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    mobileMenu.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
        const deltaX = touchEndX - touchStartX;
        
        if (deltaX > 0) {
            mobileMenu.style.transform = `translateX(${deltaX}px)`;
        }
    }, { passive: true });

    mobileMenu.addEventListener('touchend', () => {
        const deltaX = touchEndX - touchStartX;
        if (deltaX > 100) {
            toggleMenu(false);
        } else {
            mobileMenu.style.transform = '';
        }
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });
}

// GSAP Animations with ScrollTrigger
function initAnimations() {
    gsap.from('#hero h1', { duration: 1, y: -50, opacity: 0, ease: 'power3.out' });
    gsap.from('.dynamic-tagline', { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: 'power3.out' });
    gsap.from('.cta-button', { duration: 1, y: 50, opacity: 0, delay: 1, ease: 'power3.out' });
    gsap.from('.scroll-down', { duration: 1, y: 20, opacity: 0, delay: 1.5, ease: 'power3.out' });

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'top 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power2.out'
        });
    });
}

// Three.js 3D Cube
function init3DCube() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('hero').appendChild(renderer.domElement);
    
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
    camera.position.z = 5;
    
    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    
    animate();
}

// Particle.js Background with Theme Support
function initParticleBackground() {
    const isDark = document.body.classList.contains('dark-mode');
    const particlesConfig = getParticlesConfig(isDark);
    particlesJS('particles-js', particlesConfig);
}

function getParticlesConfig(isDark) {
    return {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: isDark ? '#ffffff' : '#000000' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            line_linked: { enable: true, distance: 150, color: isDark ? '#ffffff' : '#000000', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true }
        },
        retina_detect: true
    };
}

// Form Validation with Enhanced UX
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const inputs = form.querySelectorAll('input, textarea');
    const submitButton = form.querySelector('button[type="submit"]');

    // Real-time validation
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            updateSubmitButton();
        });

        input.addEventListener('blur', () => {
            validateInput(input);
        });
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Simulate form submission
                await new Promise(resolve => setTimeout(resolve, 1500));
                form.reset();
                showNotification('Message sent successfully!', 'success');
            } catch (error) {
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }
        }
    });
}

// Input validation helper
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
            isValid = value.length >= 2;
            errorMessage = 'This field is required';
            break;
        case 'textarea':
            isValid = value.length >= 10;
            errorMessage = 'Please enter at least 10 characters';
            break;
    }

    updateInputStatus(input, isValid, errorMessage);
    return isValid;
}

// Update input status UI
function updateInputStatus(input, isValid, errorMessage) {
    const errorElement = input.nextElementSibling?.classList.contains('error-message') 
        ? input.nextElementSibling 
        : document.createElement('div');
    
    if (!input.nextElementSibling?.classList.contains('error-message')) {
        errorElement.classList.add('error-message');
        input.parentNode.insertBefore(errorElement, input.nextSibling);
    }

    input.classList.toggle('invalid', !isValid);
    errorElement.textContent = isValid ? '' : errorMessage;
    errorElement.style.display = isValid ? 'none' : 'block';
}

// Validate entire form
function validateForm() {
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    return isValid;
}

// Update submit button state
function updateSubmitButton() {
    const submitButton = form.querySelector('button[type="submit"]');
    const isValid = validateForm();
    submitButton.disabled = !isValid;
}

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }, 100);
}

// Initialize Resume Button
function initResumeButton() {
    const resumeButtons = document.querySelectorAll('.resume-button a, .mobile-menu a[download]');
    
    resumeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const resumeUrl = button.getAttribute('href');
            window.location.href = resumeUrl;
            showNotification('Your download will start shortly...', 'info');
        });
    });
}

// Initialize Certificates Modal
function initCertificatesModal() {
    const modal = document.getElementById('certificate-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalIssuer = document.getElementById('modal-issuer');
    const closeModal = document.querySelector('.close-modal');
  
    document.querySelectorAll('.view-certificate').forEach((button) => {
        button.addEventListener('click', () => {
            const certificateCard = button.closest('.certificate-card');
            const imageSrc = certificateCard.querySelector('img').src;
            const title = certificateCard.querySelector('h3').textContent;
            const issuer = certificateCard.querySelector('p').textContent;
    
            modalImage.src = imageSrc;
            modalTitle.textContent = title;
            modalIssuer.textContent = issuer;
            modal.style.display = 'flex';
        });
    });
  
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
  
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
