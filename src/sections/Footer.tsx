import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FiGitBranch } from "react-icons/fi";
import { motion } from "framer-motion";

function Footer() {
  const [githubInfo, setGitHubInfo] = useState({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    fetch("https://github.com/krockxz")
      .then((response) => response.json())
      .then((json) => {
        const { stargazers_count, forks_count } = json;
        setGitHubInfo({
          stars: stargazers_count,
          forks: forks_count,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <footer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <Link
          href="https://github.com/krockxz/portfolio"
          target="_blank"
          className="footer-link"
        >
          <span className="footer-info">Built by Kunal Roy Choudhury</span>
          {githubInfo && (
            <div className="footer-git">
              <motion.div 
                className="footer-git-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRegStar className="footer-git-item-icon" />
                <span className="footer-git-item-text">{githubInfo.stars}</span>
              </motion.div>
              <motion.div 
                className="footer-git-item"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGitBranch className="footer-git-item-icon" />
                <span className="footer-git-item-text">{githubInfo.forks}</span>
              </motion.div>
            </div>
          )}
        </Link>
      </motion.div>
    </footer>
  );
}

export default Footer;
