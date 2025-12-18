import React, { useState, useEffect } from 'react';
import ChatButton from './ChatButton';
import ChatWidget from './ChatWidget';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => setIsOpen(prev => !prev);
    const closeChat = () => setIsOpen(false);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                closeChat();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen]);

    return (
        <>
            {!isOpen && <ChatButton onClick={toggleChat} />}
            <ChatWidget isOpen={isOpen} onClose={closeChat} />
        </>
    );
};

export default Chatbot;
