import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Palette, Zap, Users, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

interface Skill {
  name: string;
  level: number;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const skills: Skill[] = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'JavaScript', level: 95 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'Tailwind CSS', level: 85 },
    { name: 'Next.js', level: 80 },
    { name: 'Node.js', level: 75 },
    { name: 'Git', level: 90 },
  ];

  const features: Feature[] = [
    {
      icon: Code,
      title: 'Código Limpo',
      description:
        'Escrevo código limpo, reutilizável e bem documentado seguindo as melhores práticas.',
    },
    {
      icon: Palette,
      title: 'Design Responsivo',
      description:
        'Crio interfaces que funcionam perfeitamente em todos os dispositivos e tamanhos de tela.',
    },
    {
      icon: Zap,
      title: 'Performance',
      description:
        'Otimizo aplicações para máxima performance e experiência do usuário.',
    },
    {
      icon: Users,
      title: 'Colaboração',
      description:
        'Trabalho bem em equipe e me comunico efetivamente com designers e desenvolvedores.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {t('aboutTitle')}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('aboutText')}
          </p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="relative">
              <div className="w-80 h-80 mx-auto lg:mx-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10">
                <Image
                  width={500}
                  height={500}
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white text-black p-4 rounded-xl shadow-xl">
                <div className="text-2xl font-bold">3+</div>
                <div className="text-sm">{t('yearsExp')}</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t('skills')}
              </h3>
              <div className="space-y-4">
                {skills.map((skill: Skill, index: number) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="bg-gradient-to-r from-white to-gray-400 h-2 rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400">Projetos Concluídos</div>
              </div>
              <div className="bg-gray-900/50 p-6 rounded-xl border border-white/10">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-gray-400">Clientes Satisfeitos</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature: Feature, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="bg-gray-900/50 p-6 rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300 group"
            >
              <div className="mb-4">
                <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default About;
