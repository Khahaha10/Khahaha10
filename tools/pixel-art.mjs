import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');

const SKY = ['#5BB8F5', '#74C4F8', '#8FD3FF', '#A9DEFF', '#C4E9FF', '#DDF3FF'];
const WHITE = '#FFFFFF';
const SHADE = '#D3EBFB';
const MIST = '#EAF6FF';
const INK = '#14365C';
const INK_SHADOW = '#1E4F80';
const BORDER = '#8FD3FF';
const PLATE_SHADOW = '#BFE6FF';
const SUN = '#FFE27A';
const SUN_CORE = '#FFF4C2';

const FONT = {
  A: '.###.|#...#|#...#|#####|#...#|#...#|#...#',
  B: '####.|#...#|#...#|####.|#...#|#...#|####.',
  C: '.###.|#...#|#....|#....|#....|#...#|.###.',
  D: '####.|#...#|#...#|#...#|#...#|#...#|####.',
  E: '#####|#....|#....|####.|#....|#....|#####',
  F: '#####|#....|#....|####.|#....|#....|#....',
  G: '.###.|#...#|#....|#.###|#...#|#...#|.####',
  H: '#...#|#...#|#...#|#####|#...#|#...#|#...#',
  I: '.###.|..#..|..#..|..#..|..#..|..#..|.###.',
  J: '..###|...#.|...#.|...#.|#..#.|#..#.|.##..',
  K: '#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#',
  L: '#....|#....|#....|#....|#....|#....|#####',
  M: '#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#',
  N: '#...#|#...#|##..#|#.#.#|#..##|#...#|#...#',
  O: '.###.|#...#|#...#|#...#|#...#|#...#|.###.',
  P: '####.|#...#|#...#|####.|#....|#....|#....',
  Q: '.###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#',
  R: '####.|#...#|#...#|####.|#.#..|#..#.|#...#',
  S: '.####|#....|#....|.###.|....#|....#|####.',
  T: '#####|..#..|..#..|..#..|..#..|..#..|..#..',
  U: '#...#|#...#|#...#|#...#|#...#|#...#|.###.',
  V: '#...#|#...#|#...#|#...#|#...#|.#.#.|..#..',
  W: '#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.',
  X: '#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#',
  Y: '#...#|#...#|.#.#.|..#..|..#..|..#..|..#..',
  Z: '#####|....#|...#.|..#..|.#...|#....|#####',
  0: '.###.|#...#|#..##|#.#.#|##..#|#...#|.###.',
  1: '..#..|.##..|..#..|..#..|..#..|..#..|.###.',
  2: '.###.|#...#|....#|...#.|..#..|.#...|#####',
  3: '####.|....#|....#|.###.|....#|....#|####.',
  4: '...#.|..##.|.#.#.|#..#.|#####|...#.|...#.',
  5: '#####|#....|####.|....#|....#|#...#|.###.',
  6: '.###.|#....|#....|####.|#...#|#...#|.###.',
  7: '#####|....#|...#.|..#..|.#...|.#...|.#...',
  8: '.###.|#...#|#...#|.###.|#...#|#...#|.###.',
  9: '.###.|#...#|#...#|.####|....#|....#|.###.',
  ' ': '.....|.....|.....|.....|.....|.....|.....',
  '.': '.....|.....|.....|.....|.....|.##..|.##..',
  '-': '.....|.....|.....|.###.|.....|.....|.....',
  '+': '.....|..#..|..#..|#####|..#..|..#..|.....',
  '@': '.###.|#...#|#.###|#.#.#|#.###|#....|.###.',
  '&': '.##..|#..#.|#.#..|.#...|#.#.#|#..#.|.##.#',
  '!': '..#..|..#..|..#..|..#..|..#..|.....|..#..',
  '/': '....#|....#|...#.|..#..|.#...|#....|#....',
  ':': '.....|.##..|.##..|.....|.##..|.##..|.....',
  "'": '..#..|..#..|.#...|.....|.....|.....|.....',
  ',': '.....|.....|.....|.....|.##..|..#..|.#...',
  '?': '.###.|#...#|....#|...#.|..#..|.....|..#..',
};

