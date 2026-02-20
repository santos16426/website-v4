export interface Portfolio {
  about: About;
  experience: Experience[];
  projects: Project[];
  blogs?: Blog[];
  social_handles: SocialHandle[];
  skills: Skill[];
}

export interface About {
  name: string;
  title: string;
  subTitle: string;
  description: string;
  quote: string;
  exp_year: string;
  address: string;
  phoneNumber: string;
  contactEmail: string;
  location?: string;
  music?: string;
  hobby?: string;
  hobbies?: Array<{ name: string; emoji: string }>;
  avatar: Avatar;
  alternateAvatars: Avatar[];
}

export interface Avatar {
  public_id: string;
  url: string;
}

export interface Skill {
  name: string;
  sequence: number;
  _id: string;
}

export interface Project {
  name: string;
  alias: string;
  shortDescription: string;
  fullDescription?: string;
  goalsAndMotivation?: {
    introduction?: string;
    goals?: string[];
    motivation?: string;
  };
  githubUrl: string;
  liveUrl: string;
  _id: string;
  image: Image;
  gallery?: Image[];
  features?: string[];
  challenges?: string[];
  highlights?: string[];
  outro?: string;
  details: {
    type: string;
    projectDate: string;
    techStack: string[];
  };
  disabled?: boolean;
}

export interface Image {
  public_id: string;
  url: string;
  description?: string;
}

export interface SocialHandle {
  platform: string;
  url: string;
  image: Image;
  enabled: boolean;
  _id: string;
}

export interface Experience {
  company_name: string;
  summary: string;
  sequence: number;
  startDate: string;
  endDate: string;
  jobTitle: string;
  jobLocation: string;
  bulletPoints: string[];
  forEducation: boolean;
  enabled: boolean;
  _id: string;
}

export interface Blog {
  featured: boolean;
  type: "comparison" | "tutorial" | "guide" | "overview";
  title: string;
  alias: string;
  shortDescription: string;
  date: string;
  thumbnail: string;
  content?: string;
  tags?: string[];
  readTime?: string;
  _id?: string;
  sourceCodeUrl?: string;
  resources?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  relatedLinks?: Array<{
    title: string;
    url: string;
    description?: string;
  }>;
  codeSamples?: Array<{
    title: string;
    code: string;
    language?: string;
    description?: string;
  }>;
  imageSamples?: Array<{
    url: string;
    alt: string;
    description?: string;
  }>;
}
