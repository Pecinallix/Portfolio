import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'pt', label: 'PT', name: 'Português' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
] as const;

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const current = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 items-center gap-1.5 border border-line px-3 text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:border-line-strong hover:text-accent"
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
      >
        {current?.label}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 z-50 mt-2 w-44 border border-line bg-surface"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left transition-colors ${
                    language === lang.code
                      ? 'bg-accent-soft text-accent'
                      : 'text-muted hover:bg-surface-2 hover:text-ink'
                  }`}
                >
                  <span className="font-serif text-sm">{lang.name}</span>
                  <span className="text-[0.6rem] uppercase tracking-[0.2em] text-faint">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
