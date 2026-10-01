import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type Language = 'pt' | 'en';

const LANGUAGES: Language[] = ['pt', 'en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const translations = {
  pt: {
    // Header
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.skills': 'Skills',
    'nav.about': 'Sobre',
    'nav.contact': 'Contato',
    'nav.hire': 'Contratar',
    'nav.role': 'Desenvolvedor Full Stack',

    // Hero
    'hero.kicker': 'Portfólio',
    'hero.location': 'Araruama, RJ · Brasil',
    'hero.available': 'Disponível · Remoto ou mudança',
    'hero.headline': 'Desenvolvedor Full Stack que coloca produto no ar.',
    'hero.description':
      'React, Node.js e PostgreSQL, do layout à VPS. Hoje mantenho um MMO no navegador, um diretório com mais de 13 mil IAs e bots de ofertas rodando 24/7.',
    'hero.cta': 'Ver projetos',
    'hero.download': 'Baixar currículo',
    'hero.focus': 'Foco',
    'hero.base': 'Base',
    'hero.scroll': 'Role',
    'hero.photoAlt': 'Foto de Ícaro Pecinalli',

    // Experience
    'experience.kicker': 'Experiência',
    'experience.title': 'Onde construí',
    'experience.titleAccent': 'coisas reais',
    'experience.education': 'Formação',

    // Projects
    'projects.kicker': 'Projetos',
    'projects.title': 'Produtos no ar',
    'projects.subtitle':
      'Projetos que eu idealizei, construí e mantenho em produção — com usuários reais e infraestrutura própria.',
    'projects.visit': 'Visitar',
    'projects.noLink': 'Site em manutenção',
    'projects.side.title': 'Open source & estudos',
    'projects.side.more': 'Ver todos no GitHub',

    // Skills
    'skills.kicker': 'Habilidades',
    'skills.title': 'Ferramentas que uso em produção',
    'skills.marquee': 'Stack do dia a dia',

    // About
    'about.kicker': 'Sobre',
    'about.title': 'Construo software com',
    'about.titleAccent': 'intenção',
    'about.p1':
      'Sou desenvolvedor full stack em Araruama (RJ), formado em Análise e Desenvolvimento de Sistemas. Gosto de construir produtos inteiros: do layout à VPS, passando por banco de dados, deploy e suporte a usuários reais.',
    'about.p2':
      'O Ragnarok Online atravessa a minha carreira: comecei fazendo sites e scripts para servidores do jogo e hoje mantenho o meu próprio MMO no navegador. Agora procuro um time onde eu possa somar essa mentalidade de dono a uma engenharia mais madura.',
    'about.stat.years': 'Anos de experiência',
    'about.stat.products': 'Produtos em produção',
    'about.stat.bots': 'Bots rodando 24/7',
    'about.stat.tools': 'IAs catalogadas',

    // Contact
    'contact.kicker': 'Contato',
    'contact.title': 'Vamos',
    'contact.titleAccent': 'conversar',
    'contact.subtitle': 'Procurando um dev full stack? Me chame por e-mail, WhatsApp ou pelo formulário.',
    'contact.description':
      'Estou aberto a vagas full stack — remotas ou com mudança. Também aceito projetos freelance.',
    'contact.email': 'E-mail',
    'contact.phone': 'WhatsApp',
    'contact.location': 'Localização',
    'contact.social': 'Redes',
    'contact.form.name': 'Nome',
    'contact.form.namePlaceholder': 'Seu nome',
    'contact.form.email': 'E-mail',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.subject': 'Assunto',
    'contact.form.subjectPlaceholder': 'Vaga, projeto ou dúvida',
    'contact.form.message': 'Mensagem',
    'contact.form.messagePlaceholder': 'Escreva sua mensagem...',
    'contact.form.sending': 'Enviando...',
    'contact.form.send': 'Enviar mensagem',
    'contact.form.success': '✓ Mensagem enviada! Respondo assim que possível.',
    'contact.form.error':
      '✗ Não consegui enviar. Tente de novo ou escreva direto para o meu e-mail.',

    // Footer
    'footer.cta': 'Vamos conversar',
    'footer.top': 'Voltar ao topo ↑',
    'footer.tagline': 'Desenvolvedor full stack — produtos do layout à VPS.',
    'footer.nav': 'Navegação',
    'footer.social': 'Social',
    'footer.base': 'Base',
    'footer.rights': 'Todos os direitos reservados.',
  },
  en: {
    // Header
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire me',
    'nav.role': 'Full Stack Developer',

    // Hero
    'hero.kicker': 'Portfolio',
    'hero.location': 'Araruama, RJ · Brazil',
    'hero.available': 'Available · Remote or relocation',
    'hero.headline': 'Full stack developer who ships products.',
    'hero.description':
      'React, Node.js and PostgreSQL, from layout to VPS. Today I run a browser MMO, a directory of 13,000+ AI tools and deal bots running 24/7.',
    'hero.cta': 'View projects',
    'hero.download': 'Download resume',
    'hero.focus': 'Focus',
    'hero.base': 'Based in',
    'hero.scroll': 'Scroll',
    'hero.photoAlt': 'Photo of Ícaro Pecinalli',

    // Experience
    'experience.kicker': 'Experience',
    'experience.title': 'Where I built',
    'experience.titleAccent': 'real things',
    'experience.education': 'Education',

    // Projects
    'projects.kicker': 'Projects',
    'projects.title': 'Live products',
    'projects.subtitle':
      'Products I designed, built and keep running in production — with real users and my own infrastructure.',
    'projects.visit': 'Visit',
    'projects.noLink': 'Website under maintenance',
    'projects.side.title': 'Open source & side projects',
    'projects.side.more': 'See everything on GitHub',

    // Skills
    'skills.kicker': 'Skills',
    'skills.title': 'Tools I use in production',
    'skills.marquee': 'Everyday stack',

    // About
    'about.kicker': 'About',
    'about.title': 'I build software with',
    'about.titleAccent': 'intent',
    'about.p1':
      'I’m a full stack developer from Araruama, Rio de Janeiro, with a degree in Systems Analysis and Development. I like building whole products: from layout to VPS, including databases, deploys and supporting real users.',
    'about.p2':
      'Ragnarok Online runs through my career: I started building websites and scripts for game servers, and today I run my own browser MMO. Now I’m looking for a team where I can bring that ownership mindset to a more mature engineering practice.',
    'about.stat.years': 'Years of experience',
    'about.stat.products': 'Products in production',
    'about.stat.bots': 'Bots running 24/7',
    'about.stat.tools': 'AI tools catalogued',

    // Contact
    'contact.kicker': 'Contact',
    'contact.title': 'Let’s',
    'contact.titleAccent': 'talk',
    'contact.subtitle': 'Looking for a full stack developer? Reach me by e-mail, WhatsApp or the form.',
    'contact.description':
      'I’m open to full stack positions — remote or with relocation. I also take freelance projects.',
    'contact.email': 'E-mail',
    'contact.phone': 'WhatsApp',
    'contact.location': 'Location',
    'contact.social': 'Social',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'E-mail',
    'contact.form.emailPlaceholder': 'you@email.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'Position, project or question',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Write your message...',
    'contact.form.sending': 'Sending...',
    'contact.form.send': 'Send message',
    'contact.form.success': '✓ Message sent! I’ll get back to you soon.',
    'contact.form.error':
      '✗ Couldn’t send it. Please try again or e-mail me directly.',

    // Footer
    'footer.cta': 'Let’s talk',
    'footer.top': 'Back to top ↑',
    'footer.tagline': 'Full stack developer — products from layout to VPS.',
    'footer.nav': 'Navigation',
    'footer.social': 'Social',
    'footer.base': 'Based in',
    'footer.rights': 'All rights reserved.',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && LANGUAGES.includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.pt] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
