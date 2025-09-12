'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Skills.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import { Skill } from '@/types/types';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
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
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  };

  return (
    <section id="skills" className={styles.skills}>
      <SectionTitle title="Habilidades" />
      <motion.div
        className={styles.skillsGrid}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className={styles.skillCategory}
            variants={itemVariants}
          >
            <h3 className={styles.categoryTitle}>{skill.category}</h3>
            <ul className={styles.skillList}>
              {skill.items.map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={styles.skillItem}
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
