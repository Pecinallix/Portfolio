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
  image: string;
}

const projects: FeaturedProject[] = [
  {
    title: 'Secret Forest',
    descriptionKey: 'featured.secretForest.desc',
    url: 'https://secret-forest.vercel.app/',
    icon: Gamepad2,
    gradient: 'from-orange-500 to-orange-600',
    glowColor: 'rgba(255, 107, 53, 0.3)',
    tags: ['Web Game', 'Interactive', 'Vercel'],
    statusKey: 'featured.status.live',
    image: '/secretforest.png',
  },
  {
    title: 'PromoRadar',
    descriptionKey: 'featured.promoRadar.desc',
    url: 'https://promoradarofc.vercel.app/',
    icon: Bot,
    gradient: 'from-blue-700 to-blue-800',
    glowColor: 'rgba(0, 78, 137, 0.3)',
    tags: ['WhatsApp Bot', 'Automation', 'Node.js'],
    statusKey: 'featured.status.live',
    image: '/promoradar.png',
  },
  {
    title: 'Rapid API Services',
    descriptionKey: 'featured.shopeeApi.desc',
    url: 'https://rapidapi.com/user/icaropecinalli',
    icon: Code2,
    gradient: 'from-orange-600 to-blue-700',
    glowColor: 'rgba(255, 107, 53, 0.4)',
    tags: ['REST API', 'RapidAPI', 'E-commerce'],
    statusKey: 'featured.status.live',
    image: '/rapidapi.png',
  },
];

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="py-24 dark:bg-black light:bg-white relative section-divider">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <span className="text-orange-500 font-display text-sm uppercase tracking-widest mb-3 block">
            {'<'} featured {'>'}
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">
            {t('featured.title')}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-orange-500 to-blue-700 rounded-full"></div>
          <p className="text-gray-400 mt-6 max-w-2xl">
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
              className="group relative rounded-2xl border dark:border-white/30 light:border-black/30 overflow-hidden flex flex-col cursor-pointer"
              style={{
                transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px -10px ${project.glowColor}`;
                e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              {/* Project image header */}
              <div className="h-48 relative overflow-hidden bg-gray-900">
                {/* Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white font-medium">
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
                <h3 className="text-xl font-display font-bold text-white light:text-gray-800 mb-2 group-hover:text-orange-400 transition-colors">
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