const ICONS = {
  mail: ['kkkkkkkkkk', 'kwkwwwwkwk', 'kwwkwwkwwk', 'kwwwkkwwwk', 'kwwwwwwwwk', 'kwwwwwwwwk', 'kkkkkkkkkk'],
  linkedin: ['bbbbbbbbbb', 'bwwbbbbbbb', 'bbbbbbbbbb', 'bwwbwwwwbb', 'bwwbwwbwwb', 'bwwbwwbwwb', 'bwwbwwbwwb', 'bbbbbbbbbb'],
  instagram: ['.pppppppp.', 'p......p.p', 'p..pppp..p', 'p.p....p.p', 'p.p....p.p', 'p.p....p.p', 'p.p....p.p', 'p..pppp..p', 'p........p', '.pppppppp.'],
  twitter: ['........bb.', 'b.....bbbbb', 'bb...bbbbb.', 'bbbbbbbbbb.', '.bbbbbbbbb.', '..bbbbbbb..', '...bbbbb...', 'bbbbbb.....'],
  globe: ['...bbbb...', '.bbwbbwbb.', '.bwbbbbwb.', 'bbbbbbbbbb', 'bwbbbbbbwb', 'bbbbbbbbbb', '.bwbbbbwb.', '.bbwbbwbb.', '...bbbb...'],
  controller: ['.kkkkkkkkkk.', 'kbbbbbbbbbbk', 'kbwbbbbbbrbk', 'kwwwbbbbrbrk', 'kbwbbbbbbrbk', 'kbbbbkkbbbbk', 'kbbbk..kbbbk', '.kkk....kkk.'],
  headphones: ['...kkkkkk...', '..k......k..', '.k........k.', 'k..........k', 'k..........k', 'kbbk....kbbk', 'kbbk....kbbk', 'kbbk....kbbk', '.kk......kk.'],
  sneaker: ['....kkk.....', '...kwwwk....', '...kwbwkkk..', '..kwwwwwwwk.', '.kbbbbbwwwwk', 'kbbbbbbbbbbk', 'kwwwwwwwwwwk', '.kkkkkkkkkk.'],
  tv: ['...k....k...', '....k..k....', '.kkkkkkkkkk.', 'kbbbbbbbbbbk', 'kbwwbbbbwwbk', 'kbbbbbbbbbbk', 'kbbbbwwbbbbk', 'kbbbbbbbbbbk', '.kkkkkkkkkk.', '..k......k..'],
};

const ICON_COLORS = { k: '#14365C', b: '#5BB8F5', w: '#FFFFFF', p: '#E1306C', r: '#FF6B8B' };

const CLOUDS = {
  a: [
    '.....###........',
    '...#######..##..',
    '..#########.###.',
    '.##############.',
    '################',
    '################',
    '.ssssssssssssss.',
  ],
  b: ['...###....', '.######.#.', '##########', '##########', '.ssssssss.'],
  c: [
    '........####..........',
    '...####.######........',
    '..############..###...',
    '.####################.',
    '######################',
    '######################',
    '.ssssssssssssssssssss.',
  ],
};

const FLAG_A = ['pcccccc.', 'pccccccc', 'pcccccc.', 'p.......', 'p.......', 'p.......', 'p.......', 'p.......', 'p.......', 'ppp.....'];
const FLAG_B = ['pccccccc', 'pcccccc.', 'pccccccc', 'p.......', 'p.......', 'p.......', 'p.......', 'p.......', 'p.......', 'ppp.....'];
const HERO = ['..hhh..', '.hhhhh.', '..sss..', '..sss..', '.bbbbb.', 'b.bbb.b', '..bbb..', '..b.b..', '.kk.kk.'];
const ARROW = ['#....', '##...', '###..', '####.', '#####', '####.', '###..', '##...', '#....'];
const DONE = '#2F8FD8';
const CURRENT = '#FFC94A';
const SKIN = '#F2C9A0';
const MUTED = '#3F6489';
const BIRD_UP = ['#...#', '.#.#.', '..#..'];
const BIRD_FLAT = ['.....', '##.##', '..#..'];
const SPARKLE = ['.#.', '###', '.#.'];

