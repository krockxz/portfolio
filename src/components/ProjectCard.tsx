import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: -50 },
} as const;

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { image, projectName, projectLink, projectDescription, projectTech, projectExternalLinks } = project;

  return (
    <motion.div
      className="project"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={ANIMATION_VARIANTS}
      whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
    >
      <div className="project-image">
        <div className="project-image-overlay"></div>
        <div className="project-image-container">
          <Image 
            src={image} 
            fill 
            alt={projectName} 
            quality={95}
            className="project-img" 
            sizes="(max-width: 600px) 320px, (max-width: 680px) 400px, (max-width: 1100px) 450px, 500px"
            priority={index < 2}
          />
        </div>
      </div>
      <div className="project-info">
        <p className="project-info-overline">Featured Project</p>
        <h3 className="project-info-title">
          <Link href={projectLink} target="_blank" rel="noopener noreferrer">
            {projectName}
          </Link>
        </h3>
        <div className="project-info-description">
          <p>{projectDescription}</p>
        </div>
        <ul className="project-info-tech-list">
          {projectTech.map((tech) => (
            <li key={tech} className="project-info-tech-list-item">
              <Badge variant="secondary">{tech}</Badge>
            </li>
          ))}
        </ul>
        <ul className="project-info-links">
          {projectExternalLinks.github && (
            <li className="project-info-links-item">
              <Link
                href={projectExternalLinks.github}
                className="project-info-links-item-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectName} GitHub link`}
              >
                <FiGithub />
              </Link>
            </li>
          )}
          {projectExternalLinks.externalLink && (
            <li className="project-info-links-item">
              <Link
                href={projectExternalLinks.externalLink}
                className="project-info-links-item-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${projectName} external link`}
              >
                <FiExternalLink />
              </Link>
            </li>
          )}
        </ul>
      </div>
    </motion.div>
  );
}