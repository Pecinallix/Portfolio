import { motion } from 'framer-motion';
import { Code2, Lightbulb, Rocket, Users } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Code2,
      title: t('about.feature1.title'),
      description: t('about.feature1.desc'),
    },
    {
      icon: Lightbulb,
      title: t('about.feature2.title'),
      description: t('about.feature2.desc'),
    },
    {
      icon: Rocket,
      title: t('about.feature3.title'),
      description: t('about.feature3.desc'),
    },
    {
      icon: Users,
      title: t('about.feature4.title'),
      description: t('about.feature4.desc'),
    },
  ];

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
            {t('about.title')}
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
                  {t('about.intro1')}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-4">
                  {t('about.intro2')}
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {t('about.intro3')}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
                viewport={{ once: true, amount: 0.2 }}
                className="dark:bg-gray-800 light:bg-gray-50 p-6 rounded-lg relative group"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="inline-block"
                >
                  <feature.icon className="w-10 h-10 text-cyan-400 light:text-blue-600 mb-3 relative z-10" />
                </motion.div>
                <h3 className="text-white light:text-gray-800 font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 light:text-gray-600 text-sm relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          {[
            { value: '3+', label: t('about.stat1') },
            { value: '16+', label: t('about.stat2') },
            { value: '8+', label: t('about.stat3') },
            { value: '100%', label: t('about.stat4') },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              viewport={{ once: true, amount: 0.3 }}
              className="dark:bg-gray-800 light:bg-gray-50 p-4 sm:p-6 rounded-lg relative overflow-hidden group"
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl font-bold text-cyan-400 light:text-blue-600 mb-1 sm:mb-2 relative z-10">
                {stat.value}
              </div>
              <div className="text-gray-400 light:text-gray-600 text-sm sm:text-base relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
