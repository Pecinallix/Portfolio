# Portfólio — Ícaro Pecinalli

Portfólio pessoal de desenvolvedor full stack, em português e inglês, construído com React Router v7, TypeScript, Tailwind CSS v4 e Framer Motion.

## Seções

Hero (foto, disponibilidade, currículo) → Experiência → Projetos (destaques + open source) → Habilidades → Sobre → Contato (formulário via Web3Forms).

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck
npm run build      # gera build/client (SPA estática)
npm run start      # serve build/client
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Experiência, projetos, open source, skills, contatos | `app/data/profile.ts` |
| Textos da interface (PT/EN) | `app/contexts/LanguageContext.tsx` |
| Cores e tipografia ("Midnight Luxe") | `app/app.css` |
| Imagens dos projetos e foto | `public/*.webp` |

## Currículo em PDF

`public/curriculo.pdf` (PT) e `public/resume.pdf` (EN) são gerados a partir de `app/data/profile.ts`, para o currículo nunca divergir do site:

```bash
npm run cv   # precisa de Chrome ou Edge instalado (ou CHROME_PATH)
```

Textos exclusivos do currículo (resumo, certificações, idiomas) ficam em `cv/build.mts`.

## Deploy

No ar em **https://pecinallix.github.io/Portfolio/**. Todo push na `main` publica sozinho pelo GitHub Actions (`.github/workflows/deploy.yml`); em Settings → Pages a *Source* deve ser **GitHub Actions**.

O build é uma SPA estática (`ssr: false`), então qualquer servidor de arquivos serve `build/client`. Para rodar numa subpasta, defina `BASE_PATH` (ex.: `BASE_PATH=/Portfolio/ npm run build`).

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

Numa VPS com nginx basta apontar o `root` para `build/client` com `try_files $uri /index.html;`.

## Contato

- GitHub: [@Pecinallix](https://github.com/Pecinallix)
- LinkedIn: [icaropecinalli](https://www.linkedin.com/in/icaropecinalli/)
- E-mail: icaropecinalli@gmail.com
