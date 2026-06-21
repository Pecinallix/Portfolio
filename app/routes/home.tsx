import type { Route } from './+types/home';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import FeaturedProjects from '../components/FeaturedProjects';
import Projects from '../components/Projects';
import GitHubStats from '../components/GitHubStats';
import Contact from '../components/Contact';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Ícaro Pecinalli - Portfólio {(Dev)}' },
    {
      name: 'description',
      content:
        'Portfólio de Ícaro Pecinalli, desenvolvedor full stack especializado em React, Node.js, TypeScript e tecnologias modernas.',
    },
  ];
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <GitHubStats />
        <Projects />
        <Contact />
      </main>
      <footer className="relative overflow-hidden bg-base-2 border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12 py-20">
          {/* Big CTA wordmark */}
          <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="kicker-plain mb-4">Vamos conversar</p>
              <a
                href="mailto:icaropecinalli@gmail.com"
                className="display text-gilt animate-gilt text-[clamp(2.5rem,8vw,6rem)] leading-none"
              >
                icaropecinalli<span className="serif-italic">@gmail.com</span>
              </a>
            </div>
            <a
              href="#home"
              className="btn-ghost shrink-0 px-6 py-3 text-sm"
            >
              Voltar ao topo ↑
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 border-t border-line pt-10 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <span className="font-serif text-2xl text-ink">Ícaro Pecinalli</span>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                Desenvolvedor full-stack — interfaces e sistemas com cuidado de artesão.
              </p>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">Navegação</h4>
              <div className="space-y-2.5">
                {['#about', '#skills', '#projects', '#contact'].map((href) => (
                  <a key={href} href={href} className="block text-sm text-muted transition-colors hover:text-accent">
                    {href.replace('#', '').charAt(0).toUpperCase() + href.slice(2)}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">Social</h4>
              <div className="space-y-2.5">
                <a href="https://github.com/Pecinallix" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted transition-colors hover:text-accent">GitHub</a>
                <a href="https://www.linkedin.com/in/icaropecinalli/" target="_blank" rel="noopener noreferrer" className="block text-sm text-muted transition-colors hover:text-accent">LinkedIn</a>
                <a href="mailto:icaropecinalli@gmail.com" className="block text-sm text-muted transition-colors hover:text-accent">Email</a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">Base</h4>
              <p className="text-sm text-muted">Araruama, RJ<br />Brasil</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-xs text-faint">
              &copy; {new Date().getFullYear()} Ícaro Pecinalli — Todos os direitos reservados.
            </p>
            <p className="text-xs italic text-faint font-serif">
              Newsreader &amp; Manrope · React + Tailwind
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
