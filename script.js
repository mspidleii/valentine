const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const cloche = document.getElementById('cloche');

// 1. Runaway No Button
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// 2. Shatter Cloche (3 clicks)
let clicks = 0;
cloche.addEventListener('click', () => {
    clicks++;
    if (clicks >= 3) {
        cloche.classList.add('shatter');
    } else {
        cloche.style.transform = 'translate(-50%, -50%) scale(1.1) rotate(3deg)';
        setTimeout(() => cloche.style.transform = 'translate(-50%, -50%) scale(1) rotate(0deg)', 100);
    }
});

// 3. Celebration (Petals and Stars)
yesBtn.addEventListener('click', () => {
    document.getElementById('question').innerText = "I Love You! ❤️";
    yesBtn.style.display = "none";
    noBtn.style.display = "none";
    setInterval(spawnCelebration, 150);
});

function spawnCelebration() {
    const p = document.createElement('img');
    const isStar = Math.random() > 0.5;
    
    // Exact filenames from your GitHub
    p.src = isStar ? 'star.png' : 'rose-petal.png'; 
    p.className = 'falling-item';
    
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-50px';
    p.style.width = (Math.random() * 20 + 15) + 'px';
    p.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    document.getElementById('particle-container').appendChild(p);
    setTimeout(() => p.remove(), 5000);
}
