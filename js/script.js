// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('.program-card, .about-grid, .admissions-content, .contact-grid').forEach(el => {
    observer.observe(el);
});

// Hero stats counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText.replace(/[+,%]/g, ''));
        const increment = target / 100;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment) + (counter.getAttribute('data-suffix') || '');
            requestAnimationFrame(animateCounters);
        } else {
            counter.innerText = counter.getAttribute('data-final') || target + '+';
        }
    });
}

// Trigger counters when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
});
heroObserver.observe(document.querySelector('.hero'));

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (name && email && message) {
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerText = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }, 2000);
    } else {
        alert('Please fill in all fields.');
    }
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const fullText = heroTitle.textContent;
    typeWriter(heroTitle, fullText, 80);
    
    // Add loaded class for animations
    document.body.classList.add('loaded');
});

// Back to top button (if needed)
function createBackToTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    btn.className = 'back-to-top';
    document.body.appendChild(btn);
    
    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            btn.style.opacity = '1';
            btn.style.visibility = 'visible';
        } else {
            btn.style.opacity = '0';
            btn.style.visibility = 'hidden';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createBackToTop();
    
    // Preload images for smooth animations
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});
