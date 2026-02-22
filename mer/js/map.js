/* ============================================================
   MAP.JS — Leaflet + animation avion Strasbourg → Annaba
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ===== Étoiles nuit =====
  const nightStars = document.getElementById('nightStars');
  for (let i = 0; i < 80; i++) {
    const s = document.createElement('div');
    s.classList.add('nstar');
    const size = 1 + Math.random() * 3;
    s.style.width  = size + 'px';
    s.style.height = size + 'px';
    s.style.left   = (Math.random() * 100) + 'vw';
    s.style.top    = (Math.random() * 100) + 'vh';
    s.style.animationDuration = (2 + Math.random() * 4) + 's';
    s.style.animationDelay    = (-Math.random() * 6) + 's';
    nightStars.appendChild(s);
  }

  // ===== Initialisation carte =====
  const map = L.map('map', {
    center: [43.5, 7.76],
    zoom: 5,
    zoomControl: true,
    attributionControl: false
  });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '© CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  // ===== Coordonnées =====
  const STRASBOURG = [48.5734, 7.7521];
  const ANNABA     = [36.9000, 7.7667];

  // Points du trajet (arc courbe)
  const routePoints = [
    [48.5734, 7.7521],
    [47.2, 7.0],
    [45.7, 5.5],
    [43.8, 5.2],
    [42.5, 4.5],
    [40.0, 4.0],
    [38.5, 4.8],
    [37.8, 6.0],
    [37.2, 6.8],
    [36.9000, 7.7667]
  ];

  // ===== Route animée Ant Path =====
  L.polyline.antPath(routePoints, {
    delay: 1500,
    dashArray: [10, 20],
    weight: 3,
    color: '#e11d48',
    pulseColor: '#ff85b3',
    paused: false,
    reverse: false,
    hardwareAccelerated: true
  }).addTo(map);

  // ===== Marqueur Strasbourg =====
  const strasIcon = L.divIcon({
    html: `<div style="
      background:linear-gradient(135deg,#1e3a5f,#3b82f6);
      color:#fff; border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      border:3px solid #fff;
      box-shadow:0 4px 15px rgba(0,0,0,0.3);
    "><span style="transform:rotate(45deg);font-size:16px">🇫🇷</span></div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  });

  L.marker(STRASBOURG, { icon: strasIcon })
    .addTo(map)
    .bindPopup(`<div style="text-align:center">
      <strong style="font-size:1.1rem">✈️ Strasbourg</strong><br/>
      <span style="color:#666;font-size:0.9rem">France 🇫🇷</span>
    </div>`);

  // Label Strasbourg
  L.marker(STRASBOURG, {
    icon: L.divIcon({
      className: 'city-label',
      html: '<div style="margin-left:20px;margin-top:-10px;font-family:Dancing Script,cursive;font-size:13px;color:#1e3a5f;font-weight:700;text-shadow:1px 1px 3px #fff">Strasbourg</div>',
      iconSize: [120,30], iconAnchor: [0,0]
    })
  }).addTo(map);

  // ===== Marqueur Annaba =====
  const annabaIcon = L.divIcon({
    html: `<div style="
      background:linear-gradient(135deg,#059669,#10b981);
      color:#fff; border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      border:3px solid #fff;
      box-shadow:0 4px 15px rgba(0,0,0,0.3);
    "><span style="transform:rotate(45deg);font-size:16px">🇩🇿</span></div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 36]
  });

  L.marker(ANNABA, { icon: annabaIcon })
    .addTo(map)
    .bindPopup(`<div style="text-align:center">
      <strong style="font-size:1.1rem">🌸 Annaba</strong><br/>
      <span style="color:#666;font-size:0.9rem">Algérie 🇩🇿</span>
    </div>`);

  // Label Annaba
  L.marker(ANNABA, {
    icon: L.divIcon({
      className: 'city-label',
      html: '<div style="margin-left:20px;margin-top:-10px;font-family:Dancing Script,cursive;font-size:13px;color:#1e3a5f;font-weight:700;text-shadow:1px 1px 3px #fff">Annaba</div>',
      iconSize: [100,30], iconAnchor: [0,0]
    })
  }).addTo(map);

  // ===== Avion animé =====
  const planeIcon = L.divIcon({
    html: `<div style="font-size:26px;transform:rotate(0deg);filter:drop-shadow(0 2px 4px rgba(0,0,0,0.4));transition:transform 0.3ase">✈️</div>`,
    className: 'plane-icon-wrapper',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  const planeMarker = L.marker(STRASBOURG, { icon: planeIcon, zIndexOffset: 1000 }).addTo(map);

  let step = 0;
  const TOTAL_STEPS = 500;
  const SEGMENT_COUNT = routePoints.length - 1;

  function getPositionAlongRoute(t) {
    const totalT    = t * SEGMENT_COUNT;
    const segIndex  = Math.min(Math.floor(totalT), SEGMENT_COUNT - 1);
    const segT      = totalT - segIndex;
    const p1 = routePoints[segIndex];
    const p2 = routePoints[Math.min(segIndex + 1, SEGMENT_COUNT)];
    return [
      p1[0] + (p2[0] - p1[0]) * segT,
      p1[1] + (p2[1] - p1[1]) * segT
    ];
  }

  function getHeading(t) {
    const dt = 0.002;
    const p1 = getPositionAlongRoute(Math.max(0, t - dt));
    const p2 = getPositionAlongRoute(Math.min(1, t + dt));
    return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
  }

  // Lancer animation après 1.5s
  setTimeout(() => {
    const interval = setInterval(() => {
      const t = step / TOTAL_STEPS;
      if (t >= 1) {
        clearInterval(interval);
        planeMarker.setLatLng(ANNABA);
        setTimeout(() => {
          map.openPopup(
            L.popup({ offset: [0,-30] })
              .setLatLng(ANNABA)
              .setContent(`<div style="text-align:center;font-family:Dancing Script,cursive">
                <div style="font-size:1.5rem">🌸</div>
                <strong>Annaba</strong><br/>
                <span style="color:#e11d48;font-size:0.9rem">3 391 km parcourus ✈️</span>
              </div>`)
          );
        }, 500);
        return;
      }

      const pos     = getPositionAlongRoute(t);
      const heading = getHeading(t);
      planeMarker.setLatLng(pos);

      const planeEl = planeMarker.getElement();
      if (planeEl) {
        const inner = planeEl.querySelector('div');
        if (inner) inner.style.transform = `rotate(${heading + 45}deg)`;
      }

      step++;
    }, 20);
  }, 1500);
});
