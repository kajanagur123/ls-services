// Home page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Counter animation for stats
    animateCounters();
    
    // Parallax effect for hero section
    initParallaxEffect();
    
    // Typing animation for hero title
    initTypingAnimation();
    
    // Floating cards animation
    initFloatingCards();
});

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                const suffix = counter.textContent.replace(/[\d.]/g, '');
                
                animateCounter(counter, target, suffix);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (suffix.includes('.')) {
            element.textContent = current.toFixed(1) + suffix.replace(/[\d.]/g, '');
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, stepTime);
}

// Parallax effect for hero background
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero.querySelector('::before')) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Typing animation for hero title
function initTypingAnimation() {
    const titleElement = document.querySelector('.hero-title');
    if (!titleElement) return;
    
    const originalText = titleElement.innerHTML;
    const words = originalText.split(' ');
    let currentWordIndex = 0;
    
    // Only animate the gradient text part
    const gradientSpan = titleElement.querySelector('.text-gradient');
    if (!gradientSpan) return;
    
    const gradientText = gradientSpan.textContent;
    let currentCharIndex = 0;
    
    function typeGradientText() {
        if (currentCharIndex < gradientText.length) {
            gradientSpan.textContent = gradientText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            setTimeout(typeGradientText, 100);
        }
    }
    
    // Start typing animation after a delay
    setTimeout(() => {
        gradientSpan.textContent = '';
        typeGradientText();
    }, 500);
}

// Enhanced floating animation for cards
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add mouse interaction
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.05)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        
        // Add random floating movement
        setInterval(() => {
            const randomY = Math.sin(Date.now() * 0.001 + index) * 5;
            const randomX = Math.cos(Date.now() * 0.0008 + index) * 3;
            
            if (!card.matches(':hover')) {
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }, 50);
    });
}

// Smooth scroll to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add scroll-triggered animations
function initScrollAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for grid items
                if (entry.target.classList.contains('features-grid') || 
                    entry.target.classList.contains('stats-grid')) {
                    const items = entry.target.children;
                    Array.from(items).forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    
    // Observe sections for animations
    const sections = document.querySelectorAll('.features-section, .benefits-section, .stats-section');
    sections.forEach(section => {
        animationObserver.observe(section);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// Add interactive hover effects for feature cards
function initFeatureCardEffects() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                icon.style.color = 'white';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
                icon.style.color = '';
            }
        });
    });
}

// Initialize feature card effects
document.addEventListener('DOMContentLoaded', initFeatureCardEffects);

// Add dynamic background particles
function initBackgroundParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    `;
    
    hero.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        createParticle(particlesContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: rgba(59, 130, 246, 0.3);
        border-radius: 50%;
        animation: float ${5 + Math.random() * 10}s linear infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

// Add CSS for particle animation
const particleStyles = `
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;

const particleStyleSheet = document.createElement('style');
particleStyleSheet.textContent = particleStyles;
document.head.appendChild(particleStyleSheet);

// Initialize background particles
document.addEventListener('DOMContentLoaded', initBackgroundParticles);