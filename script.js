document.addEventListener('DOMContentLoaded', function() {
    // Мобильді мәзірді басқару
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
        // Мәзір иконкасын өзгерту
        const icon = this.querySelector('i');
        if (navList.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Мәзір сілтемелеріне click әрекетін қосу
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Форманы өңдеу
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Форма жіберілгенде анимация көрсету
            const submitButton = this.querySelector('.submit-button');
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Жіберілуде...';
            
            // Имитация отправки формы
            setTimeout(() => {
                submitButton.innerHTML = '<i class="fas fa-check"></i> Жіберілді!';
                this.reset();
                setTimeout(() => {
                    submitButton.innerHTML = '<span>Жіберу</span><i class="fas fa-arrow-right"></i>';
                }, 2000);
            }, 1500);
        });
    }

    // Анимацияларды қосу
    const fadeElements = document.querySelectorAll('.section');
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        observer.observe(element);
    });
}); 