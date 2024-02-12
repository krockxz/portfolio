import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

function Projects() {
  const projectsData = [
    {
      image: "/project1.png",
      projectName: "Kume",
      projectLink: "https://rich-lingerie-lamb.cyclic.app/",
      projectDescription:
      "This MERN stack e-commerce site utilizes MongoDB, Express.js, React, and Node.js. Users can explore, compare, and purchase products, with Firebase Firestore supporting personal lists. The platform prioritizes user-friendly experiences and optimal performance.",
      projectTech: [
        "React",
        "Redux Toolkit", 
        "CSS",
        "Mongodb",
        "Typescript",
        "NextJs",
      ],
      projectExternalLinks: {
        github: "",
        externalLink: "",
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
        github: "",
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
        "React",
        "Redux Toolkit",
      ],
      projectExternalLinks: {
        github: "",
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
        <h2>Some Things I’ve Built</h2>
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
          }) => {
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
              >
                <div className="project-image">
                  <div className="project-image-overlay"></div>
                  <div className="project-image-container">
                    <Image src={image} fill alt={projectName} quality={100} />
                  </div>
                </div>
                <div className="project-info">
                  <p className="project-info-overline">Featured Project</p>
                  <h3 className="project-info-title">{projectName}</h3>
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
                    <li className="project-info-links-item">
                      <Link
                        href={projectExternalLinks.github}
                        className="project-info-links-item-link"
                      >
                        <FiGithub />
                      </Link>
                    </li>
                    <li className="project-info-links-item">
                      <Link
                        href={projectExternalLinks.externalLink}
                        className="project-info-links-item-link"
                      >
                        <FiExternalLink />
                      </Link>
                    </li>
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
