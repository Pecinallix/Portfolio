'use client';

import Header from '@/components/Header/Header';
import { motion } from 'framer-motion';
import About from '@/components/sections/About/About';
import Projects from '@/components/sections/Projects/Projects';
import Contact from '@/components/sections/Contact/Contact';
import Hero from '@/components/sections/Hero/Hero';
import Footer from '@/components/sections/Footer/Footer';

const HomePortfolio: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <Header />

        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>

        <Footer />
      </motion.div>
    </div>
  );
};

export default HomePortfolio;
