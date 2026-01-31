// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Easter egg: Click nos números das estatísticas
const statNumbers = document.querySelectorAll('.stat-number');
let statClickCount = 0;

statNumbers.forEach((stat) => {
    stat.addEventListener('click', () => {
        statClickCount++;
        
        // Animate the number
        stat.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        stat.style.transform = 'scale(1.2) rotate(5deg)';
        
        setTimeout(() => {
            stat.style.transform = 'scale(1)';
        }, 300);
        
        // After clicking both stats
        if (statClickCount >= 2) {
            activateStatsEasterEgg();
            statClickCount = 0;
        }
    });
});

function activateStatsEasterEgg() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach((stat, index) => {
        const originalText = stat.textContent;
        const numbers = ['100+', '999+', '∞', originalText];
        
        let numIndex = 0;
        const interval = setInterval(() => {
            stat.textContent = numbers[numIndex];
            numIndex++;
            
            if (numIndex >= numbers.length) {
                clearInterval(interval);
            }
        }, 300);
    });
}

// Easter egg: Hover nas palavras do título
const aboutTitle = document.querySelector('.about-title');
const words = aboutTitle.innerHTML.split(' ');

aboutTitle.innerHTML = words.map(word => {
    if (word.includes('<span') || word.includes('</span>') || word.includes('<br>')) {
        return word;
    }
    return `<span class="word-hover">${word}</span>`;
}).join(' ');

const wordElements = document.querySelectorAll('.word-hover');

wordElements.forEach(word => {
    word.addEventListener('mouseenter', () => {
        word.style.display = 'inline-block';
        word.style.animation = 'wordBounce 0.5s ease';
        
        setTimeout(() => {
            word.style.animation = '';
        }, 500);
    });
});

// Add word bounce animation
const style = document.createElement('style');
style.textContent = `
    .word-hover {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .word-hover:hover {
        color: var(--accent-color);
    }
    
    @keyframes wordBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(style);

// Easter egg: Secret message on profile text
const profileParagraphs = document.querySelectorAll('.profile-text p');
let paragraphClicks = 0;

profileParagraphs.forEach(p => {
    p.addEventListener('dblclick', () => {
        paragraphClicks++;
        
        p.style.color = 'var(--accent-color)';
        p.style.transform = 'translateX(10px)';
        
        setTimeout(() => {
            p.style.color = '';
            p.style.transform = '';
        }, 500);
        
        if (paragraphClicks >= 3) {
            showSecretMessage();
            paragraphClicks = 0;
        }
    });
});

function showSecretMessage() {
    const message = document.createElement('div');
    message.innerHTML = `
        <h3 style="margin-bottom: 1rem;">🎨 Secret Designer Code:</h3>
        <p style="font-family: 'Space Mono', monospace; font-size: 0.9rem;">
            "Good design is invisible.<br>
            Great design tells a story."
        </p>
    `;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.background = '#0A0A0A';
    message.style.color = '#FAFAFA';
    message.style.padding = '3rem';
    message.style.borderRadius = '10px';
    message.style.textAlign = 'center';
    message.style.zIndex = '10000';
    message.style.boxShadow = '0 20px 60px rgba(0,0,0,0.5)';
    message.style.fontFamily = 'Archivo, sans-serif';
    message.style.maxWidth = '500px';
    message.style.animation = 'fadeInScale 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.transition = 'all 0.5s ease';
        message.style.opacity = '0';
        message.style.transform = 'translate(-50%, -50%) scale(0.9)';
        
        setTimeout(() => message.remove(), 500);
    }, 4000);
}

// Add fade in scale animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutTitle = document.querySelector('.about-title');
    
    if (aboutTitle) {
        aboutTitle.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Easter egg: Press 'D' three times quickly
let dPresses = [];

document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'd') {
        dPresses.push(Date.now());
        
        // Keep only last 3 presses
        if (dPresses.length > 3) {
            dPresses.shift();
        }
        
        // Check if 3 presses within 2 seconds
        if (dPresses.length === 3) {
            const timeDiff = dPresses[2] - dPresses[0];
            if (timeDiff < 2000) {
                activateDesignerCredits();
                dPresses = [];
            }
        }
    }
});

function activateDesignerCredits() {
    const credits = document.createElement('div');
    credits.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 1rem;">✨</div>
        <h2 style="margin-bottom: 1rem; font-size: 1.5rem;">Portfolio by João</h2>
        <p style="font-family: 'Space Mono', monospace; font-size: 0.85rem; opacity: 0.8;">
            Made with ❤️ and lots of ☕
        </p>
    `;
    credits.style.position = 'fixed';
    credits.style.top = '50%';
    credits.style.left = '50%';
    credits.style.transform = 'translate(-50%, -50%)';
    credits.style.background = 'linear-gradient(135deg, #FF0000 0%, #0A0A0A 100%)';
    credits.style.color = 'white';
    credits.style.padding = '3rem';
    credits.style.borderRadius = '20px';
    credits.style.textAlign = 'center';
    credits.style.zIndex = '10000';
    credits.style.boxShadow = '0 20px 60px rgba(255,0,0,0.4)';
    credits.style.fontFamily = 'Archivo, sans-serif';
    credits.style.animation = 'rotateIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    const rotateStyle = document.createElement('style');
    rotateStyle.textContent = `
        @keyframes rotateIn {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) rotate(-180deg) scale(0.5);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) rotate(0deg) scale(1);
            }
        }
    `;
    document.head.appendChild(rotateStyle);
    
    document.body.appendChild(credits);
    
    setTimeout(() => {
        credits.style.transition = 'all 0.5s ease';
        credits.style.opacity = '0';
        credits.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            credits.remove();
            rotateStyle.remove();
        }, 500);
    }, 3000);
}

// Mouse trail effect (subtle)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.style.position = 'fixed';
    trail.style.left = e.clientX + 'px';
    trail.style.top = e.clientY + 'px';
    trail.style.width = '6px';
    trail.style.height = '6px';
    trail.style.background = 'rgba(255, 0, 0, 0.4)';
    trail.style.borderRadius = '50%';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '9998';
    trail.style.animation = 'trailFade 0.8s ease-out forwards';
    
    const trailStyle = document.createElement('style');
    trailStyle.textContent = `
        @keyframes trailFade {
            to {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(trailStyle);
    
    document.body.appendChild(trail);
    
    setTimeout(() => {
        trail.remove();
    }, 800);
});

}); // End DOMContentLoaded