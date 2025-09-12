'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './About.module.css';
import SectionTitle from '@/components/common/SectionTitle';

interface AboutProps {
  description: string;
}

const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <section id="about" className={styles.about}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <SectionTitle title="Sobre Mim" />
        <p className={styles.description}>{description}</p>
      </motion.div>
    </section>
  );
};

export default About;
