import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  particles: Particle[];
}

interface Particle {
  id: number;
  angle: number;
  velocity: number;
  size: number;
}

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(0);
  const [fireworks, setFireworks] = useState<Firework[]>([]);

  useEffect(() => {
    const colors = [
      '#3b82f6',
      '#06b6d4',
      '#14b8a6',
      '#f59e0b',
      '#ec4899',
      '#a855f7',
      '#ef4444',
    ];

    const createFirework = () => {
      const newFirework: Firework = {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 50 + 10,
        color: colors[Math.floor(Math.random() * colors.length)],
        particles: Array.from({ length: 50 }, (_, i) => ({
          id: i,
          angle: (Math.PI * 2 * i) / 50 + (Math.random() - 0.5) * 0.3,
          velocity: Math.random() * 2 + 2.5,
          size: Math.random() * 2 + 1,
        })),
      };

      setFireworks((prev) => [...prev, newFirework]);

      setTimeout(() => {
        setFireworks((prev) => prev.filter((fw) => fw.id !== newFirework.id));
      }, 2000);
    };

    const interval = setInterval(() => {
      if (step >= 1) {
        createFirework();
      }
    }, 500);

    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 500);
    const timer2 = setTimeout(() => setStep(2), 1500);
    const timer3 = setTimeout(() => setStep(3), 2500);
    const timer4 = setTimeout(() => onComplete(), 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center dark:bg-gray-900 light:bg-gray-50 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-10 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -bottom-10 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30"
          />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
          <AnimatePresence mode="wait">
            {step >= 0 && (
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                }}
                className="text-center"
              >
                <motion.h1
                  className="text-6xl md:text-8xl font-bold bg-linear-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  {t('welcome.msg')}
                </motion.h1>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center space-y-2"
              >
                <motion.p
                  className="text-xl md:text-2xl text-cyan-400 font-mono"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Ícaro Pecinalli
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-lg md:text-xl dark:text-white light:text-gray-800 font-semibold"
                  initial={{ letterSpacing: '0.5em', opacity: 0 }}
                  animate={{ letterSpacing: '0.1em', opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {t('hero.title')}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 1 && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-1 bg-gray-700 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step >= 2 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="text-sm text-gray-500 font-mono"
              >
                {t('welcome.loading') || 'Carregando...'}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {fireworks.map((firework) => {
            const colorVariants = [
              firework.color,
              `${firework.color}dd`,
              `${firework.color}aa`,
            ];

            return (
              <div
                key={firework.id}
                className="absolute"
                style={{
                  left: `${firework.x}%`,
                  top: `${firework.y}%`,
                }}
              >
                <motion.div
                  className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundColor: firework.color,
                    boxShadow: `0 0 40px ${firework.color}, 0 0 80px ${firework.color}, 0 0 120px ${firework.color}`,
                  }}
                  initial={{ scale: 0, opacity: 1, width: 8, height: 8 }}
                  animate={{
                    scale: [0, 4, 2, 0],
                    opacity: [1, 0.9, 0.5, 0],
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />

                {firework.particles.map((particle) => {
                  const colorVariant =
                    colorVariants[
                      Math.floor(Math.random() * colorVariants.length)
                    ];
                  const distance = particle.velocity * 60;
                  const endX = Math.cos(particle.angle) * distance;
                  const endY = Math.sin(particle.angle) * distance + 40;

                  return (
                    <motion.div
                      key={particle.id}
                      className="absolute rounded-full"
                      style={{
                        backgroundColor: colorVariant,
                        boxShadow: `0 0 8px ${firework.color}, 0 0 16px ${firework.color}`,
                        width: particle.size * 2,
                        height: particle.size * 2,
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: endX,
                        y: endY,
                        scale: [0, 1.5, 1, 0.3],
                        opacity: [0, 1, 0.9, 0],
                      }}
                      transition={{
                        duration: 2,
                        ease: [0.33, 1, 0.68, 1],
                        times: [0, 0.1, 0.5, 1],
                      }}
                    />
                  );
                })}

                {firework.particles.slice(0, 25).map((particle) => {
                  const distance = particle.velocity * 40;
                  const angleOffset = Math.random() * 0.5 - 0.25;
                  const endX =
                    Math.cos(particle.angle + angleOffset) * distance;
                  const endY =
                    Math.sin(particle.angle + angleOffset) * distance + 25;

                  return (
                    <motion.div
                      key={`trail-${particle.id}`}
                      className="absolute rounded-full"
                      style={{
                        backgroundColor: `${firework.color}88`,
                        boxShadow: `0 0 4px ${firework.color}`,
                        width: particle.size,
                        height: particle.size,
                      }}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: endX,
                        y: endY,
                        scale: [0, 1, 0.5, 0],
                        opacity: [0, 0.7, 0.5, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        delay: 0.1,
                        ease: [0.33, 1, 0.68, 1],
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
