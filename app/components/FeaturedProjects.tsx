import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT, featuredProjects, sideProjects } from '../data/profile';
import type { FeaturedProject } from '../data/profile';

const ease = [0.16, 1, 0.3, 1] as const;

function ProjectRow({ project, index }: { project: FeaturedProject; index: number }) {
  const { t, language } = useLanguage();
  const reversed = index % 2 === 1;

  const content = (
    <>
      {/* Image */}
      <div className={`relative ${reversed ? 'lg:order-2' : ''}`}>
        <div className="relative aspect-[16/10] overflow-hidden border border-line">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="h-full w-full object-cover object-top grayscale-[0.35] transition-all duration-700 ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base/70 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
          <span className="absolute right-4 top-4 inline-flex items-center gap-2 bg-base/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.status[language]}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className={reversed ? 'lg:order-1' : ''}>
        <div className="mb-4 flex items-center gap-3">
          <span className="index-num text-lg">{String(index + 1).padStart(2, '0')}</span>
          <span className="h-px w-12 bg-line-strong" />
        </div>
        <h3 className="display mb-3 flex items-center gap-3 text-4xl text-ink transition-colors group-hover:text-accent sm:text-5xl">
          {project.title}
          {project.url && (
            <ArrowUpRight className="h-7 w-7 shrink-0 text-accent opacity-0 transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" strokeWidth={1.5} />
          )}
        </h3>
        <p className="mb-5 font-serif text-lg italic text-accent">{project.highlight[language]}</p>
        <p className="mb-7 max-w-md leading-relaxed text-muted">{project.description[language]}</p>
        <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs uppercase tracking-[0.16em] text-faint">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-sm text-muted">
          {project.url ? (
            <span className="link-underline">
              {t('projects.visit')} · {project.linkLabel}
            </span>
          ) : (
            <span className="text-faint">{t('projects.noLink')}</span>
          )}
        </span>
      </div>
    </>
  );

  const motionProps = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease },
    viewport: { once: true, amount: 0.2 },
    className: 'group grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16',
  };

  return project.url ? (
    <motion.a href={project.url} target="_blank" rel="noopener noreferrer" {...motionProps}>
      {content}
    </motion.a>
  ) : (
    <motion.div {...motionProps}>{content}</motion.div>
  );
}

export default function FeaturedProjects() {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="relative overflow-hidden bg-base py-28 sm:py-36">
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
            <span className="index-num text-2xl">02</span>
            <span className="kicker-plain">{t('projects.kicker')}</span>
          </div>
          <h2 className="display mb-6 text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('projects.title')}
          </h2>
          <p className="text-lg leading-relaxed text-muted">{t('projects.subtitle')}</p>
        </motion.div>

        {/* Alternating showcase rows */}
        <div className="space-y-24 sm:space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectRow key={project.title} project={project} index={index} />
          ))}
        </div>

        {/* Open source & side projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mt-32"
        >
          <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
            <h3 className="font-serif text-3xl text-ink">{t('projects.side.title')}</h3>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 text-sm"
            >
              <Github className="h-4 w-4" />
              {t('projects.side.more')}
            </a>
          </div>

          <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
            {sideProjects.map((project) => (
              <a
                key={project.title}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col border-b border-r border-line p-7 transition-colors hover:bg-surface"
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <h4 className="font-serif text-xl text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h4>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" strokeWidth={1.5} />
                </div>
                <p className="mb-5 grow text-sm leading-relaxed text-muted">{project.description[language]}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
