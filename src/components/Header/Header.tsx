'use client';

import React, { useState } from 'react';
import { RiMenu3Fill, RiCloseLine } from 'react-icons/ri';
import Button from '../common/Button/Button';
import { SocialLink } from '@/types/types';

interface HeaderProps {
  onNavLinkClick: (id: string) => void;
  socialLinks: SocialLink[];
  resumeUrl: string;
}

const Header: React.FC<HeaderProps> = ({
  onNavLinkClick,
  socialLinks,
  resumeUrl,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navLinks = [
    { name: 'Início', id: 'home' },
    { name: 'Sobre Mim', id: 'about' },
    { name: 'Projetos', id: 'projects' },
    { name: 'Habilidades', id: 'skills' },
    { name: 'Contato', id: 'contact' },
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (id: string): void => {
    onNavLinkClick(id);
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full bg-slate-900/90 backdrop-blur-sm shadow-md py-4 px-6 md:px-12 flex items-center justify-between transition-all duration-300 ease-in-out">
      <div className="flex-shrink-0">
        <span className="text-xl font-bold text-gray-200 hover:text-indigo-400 transition-colors duration-200 cursor-pointer">
          {'<DevName />'}
        </span>
      </div>
      <nav className="hidden md:flex md:items-center">
        <ul className="flex space-x-8 text-gray-300">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                onClick={() => handleLinkClick(link.id)}
                className="hover:text-indigo-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center space-x-4 ml-8">
          <Button href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Download CV
          </Button>
          <div className="flex space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </nav>
      <button className="md:hidden text-2xl text-gray-300" onClick={toggleMenu}>
        {isMenuOpen ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      {isMenuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-slate-900/95 flex flex-col items-center justify-center space-y-8 z-40 md:hidden">
          <ul className="flex flex-col items-center space-y-6 text-2xl text-gray-300">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  onClick={() => handleLinkClick(link.id)}
                  className="hover:text-indigo-400 transition-colors duration-200"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col items-center space-y-6">
            <Button href={resumeUrl} target="_blank" rel="noopener noreferrer">
              Download CV
            </Button>
            <div className="flex space-x-6 text-3xl">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
