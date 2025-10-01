
export interface Skill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
}

export interface NavLink {
  id: string;
  title: string;
}
