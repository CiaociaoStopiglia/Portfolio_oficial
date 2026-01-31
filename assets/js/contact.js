// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Easter egg: Click em todas as redes sociais
const socialItems = document.querySelectorAll('.social-item');
let socialClicks = new Set();

socialItems.forEach((item) => {
    // REMOVIDO o e.preventDefault() para permitir navegação
    item.addEventListener('click', (e) => {
        const socialName = item.getAttribute('data-social');
        socialClicks.add(socialName);
        
        // Visual feedback
        item.classList.add('pulse');
        setTimeout(() => item.classList.remove('pulse'), 500);
        
        // Check if all socials were clicked
        if (socialClicks.size === socialItems.length) {
            // Pequeno delay para mostrar o easter egg antes de navegar
            setTimeout(() => {
                activateSocialMasterEasterEgg();
            }, 100);
            socialClicks.clear();
        }
    });
    
    // Random hover animation
    item.addEventListener('mouseenter', () => {
        const randomRotate = (Math.random() - 0.5) * 5;
        item.style.transform = `translateY(-5px) scale(1.02) rotate(${randomRotate}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1) rotate(0deg)';
    });
});

function activateSocialMasterEasterEgg() {
    showMessage('🌟 Social Media Master! All platforms unlocked!');
}

function showMessage(text) {
    const msg = document.createElement('div');
    msg.textContent = text;
    msg.style.position = 'fixed';
    msg.style.top = '50%';
    msg.style.left = '50%';
    msg.style.transform = 'translate(-50%, -50%)';
    msg.style.background = '#FF0000';
    msg.style.color = 'white';
    msg.style.padding = '2rem 3rem';
    msg.style.borderRadius = '10px';
    msg.style.fontFamily = 'Space Mono, monospace';
    msg.style.fontSize = '1.1rem';
    msg.style.zIndex = '10000';
    msg.style.boxShadow = '0 20px 60px rgba(0,0,0,0.3)';
    msg.style.animation = 'popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    document.body.appendChild(msg);
    
    setTimeout(() => {
        msg.style.transition = 'all 0.5s ease';
        msg.style.opacity = '0';
        msg.style.transform = 'translate(-50%, -50%) scale(0.8)';
        setTimeout(() => msg.remove(), 500);
    }, 2000);
}

// Add pop in animation
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

// Easter egg: Hover sobre o título várias vezes
const contactTitle = document.querySelector('.contact-title');
let titleHovers = 0;

contactTitle.addEventListener('mouseenter', () => {
    titleHovers++;
    
    // Change colors on hover
    const colors = ['', 'var(--accent-color)', ''];
    contactTitle.style.color = colors[titleHovers % 3];
    
    contactTitle.style.transform = 'scale(1.02)';
    
    if (titleHovers >= 7) {
        activateTitleEasterEgg();
        titleHovers = 0;
    }
});

contactTitle.addEventListener('mouseleave', () => {
    contactTitle.style.transform = 'scale(1)';
});

function activateTitleEasterEgg() {
    const highlight = document.querySelector('.highlight');
    const words = ['TOGETHER', 'AMAZING', 'CREATIVE', 'MAGIC', 'TOGETHER'];
    
    let wordIndex = 0;
    const interval = setInterval(() => {
        highlight.textContent = words[wordIndex];
        wordIndex++;
        
        if (wordIndex >= words.length) {
            clearInterval(interval);
        }
    }, 300);
    
    // Confetti effect
    createConfetti();
}

function createConfetti() {
    const colors = ['#FF0000', '#0A0A0A', '#FFD700'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = (Math.random() * 8 + 4) + 'px';
            confetti.style.height = (Math.random() * 8 + 4) + 'px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9998';
            confetti.style.animation = `confettiFall ${Math.random() * 2 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 50);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(${Math.random() * 720}deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Easter egg: Copy email/phone (click to copy)
const infoValues = document.querySelectorAll('.info-value');

infoValues.forEach((value) => {
    value.addEventListener('click', (e) => {
        e.preventDefault();
        
        const text = value.textContent;
        
        // Try to copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showCopyMessage(value);
            });
        } else {
            showCopyMessage(value);
        }
    });
});

function showCopyMessage(element) {
    const msg = document.createElement('div');
    msg.textContent = '✓ Copied!';
    msg.style.position = 'fixed';
    msg.style.background = '#0A0A0A';
    msg.style.color = 'white';
    msg.style.padding = '0.5rem 1rem';
    msg.style.borderRadius = '5px';
    msg.style.fontSize = '0.85rem';
    msg.style.fontFamily = 'Space Mono, monospace';
    msg.style.pointerEvents = 'none';
    msg.style.zIndex = '10000';
    msg.style.animation = 'fadeInOut 2s ease';
    
    const rect = element.getBoundingClientRect();
    msg.style.left = rect.left + 'px';
    msg.style.top = (rect.bottom + 10) + 'px';
    
    document.body.appendChild(msg);
    
    const fadeStyle = document.createElement('style');
    fadeStyle.textContent = `
        @keyframes fadeInOut {
            0%, 100% { opacity: 0; transform: translateY(0); }
            10%, 90% { opacity: 1; transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(fadeStyle);
    
    setTimeout(() => {
        msg.remove();
        fadeStyle.remove();
    }, 2000);
}

// Parallax effect (suavizado)
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    socialItems.forEach((item, index) => {
        const speed = ((index % 2) + 1) * 3; // Reduzido para movimento mais sutil
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        if (!item.matches(':hover')) {
            item.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});

// Easter egg: Press 'C' for contact mode
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'c' && !e.repeat) {
        activateContactMode();
    }
});

function activateContactMode() {
    // Highlight effect on contact info
    const contactInfo = document.querySelector('.contact-info');
    const socialLinks = document.querySelector('.social-links');
    
    [contactInfo, socialLinks].forEach((section, index) => {
        setTimeout(() => {
            section.style.transition = 'all 0.8s ease';
            section.style.transform = 'scale(1.05)';
            section.style.boxShadow = '0 20px 60px rgba(255, 0, 0, 0.2)';
            
            setTimeout(() => {
                section.style.transform = 'scale(1)';
                section.style.boxShadow = 'none';
            }, 800);
        }, index * 400);
    });
    
    showMessage('📧 Contact mode activated!');
}

// Easter egg: Secret message on subtitle
const subtitle = document.querySelector('.contact-subtitle');
let subtitleClicks = 0;

subtitle.addEventListener('click', () => {
    subtitleClicks++;
    
    subtitle.style.transform = 'scale(1.1)';
    subtitle.style.color = 'var(--accent-color)';
    
    setTimeout(() => {
        subtitle.style.transform = 'scale(1)';
        subtitle.style.color = '';
    }, 300);
    
    if (subtitleClicks >= 5) {
        showFinalEasterEgg();
        subtitleClicks = 0;
    }
});

function showFinalEasterEgg() {
    const finalMsg = document.createElement('div');
    finalMsg.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem;">🎉 CONGRATULATIONS! 🎉</h2>
        <p style="font-family: 'Space Mono', monospace; font-size: 1rem; line-height: 1.8; margin-bottom: 1rem;">
            You've discovered all the hidden secrets!<br>
            You're a true explorer of design.
        </p>
        <p style="font-size: 0.9rem; opacity: 0.8;">
            Thank you for appreciating the details ✨
        </p>
    `;
    finalMsg.style.position = 'fixed';
    finalMsg.style.top = '50%';
    finalMsg.style.left = '50%';
    finalMsg.style.transform = 'translate(-50%, -50%)';
    finalMsg.style.background = 'linear-gradient(135deg, #FF0000 0%, #0A0A0A 100%)';
    finalMsg.style.color = 'white';
    finalMsg.style.padding = '4rem';
    finalMsg.style.borderRadius = '20px';
    finalMsg.style.textAlign = 'center';
    finalMsg.style.zIndex = '10001';
    finalMsg.style.boxShadow = '0 30px 80px rgba(255,0,0,0.5)';
    finalMsg.style.fontFamily = 'Archivo, sans-serif';
    finalMsg.style.maxWidth = '600px';
    finalMsg.style.animation = 'finalReveal 1s cubic-bezier(0.16, 1, 0.3, 1)';
    
    const finalStyle = document.createElement('style');
    finalStyle.textContent = `
        @keyframes finalReveal {
            from {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5) rotate(-10deg);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1) rotate(0deg);
            }
        }
    `;
    document.head.appendChild(finalStyle);
    
    document.body.appendChild(finalMsg);
    
    // Create massive confetti
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            createConfetti();
        }, i * 30);
    }
    
    setTimeout(() => {
        finalMsg.style.transition = 'all 0.8s ease';
        finalMsg.style.opacity = '0';
        finalMsg.style.transform = 'translate(-50%, -50%) scale(0.8)';
        
        setTimeout(() => {
            finalMsg.remove();
            finalStyle.remove();
        }, 800);
    }, 5000);
}

}); // End DOMContentLoaded