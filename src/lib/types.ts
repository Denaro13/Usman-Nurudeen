export interface Experience {
  _id: string;
  title: string;
  company: string;
  location?: string;
  startDate: string;
  endDate?: string;
  achievements: string[];
  createdAt: string;
}

export interface ExperienceFormData {
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  achievements: { value: string }[];
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  details: string;
  techStack: string[];
  category: string;
  url: string;
  github: string;
  image: {
    url: string | null;
    publicId: string | null;
  };
  createdAt?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  details: string;
  techStack: string;
  category: string;
  url: string;
  github: string;
  image?: FileList;
}