function runs(rows, x, y, p, mark = '#') {
  let d = '';
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      if (row[c] !== mark) {
        c++;
        continue;
      }
      let e = c;
      while (e < row.length && row[e] === mark) e++;
      d += `M${x + c * p} ${y + r * p}h${(e - c) * p}v${p}h${-(e - c) * p}z`;
      c = e;
    }
  });
  return d;
}

function glyphs(text) {
  const rows = Array.from({ length: 7 }, () => '');
  [...text].forEach((ch, i) => {
    const glyph = FONT[ch];
    if (!glyph) throw new Error(`No pixel glyph for "${ch}" in "${text}"`);
    glyph.split('|').forEach((line, r) => {
      rows[r] += (i ? '.' : '') + line;
    });
  });
  return rows;
}

const textWidth = (text, p) => (text.length * 6 - 1) * p;
const textPath = (text, x, y, p, fill) => `<path fill="${fill}" d="${runs(glyphs(text), x, y, p)}"/>`;

const sprite = (rows, x, y, p, colors) =>
  Object.entries(colors)
    .map(([mark, fill]) => `<path fill="${fill}" d="${runs(rows, x, y, p, mark)}"/>`)
    .join('');

const cloud = (shape, x, y, p, colors = { '#': WHITE, s: SHADE }) => sprite(CLOUDS[shape], x, y, p, colors);

function svg({ w, h, label, css = '', defs = '', body, scale = 1 }) {
  const reduced = '@media (prefers-reduced-motion: reduce){*{animation:none!important}.line0{opacity:1}.cover{display:none}}';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${Math.round(w * scale)}" height="${Math.round(h * scale)}" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" role="img" aria-label="${label}"><title>${label}</title><style>${css}${reduced}</style>${defs ? `<defs>${defs}</defs>` : ''}${body}</svg>\n`;
}

function sky(w, colors, band) {
  let defs = '';
  let body = colors.map((fill, i) => `<rect y="${i * band}" width="${w}" height="${band}" fill="${fill}"/>`).join('');
  colors.slice(1).forEach((fill, i) => {
    const y = (i + 1) * band;
    defs += `<pattern id="dh${i}" width="16" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${fill}"/></pattern>`;
    defs += `<pattern id="dl${i}" width="32" height="8" patternUnits="userSpaceOnUse"><rect x="16" width="8" height="8" fill="${fill}"/></pattern>`;
    body += `<rect y="${y - 8}" width="${w}" height="8" fill="url(#dh${i})"/><rect y="${y - 16}" width="${w}" height="8" fill="url(#dl${i})"/>`;
  });
  return { defs, body };
}

const driftCss = (w) => `@keyframes drift{from{transform:translateX(0)}to{transform:translateX(-${w}px)}}`;

function driftLayer(w, items, seconds, p) {
  const one = items.map(([shape, x, y]) => cloud(shape, x, y, p)).join('');
  const copies = [-w, 0, w].map((dx) => `<g transform="translate(${dx} 0)">${one}</g>`).join('');
  return `<g style="animation:drift ${seconds}s steps(${w / 4}) infinite">${copies}</g>`;
}

function floor(w, h, p, base, waves, fill) {
  const n = w / p;
  let d = '';
  for (let c = 0; c < n; c++) {
    const wave = waves.reduce((sum, [amp, k, phase]) => sum + amp * Math.sin((2 * Math.PI * c * k) / n + phase), 0);
    const units = Math.max(1, base + Math.round(wave));
    d += `M${c * p} ${h - units * p}h${p}v${units * p}h-${p}z`;
  }
  return `<path fill="${fill}" d="${d}"/>`;
}

const flyCss = (w) =>
  `@keyframes fly{from{transform:translate(-40px,0)}to{transform:translate(${w + 40}px,-24px)}}@keyframes flap{50%{opacity:0}}.f1{animation:flap .6s steps(1) infinite}.f2{animation:flap .6s steps(1) -.3s infinite}`;

