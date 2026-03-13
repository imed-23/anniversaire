# 🎂 Site Web Anniversaire — Meriem

> Cadeau d'anniversaire interactif — 5 pages animées

---

## Structure du projet

```
birthday-meriem/
│
├── index.html          ← Page 1 : Landing page (bouton d'entrée)
├── candle.html         ← Page 2 : Blow the candle (countdown 5s)
├── celebrate.html      ← Page 3 : Félicitations + Gâteau 22 ans
├── bouquet.html        ← Page 4 : Bouquet de fleurs animé + messages
├── map.html            ← Page 5 : Carte Strasbourg → Annaba
│
├── css/
│   ├── global.css      ← Reset + polices + utilitaires communs
│   ├── index.css       ← Styles page 1
│   ├── candle.css      ← Styles page 2
│   ├── celebrate.css   ← Styles page 3
│   ├── bouquet.css     ← Styles page 4
│   └── map.css         ← Styles page 5
│
└── js/
    ├── candle.js       ← Countdown + extinction flamme
    ├── bouquet.js      ← Animation construction bouquet
    └── map.js          ← Leaflet + animation avion
```

---

## Page 1 — Landing Page (`index.html`)

### Concept
Première page festive avec décoration dynamique. Le visiteur clique sur un bouton pour commencer.

### Éléments visuels
- **Fond** : dégradé animé en boucle (rose → violet → or rose) via `@keyframes gradient-shift`
- **Confettis CSS** : particules colorées qui tombent en boucle (divs animées)
- **Ballons flottants** : 6 ballons en CSS pur qui remontent depuis le bas
- **Paillettes dorées** : particules `::before`/`::after` qui scintillent
- **Texte central** : `"Pour toi 🌸"` — Dancing Script, couleur or avec text-shadow glow
- **Bouton principal** :
  - Texte : `"✨ Ouvre ton cadeau ✨"`
  - Style : pill shape, fond rose-doré, ombre pulsante animée
  - Hover : zoom + rotation légère
  - Clic : fade-out → `candle.html`

### Technologies
- Google Fonts : Dancing Script, Playfair Display
- CSS `@keyframes` : float, pulse, gradient-shift, confetti-fall
- JavaScript inline : fade-out + redirect

---

## Page 2 — Blow the Candle (`candle.html`)

### Concept
> Ref Image 1 : bougie rose/blanc rayée, flamme jaune-orange, texte "blow the candle" + chiffre

Page épurée fond blanc. Bougie SVG animée avec countdown de 5 secondes.

### Éléments visuels
- **Texte** : `"blow the candle 🕯️"` — police manuscrite en haut
- **Chiffre 22** — grand, bold, manuscrit
- **Bougie CSS/SVG** : corps rose/blanc rayé, flamme SVG qui vacille
- **Animation flamme** : `@keyframes flicker` — oscillation + changement d'opacité
- **Compteur** : `5 → 4 → 3 → 2 → 1` affiché en dessous, change chaque seconde
- **À 0** :
  - Flamme disparaît : `scale(0)` + `opacity:0` + fumée SVG montante
  - Légère vibration de la page
  - Après 1 seconde → redirect `celebrate.html`

### Logique JS (`candle.js`)
```
1. DOMContentLoaded → start countdown (5s)
2. Chaque seconde : décrémenter + update affichage
3. À 0 : addClass("out") sur flamme SVG
4. setTimeout(1500ms) → window.location = "celebrate.html"
```

---

## Page 3 — Félicitations + Gâteau 22 ans (`celebrate.html`)

### Concept
> Ref Image 2 : gâteau fraises avec petits animaux mignons + confettis colorés

Page de célébration explosive avec gâteau élégant et fleurs.

### Éléments visuels
- **Explosion confettis** au chargement (canvas-confetti CDN burst)
- **Texte fade-in-up** :
  ```
  🎂 Joyeux Anniversaire Meriem ! 🎂
  22 ans de bonheur, de force et de lumière ✨
  ```
- **Gâteau 22 ans** (CSS/SVG) :
  - 2 étages : couleurs crème et rose poudré
  - Touches dorées, fraises décoratives SVG
  - Glaçage qui dégouline (animation CSS lente)
  - 2 grandes bougies avec "22" dessus
  - Étoiles dorées scintillantes autour
- **Fleurs latérales** (SVG) :
  - 3 fleurs à gauche / 3 fleurs à droite du gâteau
  - Balancement doux `@keyframes sway`
  - Couleurs : rose, rouge, lavande
- **Bouton bas** :
  - Texte : `"🎁 Appuie ici pour ton cadeau"`
  - Clic → `bouquet.html`

