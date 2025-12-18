import React from 'react';
import { motion } from 'framer-motion';
import { FiMessageCircle } from 'react-icons/fi';
import styles from './ChatButton.module.css';

interface ChatButtonProps {
    onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
    return (
        <motion.button
            className={styles.chatButton}
            onClick={onClick}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
            }}
            aria-label="Open chat"
        >
            <FiMessageCircle size={24} />
        </motion.button>
    );
};

export default ChatButton;
