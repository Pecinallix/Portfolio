import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
  Github,
  Star,
  GitFork,
  Users,
  BookOpen,
  GitCommit,
  GitPullRequest,
  GitBranch,
  AlertCircle,
} from 'lucide-react';
import { GITHUB_CONFIG, LANGUAGE_COLORS } from '../config/github';
import { useLanguage } from '../contexts/LanguageContext';

interface UserStats {
  repos: number;
  stars: number;
  forks: number;
  followers: number;
}

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface ActivityItem {
  id: string;
  icon: typeof GitCommit;
  iconColor: string;
  description: string;
  repo: string;
  repoUrl: string;
  time: string;
}

const FALLBACK_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  'C++': '#f34b7d',
  C: '#555555',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
};

function getLangColor(lang: string): string {
  return LANGUAGE_COLORS[lang] ?? FALLBACK_COLORS[lang] ?? '#6e7681';
}

function timeAgo(dateStr: string, lang: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  const labels = {
    pt: { now: 'agora', min: 'min atrás', h: 'h atrás', d: 'd atrás' },
    en: { now: 'just now', min: 'min ago', h: 'h ago', d: 'd ago' },
    fr: { now: 'maintenant', min: 'min', h: 'h', d: 'j' },
  };
  const l = labels[lang as keyof typeof labels] ?? labels.en;
  if (diff < 60) return l.now;
  if (diff < 3600) return `${Math.floor(diff / 60)} ${l.min}`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} ${l.h}`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} ${l.d}`;
  const locale = lang === 'pt' ? 'pt-BR' : lang === 'fr' ? 'fr-FR' : 'en-US';
  return new Date(dateStr).toLocaleDateString(locale, { month: 'short', day: 'numeric' });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseEvent(event: any, t: (k: string) => string): Omit<ActivityItem, 'time'> | null {
  const repoFullName: string = event.repo.name;
  const repo = repoFullName.split('/')[1];
  const repoUrl = `https://github.com/${repoFullName}`;

  switch (event.type) {
    case 'PushEvent': {
      // payload.size is the real count; payload.commits array is capped by the API
      const count: number = event.payload.size ?? event.payload.commits?.length ?? 0;
      if (count === 0) return null;
      const branch: string = ((event.payload.ref as string) ?? '').replace('refs/heads/', '');
      const msg: string = event.payload.commits?.[0]?.message?.split('\n')[0] ?? '';
      const branchPart = branch && branch !== 'main' && branch !== 'master' ? ` → ${branch}` : '';
      return {
        id: event.id,
        icon: GitCommit,
        iconColor: '#3fb950',
        description: `${t('stats.pushed')} ${count} commit${count !== 1 ? 's' : ''}${branchPart}${msg ? ` · ${msg}` : ''}`,
        repo,
        repoUrl,
      };
    }
    case 'PullRequestEvent': {
      const action: string = event.payload.action;
      const title: string = event.payload.pull_request?.title ?? '';
      const merged: boolean = event.payload.pull_request?.merged ?? false;
      let description = '';
      let iconColor = '#a371f7';
      if (action === 'opened') {
        description = `${t('stats.opened_pr')} · ${title}`;
      } else if (merged) {
        description = `${t('stats.merged_pr')} · ${title}`;
        iconColor = '#8957e5';
      } else {
        description = `${t('stats.closed_pr')} · ${title}`;
        iconColor = '#f85149';
      }
      return { id: event.id, icon: GitPullRequest, iconColor, description, repo, repoUrl };
    }
    case 'CreateEvent': {
      const refType: string = event.payload.ref_type;
      if (refType === 'repository') {
        return {
          id: event.id,
          icon: GitBranch,
          iconColor: '#58a6ff',
          description: t('stats.created_repo'),
          repo,
          repoUrl,
        };
      }
      if (refType === 'branch') {
        return {
          id: event.id,
          icon: GitBranch,
          iconColor: '#79c0ff',
          description: `${t('stats.created_branch')} · ${event.payload.ref}`,
          repo,
          repoUrl,
        };
      }
      return null;
    }
    case 'IssuesEvent': {
      const action: string = event.payload.action;
      const title: string = event.payload.issue?.title ?? '';
      if (action !== 'opened' && action !== 'closed') return null;
      return {
        id: event.id,
        icon: AlertCircle,
        iconColor: '#e3b341',
        description: `${action === 'opened' ? t('stats.opened_issue') : t('stats.closed_issue')} · ${title}`,
        repo,
        repoUrl,
      };
    }
    default:
      return null;
  }
}

const statCards = [
  { key: 'repos' as const, labelKey: 'stats.repos', Icon: BookOpen, color: '#58a6ff', glow: 'rgba(88,166,255,0.15)' },
  { key: 'stars' as const, labelKey: 'stats.stars', Icon: Star, color: '#e3b341', glow: 'rgba(227,179,65,0.15)' },
  { key: 'forks' as const, labelKey: 'stats.forks', Icon: GitFork, color: '#3fb950', glow: 'rgba(63,185,80,0.15)' },
  { key: 'followers' as const, labelKey: 'stats.followers', Icon: Users, color: '#a371f7', glow: 'rgba(163,113,247,0.15)' },
];

