import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useEffect, useState, useMemo, useRef } from 'react';

// Skills Orrery Component
function SkillsOrrery() {
  const [rotations, setRotations] = useState({ orbit1: 0, orbit2: 0, orbit3: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const animationRef = useRef<number>();

  const skills = [
    { name: 'React', orbit: 1, color: '#61dafb' },
    { name: 'TypeScript', orbit: 1, color: '#3178c6' },
    { name: 'Node.js', orbit: 1, color: '#68a063' },
    { name: 'Tailwind', orbit: 2, color: '#06b6d4' },
    { name: 'MongoDB', orbit: 2, color: '#13aa52' },
    { name: 'Express', orbit: 2, color: '#000000' },
    { name: 'Git', orbit: 3, color: '#f1502f' },
    { name: 'REST API', orbit: 3, color: '#ff6b35' },
    { name: 'SQL', orbit: 3, color: '#00758f' },
  ];

  useEffect(() => {
    const animate = () => {
      setRotations((prev) => ({
        orbit1: (prev.orbit1 + 1.5) % 360,
        orbit2: (prev.orbit2 - 0.8) % 360,
        orbit3: (prev.orbit3 + 0.4) % 360,
      }));
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current!);
  }, []);

  const getSkillPosition = (skill: typeof skills[0]) => {
    const skillsInOrbit = skills.filter((s) => s.orbit === skill.orbit);
    const index = skillsInOrbit.indexOf(skill);
    const angleOffset = (index / skillsInOrbit.length) * 360;

    const orbitRadius = skill.orbit === 1 ? 80 : skill.orbit === 2 ? 140 : 200;
    const rotation =
      skill.orbit === 1 ? rotations.orbit1 :
      skill.orbit === 2 ? rotations.orbit2 : rotations.orbit3;

    const angle = ((rotation + angleOffset) * Math.PI) / 180;
    const x = Math.cos(angle) * orbitRadius;
    const y = Math.sin(angle) * orbitRadius;

    return { x, y };
  };

  return (
    <motion.div
      className="hidden lg:flex items-center justify-center relative h-96"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Glowing auras */}
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-gradient-to-br from-orange-500 to-orange-500 opacity-15 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-700/40 to-transparent opacity-10 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* SVG Orbits */}
        <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
          <defs>
            <style>{`
              .orbit-ring { fill: none; stroke: rgba(255, 107, 53, 0.1); stroke-width: 1; stroke-dasharray: 5,5; }
            `}</style>
          </defs>
          <circle cx="50%" cy="50%" r="80" className="orbit-ring" />
          <circle cx="50%" cy="50%" r="140" className="orbit-ring" />
          <circle cx="50%" cy="50%" r="200" className="orbit-ring" />
        </svg>

        {/* Skills in orbits */}
        {skills.map((skill, idx) => {
          const pos = getSkillPosition(skill);
          const isHovered = hoveredIndex === idx;

          return (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                x: pos.x,
                y: pos.y,
              }}
              animate={{
                scale: isHovered ? 1.3 : 1,
              }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="px-3 py-1.5 glass-card rounded-full text-xs font-semibold text-white cursor-pointer relative whitespace-nowrap"
                style={{ backgroundColor: `${skill.color}15`, borderColor: `${skill.color}40` }}
                animate={{
                  boxShadow: isHovered ? `0 0 20px ${skill.color}60` : 'none',
                }}
              >
                <span style={{ color: skill.color }}>{skill.name}</span>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center nucleus */}
        <motion.div
          className="relative z-20 w-32 h-32 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, transparent 70%)',
            boxShadow: '0 0 40px rgba(255, 107, 53, 0.3)',
          }}
          animate={{
            boxShadow: ['0 0 30px rgba(255, 107, 53, 0.2)', '0 0 50px rgba(255, 107, 53, 0.4)', '0 0 30px rgba(255, 107, 53, 0.2)'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="text-center">
            <p className="font-display text-3xl text-orange-500 tracking-tight">
              {'</>'}
            </p>
            <motion.p
              className="text-gray-400 text-xs font-mono mt-2"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              creative dev
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function TypingEffect({
  texts,
  className,
}: {
  texts: string[];
  className?: string;
}) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState<'typing' | 'paused' | 'deleting'>(
    'typing',
  );

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
    () => ['Full Stack Developer', 'React & Node.js', 'API Builder'],
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
                Icaro
                <br />
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

            {/* Right side - Orrery of Skills */}
            <SkillsOrrery />
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
