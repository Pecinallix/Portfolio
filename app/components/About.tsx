import { motion } from 'framer-motion';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { useState } from 'react';

export default function About() {
  const features = [
    {
      icon: Code2,
      title: 'Código Limpo',
      description:
        'Escrevo código maintível, escalável e seguindo as melhores práticas da indústria.',
    },
    {
      icon: Lightbulb,
      title: 'Soluções Criativas',
      description:
        'Transformo ideias complexas em soluções elegantes e funcionais.',
    },
    {
      icon: Rocket,
      title: 'Performance',
      description:
        'Otimização e performance são prioridades em cada projeto que desenvolvo.',
    },
    {
      icon: Users,
      title: 'Trabalho em Equipe',
      description:
        'Colaboração efetiva e comunicação clara com times multidisciplinares.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="py-20 dark:bg-gray-900 light:bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre Mim
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-lg blur opacity-25"></div>
              <div className="relative dark:bg-gray-800 light:bg-gray-50 rounded-lg p-8">
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Olá! Sou Ícaro Pecinalli, desenvolvedor apaixonado por
                  tecnologia e inovação, com foco em criar aplicações web
                  modernas e eficientes que fazem a diferença.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  Com experiência em desenvolvimento full stack, domino
                  tecnologias como React, Node.js, TypeScript e outras
                  ferramentas modernas. Estou sempre em busca de novos desafios
                  e oportunidades para crescer profissionalmente.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Meu objetivo é transformar ideias em soluções digitais de alta
                  qualidade, combinando código limpo, boas práticas e uma
                  experiência de usuário excepcional.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {features.map((feature, index) => {
              const [isHovered, setIsHovered] = useState(false);

              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="dark:bg-gray-800 light:bg-gray-50 p-6 rounded-lg transition-all relative group perspective-1000"
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 2,
                    rotateX: -2,
                    transition: { duration: 0.3 },
                  }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    animate={{
                      scale: isHovered ? 1.02 : 1,
                    }}
                  />
                  <motion.div
                    animate={{
                      rotateY: isHovered ? 360 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-10 h-10 text-cyan-400 light:text-blue-600 mb-3 relative z-10" />
                  </motion.div>
                  <h3 className="text-white font-semibold mb-2 relative z-10">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm relative z-10">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center"
        >
          {[
            { value: '3+', label: 'Anos de Experiência' },
            { value: '16+', label: 'Projetos Concluídos' },
            { value: '8+', label: 'Clientes Satisfeitos' },
            { value: '100%', label: 'Dedicação' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="dark:bg-gray-800 light:bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden group"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
            >
              <motion.div
                className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
              />
              <motion.div
                className="text-3xl sm:text-4xl font-bold text-cyan-400 light:text-blue-600 mb-1 sm:mb-2 relative z-10"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{
                  type: 'spring' as const,
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
              >
                {stat.value}
              </motion.div>
              <div className="text-gray-400 light:text-gray-600 text-sm sm:text-base relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
