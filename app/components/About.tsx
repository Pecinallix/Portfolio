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
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Lightbulb,
      title: t('about.feature2.title'),
      description: t('about.feature2.desc'),
      gradient: 'from-cyan-500 to-teal-500',
    },
    {
      icon: Rocket,
      title: t('about.feature3.title'),
      description: t('about.feature3.desc'),
      gradient: 'from-teal-500 to-emerald-500',
    },
    {
      icon: Users,
      title: t('about.feature4.title'),
      description: t('about.feature4.desc'),
      gradient: 'from-indigo-500 to-blue-500',
    },
  ];

  return (
    <section id="about" className="py-24 dark:bg-gray-900 light:bg-white relative section-divider">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3 block">
            &lt;about /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t('about.title')}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative glass-card rounded-2xl p-8">
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
                className="glass-card p-6 rounded-2xl relative group overflow-hidden"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 },
                }}
              >
                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  className="inline-block"
                >
                  <div className={`inline-flex p-2.5 rounded-xl bg-linear-to-br ${feature.gradient} bg-opacity-10 mb-3`}>
                    <feature.icon className="w-8 h-8 text-white opacity-90" />
                  </div>
                </motion.div>
                <h3 className="text-white light:text-gray-800 font-semibold mb-2 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-400 light:text-gray-600 text-sm relative z-10 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
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
              className="glass-card p-5 sm:p-6 rounded-2xl text-center relative overflow-hidden group"
              whileHover={{
                y: -4,
                transition: { duration: 0.2 },
              }}
            >
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-1 sm:mb-2 relative z-10">
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
