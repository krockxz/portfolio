import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FiGitBranch } from "react-icons/fi";
import { motion } from "framer-motion";

function Footer() {
  const [githubInfo, setGitHubInfo] = useState<{
    stars: number | null;
    forks: number | null;
  }>({
    stars: null,
    forks: null,
  });

  useEffect(() => {
    // Use GitHub API v4 (GraphQL) to avoid CORS issues
    const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN; // Make sure to add this to your .env.local
    const GITHUB_USERNAME = 'krockxz';
    const GITHUB_REPO = 'portfolio';

    const query = `
      query {
        repository(owner: "${GITHUB_USERNAME}", name: "${GITHUB_REPO}") {
          stargazerCount
          forkCount
        }
      }
    `;

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(({ data }) => {
      if (data?.repository) {
        setGitHubInfo({
          stars: data.repository.stargazerCount,
          forks: data.repository.forkCount,
        });
      }
    })
    .catch((error) => {
      console.error('Error fetching GitHub data:', error);
      // Set default values if API fails
      setGitHubInfo({
        stars: 0,
        forks: 0,
      });
    });
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
