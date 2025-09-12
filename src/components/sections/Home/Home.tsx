'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Home.module.css';
import Button from '@/components/common/Button';

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
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className={styles.home}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={itemVariants}>
          Olá, eu sou <span className={styles.name}>{name}</span>.
        </motion.h1>
        <motion.h2 variants={itemVariants}>{role}</motion.h2>
        <motion.p variants={itemVariants}>{tagline}</motion.p>
        <motion.div className={styles.buttons} variants={itemVariants}>
          <Button onClick={onProjectsClick} primary>
            Conheça meus projetos
          </Button>
          <Button onClick={onContactClick} variant="secondary">
            Entre em contato
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;
