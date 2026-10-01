import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { skillGroups } from '../data/profile';

const ease = [0.16, 1, 0.3, 1] as const;

const marquee = [
  'React', 'Next.js', 'TypeScript', 'Vue 3', 'Node.js', 'Express',
  'PostgreSQL', 'Socket.IO', 'Phaser', 'Tailwind CSS', 'nginx', 'GitHub Actions',
];

export default function Skills() {
  const { t, language } = useLanguage();

  return (
    <section id="skills" className="relative overflow-hidden bg-base-2 py-28 sm:py-36">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="mb-6 flex items-baseline gap-4">
            <span className="index-num text-2xl">03</span>
            <span className="kicker-plain">{t('skills.kicker')}</span>
          </div>
          <h2 className="display max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('skills.title')}
          </h2>
        </motion.div>

        {/* Capability columns */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-5 lg:gap-10">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title.en}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: gi * 0.08, ease }}
              viewport={{ once: true }}
            >
              <div className="mb-6 flex items-baseline gap-3 border-b border-line pb-4">
                <span className="index-num">{String(gi + 1).padStart(2, '0')}</span>
                <h3 className="font-serif text-2xl text-ink">{group.title[language]}</h3>
              </div>
              <ul className="space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Technology marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
          viewport={{ once: true }}
          className="mt-24 border-y border-line py-7"
        >
          <p className="mb-6 text-center text-[0.65rem] uppercase tracking-[0.3em] text-faint">
            {t('skills.marquee')}
          </p>
          <div className="marquee-mask overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-10">
              {[...marquee, ...marquee].map((tech, i) => (
                <span
                  key={i}
                  className="flex items-center gap-10 font-serif text-2xl text-muted sm:text-3xl"
                >
                  {tech}
                  <span className="text-accent">·</span>
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
