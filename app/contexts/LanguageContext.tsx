import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'pt' | 'en' | 'fr';

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
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.skills': 'Skills',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    'nav.hire': 'Contratar',

    // Welcome
    'welcome.loading': 'Carregando...',

    // Hero
    'hero.greeting': 'Olá! Sou',
    'hero.title': 'Desenvolvedor Full Stack',
    'hero.description':
      'Transformo ideias em soluções digitais inovadoras com código limpo e design moderno.',
    'hero.cta': 'Ver Projetos',
    'hero.download': 'Baixar Currículo',
    'hero.contact': 'Entre em Contato',

    // About
    'about.title': 'Sobre Mim',
    'about.intro1':
      'Olá! Sou Ícaro Pecinalli, desenvolvedor apaixonado por tecnologia e inovação, com foco em criar aplicações web modernas e eficientes que fazem a diferença.',
    'about.intro2':
      'Com experiência em desenvolvimento full stack, domino tecnologias como React, Node.js, TypeScript e outras ferramentas modernas. Estou sempre em busca de novos desafios e oportunidades para crescer profissionalmente.',
    'about.intro3':
      'Meu objetivo é transformar ideias em soluções digitais de alta qualidade, combinando código limpo, boas práticas e uma experiência de usuário excepcional.',
    'about.feature1.title': 'Código Limpo',
    'about.feature1.desc':
      'Escrevo código maintível, escalável e seguindo as melhores práticas da indústria.',
    'about.feature2.title': 'Soluções Criativas',
    'about.feature2.desc':
      'Transformo ideias complexas em soluções elegantes e funcionais.',
    'about.feature3.title': 'Performance',
    'about.feature3.desc':
      'Otimização e performance são prioridades em cada projeto que desenvolvo.',
    'about.feature4.title': 'Trabalho em Equipe',
    'about.feature4.desc':
      'Colaboração efetiva e comunicação clara com times multidisciplinares.',
    'about.stat1': 'Anos de Experiência',
    'about.stat2': 'Projetos Concluídos',
    'about.stat3': 'Clientes Satisfeitos',
    'about.stat4': 'Dedicação',

    // Skills
    'skills.title': 'Habilidades & Tecnologias',
    'skills.subtitle': 'Tecnologias que Trabalho',

    // Projects
    'projects.title': 'Projetos em Destaque',
    'projects.subtitle':
      'Meus projetos mais recentes do GitHub, demonstrando minhas habilidades e expertise',
    'projects.viewProject': 'Ver Projeto',
    'projects.viewMore': 'Ver Mais no GitHub',
    'projects.noTags': 'Sem tags',
    'projects.loading': 'Carregando projetos...',

    // Contact
    'contact.title': 'Entre em Contato',
    'contact.subtitle':
      'Tem um projeto em mente? Vamos conversar e transformar suas ideias em realidade',
    'contact.info': 'Informações de Contato',
    'contact.description':
      'Estou sempre aberto a discutir novos projetos, ideias criativas ou oportunidades para fazer parte da sua visão.',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.location': 'Localização',
    'contact.social': 'Me siga nas redes',
    'contact.form.name': 'Nome',
    'contact.form.namePlaceholder': 'Seu nome',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.subject': 'Assunto',
    'contact.form.subjectPlaceholder': 'Como posso ajudar?',
    'contact.form.message': 'Mensagem',
    'contact.form.messagePlaceholder': 'Escreva sua mensagem...',
    'contact.form.sending': 'Enviando...',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.success':
      '✓ Mensagem enviada com sucesso! Entrarei em contato em breve.',
    'contact.form.error':
      '✗ Erro ao enviar mensagem. Por favor, tente novamente ou use o email diretamente.',
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.hire': 'Hire Me',

    // Welcome
    'welcome.loading': 'Loading...',

    // Hero
    'hero.greeting': "Hello! I'm",
    'hero.title': 'Full Stack Developer',
    'hero.description':
      'I transform ideas into innovative digital solutions with clean code and modern design.',
    'hero.cta': 'View Projects',
    'hero.download': 'Download Resume',
    'hero.contact': 'Get in Touch',

    // About
    'about.title': 'About Me',
    'about.intro1':
      "Hello! I'm Ícaro Pecinalli, a developer passionate about technology and innovation, focused on creating modern and efficient web applications that make a difference.",
    'about.intro2':
      "With full stack development experience, I master technologies like React, Node.js, TypeScript and other modern tools. I'm always looking for new challenges and opportunities to grow professionally.",
    'about.intro3':
      'My goal is to transform ideas into high-quality digital solutions, combining clean code, best practices and exceptional user experience.',
    'about.feature1.title': 'Clean Code',
    'about.feature1.desc':
      'I write maintainable, scalable code following industry best practices.',
    'about.feature2.title': 'Creative Solutions',
    'about.feature2.desc':
      'I transform complex ideas into elegant and functional solutions.',
    'about.feature3.title': 'Performance',
    'about.feature3.desc':
      'Optimization and performance are priorities in every project I develop.',
    'about.feature4.title': 'Teamwork',
    'about.feature4.desc':
      'Effective collaboration and clear communication with multidisciplinary teams.',
    'about.stat1': 'Years of Experience',
    'about.stat2': 'Completed Projects',
    'about.stat3': 'Satisfied Clients',
    'about.stat4': 'Dedication',

    // Skills
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Technologies I Work With',

    // Projects
    'projects.title': 'Featured Projects',
    'projects.subtitle':
      'My latest GitHub projects, showcasing my skills and expertise',
    'projects.viewProject': 'View Project',
    'projects.viewMore': 'View More on GitHub',
    'projects.noTags': 'No tags',
    'projects.loading': 'Loading projects...',

    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle':
      "Have a project in mind? Let's talk and turn your ideas into reality",
    'contact.info': 'Contact Information',
    'contact.description':
      "I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.",
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.location': 'Location',
    'contact.social': 'Follow me',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.subject': 'Subject',
    'contact.form.subjectPlaceholder': 'How can I help?',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Write your message...',
    'contact.form.sending': 'Sending...',
    'contact.form.send': 'Send Message',
    'contact.form.success':
      "✓ Message sent successfully! I'll get back to you soon.",
    'contact.form.error':
      '✗ Error sending message. Please try again or use email directly.',
  },
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.skills': 'Compétences',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.hire': 'Me recruter',

    // Welcome
    'welcome.loading': 'Chargement...',

    // Hero
    'hero.greeting': 'Bonjour! Je suis',
    'hero.title': 'Développeur Full Stack',
    'hero.description':
      'Je transforme les idées en solutions numériques innovantes avec du code propre et un design moderne.',
    'hero.cta': 'Voir les projets',
    'hero.download': 'Télécharger CV',
    'hero.contact': 'Me contacter',

    // About
    'about.title': 'À propos de moi',
    'about.intro1':
      "Bonjour! Je suis Ícaro Pecinalli, développeur passionné par la technologie et l'innovation, axé sur la création d'applications web modernes et efficaces qui font la différence.",
    'about.intro2':
      "Avec une expérience en développement full stack, je maîtrise des technologies comme React, Node.js, TypeScript et d'autres outils modernes. Je suis toujours à la recherche de nouveaux défis et d'opportunités de croissance professionnelle.",
    'about.intro3':
      'Mon objectif est de transformer les idées en solutions numériques de haute qualité, en combinant code propre, bonnes pratiques et expérience utilisateur exceptionnelle.',
    'about.feature1.title': 'Code Propre',
    'about.feature1.desc':
      "J'écris du code maintenable et évolutif en suivant les meilleures pratiques de l'industrie.",
    'about.feature2.title': 'Solutions Créatives',
    'about.feature2.desc':
      'Je transforme des idées complexes en solutions élégantes et fonctionnelles.',
    'about.feature3.title': 'Performance',
    'about.feature3.desc':
      "L'optimisation et la performance sont des priorités dans chaque projet que je développe.",
    'about.feature4.title': "Travail d'équipe",
    'about.feature4.desc':
      'Collaboration efficace et communication claire avec des équipes multidisciplinaires.',
    'about.stat1': "Années d'expérience",
    'about.stat2': 'Projets terminés',
    'about.stat3': 'Clients satisfaits',
    'about.stat4': 'Dévouement',

    // Skills
    'skills.title': 'Compétences & Technologies',
    'skills.subtitle': 'Technologies avec lesquelles je travaille',

    // Projects
    'projects.title': 'Projets en vedette',
    'projects.subtitle':
      'Mes derniers projets GitHub, démontrant mes compétences et mon expertise',
    'projects.viewProject': 'Voir le projet',
    'projects.viewMore': 'Voir plus sur GitHub',
    'projects.noTags': 'Pas de tags',
    'projects.loading': 'Chargement des projets...',

    // Contact
    'contact.title': 'Me contacter',
    'contact.subtitle':
      'Vous avez un projet en tête? Discutons et transformons vos idées en réalité',
    'contact.info': 'Informations de contact',
    'contact.description':
      "Je suis toujours ouvert à discuter de nouveaux projets, d'idées créatives ou d'opportunités pour faire partie de votre vision.",
    'contact.email': 'Email',
    'contact.phone': 'Téléphone',
    'contact.location': 'Localisation',
    'contact.social': 'Suivez-moi',
    'contact.form.name': 'Nom',
    'contact.form.namePlaceholder': 'Votre nom',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'votre@email.com',
    'contact.form.subject': 'Sujet',
    'contact.form.subjectPlaceholder': 'Comment puis-je vous aider?',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Écrivez votre message...',
    'contact.form.sending': 'Envoi en cours...',
    'contact.form.send': 'Envoyer le message',
    'contact.form.success':
      '✓ Message envoyé avec succès! Je vous contacterai bientôt.',
    'contact.form.error':
      "✗ Erreur lors de l'envoi du message. Veuillez réessayer ou utiliser l'email directement.",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('pt');

  useEffect(() => {
    // Carregar idioma salvo do localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['pt', 'en', 'fr'].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

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
