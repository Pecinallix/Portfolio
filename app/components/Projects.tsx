import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_CONFIG, TOPIC_TO_TECH } from '../config/github';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

interface Project {
  title: string;
  description: string;
  github: string;
  demo?: string;
  technologies: string[];
  stars: number;
  forks: number;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubProjects();
  }, []);

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=updated&per_page=100`,
      );

      if (!response.ok) {
        throw new Error('Erro ao buscar repositórios');
      }

      const repos: GitHubRepo[] = await response.json();

      // Filtrar e mapear repositórios
      let filteredRepos = repos.filter((repo) => {
        // Excluir repositórios da lista de exclusão
        if (GITHUB_CONFIG.excludeRepos.includes(repo.name)) return false;

        // Excluir forks
        if (repo.fork) return false;

        // Filtrar por tópicos se configurado
        if (GITHUB_CONFIG.filterByTopics.length > 0) {
          return repo.topics.some((topic) =>
            GITHUB_CONFIG.filterByTopics.includes(topic),
          );
        }

        return true;
      });

      // Se tem repositórios em destaque, priorizar eles
      if (GITHUB_CONFIG.featuredRepos.length > 0) {
        const featured = filteredRepos.filter((repo) =>
          GITHUB_CONFIG.featuredRepos.includes(repo.name),
        );
        const others = filteredRepos.filter(
          (repo) => !GITHUB_CONFIG.featuredRepos.includes(repo.name),
        );
        filteredRepos = [...featured, ...others];
      }

      // Limitar número de projetos
      filteredRepos = filteredRepos.slice(0, GITHUB_CONFIG.maxProjects);

      // Mapear para formato de projeto
      const mappedProjects: Project[] = filteredRepos.map((repo) => {
        const technologies = new Set<string>();

        // Adicionar linguagem principal
        if (repo.language) {
          technologies.add(repo.language);
        }

        // Adicionar tecnologias baseadas nos tópicos
        repo.topics.forEach((topic) => {
          const tech = TOPIC_TO_TECH[topic.toLowerCase()];
          if (tech) {
            technologies.add(tech);
          }
        });

        return {
          title: repo.name
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          description: repo.description || 'Sem descrição disponível',
          github: repo.html_url,
          demo: repo.homepage || undefined,
          technologies: Array.from(technologies).slice(0, 4),
          stars: repo.stargazers_count,
          forks: repo.forks_count,
        };
      });

      setProjects(mappedProjects);
    } catch (error) {
      console.error('Erro ao buscar projetos do GitHub:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="projects" className="py-20 dark:bg-gray-900 light:bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-900 light:bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Projetos em Destaque
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {projects.length > 0
              ? 'Meus projetos mais recentes do GitHub, demonstrando minhas habilidades e expertise'
              : 'Configure seu username do GitHub em app/config/github.ts para exibir seus projetos'}
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: 'spring' as const,
                    stiffness: 100,
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -10,
                    rotateY: 2,
                    rotateX: -2,
                    transition: { duration: 0.3 },
                  }}
                  className="group relative dark:bg-gray-800 light:bg-white rounded-xl overflow-hidden dark:border-gray-700 light:border-gray-200 hover:border-cyan-500 transition-all duration-300"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gradient Background Accent with animation */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 light:from-blue-600 light:via-cyan-600 light:to-teal-600"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                  />

                  {/* Project Content */}
                  <div className="relative p-6 pt-8">
                    {/* Title and Stats */}
                    <div className="mb-4">
                      <motion.h3
                        className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                        viewport={{ once: true }}
                      >
                        {project.title}
                      </motion.h3>

                      <motion.div
                        className="flex items-center gap-4 text-gray-400 text-sm"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        viewport={{ once: true }}
                      >
                        <motion.div
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1, color: '#22d3ee' }}
                        >
                          <Star className="w-4 h-4" />
                          <span>{project.stars}</span>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-1"
                          whileHover={{ scale: 1.1, color: '#22d3ee' }}
                        >
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks}</span>
                        </motion.div>
                      </motion.div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-4 line-clamp-3 min-h-18">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6 min-h-10">
                      {project.technologies.length > 0 ? (
                        project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 dark:bg-gray-900 light:bg-gray-50 dark:text-cyan-400 light:text-blue-600 text-xs font-medium rounded-full dark:border-gray-700 light:border-gray-200"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-600 text-xs">Sem tags</span>
                      )}
                    </div>

                    {/* Links */}
                    <motion.div
                      className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-700"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 dark:bg-gray-900 light:bg-gray-50 dark:text-gray-300 light:text-gray-700 rounded-lg text-sm font-medium relative overflow-hidden group/btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-linear-to-r from-gray-700 to-gray-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                        />
                        <Github className="w-4 h-4 relative z-10 group-hover/btn:text-white transition-colors" />
                        <span className="relative z-10 group-hover/btn:text-white transition-colors">Código</span>
                      </motion.a>
                      {project.demo && (
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-2 dark:bg-cyan-500/10 light:bg-cyan-100 dark:text-cyan-400 light:text-cyan-600 rounded-lg text-sm font-medium relative overflow-hidden group/btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.span
                            className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 opacity-0 group-hover/btn:opacity-100 transition-opacity"
                          />
                          <ExternalLink className="w-4 h-4 relative z-10 group-hover/btn:text-white transition-colors" />
                          <span className="relative z-10 group-hover/btn:text-white transition-colors">Demo</span>
                        </motion.a>
                      )}
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 bg-linear-to-t from-cyan-500/5 to-transparent"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-500 text-cyan-400 rounded-full font-semibold hover:bg-cyan-500/10 transition-all hover:scale-105"
              >
                <Github className="w-5 h-5" />
                Ver Mais no GitHub
              </a>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-12">
            <Github className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500">
              Nenhum projeto encontrado. Verifique a configuração em{' '}
              <code className="bg-gray-800 px-2 py-1 rounded">
                app/config/github.ts
              </code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
