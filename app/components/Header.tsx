import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.about'), href: '#about', num: '01' },
    { name: t('nav.skills'), href: '#skills', num: '02' },
    { name: t('nav.projects'), href: '#projects', num: '03' },
    { name: t('nav.contact'), href: '#contact', num: '04' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-md bg-base/80 border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Wordmark */}
          <motion.a
            href="#home"
            className="group flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="flex h-9 w-9 items-center justify-center border border-line-strong text-accent font-serif text-lg leading-none transition-colors group-hover:bg-accent group-hover:text-[var(--base)]">
              íp
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block font-serif text-[1.05rem] text-ink">Ícaro Pecinalli</span>
              <span className="block text-[0.62rem] uppercase tracking-[0.24em] text-faint">
                Full-Stack Developer
              </span>
            </span>
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            <ul className="flex items-center gap-9">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.07 }}
                >
                  <a
                    href={item.href}
                    className="group flex items-baseline gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <span className="font-serif italic text-xs text-accent opacity-70">
                      {item.num}
                    </span>
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-400 group-hover:scale-x-100" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="flex items-center gap-3 pl-6 border-l border-line">
              <LanguageToggle />
              <ThemeToggle />
              <a
                href="#contact"
                className="btn-gold px-5 py-2 text-sm"
              >
                {t('nav.hire')}
              </a>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-ink"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-base/95 backdrop-blur-md border-b border-line"
          >
            <div className="px-5 py-6 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-baseline gap-3 py-3 text-lg font-serif text-ink border-b border-line"
                >
                  <span className="font-serif italic text-sm text-accent">{item.num}</span>
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={closeMenu}
                className="btn-gold mt-5 block w-full py-3.5 text-center text-sm"
              >
                {t('nav.hire')}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
