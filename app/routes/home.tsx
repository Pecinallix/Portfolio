import type { Route } from './+types/home';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Ícaro Pecinalli - Desenvolvedor Full Stack' },
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
        <Projects />
        <Contact />
      </main>
      <footer className="bg-gray-900 border-t border-gray-800 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ícaro Pecinalli. Todos os direitos
            reservados.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Feito com React Router e Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
