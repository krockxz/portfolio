import Link from "next/link";
import React from "react";
import 'react-toastify/dist/ReactToastify.css';

interface ButtonProps {
  text: string;
  link?: string; // Optional because a button might not always navigate
  onClick?: () => void; // Optional because a button might not always have an onClick handler
  style?: React.CSSProperties; // Using React's built-in type for style objects
  className?: string; // Optional for additional CSS class names
  target?: string; // For opening links in new tabs
  icon?: React.ReactNode; // Optional icon to display alongside text
}

function Button({ text, link, onClick, style, className, target = "_blank", icon }: ButtonProps) {
  if (link) {
    return (
      <Link href={link} passHref legacyBehavior>
        <a 
          className={`btn ${className || ''}`} 
          style={style} 
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {icon && <span className="btn-icon">{icon}</span>}
          <span className="btn-text">{text}</span>
        </a>
      </Link>
    );
  }
  
  return (
    <button 
      className={`btn ${className || ''}`} 
      style={style} 
      onClick={onClick}
      type="button"
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{text}</span>
    </button>
  );
}

export default Button;

