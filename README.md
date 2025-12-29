# Portfolio - Ícaro Pecinalli

<div align="center">

![Portfolio Banner](https://img.shields.io/badge/Portfolio-Desenvolvedor%20Full%20Stack-blue?style=for-the-badge)
[![React Router](https://img.shields.io/badge/React%20Router-v7-red?style=for-the-badge&logo=react-router)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

Um portfólio moderno e responsivo construído com as melhores tecnologias web, apresentando projetos, habilidades e informações profissionais com animações suaves e design elegante.

[Demo](https://icaropecinalli.vercel.app/) • [Reportar Bug](https://github.com/Pecinallix/portfolio/issues) • [Solicitar Feature](https://github.com/Pecinallix/portfolio/issues)

</div>

---

## ✨ Características

### 🎨 Design & UX

- **Interface Moderna** - Design clean e profissional com gradientes e efeitos visuais
- **Dark Mode** - Sistema de temas claro/escuro com persistência local
- **Responsivo** - Perfeitamente adaptado para todos os dispositivos (mobile, tablet, desktop)
- **Animações Suaves** - Transições e animações elegantes usando Framer Motion

### 🌍 Internacionalização

- **Multi-idiomas** - Suporte completo para Português (BR), Inglês e Francês
- **Troca Instantânea** - Mudança de idioma sem recarregar a página
- **Persistência** - Preferência de idioma salva localmente

### 🚀 Funcionalidades

- **Projetos Dinâmicos** - Integração automática com API do GitHub para exibir projetos
- **Formulário de Contato** - Sistema de envio de e-mails via Web3Forms
- **Seções Completas**:
  - Hero com apresentação profissional
  - Sobre mim com estatísticas e características
  - Habilidades com barras de progresso animadas
  - Projetos destacados do GitHub
  - Formulário de contato funcional

### ⚡ Performance

- **SSR** - Server-Side Rendering para melhor SEO e performance
- **Otimização** - Código otimizado e bundle reduzido
- **Lazy Loading** - Carregamento otimizado de componentes
- **Animações Performáticas** - GPU-accelerated animations

---

## 🛠️ Tecnologias

### Core

- **React Router v7** - Framework React moderno com SSR
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS v4** - Framework CSS utility-first

### Bibliotecas

- **Framer Motion** - Animações declarativas e suaves
- **Lucide React** - Ícones modernos e otimizados
- **Web3Forms** - Serviço de envio de e-mails
- **React Context API** - Gerenciamento de estado global

### APIs Integradas

- **GitHub API** - Busca automática de repositórios
- **Web3Forms API** - Envio de formulários de contato

---

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/Pecinallix/portfolio.git
cd portfolio
```

2. **Instale as dependências**

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. **Configure suas variáveis de ambiente**

Edite o arquivo `app/config/github.ts` com seu username do GitHub:

```typescript
export const GITHUB_CONFIG = {
  username: 'seu-username', // Seu username do GitHub
  maxProjects: 8,
};
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

---

## 🎨 Personalização

### 1. Informações Pessoais

Edite `app/contexts/LanguageContext.tsx` para personalizar todos os textos:

```typescript
export const translations = {
  pt: {
    'hero.greeting': 'Olá! Sou',
    'hero.title': 'Seu Título',
    // ... mais traduções
  },
  // ... outros idiomas
};
```

### 2. Habilidades

Modifique `app/components/Skills.tsx`:

```typescript
const skillCategories = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 90 },
      // Adicione suas habilidades
    ],
  },
];
```

### 3. Formulário de Contato

Configure sua chave do Web3Forms em `app/components/Contact.tsx`:

```typescript
body: JSON.stringify({
  access_key: 'sua-chave-web3forms',
  // ... outros campos
});
```

Obtenha sua chave gratuita em [web3forms.com](https://web3forms.com)

### 4. Temas e Cores

As cores estão definidas em `app/app.css`. Personalize os gradientes e cores principais:

```css
.bg-linear-to-r {
  background: linear-gradient(to right, #sua-cor-1, #sua-cor-2);
}
```

---

## 📦 Build para Produção

### Build Padrão

```bash
npm run build
```

Isso gerará os arquivos otimizados em:

- `build/client/` - Assets estáticos
- `build/server/` - Código do servidor

### Preview da Build

```bash
npm run start
```

---

## 🐳 Deploy com Docker

### Build da Imagem

```bash
docker build -t portfolio .
```

### Execute o Container

```bash
docker run -p 3000:3000 portfolio
```

### Plataformas Suportadas

- **Vercel** - Deploy direto do GitHub
- **Netlify** - Suporte para SSR
- **AWS ECS** - Container deployment
- **Google Cloud Run** - Serverless containers
- **Railway** - Deploy simplificado
- **Fly.io** - Edge deployment

---

## 📁 Estrutura do Projeto

```
portfolio/
├── app/
│   ├── components/          # Componentes React
│   │   ├── About.tsx       # Seção Sobre
│   │   ├── Contact.tsx     # Formulário de contato
│   │   ├── Header.tsx      # Cabeçalho/navegação
│   │   ├── Hero.tsx        # Seção principal
│   │   ├── Projects.tsx    # Projetos do GitHub
│   │   ├── Skills.tsx      # Habilidades
│   │   ├── ThemeToggle.tsx # Botão de tema
│   │   └── LanguageToggle.tsx # Seletor de idioma
│   ├── contexts/           # React Context
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── config/             # Configurações
│   │   └── github.ts       # Config do GitHub
│   ├── routes/             # Rotas do React Router
│   ├── app.css            # Estilos globais
│   └── root.tsx           # Layout raiz
├── public/                # Assets públicos
└── package.json
```

---

## 🎯 Features em Desenvolvimento

- [ ] Blog integrado
- [ ] CMS para gerenciar conteúdo
- [ ] Modo de apresentação
- [ ] Analytics integrado
- [ ] Mais integrações de APIs
- [ ] Seção de testemunhos
- [ ] Timeline de carreira

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abrir um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 👨‍💻 Autor

**Ícaro Pecinalli**

- GitHub: [@Pecinallix](https://github.com/Pecinallix)
- LinkedIn: [icaropecinalli](https://www.linkedin.com/in/icaropecinalli/)
- Email: icaropecinalli@gmail.com

---

## 🙏 Agradecimentos

- [React Router](https://reactrouter.com/) - Framework incrível
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Lucide Icons](https://lucide.dev/) - Ícones bonitos
- [Web3Forms](https://web3forms.com/) - Serviço de formulários

---

<div align="center">

**⭐ Se este projeto te ajudou, considere dar uma estrela!**

Feito com ❤️ por [Ícaro Pecinalli](https://github.com/Pecinallix)

</div>
