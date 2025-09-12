export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubLink: string;
  liveLink?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SocialLink {
  icon: React.ReactNode;
  url: string;
}
