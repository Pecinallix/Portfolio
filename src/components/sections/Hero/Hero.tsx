'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { ArrowDown, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/3 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
      >
        <motion.div variants={itemVariants} className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm text-gray-300">
              Disponível para novos projetos
            </span>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white">{t('heroTitle')}</span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Criativo
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          {t('heroSubtitle')}
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
        >
          <Link
            href="/projects"
            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2 overflow-hidden"
          >
            <span className="relative z-10">{t('viewWork')}</span>
            <ExternalLink
              size={20}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>

          <a
            href="/cv.pdf"
            download
            className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 flex items-center space-x-2"
          >
            <Download size={20} className="group-hover:animate-bounce" />
            <span>{t('downloadCV')}</span>
          </a>
        </motion.div>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-white/60 cursor-pointer"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Code Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {/* Bloco 1 Corrigido */}
        <div className="absolute top-20 left-10 text-xs font-mono text-white/20 transform -rotate-12">
          {'const developer = {'}
          <br />
          {"  name: 'Frontend Dev',"}
          <br />
          {"  skills: ['React', 'TypeScript']"}
          <br />
          {'}'}
        </div>

        {/* Bloco 2 Corrigido */}
        <div className="absolute bottom-20 right-10 text-xs font-mono text-white/20 transform rotate-12">
          {'function createAwesome() {'}
          <br />
          {'  return innovation + passion;'}
          <br />
          {'}'}
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
