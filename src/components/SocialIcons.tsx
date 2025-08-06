import Link from "next/link";
import React from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";
import { motion } from "framer-motion";

function SocialIcons() {
  const socialLinks = [
    { name: "Github", icon: <FiGithub />, link: "https://github.com/krockxz" },
    {
      name: "LinkedIn",
      icon: <FiLinkedin />,
      link: "https://www.linkedin.com/in/kunal-roy-choudhury-7407211a7/",
    },
    {
      name: "Twitter",
      icon: <FiTwitter />,
      link: "https://x.com/kunalgoesbyken",
    },
  ];
  return (
    <motion.div
      className="social-icons"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
        delay: 1.95,
      }}
    >
      <ul className="social-icons-list">
        {socialLinks.map(({ name, icon, link }, index) => (
          <motion.li 
            key={name} 
            title={name} 
            className="social-icons-list-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: 1.95 + index * 0.1,
              ease: "easeInOut" 
            }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2, ease: "easeInOut" } 
            }}
            whileTap={{ scale: 0.9 }}
          >
            <Link
              href={link}
              className="social-icons-list-item-link"
              target="_blank"
              aria-label={name}
            >
              {icon}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default SocialIcons;
