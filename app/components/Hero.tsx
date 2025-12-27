import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative dark:bg-gray-900 light:bg-gray-50"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30 animate-blob"></div>
        <div className="absolute -bottom-10 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30 animate-blob animation-delay-1000 z-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 light:opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-base sm:text-lg md:text-xl text-cyan-400 mb-3 sm:mb-4 font-mono">
              Olá, eu sou
            </h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 px-4"
          >
            Ícaro Pecinalli
            <span className="block bg-linear-to-r from-blue-400 via-cyan-500 to-teal-500 bg-clip-text text-transparent mt-2">
              Desenvolvedor de Software
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
          >
            Criando experiências digitais incríveis com código limpo e design
            moderno
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-12"
          >
            <a
              href="https://github.com/Pecinallix"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 dark:bg-gray-800 light:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-gray-200 rounded-full transition-all hover:scale-110"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white light:text-slate-800" />
            </a>
            <a
              href="https://www.linkedin.com/in/icaropecinalli/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 sm:p-3 dark:bg-gray-800 light:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-gray-200 rounded-full transition-all hover:scale-110"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white light:text-slate-800" />
            </a>
            <a
              href="mailto:icaropecinalli@gmail.com"
              className="p-2.5 sm:p-3 dark:bg-gray-800 light:bg-gray-100 dark:hover:bg-gray-700 light:hover:bg-gray-200 rounded-full transition-all hover:scale-110"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 dark:text-white light:text-slate-800" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4"
          >
            <a
              href="#projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105 text-center"
            >
              Ver Projetos
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all hover:scale-105 text-center"
            >
              Entre em Contato
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm">Scroll</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
