import { motion } from 'framer-motion';
import { ExternalLink, Gamepad2, Bot, Code2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FeaturedProject {
  title: string;
  descriptionKey: string;
  url: string;
  icon: typeof Gamepad2;
  gradient: string;
  glowColor: string;
  tags: string[];
  statusKey: string;
}

const projects: FeaturedProject[] = [
  {
    title: 'Secret Forest',
    descriptionKey: 'featured.secretForest.desc',
    url: 'https://secret-forest.vercel.app/',
    icon: Gamepad2,
    gradient: 'from-emerald-500 via-green-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    tags: ['Web Game', 'Interactive', 'Vercel'],
    statusKey: 'featured.status.live',
  },
  {
    title: 'PromoRadar',
    descriptionKey: 'featured.promoRadar.desc',
    url: 'https://promoradarofc.vercel.app/',
    icon: Bot,
    gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.3)',
    tags: ['WhatsApp Bot', 'Automation', 'Node.js'],
    statusKey: 'featured.status.live',
  },
  {
    title: 'Shopee Deals API',
    descriptionKey: 'featured.shopeeApi.desc',
    url: 'https://rapidapi.com/icaropecinalli/api/shopee-deals-flash-sale',
    icon: Code2,
    gradient: 'from-orange-500 via-red-500 to-pink-500',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    tags: ['REST API', 'RapidAPI', 'E-commerce'],
    statusKey: 'featured.status.live',
  },
];

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="py-24 dark:bg-gray-800 light:bg-gray-50 relative section-divider">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3 block">
            &lt;featured /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t('featured.title')}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t('featured.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.15,
                ease: 'easeOut',
              }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.25 },
              }}
              className="group relative glass-card rounded-2xl overflow-hidden flex flex-col cursor-pointer"
              style={{
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px -10px ${project.glowColor}`;
                e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.1)';
              }}
            >
              {/* Gradient header */}
              <div className={`h-40 bg-linear-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />

                {/* Icon */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <project.icon className="w-16 h-16 text-white/80 group-hover:text-white transition-colors" />
                </motion.div>

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs text-white font-medium">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    {t(project.statusKey)}
                  </span>
                </div>

                {/* External link indicator */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white">
                    <ExternalLink className="w-3 h-3" />
                    {t('featured.visit')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-white light:text-gray-800 mb-2 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 light:text-gray-600 text-sm leading-relaxed mb-5 grow">
                  {t(project.descriptionKey)}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2.5 py-0.5 dark:bg-gray-800/80 light:bg-gray-100 dark:text-gray-300 light:text-gray-600 text-xs font-medium rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
