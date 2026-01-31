// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

// Easter egg: Click em todos os works na ordem
let workSequence = [];
const workItems = document.querySelectorAll('.work-item');

workItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        workSequence.push(index);
        
        // Visual feedback
        item.classList.add('glitch');
        setTimeout(() => item.classList.remove('glitch'), 300);
        
        // Check if clicked all in order
        if (workSequence.length === workItems.length) {
            const isInOrder = workSequence.every((val, idx) => val === idx);
            
            if (isInOrder) {
                activateWorksEasterEgg();
            }
            
            workSequence = [];
        }
    });
    
    // Hover effect with random rotation
    item.addEventListener('mouseenter', () => {
        const randomRotate = (Math.random() - 0.5) * 4;
        item.style.transform = `translateY(-10px) rotate(${randomRotate}deg)`;
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) rotate(0deg)';
    });
});

function activateWorksEasterEgg() {
    // Create a gallery showcase effect
    workItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
            item.style.transform = 'scale(1.1) rotate(5deg)';
            item.querySelector('.work-image').style.background = 
                `linear-gradient(${index * 60}deg, #FF0000 0%, #0A0A0A 100%)`;
            
            setTimeout(() => {
                item.style.transform = 'scale(1) rotate(0deg)';
                item.querySelector('.work-image').style.background = '#E8E8E8';
            }, 800);
        }, index * 150);
    });
    
    showMessage('🎨 Portfolio Master! All works discovered!');
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
    }, 3000);
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

// Easter egg: Hover over works title multiple times
const worksTitle = document.querySelector('.works-title');
let titleHovers = 0;

worksTitle.addEventListener('mouseenter', () => {
    titleHovers++;
    
    const colors = ['#FF0000', '#0A0A0A', ''];
    const randomColor = colors[titleHovers % 3];
    
    worksTitle.style.color = randomColor;
    worksTitle.style.transform = 'scale(1.02)';
    
    if (titleHovers >= 5) {
        activateTitleEasterEgg();
        titleHovers = 0;
    }
});

worksTitle.addEventListener('mouseleave', () => {
    worksTitle.style.transform = 'scale(1)';
});

function activateTitleEasterEgg() {
    const highlight = document.querySelector('.highlight');
    const words = ['& REBRANDS', '& MAGIC', '& PASSION', '& CREATIVITY', '& REBRANDS'];
    
    let wordIndex = 0;
    const interval = setInterval(() => {
        highlight.textContent = words[wordIndex];
        wordIndex++;
        
        if (wordIndex >= words.length) {
            clearInterval(interval);
        }
    }, 300);
}

// Parallax effect on mouse move
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    workItems.forEach((item, index) => {
        const depth = ((index % 3) + 1) * 8;
        const moveX = (mouseX - 0.5) * depth;
        const moveY = (mouseY - 0.5) * depth;
        
        if (!item.matches(':hover')) {
            item.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});

// Easter egg: Double click on any work image
workItems.forEach((item) => {
    const workImage = item.querySelector('.work-image');
    let imageClickCount = 0;
    let clickTimeout;
    
    workImage.addEventListener('click', (e) => {
        e.stopPropagation();
        imageClickCount++;
        
        clearTimeout(clickTimeout);
        
        if (imageClickCount === 2) {
            activateImageEasterEgg(workImage);
            imageClickCount = 0;
        }
        
        clickTimeout = setTimeout(() => {
            imageClickCount = 0;
        }, 500);
    });
});

function activateImageEasterEgg(image) {
    const originalBg = image.style.background;
    
    // Create colorful animation
    const colors = [
        'linear-gradient(135deg, #FF0000 0%, #FFD700 100%)',
        'linear-gradient(135deg, #00FF00 0%, #00FFFF 100%)',
        'linear-gradient(135deg, #FF00FF 0%, #FF0000 100%)',
        'linear-gradient(135deg, #0000FF 0%, #FF00FF 100%)'
    ];
    
    let colorIndex = 0;
    const colorInterval = setInterval(() => {
        image.style.background = colors[colorIndex % colors.length];
        colorIndex++;
        
        if (colorIndex > 8) {
            clearInterval(colorInterval);
            image.style.background = originalBg;
        }
    }, 200);
    
    // Rotate the image
    image.style.animation = 'spin360 2s ease-in-out';
    
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin360 {
            from { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(180deg) scale(1.1); }
            to { transform: rotate(360deg) scale(1); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    setTimeout(() => {
        image.style.animation = '';
        spinStyle.remove();
    }, 2000);
}

// Easter egg: Press 'W' for works mode
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 'w' && !e.repeat) {
        activateWorksMode();
    }
});

function activateWorksMode() {
    document.body.style.transition = 'all 1s ease';
    
    // Invert colors briefly
    workItems.forEach((item, index) => {
        setTimeout(() => {
            const workImage = item.querySelector('.work-image');
            workImage.style.transition = 'all 0.5s ease';
            workImage.style.filter = 'invert(1)';
            
            setTimeout(() => {
                workImage.style.filter = 'invert(0)';
            }, 1000);
        }, index * 100);
    });
    
    showMessage('🎯 Works mode activated!');
}

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

workItems.forEach(item => observer.observe(item));

}); // End DOMContentLoaded