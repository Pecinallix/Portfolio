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
      className="min-h-screen flex items-center justify-center relative dark:bg-black light:bg-white overflow-hidden"
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />

      {/* Subtle radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,10,0.3)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(250,250,250,0.3)_100%)]" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="mb-6"
              >
                <span className="text-sm font-display text-orange-500 tracking-widest uppercase">
                  {'<'} Bem-vindo {'>'}
                </span>
              </motion.div>

              <motion.h1
                className="text-6xl md:text-8xl font-display font-bold text-white mb-4 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                Icaro<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-500 to-blue-700">
                  Pecinalli
                </span>
              </motion.h1>

              <motion.div
                className="mb-8 h-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              >
                <TypingEffect
                  texts={typingTexts}
                  className="text-lg font-mono text-orange-500"
                />
              </motion.div>

              <motion.p
                className="text-base text-gray-300 mb-10 leading-relaxed max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
              >
                {t('hero.description')}
              </motion.p>

              <motion.div
                className="flex items-center gap-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {socialIcons.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg glass-card flex items-center justify-center transition-all duration-300"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + index * 0.1,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: 'rgba(255, 107, 53, 0.15)',
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5 text-orange-500 transition-colors" />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.a
                  href="#projects"
                  className="px-8 py-4 bg-orange-500 text-white font-display font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {t('hero.cta')}
                </motion.a>
                <motion.a
                  href="/curriculo.pdf"
                  download="Icaro_Pecinalli_Curriculo.pdf"
                  className="px-8 py-4 glass-card rounded-lg font-display font-bold text-lg text-orange-500 hover:border-orange-500/40 transition-all flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Download className="w-5 h-5" />
                  {t('hero.download')}
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right side - Visual element */}
            <motion.div
              className="hidden lg:flex items-center justify-center relative h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Animated gradient orb */}
                <motion.div
                  className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-orange-500 opacity-10 blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    y: [0, 30, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <motion.div
                  className="absolute w-72 h-72 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 opacity-10 blur-3xl"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    y: [30, 0, 30],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                />

                {/* Center circle with monospace text */}
                <motion.div
                  className="relative z-10 w-48 h-48 rounded-full border-2 border-orange-500/30 flex items-center justify-center"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <div className="text-center">
                    <p className="font-display text-orange-500 text-sm tracking-widest">{'{ DEV }'}</p>
                    <p className="text-gray-500 text-xs font-mono mt-2">creative</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
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
          className="flex flex-col items-center gap-2 text-gray-500 hover:text-orange-500 transition-colors group"
        >
          <motion.span
            className="text-xs font-mono uppercase tracking-widest"
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
            <ArrowDown className="w-4 h-4 group-hover:text-orange-500 transition-colors" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
