const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const cloche = document.getElementById('cloche');
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// 1. Runaway "No" Button
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 2. Click Dome to "Break the Spell"
let clocheClicks = 0;
cloche.addEventListener('click', () => {
    clocheClicks++;
    if (clocheClicks >= 3) {
        cloche.classList.add('shatter');
    } else {
        // Shake effect
        cloche.style.transform = 'translate(-50%, -50%) rotate(3deg)';
        setTimeout(() => cloche.style.transform = 'translate(-50%, -50%) rotate(0deg)', 100);
    }
});

// 3. Celebration Flurry (Stars and Petals)
yesBtn.addEventListener('click', () => {
    document.getElementById('question').innerHTML = "I Love You! ❤️";
    setInterval(spawnParticle, 100);
});

function spawnParticle() {
    const p = document.createElement('img');
    const isStar = Math.random() > 0.5;
    
    p.src = isStar ? 'star.jpg' : 'rose-petal.jpg';
    p.className = 'falling-particle';
    
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (Math.random() * 20 + 10) + 'px';
    p.style.animationDuration = (Math.random() * 3 + 2) + 's';
    
    document.getElementById('particle-container').appendChild(p);
    setTimeout(() => p.remove(), 5000);
}

// 4. Window Snow Logic
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let snowflakes = [];

for(let i = 0; i < 60; i++) {
    snowflakes.push({
        x: Math.random() * (window.innerWidth * 0.35), // Confined to left window area
        y: Math.random() * window.innerHeight,
        r: Math.random() * 2 + 1,
        d: Math.random() * 0.5 + 0.5
    });
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    snowflakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
        f.y += f.d;
        if (f.y > canvas.height) f.y = -10;
    });
    ctx.fill();
    requestAnimationFrame(drawSnow);
}
drawSnow();
