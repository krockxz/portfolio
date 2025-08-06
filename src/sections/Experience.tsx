import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

// Move experiences array outside component to avoid dependency issues
const expereinces = [
  {
    name: "Indian Kanoon",
    role: "Software Developer",
    url: "https://indiankanoon.org/",
    start: "April 2025",
    end: "Present",
    shortDescription: [
      "Built a high-throughput Django digitization solution that accelerated the Servants of Knowledge initiative.",
      "Implemented OCR functionality and image transformation frameworks to enhance text extraction.",
      "Integrated GenAI solutions with legal corpus architecture, improving search relevance by 15%.",
      "Engineered an API framework connecting the document processing pipeline with the legal search platform."
    ],
  },
  {
    name: "Chargebee",
    role: "Software Engineer Intern",
    url: "https://www.chargebee.com/",
    start: "September 2024",
    end: "April 2025",
    shortDescription: [
      "Streamlined data migration with JOOQ-powered scheduler jobs, optimizing SQL query execution.",
      "Built and optimized customer data migration, leveraging Env properties for Business Entity mapping.",
      "Devised a sandbox data clearing system, reducing system overhead by a significant 30%.",
      "Integrated an adaptive migration validation system in Vue.js, improving MBE configuration accuracy."
    ],
  },
  {
    name: "AiDash",
    role: "Software Engineer- Intern",
    url: "https://www.linkedin.com/company/aidash/",
    start: "January 2024",
    end: "September 2024",
    shortDescription: [
      "Designed and implemented RESTful APIs for data listing and retrieval, utilizing Java and Spring Boot, ensuring efficient data handling and service responsiveness.",
      "Engineered paging functionalities to optimize data fetch performance for large datasets, leveraging Spring Data JPA for seamless integration with backend systems.",
      "Crafted entity models and managed repositories, employing Spring Data for robust and scalable data access, supporting advanced query capabilities and pagination.",
    ],
  },
  {
    name: "PowerGrid",
    role: "Project Intern",
    url: "https://www.powergrid.in/",
    start: "June 2023",
    end: "July 2023",
    shortDescription: [
      "Developed enterprise web applications using Spring Boot for rapid development and efficient microservices architecture.",
      "Implemented responsive UI designs with cross-browser compatibility, ensuring optimal user experience across all platforms.",
      "Integrated Spring Security for robust authentication and authorization, protecting sensitive client data in enterprise deployments.",
      "Collaborated with cross-functional teams to deliver high-quality software solutions meeting business requirements."
    ],
  },
];

function Experience() {
  const [selected, setSelected] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(false);

  // Enhanced keyboard navigation handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelected(Math.min(index + 1, expereinces.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelected(Math.max(index - 1, 0));
        break;
      case 'Home':
        e.preventDefault();
        setSelected(0);
        break;
      case 'End':
        e.preventDefault();
        setSelected(expereinces.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setSelected(index);
        break;
    }
  }, []);

  // Animation trigger for list items
  useEffect(() => {
    setItemsVisible(false);
    const timer = setTimeout(() => setItemsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [selected]);

  useEffect(() => {
    const transformSelected = () => {
      const underline = document.querySelector<HTMLElement>(".underline");
      const items = document.querySelectorAll(".exp-slider-item");
      let topPosition = 0;
      for (let i = 0; i < selected; i++) {
        topPosition += items[i].clientHeight; // Calculate the top position based on actual height
      }
      underline!.style.top = `${topPosition}px`; // Use px instead of rem for precision
    };
    transformSelected();
  }, [selected]);
  

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      rotateY: -15
    },
    visible: { 
      opacity: 1, 
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const listItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    })
  };
  return (
    <motion.div
      className="experience"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="title">
        <h2>Where I&apos;ve Worked</h2>
      </div>
      <div className="container">
        <motion.ul 
          className="exp-slider"
          variants={containerVariants}
          role="tablist"
          aria-label="Professional experience timeline"
        >
          <div className="underline"></div>
          {expereinces.map((expereince, index) => {
            return (
              <motion.li
                className={`exp-slider-item ${
                  index === selected && "exp-slider-item-selected"
                }`}
                onClick={() => setSelected(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                key={expereince.name}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 8 }}
                whileTap={{ scale: 0.98 }}
                tabIndex={0}
                role="tab"
                aria-selected={selected === index}
                aria-controls={`panel-${index}`}
                id={`tab-${index}`}
              >
                <span>{expereince.name}</span>
              </motion.li>
            );
          })}
        </motion.ul>
        <motion.div 
          className="exp-details"
          role="tabpanel"
          id={`panel-${selected}`}
          aria-labelledby={`tab-${selected}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          key={selected}
        >
          <div className="exp-details-position">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <span>{expereinces[selected].role}</span>
              <span className="exp-details-position-company">
                &nbsp;@&nbsp;
                <Link href={expereinces[selected].url} className="link" target="_blank" rel="noopener noreferrer">
                  {expereinces[selected].name}
                </Link>
              </span>
            </motion.h3>
            <motion.p 
              className="exp-details-range"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {expereinces[selected].start} - {expereinces[selected].end}
            </motion.p>
            <motion.ul 
              className="exp-details-list"
              initial="hidden"
              animate={itemsVisible ? "visible" : "hidden"}
            >
              {expereinces[selected].shortDescription.map(
                (description, index) => (
                  <motion.li 
                    key={index} 
                    className="exp-details-list-item"
                    variants={listItemVariants}
                    custom={index}
                    whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  >
                    {description}
                  </motion.li>
                )
              )}
            </motion.ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Experience;
