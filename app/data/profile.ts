import type { Language } from '../contexts/LanguageContext';

type Localized = Record<Language, string>;

// Prefixa arquivos de public/ com o base path (o site pode rodar em /<repo>/ no GitHub Pages).
export const asset = (path: string) => `${import.meta.env?.BASE_URL ?? "/"}${path}`;

export const CONTACT = {
  email: 'icaropecinalli@gmail.com',
  phone: '+55 (22) 99267-9550',
  whatsapp: 'https://wa.link/edn4ap',
  github: 'https://github.com/Pecinallix',
  linkedin: 'https://www.linkedin.com/in/icaropecinalli/',
  site: 'https://pecinallix.github.io/Portfolio/',
};

export const RESUME: Record<Language, { href: string; filename: string }> = {
  pt: { href: asset('curriculo.pdf'), filename: 'Icaro_Pecinalli_Curriculo.pdf' },
  en: { href: asset('resume.pdf'), filename: 'Icaro_Pecinalli_Resume.pdf' },
};

export interface Experience {
  company: string | Localized;
  role: Localized;
  period: Localized;
  context: Localized;
  url?: string;
  bullets: Localized[];
  stack: string[];
}

export const localize = (value: string | Localized, language: Language) =>
  typeof value === 'string' ? value : value[language];

