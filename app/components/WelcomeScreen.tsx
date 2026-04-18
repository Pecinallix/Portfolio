import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 400);
    const timer2 = setTimeout(() => setStep(2), 1200);
    const timer3 = setTimeout(() => setStep(3), 2200);
    const timer4 = setTimeout(() => onComplete(), 3400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  useEffect(() => {
    const lines = [
      '> init portfolio.exe',
      '> loading assets ............ ok',
      '> mounting interface ........ ok',
      '> welcome, visitor ✦',
    ];
    let i = 0;
    const id = setInterval(() => {
      setBootLines((prev) => {
        if (i >= lines.length) {
          clearInterval(id);
          return prev;
        }
        const next = [...prev, lines[i]];
        i += 1;
        return next;
      });
    }, 450);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(12px)' }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black light:bg-white overflow-hidden"
      >
        {/* Grid pattern — echoes Hero */}
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />

        {/* Radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,10,10,0.85)_100%)] light:bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(250,250,250,0.85)_100%)]" />

        {/* Ambient orbs — orange + deep blue, matching palette */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #ff6b35 0%, transparent 60%)' }}
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-40 -left-40 w-[480px] h-[480px] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #004e89 0%, transparent 60%)' }}
        />

        {/* Corner bracket crosshairs — brutalist UI framing */}
        {[
          { top: '32px', left: '32px', rotate: 0 },
          { top: '32px', right: '32px', rotate: 90 },
          { bottom: '32px', right: '32px', rotate: 180 },
          { bottom: '32px', left: '32px', rotate: 270 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-10 pointer-events-none"
            style={{ ...pos, transform: `rotate(${pos.rotate}deg)` }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-orange-500" />
            <div className="absolute top-0 left-0 w-[2px] h-full bg-orange-500" />
          </motion.div>
        ))}

        {/* Top status strip */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500"
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-orange-500"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span>SYS.BOOT</span>
          <span className="text-gray-700">//</span>
          <span>v4.1</span>
        </motion.div>

        {/* Main content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 w-full max-w-3xl">
          {/* Bracket section label — matches Hero/About */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display text-xs md:text-sm text-orange-500 tracking-[0.4em] uppercase mb-6"
          >
            {'<'} welcome {'/>'}
          </motion.span>

          {/* Main headline */}
          <AnimatePresence>
            {step >= 0 && (
              <motion.h1
                initial={{ opacity: 0, y: 24, letterSpacing: '0.3em' }}
                animate={{ opacity: 1, y: 0, letterSpacing: '-0.02em' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="font-display font-bold text-center text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
              >
                <span className="block dark:text-white light:text-gray-900">
                  {(t('welcome.msg') || 'Welcome!').replace(/!$/, '')}
                </span>
                <span className="block animate-gradient-text">
                  Ícaro Pecinalli
                </span>
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Role subtitle */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="font-mono text-sm md:text-base text-gray-400 text-center mb-10 tracking-wider"
              >
                <span className="text-orange-500">&gt;_</span>{' '}
                <span className="uppercase tracking-[0.25em]">
                  {t('hero.title')}
                </span>
              </motion.p>
            )}
          </AnimatePresence>

          {/* Progress bar — orange → blue, matches About divider */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[3px] rounded-full overflow-hidden mb-2"
                style={{ background: 'rgba(255, 255, 255, 0.06)' }}
              >
                <motion.div
                  className="absolute inset-y-0 left-0"
                  style={{
                    background:
                      'linear-gradient(90deg, #ff6b35 0%, #004e89 100%)',
                    boxShadow: '0 0 12px rgba(255, 107, 53, 0.6)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2.0, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Percent counter */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-[280px] flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-10"
              >
                <span>{t('welcome.loading') || 'loading'}</span>
                <LoadingPercent duration={2000} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Terminal boot log */}
          <AnimatePresence>
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card rounded-lg px-5 py-4 w-full max-w-md font-mono text-[11px] leading-relaxed"
              >
                {bootLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      i === bootLines.length - 1 && bootLines.length === 4
                        ? 'text-orange-500'
                        : 'text-gray-400'
                    }
                  >
                    {line}
                    {i === bootLines.length - 1 && (
                      <span className="animate-blink text-orange-500 ml-1">
                        ▊
                      </span>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom signature — coordinates, matches brutalist feel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600"
        >
          <span>BR · SP</span>
          <span className="w-8 h-[1px] bg-gray-700" />
          <span>© {new Date().getFullYear()}</span>
          <span className="w-8 h-[1px] bg-gray-700" />
          <span className="text-orange-500">ONLINE</span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function LoadingPercent({ duration }: { duration: number }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setPct(Math.round(t * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration]);

  return <span className="text-orange-500">{pct.toString().padStart(3, '0')}%</span>;
}
