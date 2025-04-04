import React from "react";
import { motion } from "framer-motion";
import { FiFolder, FiGithub, FiExternalLink } from "react-icons/fi";
import Link from "next/link";

function OtherProjects() {
  const otherProjectsData = [
    {
      projectName: "File System Organiser",
      projectDescription: "A dynamic file organization utility using Node.js with tailored sorting functionalities including by name, extension, date, and type. Streamlines the process of automated file organization for improved efficiency and better file structure management.",
      projectTech: ["Node.js", "File System API", "Command Line Interface"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/file-organiser-nodejs",
        externalLink: "",
      },
    },
    {
      projectName: "Github Bot",
      projectDescription: "A sophisticated repository management system using GitHub API for seamless repository access and updates. This tool automates scheduled commits with flexible frequency options, ensuring consistent repository activity and enhancing version control workflows.",
      projectTech: ["Python", "GitHub API", "GitPython", "Automation"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/github-bot",
        externalLink: "",
      },
    },
    {
      projectName: "EvoSource",
      projectDescription: "A comprehensive source code evolution tracking system that analyzes code changes over time, providing insights into development patterns and code quality metrics.",
      projectTech: ["Python", "Git API", "Data Analysis", "Visualization"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/EvoSource",
        externalLink: "",
      },
    },
    {
      projectName: "CSV Image Data Processor",
      projectDescription: "An efficient tool for processing and analyzing image data from CSV files. Features batch processing capabilities and automated data extraction for large datasets.",
      projectTech: ["Python", "Pandas", "OpenCV", "Data Processing"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/process-image-data-from-CSV",
        externalLink: "",
      },
    },
    {
      projectName: "Menu Management System",
      projectDescription: "A robust menu management system for restaurants and food service businesses. Includes features for inventory tracking, menu optimization, and sales analytics.",
      projectTech: ["React", "Node.js", "MongoDB", "Express"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/menu-management",
        externalLink: "",
      },
    },
    {
      projectName: "Syntax API",
      projectDescription: "A robust API service that provides syntax highlighting and code formatting capabilities for multiple programming languages. Built with performance and extensibility in mind.",
      projectTech: ["Node.js", "Express", "Prism.js", "RESTful API"],
      projectExternalLinks: {
        github: "https://github.com/krockxz/Syntax-API",
        externalLink: "",
      },
    },
  ];

  return (
    <div className="other-projects" id="other-projects">
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: -50 },
          hidden: { opacity: 0, y: 0 },
        }}
      >
        <h2>Other Noteworthy Projects</h2>
      </motion.div>
      
      <div className="other-projects-container">
        {otherProjectsData.map(
          ({
            projectDescription,
            projectExternalLinks,
            projectName,
            projectTech,
          }, index) => {
            return (
              <motion.div
                className="other-project-card"
                key={projectName}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={{
                  visible: { opacity: 1, y: -20 },
                  hidden: { opacity: 0, y: 0 },
                }}
                whileHover={{ 
                  y: -15, 
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <header>
                  <div className="other-project-top">
                    <motion.div 
                      className="folder"
                      whileHover={{ 
                        rotate: [0, -10, 10, -5, 0],
                        transition: { duration: 0.4 }
                      }}
                    >
                      <FiFolder />
                    </motion.div>
                    <div className="other-project-links">
                      {projectExternalLinks.github && (
                        <motion.div
                          whileHover={{ y: -5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={projectExternalLinks.github}
                            aria-label={`${projectName} GitHub link`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiGithub />
                          </Link>
                        </motion.div>
                      )}
                      {projectExternalLinks.externalLink && (
                        <motion.div
                          whileHover={{ y: -5, scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Link
                            href={projectExternalLinks.externalLink}
                            aria-label={`${projectName} external link`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FiExternalLink />
                          </Link>
                        </motion.div>
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
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                </footer>
              </motion.div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default OtherProjects;
