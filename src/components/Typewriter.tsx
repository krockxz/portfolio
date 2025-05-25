import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
  onComplete?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  delay = 30,
  startDelay = 0,
  onComplete = () => {},
  className = '',
  children,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
    setIsStarted(false);
  }, [text]);

  // Start the typewriter effect after the start delay
  useEffect(() => {
    if (startDelay <= 0) {
      setIsStarted(true);
      return;
    }

    const startTimer = setTimeout(() => {
      setIsStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimer);
  }, [startDelay]);

  // Handle the typing effect
  useEffect(() => {
    if (!isStarted) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    } else {
      onComplete();
    }
  }, [currentIndex, text, delay, onComplete, isStarted]);

  // If children are provided, clone them with the displayText as children
  if (children) {
    return React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...child.props,
          children: displayText,
        });
      }
      return child;
    });
  }


  return <span className={className}>{displayText}</span>;
};

export default Typewriter;
