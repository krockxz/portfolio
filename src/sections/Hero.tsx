import Button from "@/components/Button";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import CopyButton from "@/components/CopyButton"; 
import { FiArrowDown } from 'react-icons/fi';
import Typewriter from "@/components/Typewriter";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.02,
    x: 10,
    transition: {
      duration: 0.2,
    },
  },
};

function Hero() {
  const [copied, setCopied] = useState(false);
  
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <section className="hero" id="home">
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="hero-title-wrapper"
          variants={itemVariants}
        >
          <motion.h1
            className="hero-title"
            whileHover={{ 
              scale: 1.05, 
              color: "var(--theme-color)",
              transition: { duration: 0.2 } 
            }}
          >
            <Typewriter text="Hi, my name is" delay={50}>
              <span />
            </Typewriter>
          </motion.h1>
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.h2
            className="hero-title-large"
            variants={hoverVariants}
            whileHover="hover"
          >
            <Typewriter 
              text="Kunal Roy Choudhury." 
              delay={30} 
              startDelay={1000}
            >
              <span className="inline-block" />
            </Typewriter>
          </motion.h2>
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.h3
            className="hero-title-large hero-title-sub"
            variants={hoverVariants}
            whileHover="hover"
          >
            <Typewriter 
              text="I craft exceptional digital experiences." 
              delay={30} 
              startDelay={2000}
            >
              <span className="inline-block" />
            </Typewriter>
          </motion.h3>
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.p
            className="hero-text"
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 } 
            }}
          >
            <Typewriter 
              text="I'm an elite software engineer with expertise in creating top-notch software solutions and experiences. My current focus is on developing innovative products that are centered around user needs and pushing the boundaries of what's possible on the web." 
              delay={10}
              startDelay={3000}
            >
              <span />
            </Typewriter>
          </motion.p>
        </motion.div>
        <motion.div 
          className="hero-button"
          variants={itemVariants}
        >  
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
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
      </motion.div>
      
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
    </section>
  );
}

export default Hero;
