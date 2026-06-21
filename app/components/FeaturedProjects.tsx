import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

interface FeaturedProject {
  title: string;
  descriptionKey: string;
  url: string;
  tags: string[];
  statusKey: string;
  image: string;
}

const projects: FeaturedProject[] = [
  {
    title: 'FindMyAI',
    descriptionKey: 'featured.findMyAi.desc',
    url: 'https://www.findmyai.com.br',
    tags: ['AI Directory', 'SaaS', 'Next.js'],
    statusKey: 'featured.status.live',
    image: '/findmyai.png',
  },
  {
    title: 'String Guardian',
    descriptionKey: 'featured.stringGuardian.desc',
    url: 'https://github.com/Pecinallix/string-guardian',
    tags: ['Claude Code', 'Node.js', 'Python', 'Open Source'],
    statusKey: 'featured.status.openSource',
    image: '/stringguardian.png',
  },
  {
    title: 'PromoRadar',
    descriptionKey: 'featured.promoRadar.desc',
    url: 'https://promoradarofc.vercel.app/',
    tags: ['WhatsApp Bot', 'Automation', 'Node.js'],
    statusKey: 'featured.status.live',
    image: '/promoradar.png',
  },
  {
    title: 'Secret Forest',
    descriptionKey: 'featured.secretForest.desc',
    url: 'https://secret-forest.vercel.app/',
    tags: ['Web Game', 'Interactive', 'Vercel'],
    statusKey: 'featured.status.live',
    image: '/secretforest.png',
  },
];

export default function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-base py-28 sm:py-36">
      <div className="pointer-events-none absolute -right-40 top-20 h-[40rem] w-[40rem] glow-soft rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-6 flex items-baseline gap-4">
            <span className="index-num text-2xl">03</span>
            <span className="kicker-plain">Trabalho selecionado</span>
          </div>
          <h2 className="display mb-6 text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('featured.title')}
          </h2>
          <p className="text-lg leading-relaxed text-muted">{t('featured.subtitle')}</p>
        </motion.div>

        {/* Alternating showcase rows */}
        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, index) => {
            const reversed = index % 2 === 1;
            return (
              <motion.a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                viewport={{ once: true, amount: 0.2 }}
                className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image */}
                <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/11] overflow-hidden border border-line">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover grayscale-[0.35] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
                    <span className="absolute right-4 top-4 inline-flex items-center gap-2 bg-base/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {t(project.statusKey)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className={reversed ? 'lg:order-1' : ''}>
                  <div className="mb-4 flex items-center gap-3">
                    <span className="index-num text-lg">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px w-12 bg-line-strong" />
                  </div>
                  <h3 className="display mb-5 flex items-center gap-3 text-4xl text-ink transition-colors group-hover:text-accent sm:text-5xl">
                    {project.title}
                    <ArrowUpRight className="h-7 w-7 shrink-0 text-accent opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" strokeWidth={1.5} />
                  </h3>
                  <p className="mb-7 max-w-md leading-relaxed text-muted">
                    {t(project.descriptionKey)}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs uppercase tracking-[0.16em] text-faint"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