function bird(w, y, seconds, delay) {
  const frames = `<g class="f1">${sprite(BIRD_UP, 0, 0, 4, { '#': INK })}</g><g class="f2">${sprite(BIRD_FLAT, 0, 0, 4, { '#': INK })}</g>`;
  return `<g transform="translate(0 ${y})"><g style="animation:fly ${seconds}s steps(${w / 4}) ${delay}s infinite">${frames}</g></g>`;
}

const twinkleCss = '@keyframes tw{50%{opacity:.15}}';
const sparkles = (points, fill = WHITE) =>
  points
    .map(([x, y], i) => `<g style="animation:tw 2.4s steps(1) ${-(i * 0.7).toFixed(1)}s infinite">${sprite(SPARKLE, x, y, 4, { '#': fill })}</g>`)
    .join('');

function disc(r) {
  const rows = [];
  for (let j = 0; j < 2 * r; j++) {
    let row = '';
    for (let i = 0; i < 2 * r; i++) {
      const dx = i - r + 0.5;
      const dy = j - r + 0.5;
      const inside = dx * dx + dy * dy <= r * r;
      const core = (dx + 1.5) ** 2 + (dy + 1.5) ** 2 <= (r * 0.45) ** 2;
      row += inside ? (core ? 'o' : '#') : '.';
    }
    rows.push(row);
  }
  return rows;
}

function sun(cx, cy, r, p) {
  const R = r * p;
  const body = sprite(disc(r), cx - R, cy - R, p, { '#': SUN, o: SUN_CORE });
  const straight = [
    [cx - 4, cy - R - 24, 8, 16],
    [cx - 4, cy + R + 8, 8, 16],
    [cx - R - 24, cy - 4, 16, 8],
    [cx + R + 8, cy - 4, 16, 8],
  ];
  const d = Math.round((R * 0.72 + 8) / 8) * 8;
  const diagonal = [-1, 1].flatMap((sx) =>
    [-1, 1].flatMap((sy) => [0, 8].map((o) => [cx + sx * (d + o) - 4, cy + sy * (d + o) - 4, 8, 8])),
  );
  const rays = (list) => list.map(([x, y, rw, rh]) => `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" fill="${SUN}"/>`).join('');
  return `<g class="ray-a">${rays(straight)}</g><g class="ray-b">${rays(diagonal)}</g>${body}`;
}

function banner() {
  const w = 1280;
  const h = 384;
  const band = 64;
  const { defs, body: skyBody } = sky(w, SKY, band);
  const title = 'KHALIF ADIKARA';
  const tp = 8;
  const tx = Math.round((w - textWidth(title, tp)) / 2 / 8) * 8;
  const ty = 104;
  const lines = ['FULL-STACK WEB DEVELOPER', 'OPEN FOR FREELANCE WEB PROJECTS', 'ODOO DEVELOPER @ INFINYS SYSTEM INDONESIA'];
  const slot = 4;
  const period = lines.length * slot;
  const visiblePct = 100 / lines.length;
  let css =
    driftCss(w) +
    flyCss(w) +
    twinkleCss +
    `@keyframes show{0%{opacity:1}${visiblePct}%{opacity:0}}.line{opacity:0;animation:show ${period}s steps(1) infinite}` +
    '@keyframes blink{50%{opacity:0}}.cur{animation:blink .8s steps(1) infinite}' +
    '@keyframes ray{50%{opacity:0}}.ray-a{animation:ray 1.6s steps(1) infinite}.ray-b{animation:ray 1.6s steps(1) -.8s infinite}';
  const subtitle = lines
    .map((text, k) => {
      const p = 4;
      const shift = text.length * 24;
      const x = Math.round((w - textWidth(text, p)) / 2 / 4) * 4;
      const y = 208;
      const delay = k ? -(period - slot * k) : 0;
      const typePct = ((Math.min(text.length * 0.05, 1.6) / period) * 100).toFixed(2);
      css += `@keyframes type${k}{0%{transform:translateX(0)}${typePct}%,100%{transform:translateX(${shift}px)}}`;
      return `<g class="line line${k}" style="animation-delay:${delay}s">${textPath(text, x, y, p, INK)}<g class="cover" style="animation:type${k} ${period}s steps(${text.length}) ${delay}s infinite"><rect x="${x}" y="${y - 4}" width="${shift}" height="36" fill="${SKY[3]}"/><rect class="cur" x="${x}" y="${y}" width="12" height="28" fill="${INK}"/></g></g>`;
    })
    .join('');
  const body =
    skyBody +
    sparkles([[64, 48], [200, 24], [420, 36], [560, 76], [880, 28], [1000, 84], [1240, 140], [120, 150], [1200, 196], [40, 204]]) +
    sun(1144, 72, 5, 8) +
    driftLayer(w, [['a', 40, 40], ['b', 300, 20], ['c', 520, 56], ['b', 760, 28], ['a', 980, 48], ['c', 1150, 16]], 140, 4) +
    bird(w, 76, 28, -4) +
    bird(w, 96, 36, -19) +
    driftLayer(w, [['c', 80, 144], ['a', 470, 150], ['b', 860, 140], ['a', 1120, 146]], 90, 6) +
    textPath(title, tx + 8, ty + 8, tp, INK_SHADOW) +
    [[-4, 0], [4, 0], [0, -4], [0, 4], [-4, -4], [4, -4], [-4, 4], [4, 4]]
      .map(([dx, dy]) => textPath(title, tx + dx, ty + dy, tp, INK))
      .join('') +
    textPath(title, tx, ty, tp, WHITE) +
    subtitle +
    floor(w, h, 8, 7, [[2, 7, 0], [1.5, 17, 2]], MIST) +
    driftLayer(w, [['a', 60, 272], ['c', 420, 264], ['b', 760, 284], ['a', 1020, 268]], 60, 8) +
    floor(w, h, 8, 4, [[2, 5, 1], [1, 13, 0]], WHITE);
  return svg({ w, h, label: 'Khalif Adikara, Odoo developer and full-stack web developer', css, defs, body });
}

