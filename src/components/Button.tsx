import Link from "next/link";
import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

interface ButtonProps {
  text: string;
  link?: string; // Optional because a button might not always navigate
  onClick?: () => void; // Optional because a button might not always have an onClick handler
  style?: React.CSSProperties; // Using React's built-in type for style objects
  className?: string; // Optional for additional CSS class names
}

function Button({ text, link, onClick, style, className }: ButtonProps) {
  if (link) {
    return (
      <Link href={link} passHref legacyBehavior>
        <a className={`btn ${className}`} style={style}>{text}</a>
      </Link>
    );
  }
}

export default Button;

