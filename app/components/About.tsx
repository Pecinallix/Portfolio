import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: '3+', label: t('about.stat.years') },
    { value: '3', label: t('about.stat.products') },
    { value: '8', label: t('about.stat.bots') },
    { value: '13k+', label: t('about.stat.tools') },
  ];

  return (
    <section id="about" className="relative overflow-hidden bg-base py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] glow-soft rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-16 flex items-baseline gap-4"
        >
          <span className="index-num text-2xl">04</span>
          <span className="kicker-plain">{t('about.kicker')}</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
            className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink"
          >
            {t('about.title')}{' '}
            <span className="text-gilt serif-italic">{t('about.titleAccent')}</span>.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            viewport={{ once: true }}
          >
            <p className="mb-6 font-serif text-2xl leading-relaxed text-ink">{t('about.p1')}</p>
            <p className="text-lg leading-relaxed text-muted">{t('about.p2')}</p>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 border-t border-line md:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`px-2 py-8 ${i !== 0 ? 'md:border-l md:border-line' : ''} ${i % 2 !== 0 ? 'border-l border-line md:border-l' : ''}`}
            >
              <div className="text-gilt display mb-2 text-5xl sm:text-6xl">{s.value}</div>
              <div className="text-xs uppercase tracking-[0.18em] text-faint">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
