export interface Project {
  image: string;
  projectName: string;
  projectLink: string;
  projectDescription: string;
  projectTech: string[];
  projectExternalLinks: {
    github: string;
    externalLink: string;
  };
}