function footer() {
  const w = 1280;
  const h = 192;
  const { defs, body: skyBody } = sky(w, SKY.slice(2, 5), 64);
  const text = "THANKS FOR DROPPING BY!";
  const p = 4;
  const x = Math.round((w - textWidth(text, p)) / 2 / 4) * 4;
  const body =
    skyBody +
    sparkles([[96, 32], [340, 96], [980, 24], [1180, 88], [620, 112]]) +
    driftLayer(w, [['b', 60, 16], ['a', 420, 64], ['c', 760, 8], ['b', 1100, 56]], 100, 4) +
    bird(w, 24, 30, -10) +
    textPath(text, x + 4, 52, p, PLATE_SHADOW) +
    textPath(text, x, 48, p, INK) +
    floor(w, h, 8, 6, [[2, 6, 0], [1.5, 15, 1]], MIST) +
    floor(w, h, 8, 3, [[1.5, 4, 2], [1, 11, 0]], WHITE);
  return svg({ w, h, label: 'Thanks for dropping by', css: driftCss(w) + flyCss(w) + twinkleCss, defs, body });
}

function header(text) {
  const p = 4;
  const iconX = 20;
  const textX = iconX + 40 + 16;
  const cols = (textX + textWidth(text, p) + 24) / p;
  const rows = 13;
  const plate = Array.from({ length: rows }, (_, r) => {
    const edge = r === 0 || r === rows - 1;
    return edge ? `.${'b'.repeat(cols - 2)}.` : `b${'w'.repeat(cols - 2)}b`;
  });
  const shadow = plate.map((row) => row.replace(/[bw]/g, 'x'));
  const w = cols * p + 4;
  const h = rows * p + 8;
  const css = '@keyframes bob{50%{transform:translateY(-4px)}}.bob{animation:bob 1.6s steps(1) infinite}';
  const body =
    sprite(shadow, 4, 4, p, { x: PLATE_SHADOW }) +
    sprite(plate, 0, 0, p, { b: BORDER, w: WHITE }) +
    `<g class="bob">${cloud('b', iconX, 16, p, { '#': BORDER, s: SKY[0] })}</g>` +
    textPath(text, textX, 12, p, INK);
  return svg({ w, h, label: text, css, body });
}

function centered(text, cx, y, p, fill) {
  const x = Math.round((cx - textWidth(text, p) / 2) / p) * p;
  return textPath(text, x, y, p, fill);
}

