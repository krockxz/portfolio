import { motion, useScroll, useTransform } from "framer-motion";
import React, { useCallback } from 'react';
import CopyButton from "@/components/CopyButton"; 
import { FiArrowDown } from 'react-icons/fi';
import KineticText from "@/components/KineticText";

// Reusable animation variants (DRY principle)
const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.6, -0.05, 0.01, 0.99] },
    },
  },
} as const;

function Hero() {
  const { scrollY } = useScroll();
  const parallaxTransforms = [
    useTransform(scrollY, [0, 1000], [0, -200]),
    useTransform(scrollY, [0, 1000], [0, -100]),
    useTransform(scrollY, [0, 1000], [0, -50])
  ];
  
  const scrollToAbout = useCallback(() => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  
  return (
    <section className="hero" id="home">
      {/* Parallax Background Layers */}
      {parallaxTransforms.map((transform, index) => (
        <motion.div 
          key={index}
          className={`parallax-bg-layer-${index + 1}`}
          style={{ y: transform }}
        />
      ))}
      <motion.div 
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.container}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            delay: 0.2,
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
        <motion.div variants={ANIMATION_VARIANTS.item}>
          <KineticText 
            text="I'm Kunal" 
            className="hero-title-large hero-title-sub"
            delay={0.8}
            staggerDelay={0.05}
          />
        </motion.div>
        <motion.div variants={ANIMATION_VARIANTS.item}>
          <motion.p
            className="hero-text"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 1.4,
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
          variants={ANIMATION_VARIANTS.item}
        >  
          <a 
            className="copy-btn copy-btn--lg mr-2"
            href="https://github.com/krockxz?tab=repositories" 
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out my latest work
          </a>
          <CopyButton text="npx kunalrc" className="copy-btn--sm" />
        </motion.div>
      </motion.div>
      
      <motion.div 
        className="scroll-down-indicator"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          y: [0, 10, 0],
          transition: {
            delay: 1.8,
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
