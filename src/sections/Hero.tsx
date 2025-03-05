import Button from "@/components/Button";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import CopyButton from "@/components/CopyButton"; 
import { FiArrowDown } from 'react-icons/fi';

function Hero() {
  const [copied, setCopied] = useState(false);
  
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="hero-content">
      <div className="">
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 0.6,
          }}
          whileHover={{ 
            scale: 1.05, 
            color: "var(--theme-color)",
            transition: { duration: 0.2 } 
          }}
        >
          Hi, my name is
        </motion.h1>
        <motion.h2
          className="hero-title-large"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 0.75,
          }}
          whileHover={{ 
            scale: 1.02, 
            x: 10,
            transition: { duration: 0.2 } 
          }}
        >
          Kunal Roy Choudhury.
        </motion.h2>
        <motion.h3
          className="hero-title-large hero-title-sub"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 1.05,
          }}
          whileHover={{ 
            scale: 1.02, 
            x: 10,
            transition: { duration: 0.2 } 
          }}
        >
          I craft exceptional digital experiences.
        </motion.h3>
        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 1.35,
          }}
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2 } 
          }}
        >
          I&apos;m an elite software engineer with expertise in creating top-notch
          software solutions and experiences. My current focus is on developing innovative products that are
          centered around user needs and pushing the boundaries of what&apos;s possible on the web.
        </motion.p>
        <motion.div
          className="hero-button"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: 1.65,
          }}
        >  
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              text="Check out my latest work" 
              link="https://github.com/krockxz?tab=repositories" 
              target="_blank"
              style={{ marginRight: '10px' }} 
            />
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <CopyButton text="npx kunalrc" className="btn" />
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div 
        className="scroll-down-indicator"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            delay: 2.2,
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop"
          }
        }}
        whileHover={{ y: 5 }}
      >
        <button onClick={scrollToAbout} aria-label="Scroll down">
          <FiArrowDown />
        </button>
      </motion.div>
    </div>
  );
}

export default Hero;
