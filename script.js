const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const cloche = document.getElementById('cloche');
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// 1. Updated Particle Spawner (using .png)
yesBtn.addEventListener('click', () => {
    document.getElementById('question').innerHTML = "I Love You! ❤️";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    setInterval(spawnParticle, 120);
});

function spawnParticle() {
    const p = document.createElement('img');
    const isStar = Math.random() > 0.4;
    
    // Updated extensions to .png
    p.src = isStar ? 'star.png' : 'rose-pedal.png';
    p.className = 'falling-particle';
    
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (Math.random() * 25 + 15) + 'px';
    p.style.animationDuration = (Math.random() * 3 + 3) + 's';
    p.style.opacity = Math.random() * 0.4 + 0.6;
    
    document.getElementById('particle-container').appendChild(p);
    setTimeout(() => p.remove(), 6000);
}

// 2. Dome Interaction
let clicks = 0;
cloche.addEventListener('click', () => {
    clicks++;
    if (clicks >= 3) {
        cloche.classList.add('shatter');
    } else {
        cloche.style.transform = 'translate(-50%, -50%) scale(1.05) rotate(2deg)';
        setTimeout(() => cloche.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)', 150);
    }
});

// 3. No Button Escape
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 4. Window Snow (Refined Area)
function setupSnow() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', setupSnow);
setupSnow();

let snowflakes = Array.from({ length: 40 }, () => ({
    x: Math.random() * (window.innerWidth * 0.3), // Stays in window area
    y: Math.random() * window.innerHeight,
    r: Math.random() * 2 + 1,
    s: Math.random() * 1 + 0.5
}));

function animateSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    snowflakes.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.y += s.s;
        if (s.y > canvas.height) s.y = -10;
    });
    requestAnimationFrame(animateSnow);
}
animateSnow();
