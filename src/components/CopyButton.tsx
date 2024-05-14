import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="currentColor">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
  </svg>
);

export const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#00FF00">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
  </svg>
);

interface CopyButtonProps {
  text: string;
  className?: string; 
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text).then(() => {
      setIsCopied(true);
      toast.success('Command copied to clipboard!');
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    }).catch(err => {
      toast.error('Failed to copy!');
      console.error('Copy failed:', err);
    });
  };

  return (
    <button 
      className={`copy-btn ${className} ${isCopied ? 'copied' : ''}`}
      onClick={copyToClipboard}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
      <span>{isCopied ? "Copied" : text}</span>
    </button>
  );
};

export default CopyButton;
