import React from 'react';
import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

const KineticText: React.FC<KineticTextProps> = ({ 
  text, 
  className = '', 
  delay = 0,
  staggerDelay = 0.05 
}) => {
  return (
    <motion.div className={className}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: delay + (index * staggerDelay),
            type: "spring",
            stiffness: 100,
            damping: 10
          }}
          whileHover={{
            y: -5,
            scale: 1.1,
            color: "var(--theme-color)",
            textShadow: "0 0 10px rgba(41, 182, 246, 0.5)",
            transition: { duration: 0.2 }
          }}
          style={{ display: 'inline-block', cursor: 'pointer' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default KineticText;