document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Canvas Particles (Hero Background) ---
    const canvas = document.getElementById('heroCanvas');
    if(canvas) {
        const ctx = canvas.getContext('2d');
        let particlesArray = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.6 - 0.3;
                this.speedY = Math.random() * 0.6 - 0.3;
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
            let numberOfParticles = (canvas.width * canvas.height) / 8000;
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
        initParticles();
        animateParticles();
    }

    // --- 2. Rotating Hero Text ---
    const words = ["Software Engineering", "Technology", "Creativity", "Leadership", "Innovation"];
    let wordIndex = 0;
    const rotatingText = document.querySelector('.rotating-text');

    if (rotatingText) {
        setInterval(() => {
            rotatingText.classList.add('fade-out');
            
            setTimeout(() => {
                wordIndex = (wordIndex + 1) % words.length;
                rotatingText.textContent = words[wordIndex];
                rotatingText.classList.remove('fade-out');
                rotatingText.classList.add('fade-in');
                
                setTimeout(() => {
                    rotatingText.classList.remove('fade-in');
                }, 50);
            }, 500); // Wait for fade out to complete
        }, 3000);
    }

    // --- 3. Form Simulation (Floating labels are handled via CSS :focus/:valid) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            const submitBtn = document.getElementById('submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.spinner');
            const formStatus = document.getElementById('formStatus');

            // Simulate Loading State
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            submitBtn.style.pointerEvents = 'none';

            // Simulate Network Request
            setTimeout(() => {
                spinner.style.display = 'none';
                btnText.style.display = 'inline-block';
                btnText.textContent = 'Message Sent';
                submitBtn.style.background = '#4ade80'; // Success green
                submitBtn.style.boxShadow = '0 10px 20px rgba(74, 222, 128, 0.3)';
                
                formStatus.style.display = 'block';
                
                // Reset form fields visually
                contactForm.reset();

                // Revert button after 3 seconds
                setTimeout(() => {
                    btnText.textContent = 'Send Message';
                    submitBtn.style.background = '';
                    submitBtn.style.boxShadow = '';
                    submitBtn.style.pointerEvents = 'auto';
                    formStatus.style.display = 'none';
                }, 3000);

            }, 2000);
        });
    }

    // --- 4. FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const header = item.querySelector('.faq-header');
        const body = item.querySelector('.faq-body');

        header.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-body').style.maxHeight = '0';
                }
            });

            // Toggle current item
            item.classList.toggle('open');
            if (item.classList.contains('open')) {
                body.style.maxHeight = body.scrollHeight + "px";
            } else {
                body.style.maxHeight = "0";
            }
        });
    });

    // --- 5. Intersection Observer (Scroll Reveal) ---
    const observerOptions = { root: null, rootMargin: '0px', threshold: 0.15 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => observer.observe(el));

    // --- 6. Magnetic Buttons ---
    const magnetics = document.querySelectorAll('.magnetic');
    magnetics.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- 7. Vanilla 3D Tilt Effect for Cards ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // --- 8. Auto-update Footer Year ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 9. Auto-update Declaration Date ---
    const decDateSpan = document.getElementById('declaration-date');
    if (decDateSpan) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        decDateSpan.textContent = new Date().toLocaleDateString('en-US', options);
    }

    // --- 10. Mobile Navigation Toggle ---
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

