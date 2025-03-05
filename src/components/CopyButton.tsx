import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiTerminal, FiCheck } from 'react-icons/fi';

interface CopyButtonProps {
  text: string;
  className?: string; 
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  };

  return (
    <motion.button 
      className={`copy-btn ${className} ${isCopied ? 'copied' : ''}`}
      onClick={copyToClipboard}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div 
        className="copy-btn-content"
        animate={isCopied ? { y: [-3, 0, -3], transition: { repeat: 2, duration: 0.5 } } : {}}
      >
        <motion.span className="copy-btn-icon">
          {isCopied ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 15, 0] }}
              transition={{ duration: 0.3 }}
            >
              <FiCheck color="#4ade80" />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
              transition={{ duration: 0.4 }}
            >
              <FiTerminal />
            </motion.div>
          )}
        </motion.span>
        <motion.span 
          className="copy-btn-text"
          animate={isCopied ? { color: "#4ade80" } : {}}
        >
          {isCopied ? "Copied!" : text}
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

export default CopyButton;
