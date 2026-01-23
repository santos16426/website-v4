import { About, Experience, Project, Skill, SocialHandle, Blog } from "./interface";

// Component Props Types
export interface HeroProps {
  about: About;
}

export interface AboutProps {
  about: About;
}

export interface HeaderProps {
  social: SocialHandle[];
}

export interface ProjectsProps {
  projects: Project[];
}

export interface SkillsProps {
  skills: Skill[];
}

export interface ExperienceProps {
  experience: Experience[];
}

export interface ContactProps {
  email: string;
}

export interface HoverImageProps {
  heading: string;
  imgSrc: string;
  shortDescription: string;
  projectDate: string;
  techStack: string[];
  alias: string;
}

export interface LoaderWrapperProps {
  children: React.ReactNode;
  subTitle: string;
}

export interface PageLoadProps {
  setHideLoader: (value: boolean) => void;
  subTitle: string;
}

export interface BlogsProps {
  blogs: Blog[];
}
