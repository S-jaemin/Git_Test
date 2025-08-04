const rainContainer = document.querySelector('.weather-rain');
for (let i = 0; i < 30; i++) {
    const drop = document.createElement('div');
    drop.className = 'raindrop';
    drop.style.left = Math.random() * 100 + 'vw';
    drop.style.animationDelay = Math.random() * 2 + 's';
    drop.style.animationDuration = 0.5 + Math.random() * 1 + 's';
    rainContainer.appendChild(drop);
}