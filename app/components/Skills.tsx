import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export default function Skills() {
  const { t } = useLanguage();
  const skillCategories = [
    {
      category: 'Frontend',
      icon: '{ }',
      skills: [
        { name: 'HTML/CSS', level: 85 },
        { name: 'JavaScript', level: 75 },
        { name: 'React', level: 70 },
        { name: 'TypeScript', level: 65 },
        { name: 'Tailwind CSS', level: 80 },
      ],
    },
    {
      category: 'Backend',
      icon: '> _',
      skills: [
        { name: 'Node.js', level: 65 },
        { name: 'Express', level: 60 },
        { name: 'SQL', level: 55 },
        { name: 'MongoDB', level: 50 },
        { name: 'REST APIs', level: 70 },
      ],
    },
    {
      category: 'DevOps & Tools',
      icon: '~/.',
      skills: [
        { name: 'Git', level: 75 },
        { name: 'GitHub', level: 80 },
        { name: 'VS Code', level: 85 },
        { name: 'NPM/Yarn', level: 70 },
        { name: 'Linux', level: 50 },
      ],
    },
  ];

  const technologies = [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'Tailwind CSS',
    'Git',
    'GitHub',
    'REST API',
    'MongoDB',
    'SQL',
    'VS Code',
    'Responsive Design',
  ];

  return (
    <section id="skills" className="py-24 dark:bg-gray-800 light:bg-gray-50 relative section-divider">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3 block">
            &lt;skills /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t('skills.title')}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: categoryIndex * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, amount: 0.2 }}
              className="glass-card p-6 rounded-2xl relative group overflow-hidden"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-cyan-400 font-mono text-lg bg-cyan-500/10 px-3 py-1 rounded-lg">
                  {category.icon}
                </span>
                <h3 className="text-2xl font-bold text-cyan-400 light:text-blue-600">
                  {category.category}
                </h3>
              </div>
              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 light:text-gray-700 font-medium text-sm">
                        {skill.name}
                      </span>
                      <span className="text-gray-500 light:text-gray-500 font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full dark:bg-gray-700/50 light:bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1.2,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="h-full bg-linear-to-r from-blue-500 to-cyan-500 light:from-blue-600 light:to-cyan-600 rounded-full relative"
                        style={{
                          boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="glass-card p-8 rounded-2xl"
        >
          <h3 className="text-xl sm:text-2xl font-bold dark:text-white light:text-slate-800 mb-6 text-center">
            {t('skills.subtitle')}
          </h3>
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.08,
                }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 text-sm sm:text-base dark:bg-gray-800/80 light:bg-blue-50 dark:text-cyan-400 light:text-blue-700 rounded-xl font-medium dark:hover:bg-cyan-500/20 dark:hover:text-cyan-300 light:hover:bg-blue-600 light:hover:text-white transition-all duration-200 cursor-pointer border border-transparent dark:hover:border-cyan-500/30 light:hover:border-blue-500/30"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
