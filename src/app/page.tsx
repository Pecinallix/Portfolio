'use client';

import React from 'react';
import Header from '@/components/Header';
import Home from '@/components/sections/Home';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import useScrollToSection from '@/hooks/useScrollToSection';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from 'react-icons/ri';
import { Project, Skill } from '@/types/types';
import styles from './page.module.css';

const HomePortfolio: React.FC = () => {
  const { scrollToSection } = useScrollToSection();

  const handleProjectsClick = (): void => scrollToSection('projects');
  const handleContactClick = (): void => scrollToSection('contact');

  const devInfo = {
    name: 'Seu Nome',
    role: 'Desenvolvedor Front-end | UI/UX Designer',
    tagline:
      'Construindo experiências digitais modernas e intuitivas com paixão e propósito.',
    about:
      'Escreva aqui uma descrição detalhada sobre sua trajetória profissional, paixões e o que o motiva a trabalhar com desenvolvimento. Inclua informações sobre tecnologias que você gosta de explorar e sua abordagem para resolver problemas. Este é o espaço para a sua história, sua visão e seus objetivos.',
    resumeUrl: '/resume.pdf',
    email: 'seu.email@exemplo.com',
    githubUrl: 'https://github.com/seu-usuario',
    linkedinUrl: 'https://www.linkedin.com/in/seu-perfil',
  };

  const socialLinks = [
    { icon: <RiGithubFill />, url: devInfo.githubUrl },
    { icon: <RiLinkedinBoxFill />, url: devInfo.linkedinUrl },
    { icon: <RiMailFill />, url: `mailto:${devInfo.email}` },
  ];

  const projects: Project[] = [
    {
      title: 'Projeto 1',
      description:
        'Breve descrição do projeto 1, o que ele faz e quais problemas resolve.',
      technologies: ['React', 'TypeScript', 'CSS Modules'],
      image: '/project-placeholder.png',
      githubLink: '#',
      liveLink: '#',
    },
    {
      title: 'Projeto 2',
      description:
        'Breve descrição do projeto 2, focando em suas funcionalidades principais.',
      technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      image: '/project-placeholder.png',
      githubLink: '#',
    },
    {
      title: 'Projeto 3',
      description: 'Breve descrição do projeto 3 e o que o torna único.',
      technologies: ['Vue.js', 'Vite', 'Pinia'],
      image: '/project-placeholder.png',
      githubLink: '#',
      liveLink: '#',
    },
  ];

  const skills: Skill[] = [
    {
      category: 'Linguagens',
      items: ['JavaScript', 'TypeScript', 'HTML5', 'CSS3'],
    },
    {
      category: 'Frameworks/Bibliotecas',
      items: ['React', 'Next.js', 'Vue', 'Svelte'],
    },
    {
      category: 'Gerenciamento de Estado',
      items: ['Redux', 'Zustand', 'React Context'],
    },
    {
      category: 'Estilização',
      items: ['Styled Components', 'Tailwind CSS', 'Mantine UI'],
    },
    {
      category: 'Testes',
      items: ['Jest', 'React Testing Library', 'Vitest'],
    },
    {
      category: 'Ferramentas',
      items: ['Git', 'Docker', 'Webpack', 'Figma'],
    },
  ];

  return (
    <div className={styles.container}>
      <Header
        onNavLinkClick={scrollToSection}
        socialLinks={socialLinks}
        resumeUrl={devInfo.resumeUrl}
      />
      <main className={styles.main}>
        <Home
          name={devInfo.name}
          role={devInfo.role}
          tagline={devInfo.tagline}
          onProjectsClick={handleProjectsClick}
          onContactClick={handleContactClick}
        />
        <About description={devInfo.about} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Contact
          email={devInfo.email}
          githubUrl={devInfo.githubUrl}
          linkedinUrl={devInfo.linkedinUrl}
        />
      </main>
    </div>
  );
};

export default HomePortfolio;
