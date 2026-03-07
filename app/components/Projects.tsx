import { motion } from 'framer-motion';
import { ExternalLink, Github, Star, GitFork } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_CONFIG, TOPIC_TO_TECH } from '../config/github';
import { useLanguage } from '../contexts/LanguageContext';

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
  language: string | null;
}

const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Python: '#3572A5',
};

export default function Projects() {
  const { t } = useLanguage();
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

      let filteredRepos = repos.filter((repo) => {
        if (GITHUB_CONFIG.excludeRepos.includes(repo.name)) return false;
        if (repo.fork) return false;
        if (GITHUB_CONFIG.filterByTopics.length > 0) {
          return repo.topics.some((topic) =>
            GITHUB_CONFIG.filterByTopics.includes(topic),
          );
        }
        return true;
      });

      if (GITHUB_CONFIG.featuredRepos.length > 0) {
        const featured = filteredRepos.filter((repo) =>
          GITHUB_CONFIG.featuredRepos.includes(repo.name),
        );
        const others = filteredRepos.filter(
          (repo) => !GITHUB_CONFIG.featuredRepos.includes(repo.name),
        );
        filteredRepos = [...featured, ...others];
      }

      filteredRepos = filteredRepos.slice(0, GITHUB_CONFIG.maxProjects);

      const mappedProjects: Project[] = filteredRepos.map((repo) => {
        const technologies = new Set<string>();

        if (repo.language) {
          technologies.add(repo.language);
        }

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
          language: repo.language,
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
      <section id="projects" className="py-24 dark:bg-gray-900 light:bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            <p className="text-gray-400 mt-4">{t('projects.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 bg-gray-900 light:bg-white relative section-divider">
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-3 block">
            &lt;projects /&gt;
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t('projects.title')}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.2 },
                  }}
                  className="group relative glass-card rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 flex flex-col"
                >
                  {/* Gradient header */}
                  <div className="h-32 bg-linear-to-br from-blue-600/20 via-cyan-600/10 to-teal-600/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-bold text-white/10 font-mono group-hover:text-white/20 transition-colors">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                    {project.language && (
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-xs text-gray-300">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: languageColors[project.language] || '#8b949e' }}
                        />
                        {project.language}
                      </div>
                    )}
                  </div>

                  <div className="relative p-5 flex flex-col grow">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold dark:text-white light:text-gray-800 mb-2 group-hover:text-cyan-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-gray-500 text-xs">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{project.stars}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5" />
                          <span>{project.forks}</span>
                        </div>
                      </div>
                    </div>

                    <p className="dark:text-gray-400 light:text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3 grow">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.length > 0 ? (
                        project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2.5 py-0.5 dark:bg-cyan-500/10 light:bg-blue-50 dark:text-cyan-400 light:text-blue-600 text-xs font-medium rounded-lg"
                          >
                            {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-xs">{t('projects.noTags')}</span>
                      )}
                    </div>

                    <div className="pt-4 border-t dark:border-gray-700/50 light:border-gray-200 mt-auto">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium hover:from-blue-500 hover:to-cyan-500 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group/btn"
                      >
                        <Github className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                        <span>{t('projects.viewProject')}</span>
                        <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </a>
                    </div>
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
                className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl font-semibold text-cyan-400 hover:border-cyan-500/40 transition-all hover:scale-105"
              >
                <Github className="w-5 h-5" />
                {t('projects.viewMore')}
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
