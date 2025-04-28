document.addEventListener('DOMContentLoaded', () => {
  // Page Loader
  setTimeout(() => {
    const loader = document.querySelector('.loader');
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);

  // Navbar scroll effect
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');
  
  window.addEventListener('scroll', () => {
    // Add scrolled class to navbar
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Update active nav link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Show/hide back to top button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Back to top button
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Mobile menu toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  menuToggleBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
  
  closeMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
  });
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
      document.body.style.overflow = ''; // Enable scrolling
    });
  });
  
  // Theme toggle
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check if user has previously set a theme preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  }
  
  // Typewriter effect
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = [
    'Software Engineer',
    'Web Developer',
    'Data Analyst',
    'Tech Enthusiast'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 100;
  
  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = 50; // Faster when deleting
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 150; // Slower when typing
    }
    
    // Switch to deleting when phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typeDelay = 1500; // Pause at the end of phrase
    }
    
    // Switch to next phrase when deleted
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeDelay = 500; // Pause before typing next phrase
    }
    
    setTimeout(typeWriter, typeDelay);
  }
  
  // Start typewriter animation
  setTimeout(typeWriter, 1000);
  
  // Initialize Particles.js
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#007bff'
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#007bff',
          opacity: 0.4,
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
            enable: false
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
              opacity: 1
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }
  
  // Project filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
  
  // Initialize AOS (Animate on Scroll) library
  AOS.init({
    duration: 1000,
    once: true,
    mirror: false
  });
  
  // Project modal functionality
  const projectDetailsButtons = document.querySelectorAll('.project-details-btn');
  const modal = document.getElementById('project-modal');
  const closeModal = document.querySelector('.close-modal');
  
  // Project details data (in a real project, you would fetch this from a backend)
  const projectDetails = {
    project1: {
      title: 'ACO Pathfinding Algorithm',
      img: 'assets/pathfinding.jpg',
      description: 'This project implements the Ant Colony Optimization algorithm for finding optimal paths in 2D grids with obstacles. The implementation features both traditional ACO approaches and hybrid methods incorporating backtracking for improved efficiency. The visualization component allows users to see how ants explore the environment and converge on optimal solutions over time.',
      technologies: ['Python', 'NumPy', 'Matplotlib', 'Algorithms', 'AI'],
      github: 'https://github.com/Risha-v/ACO-Pathfinding',
      live: '#'
    },
    project2: {
      title: 'Employee Database Management System - SAIL Bokaro',
      img: 'assets/employee.jpg',
      description: 'Developed during an internship at SAIL Bokaro Steel Plant, this comprehensive PostgreSQL database system manages employee data and facilitates payroll analytics. The system features data normalization, efficient querying, and analytics dashboards for management decision-making. It includes modules for attendance tracking, leave management, and automated reporting.',
      technologies: ['PostgreSQL', 'Database Design', 'SQL', 'Analytics', 'Data Modeling'],
      github: 'https://github.com/Risha-v/SAIL_INTERNSHIP',
      live: '#'
    },
    project3: {
      title: 'Portfolio Website',
      img: 'assets/portfolio.jpg',
      description: 'A personal portfolio website showcasing skills, projects, and experience. The site features a responsive design, interactive elements, and modern web development practices. Key features include dark/light theme toggle, smooth animations, and an intuitive user interface.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
      github: 'https://github.com/Risha-v/PORTFOLIO',
      live: '#'
    }
  };
  
  projectDetailsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-id');
      const project = projectDetails[projectId];
      
      // Populate modal with project details
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-img').src = project.img;
      document.getElementById('modal-img').alt = project.title;
      document.getElementById('modal-desc').textContent = project.description;
      
      // Clear and populate technologies
      const techContainer = document.getElementById('modal-tech');
      techContainer.innerHTML = '';
      project.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.textContent = tech;
        techContainer.appendChild(span);
      });
      
      // Set links
      document.getElementById('modal-github').href = project.github;
      document.getElementById('modal-live').href = project.live;
      
      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
  });
  
  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Enable scrolling
  });
  
  // Close modal when clicking outside
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Enable scrolling
    }
  });
  
  // Contact form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // In a real application, you would send this data to a backend
      console.log('Form submitted:', formData);
      
      // Show a success message (in a real app, this would be after successful API response)
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});
