document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.value-card, .leader-card, .program-card, .post-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for stats
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
        }, 20);
    }

    // Animate stats when in view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Like button functionality for posts
    const posts = document.querySelectorAll('.post-card');
    posts.forEach(post => {
        const likeButton = post.querySelector('.post-stats .stat:first-child');
        if (likeButton) {
            likeButton.style.cursor = 'pointer';
            likeButton.addEventListener('click', function() {
                const currentLikes = parseInt(this.textContent.split(' ')[1]);
                const newLikes = currentLikes + 1;
                this.innerHTML = `❤️ ${newLikes}`;
                this.style.color = '#e74c3c';
                
                // Animate like
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            });
        }
    });

    // Application form modal (simple implementation)
    const applyButtons = document.querySelectorAll('.btn-primary');
    applyButtons.forEach(button => {
        if (button.textContent.includes('Өтініш беру') || button.textContent.includes('өтініш')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Өтініш беру формасы сайттың келесі нұсқасында қосылады. Телефон арқылы бізбен байланысыңыз: +7 (123) 456-78-90');
            });
        }
    });

    // Floating animation for hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        let isFloating = true;
        
        function floatAnimation() {
            if (isFloating) {
                heroImage.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    if (isFloating) heroImage.style.transform = 'translateY(0px)';
                }, 1500);
            }
        }
        
        setInterval(floatAnimation, 3000);
        
        // Pause animation on hover
        heroImage.addEventListener('mouseenter', () => {
            isFloating = false;
            heroImage.style.transform = 'translateY(0px)';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            isFloating = true;
        });
    }

    // Parallax effect for floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-element');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        const words = originalText.split(' ');
        let wordIndex = 0;
        
        function typeWords() {
            if (wordIndex < words.length) {
                const currentWords = words.slice(0, wordIndex + 1).join(' ');
                heroTitle.innerHTML = currentWords;
                wordIndex++;
                setTimeout(typeWords, 200);
            }
        }
        
        // Start typing effect after page load
        setTimeout(() => {
            heroTitle.innerHTML = '';
            typeWords();
        }, 500);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.value-card, .leader-card, .program-card, .post-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Group type hover effects
    const groupTypes = document.querySelectorAll('.group-type');
    groupTypes.forEach(group => {
        group.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        group.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('Педагогикалық колледж - сайт сәтті жүктелді!');
});

// Utility functions
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

// Smooth scroll behavior for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const scrollToElement = (element, duration = 800) => {
        const start = window.pageYOffset;
        const target = element.offsetTop - 80;
        const distance = target - start;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };
}