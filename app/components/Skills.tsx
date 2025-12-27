import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Skills() {
  const progressRef = useRef(null);
  const isInView = useInView(progressRef, { once: true, amount: 0.3 });
  const skillCategories = [
    {
      category: 'Frontend',
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
    <section id="skills" className="py-20 dark:bg-gray-800 light:bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Habilidades & Tecnologias
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Skills with progress bars */}
        <div ref={progressRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                duration: 0.6,
                delay: categoryIndex * 0.15,
                type: 'spring' as const,
                stiffness: 100,
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="dark:bg-gray-900 light:bg-white p-6 rounded-lg relative group"
              whileHover={{ scale: 1.02 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div
                className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <motion.h3
                className="text-2xl font-bold text-cyan-400 light:text-blue-600 mb-6 relative z-10"
                initial={{ x: -20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: categoryIndex * 0.15 + 0.2 }}
                viewport={{ once: true }}
              >
                {category.category}
              </motion.h3>
              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: categoryIndex * 0.15 + skillIndex * 0.1,
                      duration: 0.4,
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <motion.span
                        className="text-gray-400 font-mono"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                        }}
                        viewport={{ once: true }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-2 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        whileInView={{ width: `${skill.level}%`, opacity: 1 }}
                        transition={{
                          width: {
                            duration: 1.2,
                            delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.2,
                            ease: 'easeOut',
                          },
                          opacity: {
                            duration: 0.3,
                            delay: categoryIndex * 0.15 + skillIndex * 0.1,
                          },
                        }}
                        viewport={{ once: true }}
                        className="h-full bg-linear-to-r from-blue-500 to-cyan-500 light:from-blue-600 light:to-cyan-600 rounded-full relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-white/30"
                          animate={{
                            x: ['-100%', '100%'],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: categoryIndex * 0.15 + skillIndex * 0.1 + 1,
                          }}
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technology tags cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="dark:bg-gray-900 light:bg-white p-8 rounded-lg dark:border-gray-700 light:border-gray-200"
        >
          <h3 className="text-xl sm:text-2xl font-bold dark:text-white light:text-slate-800 mb-4 sm:mb-6 text-center">
            Tecnologias que Trabalho
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.03,
                }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{
                  scale: 1.15,
                  rotate: [0, -5, 5, -5, 0],
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base dark:bg-gray-800 light:bg-blue-50 dark:text-cyan-400 light:text-blue-700 rounded-full font-medium dark:border-gray-700 light:border-blue-200 dark:hover:bg-blue-500 dark:hover:text-white dark:hover:border-blue-500 light:hover:bg-blue-600 light:hover:text-white light:hover:border-blue-600 transition-all cursor-pointer relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                />
                <span className="relative z-10">{tech}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
