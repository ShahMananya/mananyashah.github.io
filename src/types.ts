export type ThemeMode = 'light' | 'dark' | 'system';

export interface ProjectDetail {
  id: string;
  title: string;
  category: 'Machine Learning' | 'Business Intelligence' | 'System Design' | 'Financial Analytics' | 'Data Analytics';
  shortDescription: string;
  fullDescription: string;
  highlights: string[];
  technologies: string[];
  metrics: {
    [key: string]: string;
  };
  details: {
    problem: string;
    solution: string;
    impact: string;
    learnings: string;
    timeline: string;
    team: string;
    architecture?: string[];
  };
  roles: string[];
  links: {
    github?: string;
    demo?: string;
    paper?: string;
  };
  image?: string;
  featured?: boolean;
}

export interface TargetRole {
  id: string;
  title: string;
  shortLabel: string;
  iconName: string;
  tagline: string;
  description: string;
  skills: string[];
  relevantProjectIds: string[];
  achievements: string[];
  colorGradient: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Internship' | 'Contract';
  achievements: string[];
  skills: string[];
  metricsHighlight?: string;
}

export interface EducationItem {
  degree: string;
  school: string;
  location: string;
  gpa: string;
  period: string;
  coursework: string[];
  honors?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  description?: string;
  skills?: string[];
  image?: string;
  verificationUrl?: string;
  downloadUrl?: string;
  badgeType?: 'winner' | 'cert' | 'workshop';
}

export interface MicroInternshipItem {
  id: string;
  title: string;
  company: string;
  date: string;
  description: string;
  skills: string[];
  details: string;
  learnings: string[];
  certificateUrl?: string;
  verificationUrl?: string;
  logoColor?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
}
