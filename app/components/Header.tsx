import { motion } from 'framer-motion';
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('nav.home'), href: '#home' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.contact'), href: '#contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b transition-all duration-300 ${
        isScrolled
          ? 'dark:bg-gray-900/95 light:bg-white/95 dark:border-gray-700 light:border-gray-300 shadow-lg shadow-black/10'
          : 'dark:bg-gray-900/80 light:bg-white/80 dark:border-gray-800 light:border-gray-200'
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between rounded-4xl">
          <motion.a
            href="#home"
            className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-500 to-cyan-200 bg-clip-text  relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute -inset-2 bg-linear-to-r from-blue-500/10 to-cyan-500/10 rounded-full opacity-0 group-hover:opacity-100 blur"
              layoutId="logo-glow"
            />
            <span className="relative light:text-gray-700 dark:text-amber-50">
              {'<Dev />'}
            </span>
          </motion.a>

          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                className="dark:text-gray-300 light:text-gray-700 hover:text-cyan-400 transition-colors font-medium relative group px-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1 + 0.3,
                  type: 'spring' as const,
                  stiffness: 100,
                }}
                whileHover={{ y: -2 }}
              >
                {item.name}
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-blue-500 to-cyan-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring' as const }}
            >
              <LanguageToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, type: 'spring' as const }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.a
              href="#contact"
              className="px-6 py-2 rounded-full font-semibold relative overflow-hidden group"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.08,
                boxShadow: '0 10px 40px -5px rgba(6, 182, 212, 0.6)',
                transition: {
                  scale: { duration: 0.2, ease: 'easeOut' },
                  boxShadow: { duration: 0.2, ease: 'easeOut' },
                },
              }}
              whileTap={{ scale: 0.95 }}
              transition={{
                opacity: { delay: 0.9 },
                y: {
                  delay: 0.9,
                  type: 'spring' as const,
                  stiffness: 260,
                  damping: 20,
                },
              }}
            >
              <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-cyan-600 transition-opacity duration-200 ease-out group-hover:opacity-0" />
              <span className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600 opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100" />
              <span className="relative z-10 text-white">{t('nav.hire')}</span>
            </motion.a>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' as const }}
            >
              <LanguageToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' as const }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.button
              onClick={toggleMenu}
              className="dark:text-white light:text-slate-800 p-2 dark:hover:bg-gray-800 light:hover:bg-gray-200 rounded-lg transition-colors"
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: 'spring' as const }}
            >
              <motion.div
                animate={{ rotate: isOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                onClick={closeMenu}
                className="block dark:text-gray-300 light:text-gray-700 hover:text-cyan-400 transition-colors font-medium py-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={closeMenu}
              className="block w-full text-center px-6 py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              {t('nav.hire')}
            </motion.a>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}
