import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Star, GitFork } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GITHUB_CONFIG, TOPIC_TO_TECH } from '../config/github';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

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
      <section id="projects" className="bg-base py-28">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center gap-4 py-16">
            <Github className="h-8 w-8 animate-pulse text-accent" />
            <p className="text-sm text-muted">{t('projects.loading')}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="relative overflow-hidden bg-base py-28 sm:py-36">
      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-6 flex items-baseline gap-4">
            <span className="index-num text-2xl">05</span>
            <span className="kicker-plain">Repositórios</span>
          </div>
          <h2 className="display mb-6 text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('projects.title')}
          </h2>
          <p className="text-lg leading-relaxed text-muted">{t('projects.subtitle')}</p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid grid-cols-1 border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <motion.a
                  key={index}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease }}
                  viewport={{ once: true, amount: 0.2 }}
                  className="group relative flex flex-col border-b border-r border-line p-7 transition-colors hover:bg-surface"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="index-num text-base">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" strokeWidth={1.5} />
                  </div>

                  <h3 className="display mb-3 text-2xl text-ink transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 grow text-sm leading-relaxed text-muted">
                    {project.description}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-x-4 gap-y-1">
                    {project.technologies.length > 0 ? (
                      project.technologies.map((tech) => (
                        <span key={tech} className="text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                          {tech}
                        </span>
                      ))
                    ) : (
                      <span className="text-[0.68rem] uppercase tracking-[0.14em] text-faint">
                        {t('projects.noTags')}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-5 border-t border-line pt-4 text-xs text-faint">
                    {project.language && (
                      <span className="flex items-center gap-1.5">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: languageColors[project.language] || '#8b949e' }}
                        />
                        {project.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Star className="h-3.5 w-3.5" /> {project.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3.5 w-3.5" /> {project.forks}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm"
              >
                {t('projects.viewMore')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </>
        ) : (
          <div className="py-12 text-center">
            <Github className="mx-auto mb-4 h-12 w-12 text-faint" />
            <p className="text-muted">
              Nenhum projeto encontrado. Verifique a configuração em{' '}
              <code className="bg-surface px-2 py-1 text-accent">app/config/github.ts</code>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
