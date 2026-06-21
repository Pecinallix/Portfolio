import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

const skillCategories = [
  {
    category: 'Frontend',
    num: '01',
    skills: [
      { name: 'React', level: 70 },
      { name: 'TypeScript', level: 65 },
      { name: 'Tailwind CSS', level: 80 },
      { name: 'JavaScript', level: 75 },
      { name: 'HTML / CSS', level: 85 },
    ],
  },
  {
    category: 'Backend',
    num: '02',
    skills: [
      { name: 'Node.js', level: 65 },
      { name: 'Express', level: 60 },
      { name: 'REST APIs', level: 70 },
      { name: 'SQL', level: 55 },
      { name: 'MongoDB', level: 50 },
    ],
  },
  {
    category: 'Ferramentas',
    num: '03',
    skills: [
      { name: 'Git / GitHub', level: 80 },
      { name: 'VS Code', level: 85 },
      { name: 'NPM / Yarn', level: 70 },
      { name: 'Linux', level: 50 },
      { name: 'CI / CD', level: 55 },
    ],
  },
];

const technologies = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'TypeScript',
  'Node.js', 'Express', 'Tailwind CSS', 'Git', 'GitHub', 'REST API',
  'MongoDB', 'SQL', 'Responsive Design',
];

export default function Skills() {
  const { t } = useLanguage();

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
            <span className="index-num text-2xl">02</span>
            <span className="kicker-plain">Habilidades</span>
          </div>
          <h2 className="display max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('skills.title')}
          </h2>
        </motion.div>

        {/* Capability columns */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-16">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: ci * 0.1, ease }}
              viewport={{ once: true }}
            >
              <div className="mb-8 flex items-baseline gap-3 border-b border-line pb-4">
                <span className="index-num">{cat.num}</span>
                <h3 className="font-serif text-2xl text-ink">{cat.category}</h3>
              </div>

              <ul className="space-y-6">
                {cat.skills.map((skill, si) => (
                  <li key={skill.name}>
                    <div className="mb-2 flex items-baseline justify-between">
                      <span className="text-ink">{skill.name}</span>
                      <span className="font-serif italic text-sm text-faint">
                        {skill.level}
                      </span>
                    </div>
                    <div className="h-px w-full bg-line">
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: skill.level / 100 }}
                        transition={{ duration: 1, delay: 0.2 + si * 0.06, ease }}
                        viewport={{ once: true }}
                        className="h-px origin-left bg-accent"
                      />
                    </div>
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
            {t('skills.subtitle')}
          </p>
          <div className="marquee-mask overflow-hidden">
            <div className="flex w-max animate-marquee items-center gap-10">
              {[...technologies, ...technologies].map((tech, i) => (
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
