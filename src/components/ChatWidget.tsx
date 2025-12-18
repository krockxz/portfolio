import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend } from 'react-icons/fi';
import { getWelcomeMessage } from '@/lib/chatbot-context';
import styles from './ChatWidget.module.css';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface ChatWidgetProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    // Auto-scroll to latest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    // Add welcome message on first open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const welcomeMsg: Message = {
                id: 'welcome',
                role: 'assistant',
                content: getWelcomeMessage(),
                timestamp: new Date()
            };
            setMessages([welcomeMsg]);
        }
    }, [isOpen]);

    const handleSendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input.trim(),
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setError(null);

        try {
            // Prepare messages for API
            const messageHistory = [...messages, userMessage].map(msg => ({
                role: msg.role,
                content: msg.content
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: messageHistory }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to get response');
            }

            // Handle streaming response
            const reader = response.body?.getReader();
            const decoder = new TextDecoder();

            if (!reader) {
                throw new Error('No response stream');
            }

            let assistantMessageId = (Date.now() + 1).toString();
            let accumulatedText = '';

            // Add empty assistant message
            setMessages(prev => [...prev, {
                id: assistantMessageId,
                role: 'assistant',
                content: '',
                timestamp: new Date()
            }]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);

                        if (data === '[DONE]') {
                            break;
                        }

                        try {
                            const parsed = JSON.parse(data);
                            if (parsed.text) {
                                accumulatedText += parsed.text;

                                // Update the message with accumulated text
                                setMessages(prev => prev.map(msg =>
                                    msg.id === assistantMessageId
                                        ? { ...msg, content: accumulatedText }
                                        : msg
                                ));
                            }
                        } catch (e) {
                            console.error('Error parsing stream data:', e);
                        }
                    }
                }
            }

        } catch (err: any) {
            console.error('Chat error:', err);
            setError(err.message || 'Failed to send message');

            // Add error message
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.chatWidget}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.headerInfo}>
                            <img
                                src="/images/kunal.jpg"
                                alt="Kunal"
                                className={styles.headerAvatar}
                            />
                            <div>
                                <h3 className={styles.headerTitle}>Kunal's AI Assistant</h3>
                                <p className={styles.headerStatus}>
                                    <span className={styles.statusDot}></span>
                                    Online
                                </p>
                            </div>
                        </div>
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close chat"
                        >
                            <FiX />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.chatMessages}>
                        {messages.map((message) => (
                            <motion.div
                                key={message.id}
                                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage
                                    }`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={styles.messageContent}>
                                    {message.content}
                                </div>
                                <div className={styles.messageTime}>
                                    {message.timestamp.toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </motion.div>
                        ))}

                        {isLoading && (
                            <motion.div
                                className={`${styles.message} ${styles.assistantMessage}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className={styles.typingIndicator}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <div className={styles.errorMessage}>
                                {error}
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className={styles.chatInput}>
                        <textarea
                            ref={inputRef}
                            className={styles.input}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask me anything..."
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            className={styles.sendButton}
                            onClick={handleSendMessage}
                            disabled={!input.trim() || isLoading}
                            aria-label="Send message"
                        >
                            <FiSend />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChatWidget;
