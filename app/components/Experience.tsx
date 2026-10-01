import { motion } from 'framer-motion';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { education, experiences, localize } from '../data/profile';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Experience() {
  const { t, language } = useLanguage();

  return (
    <section id="experience" className="relative overflow-hidden bg-base-2 py-28 sm:py-36">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-6 flex items-baseline gap-4">
            <span className="index-num text-2xl">01</span>
            <span className="kicker-plain">{t('experience.kicker')}</span>
          </div>
          <h2 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('experience.title')}{' '}
            <span className="text-gilt serif-italic">{t('experience.titleAccent')}</span>.
          </h2>
        </motion.div>

        {/* Timeline */}
        <ol className="border-t border-line">
          {experiences.map((job, i) => {
            const company = localize(job.company, language);
            return (
              <motion.li
                key={company}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05, ease }}
                viewport={{ once: true, amount: 0.2 }}
                className="grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-[14rem_1fr] md:gap-12"
              >
                {/* Meta column */}
                <div>
                  <span className="index-num text-lg">{String(i + 1).padStart(2, '0')}</span>
                  <p className="mt-3 text-sm text-ink">{job.period[language]}</p>
                  <p className="mt-1 text-[0.68rem] uppercase tracking-[0.18em] text-faint">
                    {job.context[language]}
                  </p>
                </div>

                {/* Body */}
                <div>
                  <h3 className="display text-3xl text-ink sm:text-4xl">
                    {job.url ? (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 transition-colors hover:text-accent"
                      >
                        {company}
                        <ArrowUpRight className="h-5 w-5 text-accent opacity-60 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" strokeWidth={1.5} />
                      </a>
                    ) : (
                      company
                    )}
                  </h3>
                  <p className="mt-2 font-serif text-lg italic text-accent">{job.role[language]}</p>

                  <ul className="mt-6 max-w-3xl space-y-3">
                    {job.bullets.map((b) => (
                      <li key={b.pt} className="flex gap-3 leading-relaxed text-muted">
                        <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent" />
                        <span>{b[language]}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
                    {job.stack.map((tech) => (
                      <span key={tech} className="text-xs uppercase tracking-[0.16em] text-faint">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ol>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
        >
          <span className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-faint">
            <GraduationCap className="h-4 w-4 text-accent" strokeWidth={1.5} />
            {t('experience.education')}
          </span>
          <span className="font-serif text-lg text-ink">{education.course[language]}</span>
          <span className="text-sm text-muted">
            {education.school} · {education.period}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
