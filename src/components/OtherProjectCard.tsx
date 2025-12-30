import React from "react";
import { motion } from "framer-motion";
import { FiFolder, FiGithub, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import TechIcon from "./TechIcon";

interface OtherProjectCardProps {
    project: {
        projectName: string;
        projectDescription: string;
        projectTech: string[];
        projectExternalLinks: {
            github: string;
            externalLink: string;
        };
    };
    index: number;
}

const OtherProjectCard: React.FC<OtherProjectCardProps> = ({ project, index }) => {
    const { projectName, projectDescription, projectTech, projectExternalLinks } = project;

    return (
        <motion.div
            className="other-project-card"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 20 },
            }}
        >
            <header>
                <div className="other-project-top">
                    <div className="folder">
                        <FiFolder />
                    </div>
                    <div className="other-project-links">
                        {projectExternalLinks.github && (
                            <div>
                                <Link
                                    href={projectExternalLinks.github}
                                    aria-label={`${projectName} GitHub link`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FiGithub />
                                </Link>
                            </div>
                        )}
                        {projectExternalLinks.externalLink && (
                            <div>
                                <Link
                                    href={projectExternalLinks.externalLink}
                                    aria-label={`${projectName} external link`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FiExternalLink />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <h3 className="other-project-title">
                    <Link
                        href={projectExternalLinks.github || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {projectName}
                    </Link>
                </h3>
                <div className="other-project-description">
                    <p>{projectDescription}</p>
                </div>
            </header>
            <footer>
                <ul className="other-project-tech-list">
                    {projectTech.map((tech) => (
                        <li key={tech}>
                            <TechIcon tech={tech} size={16} />
                        </li>
                    ))}
                </ul>
            </footer>
        </motion.div>
    );
};

export default OtherProjectCard;
