import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Hero() {
  const { t } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialIcons = [
    {
      href: 'https://github.com/Pecinallix',
      icon: Github,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/icaropecinalli/',
      icon: Linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'mailto:icaropecinalli@gmail.com',
      icon: Mail,
      label: 'Email',
    },
  ];

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative dark:bg-gray-900 light:bg-gray-50 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30"
          animate={{
            x: mousePosition.x * 0.5,
            y: mousePosition.y * 0.5,
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
            scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
        <motion.div
          className="absolute -bottom-10 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30 z-10"
          animate={{
            x: mousePosition.x * -0.3,
            y: mousePosition.y * -0.3,
            scale: [1, 1.2, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
            scale: {
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            },
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30"
          animate={{
            x: mousePosition.x * 0.4,
            y: mousePosition.y * 0.4,
            scale: [1, 1.15, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 20 },
            y: { type: 'spring', stiffness: 50, damping: 20 },
            scale: {
              duration: 4.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            },
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h2 className="text-base sm:text-lg md:text-xl text-cyan-400 mb-3 sm:mb-4 font-mono">
              {t('hero.greeting')}
            </h2>
          </motion.div>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 px-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Ícaro Pecinalli
            <motion.span
              className="block bg-linear-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent mt-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
              {t('hero.title')}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {socialIcons.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 dark:bg-gray-800 light:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-gray-200 rounded-full transition-colors"
                aria-label={social.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.4,
                  delay: 0.9 + index * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white light:text-slate-800" />
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-shadow text-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {t('hero.cta')}
            </motion.a>
            <motion.a
              href="/curriculo.pdf"
              download="Icaro_Pecinalli_Curriculo.pdf"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-blue-500 text-blue-400 rounded-full font-semibold hover:bg-blue-500/10 transition-colors text-center flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Download className="w-5 h-5" />
              {t('hero.download')}
            </motion.a>
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-colors text-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {t('hero.contact')}
            </motion.a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 1.5,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 1,
        }}
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors group"
        >
          <motion.span
            className="text-sm font-medium"
            whileHover={{ y: -2 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            Scroll
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <ArrowDown className="w-5 h-5 group-hover:text-cyan-400 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
