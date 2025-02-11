// Loader and Initial Page Load
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.style.display = "none";
    
    // Call protection functions
    protectEmail();
    disableSecurity();
    initThemeToggle();
});

// Email Protection and Security Enhancements
function protectEmail() {
    // Email obfuscation
    const emailElements = document.querySelectorAll('.email-protect');
    emailElements.forEach(el => {
        const encodedEmail = btoa(el.textContent);
        el.setAttribute('data-encoded', encodedEmail);
        el.textContent = encodedEmail.slice(0, 10) + '...';
        
        el.addEventListener('click', (e) => {
            const decodedEmail = atob(e.target.getAttribute('data-encoded'));
            navigator.clipboard.writeText(decodedEmail)
                .then(() => {
                    alert('Email copied to clipboard');
                })
                .catch(err => {
                    console.error('Failed to copy email', err);
                });
        });
    });
}

// Disable Right-Click, Inspect, and Text Selection
function disableSecurity() {
    // Disable right-click
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alert('Right-click is disabled on this site.');
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', (e) => {
        e.preventDefault();
        return false;
    });

    // Disable inspect element
    document.addEventListener('keydown', (e) => {
        // Disable F12, Ctrl+Shift+I, Ctrl+U
        if (
            e.key === 'F12' || 
            (e.ctrlKey && e.shiftKey && e.key === 'I') ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
            alert('Developer tools are disabled.');
            return false;
        }
    });

    // Prevent image saving
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            return false;
        });
        
        // Disable dragging of images
        img.setAttribute('draggable', 'false');
    });
}

// Theme Toggle with Persistent Storage
function initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle");
    
    // Load saved theme preference
    const savedTheme = localStorage.getItem("theme-preference");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }

    // Theme toggle event listener
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        if (document.body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
            localStorage.setItem("theme-preference", "dark");
        } else {
            themeToggle.textContent = "🌙";
            localStorage.setItem("theme-preference", "light");
        }
    });

    // Check system preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.matches && !localStorage.getItem("theme-preference")) {
        document.body.classList.add("dark-mode");
        themeToggle.textContent = "☀️";
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}

// Back to Top Button
function initBackToTopButton() {
    const backToTop = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 500) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });
}

// Add this to your existing JavaScript
function initResumeButton() {
    const resumeButtons = document.querySelectorAll('.resume-button a, .mobile-menu a[download]');
    
    resumeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default link behavior
        const resumeUrl = button.getAttribute('href');
  
        // Start the download
        window.location.href = resumeUrl;
  
        // Optional: Show a confirmation message
        alert('Your download will start shortly...');
      });
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById("menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const closeMenu = document.getElementById("close-menu");

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.add("active");
    });

    closeMenu.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
    });
}

// Email Validation Function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Form Validation
function initFormValidation() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const messageInput = form.querySelector('textarea');

            // Validate email
            if (!validateEmail(emailInput.value)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }

            // Validate message
            if (messageInput.value.trim().length < 10) {
                alert('Please enter a more detailed message');
                messageInput.focus();
                return;
            }

            // If validation passes, proceed with form submission
            // You would typically send this to a backend service
            console.log('Form submitted', {
                email: emailInput.value,
                message: messageInput.value
            });

            // Reset form
            form.reset();
        });
    }
}

// GSAP Animations
function initAnimations() {
    gsap.from("#hero h1", { duration: 1, y: -50, opacity: 0, ease: "power2.out" });
    gsap.from(".dynamic-tagline", { duration: 1, y: 50, opacity: 0, delay: 0.5, ease: "power2.out" });
    gsap.from(".cta-button", { duration: 1, y: 50, opacity: 0, delay: 1, ease: "power2.out" });
    gsap.from(".scroll-down", { duration: 1, y: 20, opacity: 0, delay: 1.5, ease: "power2.out" });
    
    gsap.utils.toArray("section").forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
}

// Three.js 3D Cube
function init3DCube() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("hero").appendChild(renderer.domElement);
    
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

// Particle.js Background
function initParticleBackground() {
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true }
        },
        retina_detect: true
    });
}

function initCertificatesModal() {
    const modal = document.getElementById("certificate-modal");
    const modalImage = document.getElementById("modal-image");
    const modalTitle = document.getElementById("modal-title");
    const modalIssuer = document.getElementById("modal-issuer");
    const closeModal = document.querySelector(".close-modal");
  
    // Open modal when a certificate is clicked
    document.querySelectorAll(".view-certificate").forEach((button) => {
      button.addEventListener("click", () => {
        const certificateCard = button.closest(".certificate-card");
        const imageSrc = certificateCard.querySelector("img").src;
        const title = certificateCard.querySelector("h3").textContent;
        const issuer = certificateCard.querySelector("p").textContent;
  
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modalIssuer.textContent = issuer;
        modal.style.display = "flex";
      });
    });
  
    // Close modal when the close button is clicked
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
}

// Call the function in your initialization block
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    initBackToTopButton();
    initMobileMenu();
    initFormValidation();
    initAnimations();
    init3DCube();
    initParticleBackground();
    initResumeButton();
    initCertificatesModal(); 
});