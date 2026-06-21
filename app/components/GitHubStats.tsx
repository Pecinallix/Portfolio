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
  ArrowUpRight,
} from 'lucide-react';
import { GITHUB_CONFIG, LANGUAGE_COLORS } from '../config/github';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

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
      const count: number = event.payload.size ?? event.payload.commits?.length ?? 0;
      if (count === 0) return null;
      const branch: string = ((event.payload.ref as string) ?? '').replace('refs/heads/', '');
      const msg: string = event.payload.commits?.[0]?.message?.split('\n')[0] ?? '';
      const branchPart = branch && branch !== 'main' && branch !== 'master' ? ` → ${branch}` : '';
      return {
        id: event.id,
        icon: GitCommit,
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
      if (action === 'opened') {
        description = `${t('stats.opened_pr')} · ${title}`;
      } else if (merged) {
        description = `${t('stats.merged_pr')} · ${title}`;
      } else {
        description = `${t('stats.closed_pr')} · ${title}`;
      }
      return { id: event.id, icon: GitPullRequest, description, repo, repoUrl };
    }
    case 'CreateEvent': {
      const refType: string = event.payload.ref_type;
      if (refType === 'repository') {
        return { id: event.id, icon: GitBranch, description: t('stats.created_repo'), repo, repoUrl };
      }
      if (refType === 'branch') {
        return {
          id: event.id,
          icon: GitBranch,
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
  { key: 'repos' as const, labelKey: 'stats.repos', Icon: BookOpen },
  { key: 'stars' as const, labelKey: 'stats.stars', Icon: Star },
  { key: 'forks' as const, labelKey: 'stats.forks', Icon: GitFork },
  { key: 'followers' as const, labelKey: 'stats.followers', Icon: Users },
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
    <section className="relative overflow-hidden bg-base-2 py-28 sm:py-36">
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
            <span className="index-num text-2xl">04</span>
            <span className="kicker-plain">GitHub</span>
          </div>
          <h2 className="display mb-6 text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
            {t('stats.title')}
          </h2>
          <p className="text-lg leading-relaxed text-muted">{t('stats.subtitle')}</p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Github className="h-8 w-8 animate-pulse text-accent" />
              <p className="text-sm text-muted">{t('stats.loading')}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Stat cards */}
            <div className="mb-16 grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
              {statCards.map(({ key, labelKey, Icon }, i) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  viewport={{ once: true }}
                  className="border-b border-r border-line p-7"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-faint">{t(labelKey)}</span>
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
                  </div>
                  <span className="text-gilt display text-5xl sm:text-6xl">
                    {stats?.[key] ?? '—'}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {/* Language distribution */}
              {languages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease }}
                  viewport={{ once: true }}
                  className="lux-card p-8"
                >
                  <h3 className="mb-7 text-xs uppercase tracking-[0.22em] text-faint">
                    {t('stats.languages')}
                  </h3>

                  <div className="mb-7 flex h-2 gap-px overflow-hidden">
                    {languages.map((lang, i) => (
                      <motion.div
                        key={lang.name}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percentage}%` }}
                        transition={{ duration: 0.7, delay: i * 0.07, ease }}
                        viewport={{ once: true }}
                        className="h-full"
                        style={{ backgroundColor: lang.color, minWidth: lang.percentage > 2 ? undefined : '2px' }}
                        title={`${lang.name}: ${lang.percentage}%`}
                      />
                    ))}
                  </div>

                  <div className="space-y-3">
                    {languages.map((lang) => (
                      <div key={lang.name} className="flex items-center gap-3">
                        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="flex-1 text-sm text-ink">{lang.name}</span>
                        <span className="font-serif italic text-sm text-faint">{lang.percentage}%</span>
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
                  transition={{ duration: 0.6, delay: 0.1, ease }}
                  viewport={{ once: true }}
                  className="lux-card p-8"
                >
                  <h3 className="mb-6 text-xs uppercase tracking-[0.22em] text-faint">
                    {t('stats.activity')}
                  </h3>

                  <div className="relative">
                    <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
                    <div className="space-y-5">
                      {activity.map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.06, ease }}
                            viewport={{ once: true }}
                            className="group flex items-start gap-4"
                          >
                            <span className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface">
                              <Icon className="h-2.5 w-2.5 text-accent" />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm leading-snug text-ink">{item.description}</p>
                              <div className="mt-1 flex items-center gap-2">
                                <a
                                  href={item.repoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-serif italic text-xs text-accent transition-colors hover:text-ink"
                                >
                                  {item.repo}
                                </a>
                                <span className="text-xs text-faint">·</span>
                                <span className="text-xs text-faint">{item.time}</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Link to profile */}
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
                {t('stats.viewProfile')}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
