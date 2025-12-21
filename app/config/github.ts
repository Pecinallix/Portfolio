// Configuração do GitHub
export const GITHUB_CONFIG = {
  // Seu username do GitHub
  username: 'Pecinallix',

  // Repositórios em destaque (deixe vazio para puxar automaticamente os mais recentes)
  // Ou especifique os repositórios que você quer mostrar:
  featuredRepos: [
    // Exemplos:
    // 'nome-do-repositorio-1',
    // 'nome-do-repositorio-2',
  ] as string[],

  maxProjects: 6,

  // Filtrar por tópicos/tags específicos (opcional)
  filterByTopics: [
    // Exemplos:
    // 'react',
    // 'typescript',
    // 'portfolio',
  ] as string[],

  // Excluir repositórios específicos
  excludeRepos: [
    'Pecinallix', // README profile
    '.github',
  ] as string[],
};

// Mapeamento de linguagens para cores
export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  PHP: '#4F5D95',
  Ruby: '#701516',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  React: '#61dafb',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
};

// Mapeamento de tópicos para tecnologias (caso o repo não tenha linguagem definida)
export const TOPIC_TO_TECH: Record<string, string> = {
  react: 'React',
  nextjs: 'Next.js',
  vue: 'Vue',
  angular: 'Angular',
  nodejs: 'Node.js',
  express: 'Express',
  mongodb: 'MongoDB',
  postgresql: 'PostgreSQL',
  mysql: 'MySQL',
  redis: 'Redis',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  aws: 'AWS',
  azure: 'Azure',
  firebase: 'Firebase',
  graphql: 'GraphQL',
  tailwindcss: 'Tailwind CSS',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  python: 'Python',
};
