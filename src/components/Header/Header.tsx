'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RiMenu3Fill,
  RiCloseLine,
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailFill,
} from 'react-icons/ri';
import styles from './Header.module.css';
import Button from '@/components/common/Button';
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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>
        <motion.span whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          {'<DevName />'}
        </motion.span>
      </div>
      <nav className={styles.nav}>
        <motion.ul variants={containerVariants} initial="hidden" animate="show">
          {navLinks.map((link) => (
            <motion.li key={link.id} variants={itemVariants}>
              <a onClick={() => handleLinkClick(link.id)}>{link.name}</a>
            </motion.li>
          ))}
        </motion.ul>
        <div className={styles.cta}>
          <Button href={resumeUrl} target="_blank" rel="noopener noreferrer">
            Download CV
          </Button>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </nav>
      <button className={styles.menuButton} onClick={toggleMenu}>
        {isMenuOpen ? <RiCloseLine /> : <RiMenu3Fill />}
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            className={styles.mobileNav}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              {navLinks.map((link) => (
                <motion.li key={link.id} variants={itemVariants}>
                  <a onClick={() => handleLinkClick(link.id)}>{link.name}</a>
                </motion.li>
              ))}
            </motion.ul>
            <div className={styles.mobileCta}>
              <Button
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download CV
              </Button>
              <div className={styles.socialLinks}>
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, color: 'var(--color-primary)' }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
