import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const languages = [
  { code: 'pt', label: 'PT', flag: '🇧🇷', name: 'Português' },
  { code: 'en', label: 'EN', flag: '🇺🇸', name: 'English' },
  { code: 'fr', label: 'FR', flag: '🇫🇷', name: 'Français' },
] as const;

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 dark:bg-gray-800 light:bg-gray-100 rounded-lg dark:hover:bg-gray-700 light:hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Change language"
      >
        <Globe className="w-5 h-5 dark:text-gray-300 light:text-gray-700" />
        <span className="text-sm font-medium dark:text-gray-300 light:text-gray-700">
          {currentLanguage?.label}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para fechar ao clicar fora */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 dark:bg-gray-800 light:bg-white rounded-lg shadow-lg border dark:border-gray-700 light:border-gray-200 overflow-hidden z-50"
            >
              {languages.map((lang) => (
                <motion.button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                    language === lang.code
                      ? 'dark:bg-blue-600 light:bg-blue-600 text-white'
                      : 'dark:hover:bg-gray-700 light:hover:bg-gray-100 dark:text-gray-300 light:text-gray-700'
                  }`}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs opacity-75">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      layoutId="activeLanguage"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
