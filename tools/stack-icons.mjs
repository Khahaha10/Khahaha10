import { rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'assets');

const TILE = 256;
const GAP = 44;
const INSET = 52;
const TILE_FILL = '#242938';
const ICON_PX = 48;

const skill = (name) => ({ skill: name });
const si = (name, color) => ({ si: name, color });

const GROUPS = {
  frontend: [skill('ts'), skill('js'), skill('react'), skill('nextjs'), skill('tailwind'), si('shadcnui', 'FFFFFF'), si('reactquery', 'FF4154')],
  backend: [skill('nodejs'), skill('nestjs'), skill('php'), skill('laravel'), skill('fastapi'), si('hono', 'E36002'), si('zod', '6E9BE0'), si('strapi', '8E75FF')],
  database: [skill('postgres'), skill('mysql'), skill('prisma'), skill('supabase'), si('drizzle', 'C5F74F')],
  erp: [skill('py'), skill('flutter'), skill('dart'), skill('kotlin'), si('odoo', 'FFFFFF')],
  devops: [
    skill('docker'),
    skill('cloudflare'),
    skill('githubactions'),
    skill('vercel'),
    skill('netlify'),
    skill('pnpm'),
    skill('vitest'),
    skill('git'),
    si('turborepo', 'EF4444'),
    si('n8n', 'EA4B71'),
    { url: 'https://playwright.dev/img/playwright-logo.svg' },
  ],
  learning: [skill('go'), skill('rust'), skill('unity'), skill('blender')],
};

const sourceUrl = (icon) => icon.url ?? (icon.skill ? `https://skillicons.dev/icons?i=${icon.skill}` : `https://cdn.simpleicons.org/${icon.si}/${icon.color}`);

async function fetchSvg(icon, prefix) {
  const url = sourceUrl(icon);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const text = await res.text();
  const open = /<svg[^>]*>/.exec(text);
  const viewBox = open && /viewBox="([^"]+)"/.exec(open[0]);
  if (!open || !viewBox) throw new Error(`${url} is not an SVG with a viewBox`);
  if (icon.skill && viewBox[1] !== '0 0 256 256') throw new Error(`Unknown skillicons icon "${icon.skill}"`);
  const fill = /\sfill="([^"]+)"/.exec(open[0]);
  const inner = text
    .slice(open.index + open[0].length, text.lastIndexOf('</svg>'))
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/id="([^"]+)"/g, `id="${prefix}$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${prefix}$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${prefix}$1"`);
  return { viewBox: viewBox[1], fill: fill ? fill[1] : 'none', inner, tiled: !icon.skill };
}

async function grid(name, icons) {
  const logos = await Promise.all(icons.map((icon, i) => fetchSvg(icon, `${name}${i}-`)));
  const slots = Math.max(...Object.values(GROUPS).map((group) => group.length));
  const width = slots * TILE + (slots - 1) * GAP;
  const height = TILE;
  const cells = logos
    .map(({ viewBox, fill, inner, tiled }, i) => {
      const x = i * (TILE + GAP);
      const y = 0;
      if (!tiled) return `<svg x="${x}" y="${y}" width="${TILE}" height="${TILE}" viewBox="${viewBox}" fill="${fill}">${inner}</svg>`;
      const size = TILE - INSET * 2;
      return `<rect x="${x}" y="${y}" width="${TILE}" height="${TILE}" rx="60" fill="${TILE_FILL}"/><svg x="${x + INSET}" y="${y + INSET}" width="${size}" height="${size}" viewBox="${viewBox}" fill="${fill}">${inner}</svg>`;
    })
    .join('');
  const scale = ICON_PX / TILE;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${Math.round(width * scale)}" height="${Math.round(height * scale)}" viewBox="0 0 ${width} ${height}" fill="none">${cells}</svg>\n`;
}

rmSync(join(OUT, 'stack-tooling.svg'), { force: true });
for (const [name, icons] of Object.entries(GROUPS)) {
  writeFileSync(join(OUT, `stack-${name}.svg`), await grid(name, icons));
  console.log(`stack-${name}.svg ${icons.length} icons`);
}
