import { motion } from 'framer-motion';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';

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

  return (
    <section id="about" className="py-20 bg-gray-900">
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
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25"></div>
              <div className="relative bg-gray-800 rounded-lg p-8">
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-800 p-6 rounded-lg hover:bg-gray-700 transition-all hover:scale-105"
              >
                <feature.icon className="w-10 h-10 text-purple-400 mb-3" />
                <h3 className="text-white font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-2">3+</div>
            <div className="text-gray-400">Anos de Experiência</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-2">16+</div>
            <div className="text-gray-400">Projetos Concluídos</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-2">8+</div>
            <div className="text-gray-400">Clientes Satisfeitos</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-4xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-400">Dedicação</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
