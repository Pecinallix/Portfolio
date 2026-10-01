import type { Route } from './+types/home';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Experience from '../components/Experience';
import FeaturedProjects from '../components/FeaturedProjects';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import { useLanguage } from '../contexts/LanguageContext';
import { CONTACT } from '../data/profile';

const TITLE = 'Ícaro Pecinalli — Desenvolvedor Full Stack';
const DESCRIPTION =
  'Desenvolvedor full stack (React, Node.js, PostgreSQL) que coloca produto no ar: Idle RO, FindMyAI e PromoRadar. Disponível para vagas remotas ou com mudança.';

export function meta({}: Route.MetaArgs) {
  return [
    { title: TITLE },
    { name: 'description', content: DESCRIPTION },
    { name: 'author', content: 'Ícaro Pecinalli' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: TITLE },
    { property: 'og:description', content: DESCRIPTION },
    { property: 'og:locale', content: 'pt_BR' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: TITLE },
    { name: 'twitter:description', content: DESCRIPTION },
  ];
}

export default function Home() {
  const { t } = useLanguage();

  const navLinks = [
    { href: '#experience', label: t('nav.experience') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#about', label: t('nav.about') },
    { href: '#contact', label: t('nav.contact') },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Experience />
        <FeaturedProjects />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="relative overflow-hidden bg-base border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-20">
          {/* Big CTA wordmark */}
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <p className="kicker-plain mb-4">{t('footer.cta')}</p>
              <a
                href={`mailto:${CONTACT.email}`}
                className="display text-gilt animate-gilt break-all text-[clamp(2rem,7vw,6rem)] leading-none"
              >
                icaropecinalli<span className="serif-italic">@gmail.com</span>
              </a>
            </div>
            <a
              href="#home"
              className="btn-ghost shrink-0 self-start px-6 py-3 text-sm md:self-auto"
            >
              {t('footer.top')}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <span className="font-serif text-2xl text-ink">Ícaro Pecinalli</span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                {t('footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">{t('footer.nav')}</h4>
              <div className="space-y-2.5">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block text-sm text-muted transition-colors hover:text-accent">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">{t('footer.social')}</h4>
              <div className="space-y-2.5">
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted transition-colors hover:text-accent">GitHub</a>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted transition-colors hover:text-accent">LinkedIn</a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="block text-sm text-muted transition-colors hover:text-accent">WhatsApp</a>
                <a href={`mailto:${CONTACT.email}`} className="block text-sm text-muted transition-colors hover:text-accent">Email</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">{t('footer.base')}</h4>
              <p className="text-sm text-muted">{t('hero.location')}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-faint">
              &copy; {new Date().getFullYear()} Ícaro Pecinalli — {t('footer.rights')}
            </p>
            <p className="text-xs italic text-faint font-serif">
              React Router · TypeScript · Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
