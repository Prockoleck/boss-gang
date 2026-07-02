// ============================
// PARTICLES
// ============================
function createParticles() {
    const container = document.getElementById('particles');
    const count = 30;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.width = (Math.random() * 3 + 1) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// ============================
// SCROLL ANIMATIONS
// ============================
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 150);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.rule-card').forEach(card => {
        observer.observe(card);
    });
}

// ============================
// FORM HANDLING
// ============================
function initForm() {
    const form = document.getElementById('gangForm');
    const submitBtn = document.getElementById('submitBtn');
    const successOverlay = document.getElementById('successOverlay');
    const closeSuccess = document.getElementById('closeSuccess');
    const membershipCard = document.getElementById('membershipCard');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate oath
        if (!document.getElementById('oath').checked) {
            shakeElement(document.querySelector('.oath-box'));
            return;
        }

        // Loading animation
        submitBtn.classList.add('loading');
        submitBtn.querySelector('.btn-text').textContent = 'PROCESSING...';

        // Screen shake
        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 500);

        // Simulate processing
        setTimeout(() => {
            submitBtn.classList.remove('loading');
            submitBtn.querySelector('.btn-text').textContent = 'SUBMIT APPLICATION';

            // Generate membership card
            generateMembershipCard();

            // Show success
            successOverlay.classList.add('active');
        }, 2200);
    });

    closeSuccess.addEventListener('click', () => {
        successOverlay.classList.remove('active');
        membershipCard.classList.add('active');
    });

    membershipCard.addEventListener('click', (e) => {
        if (e.target === membershipCard) {
            membershipCard.classList.remove('active');
        }
    });
}

function generateMembershipCard() {
    const realName = document.getElementById('realName').value.toUpperCase();
    const streetName = document.getElementById('streetName').value.toUpperCase();
    const memberNumber = String(Math.floor(Math.random() * 9000) + 1000);
    const initials = realName.split(' ').map(n => n[0]).join('').substring(0, 2);
    const memberId = 'BSG-' + Math.random().toString(36).substring(2, 6).toUpperCase();

    document.getElementById('cardName').textContent = realName;
    document.getElementById('cardAlias').textContent = streetName;
    document.getElementById('cardNumber').textContent = memberNumber;
    document.getElementById('cardAvatar').textContent = initials;
    document.getElementById('cardId').textContent = memberId;
}

function shakeElement(el) {
    el.style.animation = 'shake 0.5s ease-in-out';
    el.style.border = '2px solid var(--red)';
    setTimeout(() => {
        el.style.animation = '';
        el.style.border = '';
    }, 500);
}

// ============================
// SMOOTH SCROLL
// ============================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================
// PARALLAX EFFECT ON HERO
// ============================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - scrolled / 700;
        }
    });
}

// ============================
// INPUT FOCUS EFFECTS
// ============================
function initInputEffects() {
    const inputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.querySelector('label').style.color = 'var(--bright-red)';
            this.parentElement.querySelector('label').style.textShadow = '0 0 10px rgba(255, 26, 26, 0.5)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.querySelector('label').style.color = '';
            this.parentElement.querySelector('label').style.textShadow = '';
        });
    });
}

// ============================
// TYPEWRITER EFFECT FOR TAGLINE
// ============================
function typewriterEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    tagline.style.borderRight = '2px solid var(--red)';

    let i = 0;
    function type() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    type();
}

// ============================
// MAFIA CARD FLIP ON CLICK
// ============================
function initCardInteraction() {
    const cardInner = document.querySelector('.card-inner');
    if (!cardInner) return;

    cardInner.addEventListener('click', () => {
        cardInner.style.transition = 'transform 0.6s';
        cardInner.style.transformStyle = 'preserve-3d';
        cardInner.style.transform = cardInner.style.transform.includes('180deg') 
            ? 'rotateY(0deg)' 
            : 'rotateY(180deg)';
    });
}

// ============================
// BLOOD DRIP EFFECT ON HEADER
// ============================
function createBloodDrips() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 8; i++) {
        const drip = document.createElement('div');
        drip.style.cssText = `
            position: absolute;
            top: 0;
            left: ${10 + Math.random() * 80}%;
            width: ${2 + Math.random() * 3}px;
            height: ${30 + Math.random() * 50}px;
            background: linear-gradient(180deg, var(--red), transparent);
            opacity: 0.3;
            border-radius: 0 0 50% 50%;
            animation: drip ${2 + Math.random() * 3}s ease-in infinite;
            animation-delay: ${Math.random() * 5}s;
            z-index: 1;
        `;
        hero.appendChild(drip);
    }

    // Add drip animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drip {
            0% { transform: translateY(-100%); opacity: 0; }
            10% { opacity: 0.3; }
            100% { transform: translateY(200%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// ============================
// INIT
// ============================
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initScrollAnimations();
    initForm();
    initSmoothScroll();
    initParallax();
    initInputEffects();
    initCardInteraction();
    createBloodDrips();

    // Start typewriter after a short delay
    setTimeout(typewriterEffect, 500);
});
