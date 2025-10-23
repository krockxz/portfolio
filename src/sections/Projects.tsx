import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { projectsData } from "@/data/projects";

const Projects = () => {
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
        {projectsData.map((project, index) => (
          <ProjectCard key={project.projectName} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

export default Projects;
