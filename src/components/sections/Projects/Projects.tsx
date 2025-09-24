'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
}

type CategoryType = 'all' | 'web' | 'mobile' | 'dashboard';

interface Category {
  id: CategoryType;
  name: string;
}

const Projects: React.FC = () => {
  const { t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<CategoryType>('all');

  const projects: Project[] = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description:
        'Plataforma de e-commerce completa com carrinho, pagamentos e painel administrativo.',
      image:
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
    },
    {
      id: 2,
      title: 'Task Management App',
      description:
        'Aplicativo de gerenciamento de tarefas com drag & drop e colaboração em tempo real.',
      image:
        'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Redux', 'Socket.io', 'Express'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description:
        'Dashboard meteorológico com previsões detalhadas e mapas interativos.',
      image:
        'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Next.js', 'Chart.js', 'API Integration'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'dashboard',
    },
    {
      id: 4,
      title: 'Portfolio Website',
      description:
        'Site portfólio responsivo com animações suaves e design moderno.',
      image:
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'Framer Motion', 'Tailwind CSS'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'web',
    },
    {
      id: 5,
      title: 'Analytics Dashboard',
      description:
        'Dashboard de analytics com gráficos interativos e relatórios em tempo real.',
      image:
        'https://images.pexels.com/photos/590041/pexels-photo-590041.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'D3.js', 'Firebase', 'Material-UI'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'dashboard',
    },
    {
      id: 6,
      title: 'Social Media App',
      description:
        'Aplicativo de rede social com feed, stories e sistema de mensagens.',
      image:
        'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React Native', 'Firebase', 'Redux'],
      liveUrl: '#',
      githubUrl: '#',
      category: 'mobile',
    },
  ];

  const categories: Category[] = [
    { id: 'all', name: 'Todos' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'dashboard', name: 'Dashboards' },
  ];

  const filteredProjects: Project[] =
    filter === 'all'
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            {t('projectsTitle')}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto mb-8"></div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            {t('projectsSubtitle')}
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === category.id
                  ? 'bg-white text-black'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-gray-900/50 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={800}
                      height={600}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white text-sm font-medium">
                        Ver Detalhes
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          e.stopPropagation()
                        }
                      >
                        <ExternalLink size={16} />
                        <span className="text-sm">{t('viewProject')}</span>
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) =>
                          e.stopPropagation()
                        }
                      >
                        <Github size={16} />
                        <span className="text-sm">{t('viewCode')}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <div className="relative">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    width={1200}
                    height={800}
                    className="w-full h-64 md:h-80 object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-400 mb-6 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-white mb-4">
                      Tecnologias Utilizadas
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span>{t('viewProject')}</span>
                    </a>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 border border-white/30 text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
                    >
                      <Github size={20} />
                      <span>{t('viewCode')}</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
