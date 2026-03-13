/* ============================================================
   CANDLE.JS — Countdown + extinction flamme
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const TOTAL = 5;
  let current = TOTAL;

  const countDisplay = document.getElementById('countDisplay');
  const flameGroup   = document.getElementById('flameGroup');
  const smokeGroup   = document.getElementById('smokeGroup');
  const blownOverlay = document.getElementById('blownOverlay');
  const timerRing    = document.getElementById('timerRing');
  const circumference = 2 * Math.PI * 51;

  timerRing.style.strokeDasharray  = circumference;
  timerRing.style.strokeDashoffset = '0';

  function updateRing(remaining) {
    const progress = remaining / TOTAL;
    timerRing.style.strokeDashoffset = circumference * (1 - progress);
  }

  function tick() {
    if (current <= 0) return;

    countDisplay.classList.add('pop');
    setTimeout(() => countDisplay.classList.remove('pop'), 200);

    current--;
    countDisplay.textContent = current === 0 ? '🎉' : current;
    updateRing(current);

    if (current === 0) {
      setTimeout(blowCandle, 300);
    } else {
      setTimeout(tick, 1000);
    }
  }

  function blowCandle() {
    // Éteindre la flamme
    flameGroup.classList.add('out');
    smokeGroup.classList.add('visible');

    // Vibration
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);

    // Particules
    spawnParticles();

    // Afficher overlay
    setTimeout(() => {
      blownOverlay.classList.add('show');
    }, 800);

    // Redirection
    setTimeout(() => {
      window.location.href = 'celebrate.html';
    }, 2800);
  }

  function spawnParticles() {
    const svgRect = document.getElementById('candleSVG').getBoundingClientRect();
    const cx = svgRect.left + svgRect.width / 2;
    const cy = svgRect.top + 40;
    const colors = ['#ffd700','#ff85b3','#a78bfa','#6ee7b7','#f97316'];

    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const angle = (Math.random() * 360) * (Math.PI / 180);
      const dist  = 80 + Math.random() * 100;
      p.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      p.style.setProperty('--ty', Math.sin(angle) * dist + 'px');
      p.style.width = p.style.height = (5 + Math.random() * 8) + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      p.style.left = cx + 'px';
      p.style.top  = cy + 'px';
      p.style.animationDuration = (0.8 + Math.random() * 1) + 's';
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 2000);
    }
  }

  // Démarrer après 1 seconde
  setTimeout(tick, 1000);
});
