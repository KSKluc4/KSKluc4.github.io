import { CONFIG } from '../config.js';

const stage = document.getElementById('stage');
const modes = [...document.querySelectorAll('.mode')];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

/* ---------- Configuração ---------- */

if (CONFIG.about) document.querySelector('[data-config="about"]').textContent = CONFIG.about;

if (CONFIG.linkedin) {
  const item = document.querySelector('[data-config="linkedin"]');
  item.querySelector('a').href = CONFIG.linkedin;
  item.hidden = false;
}

/* ---------- Sprite do fliperama ---------- */

// Cada string é uma linha de pixels: X = corpo, o = olho, . = vazio.
const HERO_BODY = [
  '.....XX.....',
  '...XXXXXX...',
  '..XXXXXXXX..',
  '..XoXXXXoX..',
  '..XXXXXXXX..',
  '...XXXXXX...',
  '.XXXXXXXXXX.',
  '.X.XXXXXX.X.',
  '...XXXXXX...',
];
const HERO_LEGS = [
  ['..XX....XX..', '.XX......XX.'],
  ['...XX..XX...', '....XXXX....'],
];

function pixels(rows, char, yOffset = 0) {
  let d = '';
  rows.forEach((row, y) => {
    [...row].forEach((c, x) => {
      if (c === char) d += `M${x} ${y + yOffset}h1v1h-1z`;
    });
  });
  return d;
}

const hero = document.querySelector('[data-sprite="hero"]');
hero.innerHTML = `
  <svg viewBox="0 0 12 11" shape-rendering="crispEdges">
    <path class="hero__body" d="${pixels(HERO_BODY, 'X')}"/>
    <path class="hero__eye" d="${pixels(HERO_BODY, 'o')}"/>
    ${HERO_LEGS.map((legs, i) =>
      `<path class="hero__legs hero__legs--${i}" d="${pixels(legs, 'X', HERO_BODY.length)}"/>`
    ).join('')}
  </svg>`;

/* ---------- Seleção (mouse, foco e teclado) ---------- */

const metroMap = document.querySelector('.map__svg');
const score = document.querySelector('[data-score]');
let scoreValue = 0;
let scoreTimer = null;

metroMap.pauseAnimations();

function setActive(name) {
  if (stage.dataset.active === name) return;
  if (name) stage.dataset.active = name;
  else delete stage.dataset.active;

  // Metrô: o trem só anda enquanto o lado está ativo.
  if (name === 'metro' && !reduceMotion.matches) metroMap.unpauseAnimations();
  else metroMap.pauseAnimations();

  // Fliperama: o placar sobe enquanto o lado está ativo.
  clearInterval(scoreTimer);
  if (name === 'arcade') {
    scoreTimer = setInterval(() => {
      scoreValue = (scoreValue + 10) % 10000;
      score.textContent = String(scoreValue).padStart(4, '0');
    }, 120);
  }
}

modes.forEach((mode) => {
  mode.addEventListener('pointerenter', () => setActive(mode.dataset.mode));
  mode.addEventListener('pointerleave', () => {
    if (!mode.contains(document.activeElement)) setActive(null);
  });
  mode.addEventListener('focus', () => setActive(mode.dataset.mode));
  mode.addEventListener('blur', () => setActive(null));
});

const KEYS = { ArrowLeft: 0, ArrowUp: 0, ArrowRight: 1, ArrowDown: 1 };

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (!(event.key in KEYS)) return;
  event.preventDefault();
  // Enter no link focado já abre o modo escolhido.
  modes[KEYS[event.key]].focus();
});
