// Add this to your spawnCelebration function
function spawnCelebration() {
    const p = document.createElement('img');
    const isStar = Math.random() > 0.5;
    
    // Exact matching for your GitHub files
    p.src = isStar ? 'star.png' : 'rose-petal.png'; 
    p.className = 'falling-item';
    
    // These random values make the celebration feel natural
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = '-50px';
    p.style.width = (Math.random() * 20 + 20) + 'px';
    p.style.animationDuration = (Math.random() * 2 + 3) + 's';
    
    document.getElementById('particle-container').appendChild(p);
    setTimeout(() => p.remove(), 5000);
}