function flag(x, y, cloth, wave) {
  const a = sprite(FLAG_A, x, y, 5, { p: INK, c: cloth });
  if (!wave) return a;
  return `<g class="f1">${a}</g><g class="f2">${sprite(FLAG_B, x, y, 5, { p: INK, c: cloth })}</g>`;
}

function journey() {
  const w = 1280;
  const h = 416;
  const { defs: skyDefs, body: skyBody } = sky(w, SKY.slice(2, 5), 96);
  const ground = 170;
  const start = 120;
  const cp1 = 500;
  const cp2 = 940;
  const arcs = [
    `M${start + 32} ${ground - 24}C${start + 130} 40 ${cp1 - 150} 40 ${cp1 - 30} ${ground - 30}`,
    `M${cp1 + 50} ${ground - 30}C${cp1 + 170} 30 ${cp2 - 170} 30 ${cp2 - 30} ${ground - 30}`,
  ];
  const segments = 24;
  const filled = 14;
  const barX = 232;
  const barY = 372;
  const defs =
    skyDefs +
    `<clipPath id="barclip"><rect x="${barX}" y="${barY}" width="${segments * 24}" height="20"/></clipPath>` +
    `<marker id="arrow" viewBox="0 0 10 18" refX="4" refY="9" markerWidth="10" markerHeight="18" markerUnits="userSpaceOnUse" orient="auto"><path fill="${DONE}" d="${runs(ARROW, 0, 0, 2)}"/></marker>`;
  const bar = Array.from({ length: segments }, (_, i) => {
    const x = barX + i * 24;
    return `<rect x="${x}" y="${barY}" width="20" height="20" fill="${WHITE}"/><rect x="${x + 4}" y="${barY + 4}" width="12" height="12" fill="${i < filled ? DONE : SHADE}"/>`;
  }).join('');
  const css =
    driftCss(w) +
    flyCss(w) +
    twinkleCss +
    '@keyframes march{to{stroke-dashoffset:-16}}.path{animation:march .8s linear infinite}' +
    '@keyframes blink{50%{opacity:0}}.blink{animation:blink 1s steps(1) infinite}' +
    '@keyframes bob{50%{transform:translateY(-4px)}}.bob{animation:bob .8s steps(1) infinite}' +
    `@keyframes fill{0%{transform:translateX(0)}40%,100%{transform:translateX(${filled * 24}px)}}.fill{animation:fill 6s steps(${filled}) infinite}`;
  const body =
    skyBody +
    `<rect y="288" width="${w}" height="${h - 288}" fill="${SKY[4]}"/>` +
    sparkles([[60, 40], [360, 20], [740, 24], [1180, 48], [1230, 120]]) +
    driftLayer(w, [['b', 40, 12], ['a', 600, 8], ['b', 1100, 20]], 120, 4) +
    arcs.map((d) => `<path class="path" d="${d}" fill="none" stroke="${DONE}" stroke-width="6" stroke-dasharray="8 8" marker-end="url(#arrow)"/>`).join('') +
    flag(start - 16, ground - 50, WHITE, false) +
    centered('START', start, ground + 16, 4, INK) +
    flag(cp1 - 16, ground - 50, DONE, false) +
    centered('CHECKPOINT 1', cp1, ground + 24, 3, MUTED) +
    centered('SMKN 1 CIMAHI', cp1, ground + 56, 4, INK) +
    centered('SOFTWARE ENGINEERING', cp1, ground + 96, 3, INK) +
    centered('CLEARED', cp1, ground + 128, 3, DONE) +
    flag(cp2 - 16, ground - 50, CURRENT, true) +
    `<g class="bob">${sprite(HERO, cp2 + 36, ground - 36, 4, { h: INK, s: SKIN, b: SKY[0], k: INK })}</g>` +
    centered('CHECKPOINT 2', cp2, ground + 24, 3, MUTED) +
    centered('ODOO DEVELOPER', cp2, ground + 56, 4, INK) +
    centered('INFINYS SYSTEM INDONESIA', cp2, ground + 96, 3, INK) +
    centered('JUN 2025 - NOW', cp2, ground + 124, 3, INK) +
    `<g class="blink">${centered('IN PROGRESS', cp2, ground + 156, 3, INK_SHADOW)}</g>` +
    textPath('LEVEL 2', 40, barY - 4, 4, INK) +
    bar +
    `<g clip-path="url(#barclip)"><g class="fill">${Array.from({ length: filled }, (_, i) => `<rect x="${barX + i * 24}" y="${barY}" width="20" height="20" fill="${WHITE}"/><rect x="${barX + i * 24 + 4}" y="${barY + 4}" width="12" height="12" fill="${SHADE}"/>`).join('')}</g></g>`;
  return svg({ w, h, label: 'Journey: checkpoint 1 SMKN 1 Cimahi, software engineering, cleared. Checkpoint 2 Odoo developer at Infinys System Indonesia since June 2025, in progress.', css, defs, body });
}

