'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-200 via-orange-500 to-red-500 opacity-0 dark:opacity-20 transition-opacity duration-300" />

      {/* Toggle circle */}
      <motion.div
        className="relative w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-lg flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 32 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      >
        {/* Icon container with rotation effect */}
        <motion.div
          animate={{
            rotate: theme === 'dark' ? 360 : 0,
            scale: theme === 'dark' ? 1 : 0.8,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {theme === 'dark' ? (
            <Moon size={14} className="text-blue-400" />
          ) : (
            <Sun size={14} className="text-yellow-500" />
          )}
        </motion.div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        animate={{
          boxShadow:
            theme === 'dark'
              ? '0 0 20px rgba(59, 130, 246, 0.3)'
              : '0 0 20px rgba(251, 191, 36, 0.3)',
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Stars effect for dark mode */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
