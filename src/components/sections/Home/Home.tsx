'use client';

import React from 'react';
import Button from '@/components/common/Button/Button';

interface HomeProps {
  name: string;
  role: string;
  tagline: string;
  onProjectsClick: () => void;
  onContactClick: () => void;
}

const Home: React.FC<HomeProps> = ({
  name,
  role,
  tagline,
  onProjectsClick,
  onContactClick,
}) => {
  return (
    <section
      id="home"
      className="flex flex-col items-center justify-center min-h-screen text-center p-8 bg-gray-950 text-gray-200"
    >
      <div className="flex flex-col items-center max-w-4xl space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Olá, eu sou{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-600">
            {name}
          </span>
          .
        </h1>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-400">
          {role}
        </h2>
        <p className="text-lg md:text-xl max-w-2xl leading-relaxed text-gray-300">
          {tagline}
        </p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-8">
          <Button onClick={onProjectsClick} variant="primary">
            Conheça meus projetos
          </Button>
          <Button onClick={onContactClick} variant="secondary">
            Entre em contato
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Home;
