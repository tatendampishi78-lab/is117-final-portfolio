// MotionMind - Enhanced Interactive JavaScript with Fitness Animations

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced scroll effects with parallax
    let ticking = false;

    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const nav = document.querySelector('.nav');

        // Navigation scroll effect
        if (scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }

        // Parallax effect for workout section
        const workoutsSection = document.querySelector('.workouts-section');
        if (workoutsSection) {
            const sectionTop = workoutsSection.offsetTop;
            const sectionHeight = workoutsSection.offsetHeight;
            const windowHeight = window.innerHeight;

            if (scrollY + windowHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
                const parallaxSpeed = 0.3;
                const yPos = -(scrollY - sectionTop) * parallaxSpeed;
                workoutsSection.style.backgroundPosition = `center ${yPos}px`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Animate floating cards in hero section
    function animateFloatingCards() {
        const habitCard = document.querySelector('.card-habits');
        const metricsCard = document.querySelector('.card-metrics');

        if (habitCard && metricsCard) {
            // Subtle floating animation
            setInterval(() => {
                habitCard.style.transform = `translateY(${Math.sin(Date.now() * 0.001) * 5}px)`;
                metricsCard.style.transform = `translateY(${Math.cos(Date.now() * 0.0012) * 7}px)`;
            }, 16);
        }
    }

    animateFloatingCards();

    // Dynamic workout card interactions
    const workoutCards = document.querySelectorAll('.workout-card');

    workoutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg)';
        });

        // Add click animation
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-15px) rotateX(5deg)';
            }, 150);
        });
    });

    // Enhanced feature card animations
    const featureCards = document.querySelectorAll('.feature-card, .screenshot-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 25px 50px rgba(15, 23, 42, 0.25)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 18px 40px rgba(15, 23, 42, 0.08)';
        });
    });

    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-small');

    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            // Enhanced ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: enhancedRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                pointer-events: none;
                z-index: 1;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 800);

            // Success feedback
            setTimeout(() => {
                this.innerHTML = '✨ Welcome to MotionMind!';
                this.style.background = 'linear-gradient(45deg, #10b981, #059669)';

                setTimeout(() => {
                    this.innerHTML = 'Start Your Journey';
                    this.style.background = '';
                }, 2000);
            }, 300);
        });
    });

    // Add enhanced CSS animations
    const enhancedStyles = document.createElement('style');
    enhancedStyles.textContent = `
        @keyframes enhancedRipple {
            0% {
                transform: scale(0);
                opacity: 0.8;
            }
            50% {
                opacity: 0.4;
            }
            100% {
                transform: scale(1);
                opacity: 0;
            }
        }

        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }

        .workout-card:hover .workout-duration {
            animation: pulse 1s ease-in-out infinite;
        }

        .floating-card {
            animation: gentleFloat 6s ease-in-out infinite;
        }

        @keyframes gentleFloat {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        .card-habits {
            animation-delay: 0s;
        }

        .card-metrics {
            animation-delay: 2s;
        }

        /* Fitness-themed loading animation for images */
        .workout-card img,
        .screenshot-card img {
            transition: filter 0.3s ease;
        }

        .workout-card:hover img {
            filter: brightness(1.1) saturate(1.2);
        }

        /* Scroll progress indicator */
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
            z-index: 1000;
            transition: width 0.1s ease;
        }
    `;
    document.head.appendChild(enhancedStyles);

    // Add scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollProgress + '%';
    });

    // Intersection Observer for enhanced section animations
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observe all major sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Performance optimization: Debounce scroll events
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

    // Image loading optimization and error handling
    function setupImageLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');

        images.forEach(img => {
            // Add loading placeholder
            img.style.backgroundColor = '#f3f4f6';
            img.style.minHeight = '200px';

            // Handle image load success
            img.addEventListener('load', function() {
                this.style.backgroundColor = 'transparent';
                this.style.opacity = '1';
                this.classList.add('loaded');
            });

            // Handle image load errors with fallback
            img.addEventListener('error', function() {
                console.log('Image failed to load:', this.src);
                // Create a placeholder gradient
                this.style.backgroundColor = '#e5e7eb';
                this.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #d1d5db 100%)';
                this.alt = 'Image placeholder - ' + this.alt;
            });
        });
    }

    setupImageLoading();

    // Intersection Observer for lazy loading images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add wellness score animation
    const wellnessScore = document.querySelector('.card-metrics p:first-of-type');
    if (wellnessScore) {
        let currentScore = 0;
        const targetScore = 94;
        const increment = targetScore / 60; // Animate over 1 second (60fps)

        const animateScore = () => {
            if (currentScore < targetScore) {
                currentScore += increment;
                wellnessScore.innerHTML = Math.round(currentScore) + '<span>/100</span>';
                requestAnimationFrame(animateScore);
            } else {
                wellnessScore.innerHTML = targetScore + '<span>/100</span>';
            }
        };

        // Start animation when section becomes visible
        const metricsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateScore, 500);
                    metricsObserver.unobserve(entry.target);
                }
            });
        });

        metricsObserver.observe(wellnessScore);
    }
});
