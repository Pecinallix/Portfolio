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
        `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?sort=updated&per_page=100`
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
            GITHUB_CONFIG.filterByTopics.includes(topic)
          );
        }

        return true;
      });

      // Se tem repositórios em destaque, priorizar eles
      if (GITHUB_CONFIG.featuredRepos.length > 0) {
        const featured = filteredRepos.filter((repo) =>
          GITHUB_CONFIG.featuredRepos.includes(repo.name)
        );
        const others = filteredRepos.filter(
          (repo) => !GITHUB_CONFIG.featuredRepos.includes(repo.name)
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
      <section id="projects" className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-gray-400 mt-4">Carregando projetos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-20 bg-gray-900">
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
          <div className="w-20 h-1 bg-linear-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {projects.length > 0
              ? 'Meus projetos mais recentes do GitHub, demonstrando minhas habilidades e expertise'
              : 'Configure seu username do GitHub em app/config/github.ts para exibir seus projetos'}
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                >
                  {/* Project Header */}
                  <div className="relative p-6 bg-linear-to-br from-gray-800 to-gray-900">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {project.title}
                    </h3>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stars}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{project.forks}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gray-700 text-purple-400 text-sm rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      >
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="absolute inset-0 rounded-lg border-2 border-purple-500"></div>
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 rounded-full font-semibold hover:bg-purple-500/10 transition-all hover:scale-105"
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
