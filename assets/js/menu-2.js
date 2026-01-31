// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Easter egg: Click sequence nos cards
let cardClicks = [];
const cards = document.querySelectorAll('.project-card');

cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        cardClicks.push(index);
        
        // Keep only last 6 clicks
        if (cardClicks.length > 6) {
            cardClicks.shift();
        }
        
        // Check for sequence: 0,1,2,3,4,5 (all cards in order)
        if (cardClicks.join(',') === '0,1,2,3,4,5') {
            activateCardEasterEgg();
            cardClicks = [];
        }
    });
    
    // Add hover sound effect (visual feedback)
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
});

function activateCardEasterEgg() {
    // Make all cards do a wave animation
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('easter-active');
            
            setTimeout(() => {
                card.classList.remove('easter-active');
            }, 2000);
        }, index * 200);
    });
    
    // Show message
    showEasterMessage('🎨 Designer sequence unlocked!');
}

function showEasterMessage(message) {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = message;
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '50%';
    msgDiv.style.left = '50%';
    msgDiv.style.transform = 'translate(-50%, -50%)';
    msgDiv.style.background = '#FF0000';
    msgDiv.style.color = 'white';
    msgDiv.style.padding = '2rem 3rem';
    msgDiv.style.borderRadius = '10px';
    msgDiv.style.fontFamily = 'Space Mono, monospace';
    msgDiv.style.fontSize = '1.2rem';
    msgDiv.style.zIndex = '10000';
    msgDiv.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
    msgDiv.style.animation = 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    document.body.appendChild(msgDiv);
    
    setTimeout(() => {
        msgDiv.style.transition = 'all 0.5s ease';
        msgDiv.style.opacity = '0';
        msgDiv.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => msgDiv.remove(), 500);
    }, 2500);
}

// Add keyframe animation
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        100% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Easter egg: Double click on hero title
const heroTitle = document.querySelector('.hero-title');
let titleClicks = 0;
let clickTimeout;

heroTitle.addEventListener('click', () => {
    titleClicks++;
    
    clearTimeout(clickTimeout);
    
    if (titleClicks === 2) {
        activateTitleEasterEgg();
        titleClicks = 0;
    }
    
    clickTimeout = setTimeout(() => {
        titleClicks = 0;
    }, 500);
});

function activateTitleEasterEgg() {
    const subtitle = document.querySelector('.subtitle');
    const originalText = subtitle.textContent;
    
    // Glitch effect
    const glitchTexts = [
        'PIXEL WIZARD',
        'COLOR MASTER',
        'DESIGN NINJA',
        'CREATIVE GURU',
        originalText
    ];
    
    let glitchIndex = 0;
    const glitchInterval = setInterval(() => {
        subtitle.textContent = glitchTexts[glitchIndex];
        subtitle.style.color = glitchIndex % 2 === 0 ? '#FF0000' : '#0A0A0A';
        glitchIndex++;
        
        if (glitchIndex >= glitchTexts.length) {
            clearInterval(glitchInterval);
            subtitle.style.color = '#FF0000';
        }
    }, 150);
}

// Parallax effect on cards
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const speed = (index % 2 === 0) ? 10 : -10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        if (!card.matches(':hover')) {
            card.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});

// Easter egg: Secret key combination (Shift + D)
let shiftPressed = false;

document.addEventListener('keydown', (e) => {
    if (e.key === 'Shift') {
        shiftPressed = true;
    }
    
    if (shiftPressed && e.key.toLowerCase() === 'd') {
        activateDesignerMode();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Shift') {
        shiftPressed = false;
    }
});

function activateDesignerMode() {
    document.body.style.transition = 'all 1s ease';
    document.body.style.filter = 'invert(1) hue-rotate(180deg)';
    
    showEasterMessage('🌈 Designer mode activated!');
    
    setTimeout(() => {
        document.body.style.filter = 'none';
    }, 3000);
}

// Add smooth transitions on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.project-card, .cta-section').forEach(el => {
    observer.observe(el);
});

// Random card glow effect on page load
setTimeout(() => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.style.boxShadow = '0 0 30px rgba(255, 0, 0, 0.5)';
    
    setTimeout(() => {
        randomCard.style.boxShadow = '';
    }, 2000);
}, 1000);

}); // End DOMContentLoaded