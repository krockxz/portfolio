import Button from "@/components/Button";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useCallback } from 'react';
import CopyButton from "@/components/CopyButton"; 
import { FiArrowDown } from 'react-icons/fi';
import KineticText from "@/components/KineticText";

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

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);
  
  return (
    <section className="hero" id="home">
      {/* Parallax Background Layers */}
      <motion.div 
        className="parallax-bg-layer-1"
        style={{ y: y1 }}
      />
      <motion.div 
        className="parallax-bg-layer-2"
        style={{ y: y2 }}
      />
      <motion.div 
        className="parallax-bg-layer-3"
        style={{ y: y3 }}
      />
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.3,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
          whileHover={{ 
            scale: 1.05, 
            color: "var(--theme-color)",
            transition: { duration: 0.2 } 
          }}
        >
          Hi,
        </motion.h1>
        <motion.div variants={itemVariants}>
          <KineticText 
            text="I'm Kunal" 
            className="hero-title-large hero-title-sub"
            delay={1.5}
            staggerDelay={0.1}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 2.5,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 } 
            }}
          >
            Powered by caffeine, curiosity, and a healthy respect for Stack Overflow. I enjoy the entire journey of taking a project from a rough concept to a polished, real-world application, one commit at a time.
          </motion.p>
        </motion.div>
        <motion.div 
          className="hero-button"
          variants={itemVariants}
        >  
          <Button 
            text="Check out my latest work" 
            link="https://github.com/krockxz?tab=repositories" 
            target="_blank"
            style={{ marginRight: '10px' }} 
          />
          <CopyButton text="npx kunalrc" className="btn" />
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
