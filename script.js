document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Preloader Logic ---
    const preloader = document.getElementById('preloader');
    const loadingBar = document.querySelector('.loading-bar');
    const loadingPercent = document.querySelector('.loading-percent');
    
    let loadProgress = 0;
    const loadInterval = setInterval(() => {
        loadProgress += Math.floor(Math.random() * 5) + 1;
        if(loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadInterval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.visibility = 'hidden';
                    initScrollAnimations(); // Trigger initial animations
                }, 1000);
            }, 500);
        }
        loadingBar.style.width = `${loadProgress}%`;
        loadingPercent.textContent = `${loadProgress}%`;
    }, 30);

    // --- 2. Canvas Particle Background ---
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * 1 - 0.5;
            this.color = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particlesArray = [];
        let numberOfParticles = (canvas.width * canvas.height) / 10000;
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        requestAnimationFrame(animateParticles);
    }

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });

    initParticles();
    animateParticles();

    // --- 3. Intersection Observer (Scroll Animations) ---
    function initScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Animate skill progress bars
                    if (entry.target.classList.contains('skill-category')) {
                        const progressBars = entry.target.querySelectorAll('.progress');
                        progressBars.forEach(bar => {
                            bar.style.width = bar.getAttribute('data-width');
                        });
                    }

                    // Animate Counters
                    if (entry.target.classList.contains('stat-card')) {
                        const counter = entry.target.querySelector('.counter');
                        if(counter && !counter.classList.contains('counted')) {
                            animateCounter(counter);
                            counter.classList.add('counted');
                        }
                    }
                }
            });
        }, observerOptions);

        const revealElements = document.querySelectorAll('.reveal-up, .reveal-text, .reveal-image');
        revealElements.forEach(el => observer.observe(el));
    }

    function animateCounter(counterElement) {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // ms
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counterElement.innerText = target + (target > 10 ? '+' : '');
            }
        };
        updateCounter();
    }

    // --- 4. Rotating Text (Hero) ---
    const rotatingText = document.querySelector('.rotating-text');
    const titles = ["Software Engineer", "Digital Creator", "Public Relations Leader", "Tech Enthusiast"];
    let titleIndex = 0;

    if (rotatingText) {
        setInterval(() => {
            rotatingText.style.opacity = 0;
            setTimeout(() => {
                titleIndex = (titleIndex + 1) % titles.length;
                rotatingText.innerText = titles[titleIndex];
                rotatingText.style.opacity = 1;
            }, 500);
        }, 3000);
        rotatingText.style.transition = 'opacity 0.5s ease-in-out';
    }

    // --- 5. Magnetic Buttons / 3D Hover (Hero Image) ---
    const heroImage = document.querySelector('.parallax-img');
    const heroWrapper = document.querySelector('.hero-image-wrapper');
    
    if (heroImage && heroWrapper) {
        heroWrapper.addEventListener('mousemove', (e) => {
            const rect = heroWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            heroImage.style.transform = `rotateY(${x / 20}deg) rotateX(${-y / 20}deg) scale(1.05)`;
        });

        heroWrapper.addEventListener('mouseleave', () => {
            heroImage.style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
        });
    }

    // Magnetic links
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 6. Smooth Scrolling for Nav Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 7. Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

});

