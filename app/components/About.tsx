import { motion } from 'framer-motion';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const { t } = useLanguage();

  const features = [
    { icon: Code2, num: '01', title: t('about.feature1.title'), description: t('about.feature1.desc') },
    { icon: Lightbulb, num: '02', title: t('about.feature2.title'), description: t('about.feature2.desc') },
    { icon: Rocket, num: '03', title: t('about.feature3.title'), description: t('about.feature3.desc') },
    { icon: Users, num: '04', title: t('about.feature4.title'), description: t('about.feature4.desc') },
  ];

  const stats = [
    { value: '3+', label: t('about.stat1') },
    { value: '16+', label: t('about.stat2') },
    { value: '8+', label: t('about.stat3') },
    { value: '100%', label: t('about.stat4') },
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
          <span className="index-num text-2xl">01</span>
          <span className="kicker-plain">Sobre</span>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
          {/* Prose */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            viewport={{ once: true }}
          >
            <h2 className="display mb-10 text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
              Construo software com{' '}
              <span className="text-gilt serif-italic">intenção</span>.
            </h2>
            <p className="mb-6 font-serif text-2xl leading-relaxed text-ink">
              {t('about.intro1')}
            </p>
            <p className="mb-6 text-lg leading-relaxed text-muted">
              {t('about.intro2')}
            </p>
            <p className="text-lg leading-relaxed text-muted">
              {t('about.intro3')}
            </p>
          </motion.div>

          {/* Feature list */}
          <div className="lg:pt-4">
            {features.map((f, i) => (
              <motion.div
                key={f.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
                viewport={{ once: true }}
                className="group flex gap-5 border-t border-line py-7 transition-colors last:border-b hover:bg-surface/40"
              >
                <span className="index-num pt-1 text-lg">{f.num}</span>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <f.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                    <h3 className="font-serif text-xl text-ink">{f.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
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
              key={i}
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