---

## Page 4 — Bouquet de Fleurs (`bouquet.html`)

### Layout (3 colonnes flex)

```
┌────────────────┬──────────────────┬────────────────┐
│  Texte gauche  │  Bouquet central │  Texte droite  │
│  (EN/ES)       │  (SVG animé)     │  (FR)          │
└────────────────┴──────────────────┴────────────────┘
                   [ Bouton bas ]
```

### Colonne gauche — Message Anglais
```
"she loves flowers
but she doesn't know
she is one 🌸
— and the most beautiful of all 🌺✨"
```
- Police italique, couleur aubergine/rose foncé
- Fade-in-left avec délai 1.5s

### Colonne centrale — Bouquet SVG Animé
Construction progressive en 4 phases :
1. Les tiges montent (hauteur 0 → 100%, durée 2s)
2. Les feuilles apparaissent (scale 0 → 1, délai 1.5s)
3. Les fleurs s'ouvrent pétale par pétale (`@keyframes bloom`, délai 2s)
4. Scintillement continu en boucle (particules dorées autour)

**12 fleurs** : roses, tulipes, fleurs blanches, lavande
**Couleurs** : rose, rouge, blanc, orange, lavande, vert

### Colonne droite — Message Français
```
"Joyeux Anniversaire Meriem 🌹

Je te souhaite tout le bonheur
dans ta vie, et la réussite
dans ton avenir.

Tu es une fille qui mérite
tout... et bien plus encore. 💫"
```
- Dancing Script, grande taille, rose chaud
- Effet typewriter lettre par lettre

### Bouton bas
- Texte : `"🗺️ Clique sur moi"`
- Style voyage : bleu nuit avec étoiles brillantes
- Clic → `map.html`

---

## Page 5 — Carte Strasbourg → Annaba (`map.html`)

### Concept
> Ref Image 3 : carte montrant 3391 km entre l'Europe et l'Algérie, ligne rouge de trajet

### Outils
- **Leaflet.js** (CDN) — carte interactive open-source
- **Tiles** : CartoDB Positron (fond clair et élégant)
- **Leaflet.Ant.Path** (CDN) — animation du trajet

### Coordonnées
| Ville | Latitude | Longitude |
|---|---|---|
| Strasbourg | 48.5734 | 7.7521 |
| Annaba | 36.9000 | 7.7667 |

### Éléments cartographiques
- **Carte centrée** sur le milieu France-Algérie (zoom pour voir les 2 villes)
- **Marqueur Strasbourg** : icône personnalisée ✈️ / drapeau FR
- **Marqueur Annaba** : icône personnalisée 🌸 / drapeau DZ
- **Tracé animé** : ligne rouge, style tirets qui avancent (Ant.Path)
- **Animation avion** :
  - Icône SVG ✈️ suit le tracé de Strasbourg à Annaba
  - Interpolation smooth des coordonnées via `setInterval` (60fps)
  - L'avion pivote dans la bonne direction
- **Badge distance** : `✈️ 3 391 km` — bulle élégante centrée au-dessus de la carte

### Messages affichés
**Gauche de la carte :**
```
"Distance means nothing
when you mean everything."
```
**Droite de la carte :**
```
"We've already done the hardest part —
which was finding each other
among millions of people.
Now let's do the easiest thing:
to never lose each other. 🌍💫"
```
- Animation `fade-in-left` / `fade-in-right` au chargement

---

## Technologies utilisées

| Tech | Rôle |
|---|---|
| HTML5 / CSS3 | Structure + toutes les animations |
| JavaScript (vanilla) | Logique, compteur, avion, redirections |
| SVG inline | Bougie, flamme, fleurs, gâteau |
| `canvas-confetti` (CDN) | Confettis pages 1 et 3 |
| `Leaflet.js` (CDN) | Carte interactive page 5 |
| `Leaflet.Ant.Path` (CDN) | Animation tracé avion |
| Google Fonts | Dancing Script + Playfair Display |
| `@keyframes` CSS | Float, flicker, bloom, sway, pulse... |

---

## Ordre de développement

1. `css/global.css` — base commune
2. `index.html` — landing page
3. `candle.html` + `js/candle.js` — countdown + flamme
4. `celebrate.html` — gâteau + fleurs + confettis
5. `bouquet.html` — bouquet animé + messages
6. `map.html` + `js/map.js` — carte + avion animé

---

## Démarrage

Ouvrir `index.html` directement dans un navigateur (Chrome recommandé).
Aucune installation requise — tout fonctionne via CDN.
