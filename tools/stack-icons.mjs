import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'assets', 'icons');
const README = join(ROOT, 'README.md');

const TILE = 256;
const GAP = 44;
const INSET = 52;
const TILE_FILL = '#242938';
const ICON_PX = 38;

const skill = (key, name, href) => ({ key, name, href, skill: key });
const si = (key, name, href, color) => ({ key, name, href, si: key, color });

const GROUPS = [
  [
    'Frontend',
    [
      skill('ts', 'TypeScript', 'https://www.typescriptlang.org'),
      skill('js', 'JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'),
      skill('react', 'React', 'https://react.dev'),
      skill('nextjs', 'Next.js', 'https://nextjs.org'),
      skill('tailwind', 'Tailwind CSS', 'https://tailwindcss.com'),
      si('shadcnui', 'shadcn/ui', 'https://ui.shadcn.com', 'FFFFFF'),
      si('reactquery', 'TanStack Query', 'https://tanstack.com/query', 'FF4154'),
    ],
  ],
  [
    'Backend',
    [
      skill('nodejs', 'Node.js', 'https://nodejs.org'),
      skill('nestjs', 'NestJS', 'https://nestjs.com'),
      skill('php', 'PHP', 'https://www.php.net'),
      skill('laravel', 'Laravel', 'https://laravel.com'),
      skill('fastapi', 'FastAPI', 'https://fastapi.tiangolo.com'),
      si('hono', 'Hono', 'https://hono.dev', 'E36002'),
      si('zod', 'Zod', 'https://zod.dev', '6E9BE0'),
      si('strapi', 'Strapi', 'https://strapi.io', '8E75FF'),
    ],
  ],
  [
    'Database',
    [
      skill('postgres', 'PostgreSQL', 'https://www.postgresql.org'),
      skill('mysql', 'MySQL', 'https://www.mysql.com'),
      skill('prisma', 'Prisma', 'https://www.prisma.io'),
      skill('supabase', 'Supabase', 'https://supabase.com'),
      si('drizzle', 'Drizzle ORM', 'https://orm.drizzle.team', 'C5F74F'),
    ],
  ],
  [
    'ERP and mobile',
    [
      skill('py', 'Python', 'https://www.python.org'),
      skill('flutter', 'Flutter', 'https://flutter.dev'),
      skill('dart', 'Dart', 'https://dart.dev'),
      skill('kotlin', 'Kotlin', 'https://kotlinlang.org'),
      si('odoo', 'Odoo', 'https://www.odoo.com', 'FFFFFF'),
    ],
  ],
  [
    'DevOps',
    [
      skill('docker', 'Docker', 'https://www.docker.com'),
      skill('cloudflare', 'Cloudflare', 'https://www.cloudflare.com'),
      skill('githubactions', 'GitHub Actions', 'https://github.com/features/actions'),
      skill('vercel', 'Vercel', 'https://vercel.com'),
      skill('netlify', 'Netlify', 'https://www.netlify.com'),
      skill('pnpm', 'pnpm', 'https://pnpm.io'),
      skill('vitest', 'Vitest', 'https://vitest.dev'),
      skill('git', 'Git', 'https://git-scm.com'),
      si('turborepo', 'Turborepo', 'https://turbo.build', 'EF4444'),
      si('n8n', 'n8n', 'https://n8n.io', 'EA4B71'),
      { key: 'playwright', name: 'Playwright', href: 'https://playwright.dev', url: 'https://playwright.dev/img/playwright-logo.svg' },
    ],
  ],
  [
    'Learning',
    [
      skill('go', 'Go', 'https://go.dev'),
      skill('rust', 'Rust', 'https://www.rust-lang.org'),
      skill('unity', 'Unity', 'https://unity.com'),
      skill('blender', 'Blender', 'https://www.blender.org'),
    ],
  ],
];

const sourceUrl = (icon) => icon.url ?? (icon.skill ? `https://skillicons.dev/icons?i=${icon.skill}` : `https://cdn.simpleicons.org/${icon.si}/${icon.color}`);

async function fetchSvg(icon) {
  const url = sourceUrl(icon);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  const text = await res.text();
  const open = /<svg[^>]*>/.exec(text);
  const viewBox = open && /viewBox="([^"]+)"/.exec(open[0]);
  if (!open || !viewBox) throw new Error(`${url} is not an SVG with a viewBox`);
  if (icon.skill && viewBox[1] !== '0 0 256 256') throw new Error(`Unknown skillicons icon "${icon.skill}"`);
  const fill = /\sfill="([^"]+)"/.exec(open[0]);
  const inner = text.slice(open.index + open[0].length, text.lastIndexOf('</svg>')).replace(/<title>.*?<\/title>/s, '');
  return { viewBox: viewBox[1], fill: fill ? fill[1] : 'none', inner };
}

async function iconSvg(icon) {
  const { viewBox, fill, inner } = await fetchSvg(icon);
  const size = TILE - INSET * 2;
  const art = icon.skill
    ? `<svg width="${TILE}" height="${TILE}" viewBox="${viewBox}" fill="${fill}">${inner}</svg>`
    : `<rect width="${TILE}" height="${TILE}" rx="60" fill="${TILE_FILL}"/><svg x="${INSET}" y="${INSET}" width="${size}" height="${size}" viewBox="${viewBox}" fill="${fill}">${inner}</svg>`;
  const width = TILE + GAP;
  const scale = ICON_PX / TILE;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${Math.round(width * scale)}" height="${ICON_PX}" viewBox="0 0 ${width} ${TILE}" fill="none" role="img" aria-label="${icon.name}"><title>${icon.name}</title>${art}</svg>\n`;
}

function tableHtml() {
  const rows = GROUPS.map(([label, icons]) => {
    const links = icons
      .map((icon) => `<a href="${icon.href}" title="${icon.name}"><img src="assets/icons/${icon.key}.svg" alt="${icon.name}" title="${icon.name}"></a>`)
      .join('');
    return `  <tr>\n    <td><b>${label}</b></td>\n    <td>${links}</td>\n  </tr>`;
  });
  return `<table>\n${rows.join('\n')}\n</table>`;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
for (const [, icons] of GROUPS) {
  for (const icon of icons) writeFileSync(join(OUT, `${icon.key}.svg`), await iconSvg(icon));
}

const readme = readFileSync(README, 'utf8');
const start = readme.indexOf('<table>', readme.indexOf('assets/h-stack.svg'));
const end = readme.indexOf('</table>', start) + '</table>'.length;
if (start < 0 || end < start) throw new Error('Tech stack table not found in README.md');
writeFileSync(README, readme.slice(0, start) + tableHtml() + readme.slice(end));
console.log(`${GROUPS.reduce((n, [, icons]) => n + icons.length, 0)} icons written, README tech stack table updated`);