const stepRect = (x, y, w, h, s) =>
  `M${x + s} ${y}H${x + w - s}V${y + s}H${x + w}V${y + h - s}H${x + w - s}V${y + h}H${x + s}V${y + h - s}H${x}V${y + s}H${x + s}Z`;

function plate(x, y, w, h, fill = WHITE) {
  return (
    `<path fill="${PLATE_SHADOW}" d="${stepRect(x + 4, y + 4, w, h, 4)}"/>` +
    `<path fill="${BORDER}" d="${stepRect(x, y, w, h, 4)}"/>` +
    `<path fill="${fill}" d="${stepRect(x + 4, y + 4, w - 8, h - 8, 4)}"/>`
  );
}

const icon = (name, x, y, p) => sprite(ICONS[name], x, y, p, ICON_COLORS);
const iconSize = (name, p) => ({ w: ICONS[name][0].length * p, h: ICONS[name].length * p });
const bobCss = '@keyframes bob{50%{transform:translateY(-4px)}}.bob{animation:bob 1.6s steps(1) infinite}';

function button(text, name) {
  const p = 3;
  const size = iconSize(name, p);
  const textX = 16 + 32 + 12;
  const w = textX + textWidth(text, p) + 16;
  const h = 44;
  const body =
    plate(0, 0, w, h) +
    icon(name, 16 + (32 - size.w) / 2, Math.round((h - size.h) / 2 / p) * p, p) +
    textPath(text, textX, 12, p, INK);
  return svg({ w: w + 4, h: h + 4, label: text, body });
}

function panelSky(w, h) {
  const colors = SKY.slice(3);
  const band = Math.floor(h / colors.length / 8) * 8;
  const { defs, body } = sky(w, colors, band);
  return { defs, body: body + `<rect y="${band * colors.length}" width="${w}" height="${h - band * colors.length}" fill="${colors[colors.length - 1]}"/>` };
}

function about() {
  const w = 1280;
  const h = 416;
  const { defs, body: bg } = panelSky(w, h);
  const slot = { x: 48, y: 48, s: 200 };
  const tx = 276;
  const hero = sprite(HERO, slot.x + 65, slot.y + slot.s - 24 - 90, 10, { h: INK, s: SKIN, b: SKY[0], k: INK });
  const rows = [
    ['FULL-STACK', 'WEB APPS END TO END, UI TO DEPLOY'],
    ['EDUCATION', 'SOFTWARE ENGINEERING, SMKN 1 CIMAHI'],
    ['EXPERIENCE', '2+ YEARS OF DEVELOPMENT'],
    ['LEARNING', 'GO, RUST, UNITY AND BLENDER'],
    ['FREELANCE', 'OPEN FOR WEBSITE PROJECTS'],
    ['WORK', 'ODOO DEVELOPER, INFINYS SYSTEM INDONESIA'],
  ];
  const dots = Array.from({ length: 60 }, (_, i) => `<rect x="${tx + i * 16}" y="138" width="8" height="4" fill="${BORDER}"/>`).join('');
  const body =
    bg +
    plate(24, 24, 1232, 368) +
    `<path fill="${SKY[2]}" d="${stepRect(slot.x, slot.y, slot.s, slot.s, 8)}"/>` +
    `<rect x="${slot.x}" y="${slot.y + slot.s - 24}" width="${slot.s}" height="16" fill="${WHITE}"/>` +
    cloud('b', slot.x + 20, slot.y + 24, 4) +
    cloud('b', slot.x + 124, slot.y + 60, 3) +
    `<g class="bob">${hero}</g>` +
    centered('KHALIF', slot.x + slot.s / 2, 284, 4, INK) +
    centered('JAKARTA, ID', slot.x + slot.s / 2, 324, 3, MUTED) +
    textPath('FULL-STACK WEB DEVELOPER', tx, 52, 5, INK) +
    textPath('CURRENTLY LIVING IN JAKARTA', tx, 104, 3, MUTED) +
    dots +
    rows
      .map(([label, value], i) => {
        const y = 160 + i * 38;
        return `<rect x="${tx}" y="${y + 6}" width="8" height="8" fill="${DONE}"/>${textPath(label, tx + 20, y, 3, MUTED)}${textPath(value, tx + 236, y, 3, INK)}`;
      })
      .join('');
  const label = `About me. Full-stack web developer, currently living in Jakarta. ${rows.map(([l, v]) => `${l}: ${v}`).join('. ')}.`;
  return svg({ w, h, label, css: bobCss, defs, body });
}

