export interface Project {
  title: string;
  description: string;
  tags: string[];
  icon: string;
  liveUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface ContactInfo {
  icon: string;
  label: string;
  href?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  ogImage?: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}
