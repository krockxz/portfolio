import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { techStack } from "@/data/techStack";

function About() {
  return (
    <motion.section
      className="about"
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="title">
        <h2>About Me</h2>
      </div>
      <div className="about-grid">
        <div className="about-grid-info">
          <p className="about-grid-info-text">
            Full-stack developer with a passion for building clean, user-centric applications.
            I focus on creating seamless experiences through efficient frontend architecture and robust backend logic.
            Always exploring new ways to solve complex problems and deliver high-quality software.
          </p>
          <div className="tech-list">
            {techStack.map((tech, index) => {
              const IconComponent = tech.icon;
              return (
                <Badge key={index} variant="outline" className="tech-badge">
                  <IconComponent className="tech-icon" />
                  {tech.name}
                </Badge>
              );
            })}
          </div>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image
              src="/images/kunal.jpg"
              alt="Profile picture of Kunal Roy Choudhury"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="about-image"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default About;