export const experiences: Experience[] = [
  {
    company: 'Idle RO',
    role: { pt: 'Fundador & Desenvolvedor Full Stack', en: 'Founder & Full Stack Developer' },
    period: { pt: 'jul 2026 — presente', en: 'Jul 2026 — present' },
    context: { pt: 'Produto próprio', en: 'Own product' },
    url: 'https://idlero.com',
    bullets: [
      {
        pt: 'Criei do zero um MMO idle de navegador com mundo persistente em tempo real: Vue 3, Pinia e Phaser no front; Node.js, Express, PostgreSQL e Socket.IO no back.',
        en: 'Built from scratch a browser idle MMO with a real-time persistent world: Vue 3, Pinia and Phaser on the front end; Node.js, Express, PostgreSQL and Socket.IO on the back end.',
      },
      {
        pt: 'Montei a produção em VPS Linux (nginx, PM2, certbot, fail2ban) com deploy por script que valida as migrations antes de reiniciar a API e troca o build de forma atômica.',
        en: 'Set up production on a Linux VPS (nginx, PM2, certbot, fail2ban) with a scripted deploy that validates migrations before restarting the API and swaps the build atomically.',
      },
      {
        pt: 'CI no GitHub Actions (Vitest + build), fluxo develop → main por pull request e interface em 5 idiomas — cerca de 2.100 commits em três meses.',
        en: 'CI on GitHub Actions (Vitest + build), develop → main flow through pull requests and a UI in 5 languages — around 2,100 commits in three months.',
      },
      {
        pt: 'Desenvolvi um pipeline próprio que converte os arquivos originais do Ragnarok Online em sprites e mapas para o Phaser.',
        en: 'Wrote a custom pipeline that converts original Ragnarok Online game files into sprites and maps for Phaser.',
      },
    ],
    stack: ['Vue 3', 'Phaser', 'Node.js', 'PostgreSQL', 'Socket.IO', 'nginx'],
  },
  {
    company: 'FindMyAI',
    role: { pt: 'Fundador & Desenvolvedor Full Stack', en: 'Founder & Full Stack Developer' },
    period: { pt: 'mai 2026 — presente', en: 'May 2026 — present' },
    context: { pt: 'Produto próprio', en: 'Own product' },
    url: 'https://www.findmyai.com.br',
    bullets: [
      {
        pt: 'Diretório curado de ferramentas de IA para o mercado brasileiro: mais de 13.000 ferramentas em 26 categorias, com busca, comparador lado a lado e curadoria sem posições pagas.',
        en: 'Curated directory of AI tools for the Brazilian market: 13,000+ tools across 26 categories, with search, side-by-side comparison and no paid placements.',
      },
      {
        pt: 'Front em Next.js 16 com internacionalização (next-intl); API em Node.js/Express com PostgreSQL e rate limiting; e-mails transacionais com Resend.',
        en: 'Next.js 16 front end with internationalization (next-intl); Node.js/Express API with PostgreSQL and rate limiting; transactional e-mail with Resend.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL'],
  },
  {
    company: 'PromoRadar',
    role: { pt: 'Cofundador & Desenvolvedor Full Stack', en: 'Co-founder & Full Stack Developer' },
    period: { pt: 'nov 2025 — presente', en: 'Nov 2025 — present' },
    context: { pt: 'Produto próprio', en: 'Own product' },
    bullets: [
      {
        pt: '8 bots em Node.js rodando 24/7 em VPS Linux, com web scraping (Puppeteer, Cheerio) de 6 marketplaces: Amazon, Magalu, Shopee, AliExpress, Mercado Livre e Shein.',
        en: '8 Node.js bots running 24/7 on a Linux VPS, scraping 6 marketplaces (Puppeteer, Cheerio): Amazon, Magalu, Shopee, AliExpress, Mercado Livre and Shein.',
      },
      {
        pt: 'Distribuição automática das ofertas no Telegram e no WhatsApp, em grupos segmentados por categoria.',
        en: 'Automatic deal distribution to Telegram and WhatsApp groups segmented by category.',
      },
      {
        pt: 'Links de afiliado com rastreamento de conversões, monitoramento de uptime e gestão da infraestrutura.',
        en: 'Affiliate links with conversion tracking, uptime monitoring and infrastructure management.',
      },
    ],
    stack: ['Node.js', 'Puppeteer', 'Telegram API', 'WhatsApp'],
  },
  {
    company: { pt: 'Servidores de Ragnarok Online', en: 'Ragnarok Online servers' },
    role: { pt: 'Desenvolvedor Front-end e Back-end', en: 'Front-end & Back-end Developer' },
    period: { pt: 'dez 2024 — presente', en: 'Dec 2024 — present' },
    context: { pt: 'Freelance', en: 'Freelance' },
    bullets: [
      {
        pt: 'EthelRo: desenvolvi do zero o front-end do site do servidor em Next.js, React, TypeScript e Mantine, integrando APIs REST para rankings, status de jogadores e sistema de contas.',
        en: 'EthelRo: built the server’s website front end from scratch with Next.js, React, TypeScript and Mantine, integrating REST APIs for rankings, player status and accounts.',
      },
      {
        pt: 'Scripts em C++ e Lua para servidores rAthena: sistemas, eventos e regras de jogo, com manipulação direta de banco MySQL.',
        en: 'C++ and Lua scripting for rAthena servers: game systems, events and rules, working directly with the MySQL database.',
      },
    ],
    stack: ['Next.js', 'TypeScript', 'C++', 'Lua', 'MySQL'],
  },
  {
    company: 'Grupo Altuori',
    role: { pt: 'Cofundador & Desenvolvedor', en: 'Co-founder & Developer' },
    period: { pt: 'abr 2022 — out 2022', en: 'Apr 2022 — Oct 2022' },
    context: { pt: 'Agência web', en: 'Web agency' },
    bullets: [
      {
        pt: 'Mais de 8 sites para clientes reais — energia solar, escritório de advocacia, e-commerce de móveis — em HTML, CSS e JavaScript.',
        en: '8+ websites for real clients — solar energy, a law firm, a furniture e-commerce — in HTML, CSS and JavaScript.',
      },
      {
        pt: 'Ciclo completo: levantamento de requisitos, negociação, desenvolvimento, hospedagem, entrega e suporte.',
        en: 'Full cycle: requirements, negotiation, development, hosting, delivery and support.',
      },
    ],
    stack: ['JavaScript', 'HTML', 'CSS'],
  },
];

export const education = {
  course: {
    pt: 'Tecnólogo em Análise e Desenvolvimento de Sistemas',
    en: 'Associate Degree in Systems Analysis and Development',
  } as Localized,
  school: 'Universidade Estácio de Sá',
  period: '2022 — 2024',
};

export interface FeaturedProject {
  title: string;
  url?: string;
  linkLabel?: string;
  image: string;
  status: Localized;
  description: Localized;
  highlight: Localized;
  tags: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: 'FindMyAI',
    url: 'https://www.findmyai.com.br',
    linkLabel: 'findmyai.com.br',
    image: asset('findmyai.webp'),
    status: { pt: 'No ar', en: 'Live' },
    description: {
      pt: 'Diretório de ferramentas de inteligência artificial para o mercado brasileiro. Você descreve a tarefa e encontra a IA certa — com busca, comparador lado a lado e curadoria manual, sem posições pagas.',
      en: 'A directory of artificial intelligence tools for the Brazilian market. Describe the task and find the right AI — with search, side-by-side comparison and manual curation, no paid placements.',
    },
    highlight: { pt: '13.000+ ferramentas · 26 categorias', en: '13,000+ tools · 26 categories' },
    tags: ['Next.js', 'TypeScript', 'Express', 'PostgreSQL'],
  },
  {
    title: 'Idle RO',
    url: 'https://idlero.com',
    linkLabel: 'idlero.com',
    image: asset('idlero.webp'),
    status: { pt: 'No ar', en: 'Live' },
    description: {
      pt: 'MMO idle de fantasia no navegador, inspirado no Ragnarok Online: mundo persistente em tempo real, sem download, com PWA e app Android. Começou como Secret Forest, meu primeiro jogo web, e evoluiu até virar um MMO completo.',
      en: 'A browser fantasy idle MMO inspired by Ragnarok Online: real-time persistent world, no download, with a PWA and an Android app. It started as Secret Forest, my first web game, and grew into a full MMO.',
    },
    highlight: { pt: '~2.100 commits · em produção desde set 2026', en: '~2,100 commits · in production since Sep 2026' },
    tags: ['Vue 3', 'Phaser', 'Socket.IO', 'PostgreSQL', 'VPS'],
  },
  {
    title: 'PromoRadar',
    image: asset('promoradar.webp'),
    status: { pt: 'Em operação', en: 'Running' },
    description: {
      pt: 'Bots que vasculham marketplaces 24 horas por dia e publicam as melhores ofertas em tempo real em grupos do Telegram e do WhatsApp, com links de afiliado rastreados.',
      en: 'Bots that scan marketplaces around the clock and post the best deals in real time to Telegram and WhatsApp groups, with tracked affiliate links.',
    },
    highlight: { pt: '8 bots 24/7 · 6 marketplaces', en: '8 bots 24/7 · 6 marketplaces' },
    tags: ['Node.js', 'Puppeteer', 'Cheerio', 'Telegram', 'WhatsApp'],
  },
  {
    title: 'String Guardian',
    url: 'https://github.com/Pecinallix/string-guardian',
    linkLabel: 'GitHub',
    image: asset('stringguardian.webp'),
    status: { pt: 'Open source', en: 'Open source' },
    description: {
      pt: 'Plugin para Claude Code que detecta e preserva automaticamente o encoding de arquivos com caracteres acentuados. Sem configuração, sem passos manuais — simplesmente funciona.',
      en: 'A Claude Code plugin that automatically detects and preserves the encoding of files with accented characters. No configuration, no manual steps — it just works.',
    },
    highlight: { pt: 'Plugin open source', en: 'Open-source plugin' },
    tags: ['Claude Code', 'Node.js', 'Python'],
  },
];

