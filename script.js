const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const cloche = document.getElementById('cloche');

// 1. "No" Button Runaway Logic
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 2. Glass Interaction
let clicks = 0;
cloche.addEventListener('click', () => {
    clicks++;
    if (clicks >= 3) {
        cloche.classList.add('shatter');
        setTimeout(() => cloche.style.display = 'none', 500);
    } else {
        cloche.style.transform = 'translate(-50%, -50%) rotate(5deg)';
        setTimeout(() => cloche.style.transform = 'translate(-50%, -50%) rotate(0deg)', 100);
    }
});

// 3. Falling Petals (Yes Click)
yesBtn.addEventListener('click', () => {
    document.getElementById('question').innerText = "I love you! ❤️";
    setInterval(createPetal, 100);
});

function createPetal() {
    const p = document.createElement('img');
    p.src = 'rose-petal.png'; // Using your uploaded filename
    p.className = 'falling-petal';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = (Math.random() * 20 + 10) + 'px';
    p.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.getElementById('particle-container').appendChild(p);
    
    setTimeout(() => p.remove(), 5000);
}

// 4. Window Snow (Canvas)
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let snowflakes = [];
function createSnow() {
    for(let i = 0; i < 50; i++) {
        snowflakes.push({
            x: Math.random() * (window.innerWidth * 0.3), // Only left 30% (Window)
            y: Math.random() * window.innerHeight,
            r: Math.random() * 3 + 1,
            d: Math.random() * 1
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    for(let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    for(let i = 0; i < snowflakes.length; i++) {
        let f = snowflakes[i];
        f.y += Math.pow(f.d, 2) + 1;
        if(f.y > canvas.height) snowflakes[i] = {x: Math.random() * (canvas.width * 0.3), y: 0, r: f.r, d: f.d};
    }
}
createSnow();
setInterval(drawSnow, 30);