export default function GitHubStats() {
  const { t, language } = useLanguage();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}`),
          fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}/repos?per_page=100`),
          fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}/events/public?per_page=30`),
        ]);

        const [user, repos, events] = await Promise.all([
          userRes.json(),
          reposRes.json(),
          eventsRes.json(),
        ]);

        // Aggregate stats from own repos only
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ownRepos = repos.filter((r: any) => !r.fork);
        setStats({
          repos: user.public_repos,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          stars: ownRepos.reduce((acc: number, r: any) => acc + r.stargazers_count, 0),
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          forks: ownRepos.reduce((acc: number, r: any) => acc + r.forks_count, 0),
          followers: user.followers,
        });

        // Language distribution
        const langCount: Record<string, number> = {};
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ownRepos.forEach((r: any) => {
          if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1;
        });
        const total = Object.values(langCount).reduce((a, b) => a + b, 0);
        setLanguages(
          Object.entries(langCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 7)
            .map(([name, count]) => ({
              name,
              count,
              percentage: Math.round((count / total) * 100),
              color: getLangColor(name),
            })),
        );

        // Recent activity — deduplicate push events to same repo on same day
        const items: ActivityItem[] = [];
        const seen = new Set<string>();
        for (const event of events) {
          if (items.length >= 8) break;
          const parsed = parseEvent(event, t);
          if (!parsed) continue;
          const day = new Date(event.created_at).toDateString();
          const dedupeKey = `${event.type}-${event.repo.name}-${day}`;
          if (seen.has(dedupeKey)) continue;
          seen.add(dedupeKey);
          items.push({ ...parsed, time: timeAgo(event.created_at, language) });
        }
        setActivity(items);
      } catch (err) {
        console.error('GitHubStats fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  return (
    <section className="py-24 dark:bg-black light:bg-white relative section-divider">
      <div className="absolute inset-0 bg-grid-pattern opacity-20" />
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="text-green-400 font-display text-sm uppercase tracking-widest mb-3 block">
            {'<'} github-stats {'>'}
          </span>
          <h2 className="text-5xl md:text-6xl font-display font-bold text-white light:text-gray-900 mb-6 tracking-tight">
            {t('stats.title')}
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-green-400 to-blue-500 rounded-full" />
          <p className="text-gray-400 light:text-gray-500 mt-6 max-w-2xl">
            {t('stats.subtitle')}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Github className="w-10 h-10 text-green-400 animate-pulse" />
              <p className="text-gray-400 text-sm">{t('stats.loading')}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {statCards.map(({ key, labelKey, Icon, color, glow }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="glass-card rounded-2xl p-6 flex flex-col gap-3 group"
                  style={{ '--glow': glow } as React.CSSProperties}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 0 30px ${glow}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 light:text-gray-500 text-sm font-medium">
                      {t(labelKey)}
                    </span>
                    <Icon className="w-4 h-4" style={{ color }} />
                  </div>
                  <span
                    className="text-4xl font-display font-bold tracking-tight"
                    style={{ color }}
                  >
                    {stats?.[key] ?? '—'}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Language distribution */}
            {languages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 mb-8"
              >
                <h3 className="text-white light:text-gray-800 font-display font-semibold mb-5 text-sm uppercase tracking-wider">
                  {t('stats.languages')}
                </h3>

                {/* Stacked bar */}
                <div className="flex h-3 rounded-full overflow-hidden mb-5 gap-px">
                  {languages.map((lang, i) => (
                    <motion.div
                      key={lang.name}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      transition={{ duration: 0.6, delay: i * 0.07, ease: 'easeOut' }}
                      viewport={{ once: true }}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                      style={{ backgroundColor: lang.color, minWidth: lang.percentage > 2 ? undefined : '2px' }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  ))}
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {languages.map((lang) => (
                    <div key={lang.name} className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-gray-300 light:text-gray-600 text-sm">{lang.name}</span>
                      <span className="text-gray-500 text-xs">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Activity feed */}
            {activity.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6"
              >
                <h3 className="text-white light:text-gray-800 font-display font-semibold mb-6 text-sm uppercase tracking-wider">
                  {t('stats.activity')}
                </h3>

                <div className="relative">
                  {/* Vertical timeline line */}
                  <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 light:bg-black/10" />

                  <div className="space-y-1">
                    {activity.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.06 }}
                          viewport={{ once: true }}
                          className="flex items-start gap-4 pl-2 py-3 rounded-xl hover:bg-white/5 light:hover:bg-black/5 transition-colors group"
                        >
                          {/* Icon dot on timeline */}
                          <div
                            className="relative z-10 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                            style={{ backgroundColor: `${item.iconColor}20`, border: `1px solid ${item.iconColor}50` }}
                          >
                            <Icon className="w-2.5 h-2.5" style={{ color: item.iconColor }} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-300 light:text-gray-700 text-sm leading-snug truncate">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={item.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-green-400 hover:text-green-300 transition-colors font-mono"
                              >
                                {item.repo}
                              </a>
                              <span className="text-gray-600 text-xs">·</span>
                              <span className="text-gray-500 text-xs">{item.time}</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Link to GitHub profile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mt-10"
            >
              <a
                href={`https://github.com/${GITHUB_CONFIG.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 glass-card rounded-xl font-semibold text-green-400 hover:border-green-500/40 transition-all hover:scale-105"
              >
                <Github className="w-5 h-5" />
                {t('stats.viewProfile')}
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
