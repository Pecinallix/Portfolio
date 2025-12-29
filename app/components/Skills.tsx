import { motion } from 'framer-motion';

export default function Skills() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
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
              className="dark:bg-gray-900 light:bg-white p-6 rounded-lg relative group"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h3 className="text-2xl font-bold text-cyan-400 light:text-blue-600 mb-6 relative z-10">
                {category.category}
              </h3>
              <div className="space-y-4 relative z-10">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 light:text-gray-700 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 light:text-gray-600 font-mono text-sm">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full dark:bg-gray-700 light:bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.1 + skillIndex * 0.05,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="h-full bg-linear-to-r from-blue-500 to-cyan-500 light:from-blue-600 light:to-cyan-600 rounded-full"
                      />
                    </div>
                  </div>
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
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.15,
                }}
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base dark:bg-gray-800 light:bg-blue-50 dark:text-cyan-400 light:text-blue-700 rounded-full font-medium dark:hover:bg-blue-500 dark:hover:text-white light:hover:bg-blue-600 light:hover:text-white transition-colors duration-200 cursor-pointer"
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
