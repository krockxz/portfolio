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
          Entering full-stack development, I am passionate about creating seamless user experiences. Motivated by a strong curiosity, I explore coding's depth, balancing front-end aesthetics with back-end functionality. Committed to continuous learning, I aim to convert ideas into practical solutions, focusing on code quality and efficiency
          </p>
          <p className="about-grid-info-text">  
          Lately, I have been working with the following technologies to build innovative solutions:
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
            <Image src="/kunal.jpg" alt="profile" fill />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
