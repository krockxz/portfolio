import React from "react";
import { motion } from "framer-motion";
import { otherProjectsData } from "@/data/otherProjects";
import OtherProjectCard from "@/components/OtherProjectCard";

function OtherProjects() {
  return (
    <div className="other-projects" id="other-projects">
      <motion.div
        className="title"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        <h2>Other Noteworthy Projects</h2>
      </motion.div>

      <div className="other-projects-container">
        {otherProjectsData.map((project, index) => (
          <OtherProjectCard
            key={project.projectName}
            project={project}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default OtherProjects;
