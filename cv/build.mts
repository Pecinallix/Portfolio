// Gera public/curriculo.pdf (PT) e public/resume.pdf (EN) a partir de app/data/profile.ts,
// para o currículo nunca divergir do site. Uso: npm run cv
// Precisa do Chrome/Edge instalado (ou CHROME_PATH apontando para o executável).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  CONTACT,
  education,
  experiences,
  localize,
  skillGroups,
} from '../app/data/profile.ts';

type Language = 'pt' | 'en';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'cv', '.out');

const copy = {
  pt: {
    file: 'curriculo.pdf',
    title: 'Desenvolvedor Full Stack',
    location: 'Araruama, RJ · Disponível para trabalho remoto ou mudança',
    summaryTitle: 'Resumo',
    summary:
      'Desenvolvedor full stack com 3+ anos de experiência construindo e operando produtos do layout ao deploy. Fundador do Idle RO (MMO de navegador em tempo real com Vue 3, Node.js, PostgreSQL e Socket.IO, em produção em VPS própria) e do FindMyAI (diretório com mais de 13 mil ferramentas de IA, em Next.js, Express e PostgreSQL); cofundador do PromoRadar (8 bots Node.js rodando 24/7 com scraping de 6 marketplaces). Mentalidade de produto e de dono: entendo o negócio, penso no usuário e mantenho o sistema de pé em produção.',
    skillsTitle: 'Habilidades técnicas',
    experienceTitle: 'Experiência',
    openSourceTitle: 'Open source',
    openSource: [
      'String Guardian: plugin para Claude Code que detecta e preserva o encoding de arquivos com acentos (Node.js, Python). github.com/Pecinallix/string-guardian',
      'Conversor LUB ↔ LUA: ferramenta web que compila e decompila bytecode Lua no navegador (JavaScript). github.com/Pecinallix/Conversor-Lub-Lua',
    ],
    educationTitle: 'Formação',
    certificationsTitle: 'Certificações',
    certifications: 'Tailwind CSS · React Completo · Next.js · JavaScript ES6 · HTML e CSS · CSS Flexbox e Grid · UX/UI Design',
    languagesTitle: 'Idiomas',
    languages: 'Português: nativo · Inglês: leitura técnica avançada',
  },
  en: {
    file: 'resume.pdf',
    title: 'Full Stack Developer',
    location: 'Araruama, RJ, Brazil · Open to remote work or relocation',
    summaryTitle: 'Summary',
    summary:
      'Full stack developer with 3+ years of experience building and running products from layout to deploy. Founder of Idle RO (a real-time browser MMO built with Vue 3, Node.js, PostgreSQL and Socket.IO, running on my own VPS) and FindMyAI (a directory of 13,000+ AI tools built with Next.js, Express and PostgreSQL); co-founder of PromoRadar (8 Node.js bots running 24/7, scraping 6 marketplaces). Product and ownership mindset: I understand the business, think about the user and keep the system up in production.',
    skillsTitle: 'Technical skills',
    experienceTitle: 'Experience',
    openSourceTitle: 'Open source',
    openSource: [
      'String Guardian: Claude Code plugin that detects and preserves the encoding of files with accented characters (Node.js, Python). github.com/Pecinallix/string-guardian',
      'LUB ↔ LUA Converter: web tool that compiles and decompiles Lua bytecode in the browser (JavaScript). github.com/Pecinallix/Conversor-Lub-Lua',
    ],
    educationTitle: 'Education',
    certificationsTitle: 'Certifications',
    certifications: 'Tailwind CSS · Complete React · Next.js · JavaScript ES6 · HTML & CSS · CSS Flexbox & Grid · UX/UI Design',
    languagesTitle: 'Languages',
    languages: 'Portuguese: native · English: advanced technical reading',
  },
} satisfies Record<Language, unknown>;

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const stripProtocol = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function render(lang: Language) {
  const c = copy[lang];

  const jobs = experiences
    .map((job) => {
      const company = esc(localize(job.company, lang));
      const link = job.url ? ` · <span class="muted">${esc(stripProtocol(job.url))}</span>` : '';
      return `
      <div class="job">
        <div class="job-head">
          <span><strong>${esc(job.role[lang])}</strong> | ${company}${link}</span>
          <span class="muted">${esc(job.period[lang])} · ${esc(job.context[lang])}</span>
        </div>
        <ul>${job.bullets.map((b) => `<li>${esc(b[lang])}</li>`).join('')}</ul>
      </div>`;
    })
    .join('');

  const skills = skillGroups
    .map((g) => `<div><strong>${esc(g.title[lang])}:</strong> ${esc(g.items.join(', '))}</div>`)
    .join('');

  return `<!doctype html>
<html lang="${lang === 'pt' ? 'pt-BR' : 'en'}">
<head>
<meta charset="utf-8" />
<title>Ícaro Pecinalli | ${esc(c.title)}</title>
<style>
  @page { size: A4; margin: 14mm 15mm; }
  * { box-sizing: border-box; }
  body { font-family: Calibri, 'Segoe UI', Arial, sans-serif; font-size: 10.3pt; line-height: 1.38; color: #1b1b1b; margin: 0; }
  header { text-align: center; margin-bottom: 10px; }
  h1 { font-size: 21pt; letter-spacing: 0.04em; margin: 0; }
  .role { font-size: 12pt; margin: 2px 0 6px; }
  .contact, .muted { color: #555; }
  .contact { font-size: 9.5pt; }
  h2 { font-size: 10.5pt; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1.5px solid #1b1b1b; padding-bottom: 2px; margin: 14px 0 6px; }
  p { margin: 0; }
  .skills div { margin-bottom: 2px; }
  .job { margin-bottom: 8px; break-inside: avoid; }
  .job-head { display: flex; justify-content: space-between; gap: 12px; }
  .job-head .muted { white-space: nowrap; font-style: italic; font-size: 9.5pt; }
  ul { margin: 3px 0 0; padding-left: 16px; }
  li { margin-bottom: 2px; }
  a { color: inherit; text-decoration: none; }
</style>
</head>
<body>
  <header>
    <h1>ÍCARO PECINALLI</h1>
    <div class="role">${esc(c.title)}</div>
    <div class="contact">
      ${esc(CONTACT.phone)} | ${esc(CONTACT.email)} | ${esc(stripProtocol(CONTACT.linkedin))} | ${esc(stripProtocol(CONTACT.github))} | ${esc(stripProtocol(CONTACT.site))}
    </div>
    <div class="contact">${esc(c.location)}</div>
  </header>

  <h2>${esc(c.summaryTitle)}</h2>
  <p>${esc(c.summary)}</p>

  <h2>${esc(c.skillsTitle)}</h2>
  <div class="skills">${skills}</div>

  <h2>${esc(c.experienceTitle)}</h2>
  ${jobs}

  <h2>${esc(c.openSourceTitle)}</h2>
  <ul>${c.openSource.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>

  <h2>${esc(c.educationTitle)}</h2>
  <p><strong>${esc(education.course[lang])}</strong> | ${esc(education.school)} · <span class="muted">${esc(education.period)}</span></p>

  <h2>${esc(c.certificationsTitle)}</h2>
  <p>${esc(c.certifications)}</p>

  <h2>${esc(c.languagesTitle)}</h2>
  <p>${esc(c.languages)}</p>
</body>
</html>`;
}

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error('Chrome/Edge não encontrado. Defina CHROME_PATH.');
  return found;
}

mkdirSync(outDir, { recursive: true });
const chrome = findChrome();

for (const lang of ['pt', 'en'] as const) {
  const html = join(outDir, `${lang}.html`);
  writeFileSync(html, render(lang), 'utf-8');
  const pdf = join(root, 'public', copy[lang].file);
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${pdf}`,
    `file:///${html.replace(/\\/g, '/')}`,
  ], { stdio: 'ignore' });
  console.log(`✓ ${copy[lang].file}`);
}
