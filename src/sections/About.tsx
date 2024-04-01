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
          Embarking on the exhilarating path of full-stack development, I am a novice enthusiast driven by a fervent desire to craft flawless digital encounters. Fueled by my insatiable curiosity, I delve into the intricacies of coding, encompassing both the visual allure of front-end design and the logical prowess of back-end development. With an unwavering commitment to constant learning and personal growth, I am dedicated to materializing concepts into reality through the art of coding, meticulously crafting each line with precision and passion.
          </p>
          <p className="about-grid-info-text">
          </p>

          <p className="about-grid-info-text">
          Embarking on a journey in full-stack development, I am an enthusiastic beginner with a strong desire to create comprehensive digital solutions. We can connect and explore the endless possibilities of the tech world together!
          </p>
    
          <p className="about-grid-info-text">  
          Lately, I have been delving into the following technologies to enhance my skillset and expertise:
          </p>
          <ul className="about-grid-info-list">
            <li className="about-grid-info-list-item">React</li>
            <li className="about-grid-info-list-item">Python</li>
            <li className="about-grid-info-list-item">Next.js</li>
            <li className="about-grid-info-list-item">Typescript</li>
            <li className="about-grid-info-list-item">Git</li>
            <li className="about-grid-info-list-item">Node.js</li>
            <li className="about-grid-info-list-item">Java</li>
            <li className="about-grid-info-list-item">SpringBoot</li>
            <li className="about-grid-info-list-item">Django</li>
          </ul>
        </div>
        <div className="about-grid-photo">
          <div className="overlay"></div>
          <div className="overlay-border"></div>
          <div className="about-grid-photo-container">
            <Image src="kunal.jpg" alt="profile" fill />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default About;
