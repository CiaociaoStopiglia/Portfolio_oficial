// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Easter egg: Click counter no logo
let clickCount = 0;
const logo = document.querySelector('.logo');
const easterCounter = document.getElementById('easterCounter');

logo.addEventListener('click', (e) => {
    e.preventDefault();
    clickCount++;
    
    // Add shake animation
    logo.classList.add('shake');
    setTimeout(() => logo.classList.remove('shake'), 500);
    
    // Show counter after 3 clicks
    if (clickCount >= 3) {
        easterCounter.textContent = `${clickCount} clicks! Keep going...`;
        easterCounter.classList.add('show');
        
        setTimeout(() => {
            easterCounter.classList.remove('show');
        }, 2000);
    }
    
    // Easter egg activated at 10 clicks
    if (clickCount === 10) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    easterCounter.textContent = '🎉 Easter egg found!';
    easterCounter.classList.add('show', 'celebrate');
    
    // Create confetti
    createConfetti();
    
    // Change background temporarily
    document.body.style.transition = 'background 0.5s ease';
    document.body.style.background = 'linear-gradient(135deg, #FF0000 0%, #0A0A0A 100%)';
    
    setTimeout(() => {
        document.body.style.background = '#FAFAFA';
        easterCounter.classList.remove('show', 'celebrate');
        clickCount = 0;
    }, 3000);
}

function createConfetti() {
    const colors = ['#FF0000', '#0A0A0A', '#FAFAFA'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = (Math.random() * 10 + 5) + 'px';
            confetti.style.height = (Math.random() * 10 + 5) + 'px';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Cursor trail easter egg (subtle)
let cursorTrail = [];
const maxTrail = 20;

document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.background = 'rgba(255, 0, 0, 0.3)';
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.transition = 'opacity 0.5s ease';
    dot.style.zIndex = '9998';
    
    document.body.appendChild(dot);
    cursorTrail.push(dot);
    
    setTimeout(() => {
        dot.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        dot.remove();
    }, 600);
    
    if (cursorTrail.length > maxTrail) {
        const oldDot = cursorTrail.shift();
        oldDot.remove();
    }
});

// Parallax effect on menu items
const menuItems = document.querySelectorAll('.menu-item');

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    menuItems.forEach((item, index) => {
        const depth = (index + 1) * 5;
        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;
        
        item.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
});

// Konami code easter egg
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateKonamiEasterEgg();
        konamiCode = [];
    }
});

function activateKonamiEasterEgg() {
    easterCounter.textContent = '🎮 Konami code activated!';
    easterCounter.classList.add('show', 'celebrate');
    
    // Rotate the entire page
    document.body.style.transition = 'transform 2s ease';
    document.body.style.transform = 'rotate(360deg)';
    
    setTimeout(() => {
        document.body.style.transform = 'rotate(0deg)';
        easterCounter.classList.remove('show', 'celebrate');
    }, 2000);
}

// Add smooth scroll behavior
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

}); // End DOMContentLoaded