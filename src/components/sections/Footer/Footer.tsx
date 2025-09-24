import React from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  Github,
  Linkedin,
  Twitter,
  Mail,
  LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface SocialLink {
  icon: LucideIcon;
  url: string;
  name: string;
}

interface QuickLink {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const socialLinks: SocialLink[] = [
    { icon: Github, url: 'https://github.com', name: 'GitHub' },
    { icon: Linkedin, url: 'https://linkedin.com', name: 'LinkedIn' },
    { icon: Twitter, url: 'https://twitter.com', name: 'Twitter' },
    { icon: Mail, url: 'mailto:dev@portfolio.com', name: 'Email' },
  ];

  const quickLinks: QuickLink[] = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('projects'), path: '/projects' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <footer className="bg-gray-900/50 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <Link href="/" className="text-2xl font-bold text-white">
              <span>&lt;</span>
              <span>Dev</span>
              <span>/&gt;</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Desenvolvedor front-end especializado em criar experiências
              digitais excepcionais com tecnologias modernas.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social: SocialLink, index: number) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Links Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link: QuickLink, index: number) => (
                <li key={index}>
                  <Link
                    href={link.path}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Contato</h3>
            <div className="space-y-2 text-gray-400">
              <p>dev@portfolio.com</p>
              <p>+55 (11) 99999-9999</p>
              <p>São Paulo, Brasil</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>{t('madeWith')}</span>
            <Heart size={16} className="text-red-500" />
            <span>{t('and')}</span>
            <span className="text-white">React</span>
          </div>

          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio. Todos os direitos
            reservados.
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
