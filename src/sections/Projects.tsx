import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

function Projects() {
  const projectsData = [
    {
      image: "/project1.png",
      projectName: "Poker App",
      projectLink: "https://poker-borg.onrender.com/",
      projectDescription:
      "A modern, interactive poker application built with a focus on real-time gameplay and user experience. This full-stack application features secure user authentication, real-time game state management, and an intuitive interface for seamless poker gameplay. Players can create or join lobbies, manage their stacks, and enjoy a responsive design that works across devices.",
      projectTech: [
        "React",
        "Node.js",
        "Express",
        "Socket.io",
        "MongoDB",
        "JWT Authentication"
      ],
      projectExternalLinks: {
        github: "https://github.com/krockxz/Poker",
        externalLink: "https://poker-borg.onrender.com/",
      },
    },
    {
      image: "/project2.png",
      projectName: "File system Organizer",
      projectLink: "https://github.com/krockxz/file-organiser-nodejs",
      projectDescription:
      "Crafted and deployed a dynamic file organization utility using Node.js, boasting tailored sorting functionalities including by name, extension, date, and type for both files and directories. Leveraged the robust Node.js File System (fs) module to seamlessly manage and manipulate file systems, streamlining the process of automated file organization for heightened efficiency and immaculate file structure. Elevating system cleanliness and productivity through innovative design and implementation.",
      projectTech: [
        "Sockets",
        "Node.js",
      ],
      projectExternalLinks: {
        github: "https://github.com/krockxz/file-organiser-nodejs",
        externalLink: "",
      },
    },
    {
      image: "/project3.png",
      projectName: "Github Autocommit Bot",
      projectLink: "https://github.com/krockxz/github-bot",
      projectDescription:
      "Implemented a sophisticated repository management system by harnessing the power of the GitHub API for seamless repository access and updates, alongside the GitPython library for local Git repository management. This advanced setup facilitated scheduled commits with flexible frequency options, ensuring consistent repository activity and enhancing version control workflows. Empowering users with tailored automation for effortless repository maintenance and heightened project collaboration.",
      projectTech: [
        "Python",
        "OS Module",
      ],
      projectExternalLinks: {
        github: "https://github.com/krockxz/github-bot",
        externalLink: "",
      },
    },
  ];
  return (
    <div className="projects" id="work">
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
        <h2>Featured Projects</h2>
      </motion.div>
      <div className="projects-container">
        {projectsData.map(
          ({
            image,
            projectDescription,
            projectLink,
            projectExternalLinks,
            projectName,
            projectTech,
          }, index) => {
            return (
              <motion.div
                className="project"
                key={projectName}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                variants={{
                  visible: { opacity: 1, y: -50 },
                  hidden: { opacity: 0, y: 0 },
                }}
                whileHover={{ 
                  scale: 1.03,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="project-image">
                  <div className="project-image-overlay"></div>
                  <div className="project-image-container">
                    <Image 
                      src={image} 
                      fill 
                      alt={projectName} 
                      quality={100}
                      className="project-img" 
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
                      <li className="project-info-tech-list-item" key={tech}>
                        {tech}
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
        )}
      </div>
    </div>
  );
}

export default Projects;