export interface SideProject {
  title: string;
  url: string;
  description: Localized;
  tags: string[];
}

export const sideProjects: SideProject[] = [
  {
    title: 'Conversor LUB ↔ LUA',
    url: 'https://github.com/Pecinallix/Conversor-Lub-Lua',
    description: {
      pt: 'Ferramenta web que compila e decompila bytecode Lua direto no navegador, sem enviar arquivos para servidor.',
      en: 'Web tool that compiles and decompiles Lua bytecode right in the browser, without uploading files.',
    },
    tags: ['JavaScript', 'Lua'],
  },
  {
    title: 'Máquina Aleatória',
    url: 'https://github.com/Pecinallix/MaquinaAleatoria',
    description: {
      pt: 'Projeto pessoal para praticar JavaScript e TypeScript com criatividade.',
      en: 'Personal project to practice JavaScript and TypeScript creatively.',
    },
    tags: ['TypeScript'],
  },
  {
    title: 'Este portfólio',
    url: 'https://github.com/Pecinallix/portfolio',
    description: {
      pt: 'React Router v7, TypeScript, Tailwind CSS v4 e Framer Motion, em português e inglês.',
      en: 'React Router v7, TypeScript, Tailwind CSS v4 and Framer Motion, in Portuguese and English.',
    },
    tags: ['React', 'TypeScript', 'Tailwind'],
  },
];

export const skillGroups: { title: Localized; items: string[] }[] = [
  {
    title: { pt: 'Front-end', en: 'Front-end' },
    items: ['React', 'Next.js', 'TypeScript', 'Vue 3', 'Pinia', 'Tailwind CSS', 'Phaser', 'Mantine'],
  },
  {
    title: { pt: 'Back-end', en: 'Back-end' },
    items: ['Node.js', 'Express', 'REST APIs', 'Socket.IO', 'JWT / OAuth', 'C++ / Lua'],
  },
  {
    title: { pt: 'Dados', en: 'Data' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Firebase'],
  },
  {
    title: { pt: 'Infra & DevOps', en: 'Infra & DevOps' },
    items: ['Linux (VPS)', 'nginx', 'PM2', 'Docker', 'GitHub Actions', 'Vercel'],
  },
  {
    title: { pt: 'Automação & Qualidade', en: 'Automation & Quality' },
    items: ['Web scraping', 'Puppeteer', 'Telegram / WhatsApp bots', 'Vitest', 'ESLint'],
  },
];
