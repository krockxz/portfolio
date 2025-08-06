import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { useInView, motion } from "framer-motion";

function About() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    console.log("Element is in view: ", isInView);
  }, [isInView]);
  return (
    <motion.div
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
          Full-stack developer entering the field with dangerous levels of optimism. I create user experiences that don't make people question their life choices, balancing pretty front-ends with back-ends that hopefully don't catch fire. Always learning because tech evolves faster than my debugging skills, I turn ideas into solutions that work beyond "it runs on localhost."
          </p>
          <p className="about-grid-info-text">  
          Recent tech stack adventures (with varying degrees of success):
          </p>
          <ul className="about-grid-info-list">
            <li className="about-grid-info-list-item">Golang</li>
            <li className="about-grid-info-list-item">React</li>
            <li className="about-grid-info-list-item">Next.js & SSR</li>
            <li className="about-grid-info-list-item">AWS</li>
            <li className="about-grid-info-list-item">Django</li>
            <li className="about-grid-info-list-item">MongoDB</li>
            <li className="about-grid-info-list-item">MCP</li>
            <li className="about-grid-info-list-item">Express</li>
            <li className="about-grid-info-list-item">TypeScript</li>
          </ul>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image 
              src="/kunal.jpg" 
              alt="Profile picture of Kunal Roy Choudhury" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
