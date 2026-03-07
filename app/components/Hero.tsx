import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';

function TypingEffect({ texts, className }: { texts: string[]; className?: string }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting'>('typing');

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (phase === 'typing') {
      if (displayText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      }
      const pause = setTimeout(() => setPhase('deleting'), 3000);
      return () => clearTimeout(pause);
    }

    if (phase === 'deleting') {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      }
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      setPhase('paused');
    }

    if (phase === 'paused') {
      const pause = setTimeout(() => setPhase('typing'), 400);
      return () => clearTimeout(pause);
    }
  }, [displayText, phase, currentTextIndex, texts]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-blink text-cyan-400 ml-0.5">|</span>
    </span>
  );
}

export default function Hero() {
  const { t, language } = useLanguage();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const typingTexts = useMemo(
    () => [
      'Full Stack Developer',
      'React & Node.js',
      'API Builder',
    ],
    [language],
  );

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
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,7,18,0.5)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(249,250,251,0.6)_100%)]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-10 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 light:opacity-30"
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
          className="absolute -bottom-10 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 light:opacity-30 z-10"
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
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-indigo-500 rounded-full mix-blend-multiply filter blur-[120px] opacity-10 light:opacity-15"
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
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="inline-block px-4 py-1.5 text-sm sm:text-base text-cyan-400 mb-6 font-mono border border-cyan-500/20 rounded-full bg-cyan-500/5">
              {t('hero.greeting')}
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 px-4 tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          >
            Icaro Pecinalli
          </motion.h1>

          <motion.div
            className="mb-6 sm:mb-8 h-10 sm:h-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <TypingEffect
              texts={typingTexts}
              className="text-2xl sm:text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-text"
            />
          </motion.div>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-400 mb-10 sm:mb-12 max-w-2xl mx-auto px-4 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: 'easeOut' }}
          >
            {t('hero.description')}
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-3 sm:gap-5 mb-10 sm:mb-12"
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
                className="p-3 sm:p-3.5 glass-card rounded-xl hover:border-cyan-500/40 transition-all duration-300"
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
                  scale: 1.15,
                  y: -4,
                }}
                whileTap={{ scale: 0.95 }}
              >
                <social.icon className="w-5 h-5 sm:w-6 sm:h-6 dark:text-gray-300 light:text-slate-600 hover:text-cyan-400 transition-colors" />
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
              className="w-full sm:w-auto px-8 py-3.5 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all text-center"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {t('hero.cta')}
            </motion.a>
            <motion.a
              href="/curriculo.pdf"
              download="Icaro_Pecinalli_Curriculo.pdf"
              className="w-full sm:w-auto px-8 py-3.5 glass-card rounded-xl font-semibold text-blue-400 hover:border-blue-500/40 transition-all text-center flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Download className="w-5 h-5" />
              {t('hero.download')}
            </motion.a>
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3.5 glass-card rounded-xl font-semibold text-cyan-400 light:text-cyan-700 hover:border-cyan-500/40 transition-all text-center"
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
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors group"
        >
          <motion.span
            className="text-xs font-medium uppercase tracking-widest"
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
            <ArrowDown className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
