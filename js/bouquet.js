/* ============================================================
   BOUQUET.JS — Animation construction bouquet + typewriter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Apparition bouquet =====
  setTimeout(() => {
    const bouquet = document.getElementById('bouquetSway');
    bouquet.style.opacity = '1';
    bouquet.style.transition = 'opacity 0.5s ease';
  }, 400);

  // ===== Particules autour du bouquet =====
  setTimeout(spawnBouquetParticles, 3000);

  function spawnBouquetParticles() {
    const container = document.getElementById('bouquetParticles');
    const symbols = ['✦','✧','⋆','✸','❋','💫','🌟'];

    setInterval(() => {
      const p = document.createElement('span');
      p.classList.add('sparkle-particle');
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left  = (10 + Math.random() * 80) + '%';
      p.style.top   = (20 + Math.random() * 60) + '%';
      p.style.color = ['#ffd700','#ff85b3','#c084fc','#6ee7b7'][Math.floor(Math.random() * 4)];
      p.style.animationDuration = (2 + Math.random() * 2) + 's';
      p.style.animationDelay    = '0s';
      container.appendChild(p);
      setTimeout(() => p.remove(), 4000);
    }, 400);
  }

  // ===== Typewriter =====
  const fullText = "\n\nJe te souhaite\ntout le bonheur dans ta vie,\net la réussite dans ton avenir.\n\nTu es une fille qui mérite\ntout... et bien plus encore. 💫";
  const typeContainer = document.getElementById('typewriter-container');
  let charIndex = 0;

  function typeNextChar() {
    if (charIndex < fullText.length) {
      const ch = fullText[charIndex];
      if (ch === '\n') {
        typeContainer.innerHTML += '<br/>';
      } else {
        typeContainer.innerHTML += ch;
      }
      charIndex++;
      const delay = ch === ',' || ch === '.' ? 180 : ch === '\n' ? 300 : 55;
      setTimeout(typeNextChar, delay);
    } else {
      setTimeout(() => {
        const cursor = document.getElementById('typewriter-cursor');
        if (cursor) cursor.style.display = 'none';
      }, 2000);
    }
  }

  // Démarrer le typewriter après 3s
  setTimeout(typeNextChar, 3000);
});

// ===== Navigation =====
function goToMap() {
  document.body.classList.add('leaving');
  setTimeout(() => { window.location.href = 'map.html'; }, 800);
}
