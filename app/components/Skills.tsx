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
    <section id="skills" className="py-20 bg-gray-800 light:bg-gray-50">
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
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Skills with progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-900 light:bg-white p-6 rounded-lg"
            >
              <h3 className="text-2xl font-bold text-purple-400 light:text-purple-600 mb-6">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-700 light:bg-gray-200 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="h-full bg-linear-to-r from-purple-500 to-pink-500 light:from-purple-600 light:to-pink-600 rounded-full"
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
          className="bg-gray-900 light:bg-white p-8 rounded-lg"
        >
          <h3 className="text-xl sm:text-2xl font-bold text-white light:text-gray-900 mb-4 sm:mb-6 text-center">
            Tecnologias que Trabalho
          </h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
                className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base bg-gray-800 light:bg-gray-100 text-purple-400 light:text-purple-600 rounded-full font-medium hover:bg-purple-500 hover:text-white light:hover:bg-purple-600 transition-all cursor-default"
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