function divider() {
  const w = 1280;
  const h = 48;
  const defs =
    `<pattern id="dt" width="16" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" fill="${SKY[4]}"/></pattern>` +
    `<pattern id="db" width="16" height="8" patternUnits="userSpaceOnUse"><rect x="8" width="8" height="8" fill="${SKY[4]}"/></pattern>`;
  const body =
    `<rect width="${w}" height="8" fill="url(#dt)"/><rect y="8" width="${w}" height="32" fill="${SKY[4]}"/><rect y="40" width="${w}" height="8" fill="url(#db)"/>` +
    driftLayer(w, [['b', 40, 14], ['a', 330, 10], ['b', 640, 16], ['c', 900, 10], ['b', 1180, 14]], 70, 4);
  return svg({ w, h, label: 'Cloud divider', css: driftCss(w), defs, body });
}

function tile(name) {
  const s = 72;
  const size = iconSize(name, 4);
  const body =
    `<path fill="${SKY[3]}" d="${stepRect(0, 0, s, s, 8)}"/>` +
    `<g class="bob">${icon(name, (s - size.w) / 2, Math.round((s - size.h) / 2 / 4) * 4, 4)}</g>`;
  return svg({ w: s, h: s, label: '', css: bobCss, body });
}

const TILES = { games: 'controller', music: 'headphones', style: 'sneaker', anime: 'tv' };

const BUTTONS = {
  email: ['EMAIL', 'mail'],
  linkedin: ['LINKEDIN', 'linkedin'],
  instagram: ['INSTAGRAM', 'instagram'],
  twitter: ['TWITTER', 'twitter'],
  portfolio: ['PORTFOLIO', 'globe'],
};

const HEADERS = {
  about: 'ABOUT ME',
  stack: 'TECH STACK',
  featured: 'FEATURED PROJECT',
  builds: 'MORE BUILDS',
  journey: 'JOURNEY',
  stats: 'GITHUB STATS',
  offclock: 'OFF THE CLOCK',
  contact: "LET'S CONNECT",
};

mkdirSync(OUT, { recursive: true });
const files = {
  'banner.svg': banner(),
  'footer.svg': footer(),
  'journey.svg': journey(),
  'about.svg': about(),
  'divider.svg': divider(),
  ...Object.fromEntries(Object.entries(TILES).map(([key, name]) => [`i-${key}.svg`, tile(name)])),
  ...Object.fromEntries(Object.entries(BUTTONS).map(([key, [text, name]]) => [`btn-${key}.svg`, button(text, name)])),
  ...Object.fromEntries(Object.entries(HEADERS).map(([key, text]) => [`h-${key}.svg`, header(text)])),
};
for (const [name, content] of Object.entries(files)) {
  writeFileSync(join(OUT, name), content);
  console.log(`${name} ${(content.length / 1024).toFixed(1)} KB`);
}
