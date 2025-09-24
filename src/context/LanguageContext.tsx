'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'pt' | 'en' | 'es';

interface TranslationKeys {
  [key: string]: {
    pt: string;
    en: string;
    es: string;
  };
}

const translations: TranslationKeys = {
  // Navigation
  home: { pt: 'Início', en: 'Home', es: 'Inicio' },
  about: { pt: 'Sobre', en: 'About', es: 'Acerca' },
  projects: { pt: 'Projetos', en: 'Projects', es: 'Proyectos' },
  contact: { pt: 'Contato', en: 'Contact', es: 'Contacto' },

  // Hero Section
  heroTitle: {
    pt: 'Desenvolvedor Front-end',
    en: 'Front-end Developer',
    es: 'Desarrollador Front-end',
  },
  heroSubtitle: {
    pt: 'Criando experiências digitais excepcionais com código limpo e design inovador',
    en: 'Creating exceptional digital experiences with clean code and innovative design',
    es: 'Creando experiencias digitales excepcionales con código limpio y diseño innovador',
  },
  viewWork: { pt: 'Ver Trabalhos', en: 'View Work', es: 'Ver Trabajos' },
  downloadCV: { pt: 'Baixar CV', en: 'Download CV', es: 'Descargar CV' },

  // About Section
  aboutTitle: { pt: 'Sobre Mim', en: 'About Me', es: 'Acerca de Mí' },
  aboutText: {
    pt: 'Sou um desenvolvedor front-end apaixonado por criar interfaces modernas e funcionais. Com experiência em React, TypeScript e design responsivo, transformo ideias em realidade digital.',
    en: 'I am a front-end developer passionate about creating modern and functional interfaces. With experience in React, TypeScript and responsive design, I transform ideas into digital reality.',
    es: 'Soy un desarrollador front-end apasionado por crear interfaces modernas y funcionales. Con experiencia en React, TypeScript y diseño responsive, transformo ideas en realidad digital.',
  },
  skills: { pt: 'Habilidades', en: 'Skills', es: 'Habilidades' },
  experience: { pt: 'Experiência', en: 'Experience', es: 'Experiencia' },
  yearsExp: { pt: '3+ Anos', en: '3+ Years', es: '3+ Años' },

  // Projects Section
  projectsTitle: {
    pt: 'Meus Projetos',
    en: 'My Projects',
    es: 'Mis Proyectos',
  },
  projectsSubtitle: {
    pt: 'Uma seleção dos meus trabalhos mais recentes',
    en: 'A selection of my most recent work',
    es: 'Una selección de mis trabajos más recientes',
  },
  viewProject: { pt: 'Ver Projeto', en: 'View Project', es: 'Ver Proyecto' },
  viewCode: { pt: 'Ver Código', en: 'View Code', es: 'Ver Código' },

  // Contact Section
  contactTitle: {
    pt: 'Vamos Trabalhar Juntos',
    en: "Let's Work Together",
    es: 'Trabajemos Juntos',
  },
  contactSubtitle: {
    pt: 'Pronto para dar vida ao seu próximo projeto',
    en: 'Ready to bring your next project to life',
    es: 'Listo para dar vida a tu próximo proyecto',
  },
  sendMessage: {
    pt: 'Enviar Mensagem',
    en: 'Send Message',
    es: 'Enviar Mensaje',
  },

  // Footer
  madeWith: { pt: 'Feito com', en: 'Made with', es: 'Hecho con' },
  and: { pt: 'e', en: 'and', es: 'y' },

  // Form
  name: { pt: 'Nome', en: 'Name', es: 'Nombre' },
  email: { pt: 'Email', en: 'Email', es: 'Email' },
  message: { pt: 'Mensagem', en: 'Message', es: 'Mensaje' },
  send: { pt: 'Enviar', en: 'Send', es: 'Enviar' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
