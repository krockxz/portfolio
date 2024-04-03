import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Experience() {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    const transformSelected = () => {
      const underline = document.querySelector<HTMLElement>(".underline");
      underline!.style.top = `${selected * 2.5}rem`;
    };
    transformSelected();
  }, [selected]);

  const expereinces = [
    {
      name: "AiDash",
      role: "Software Engineer- Intern",
      url: "https://www.linkedin.com/company/aidash/",
      start: "January 2024",
      end: "July 2024",
      shortDescription: [
        "Designed and implemented RESTful APIs for data listing and retrieval, utilizing Java and Spring Boot, ensuring efficient data handling and service responsiveness.",
        "Engineered paging functionalities to optimize data fetch performance for large datasets, leveraging Spring Data JPA for seamless integration with backend systems.",
        "Crafted entity models and managed repositories, employing Spring Data for robust and scalable data access, supporting advanced query capabilities and pagination.",
      ],
    },
    {
      name: "Power Grid Corporation of India",
      role: "Project Intern",
      url: "https://www.powergrid.in/",
      start: "June 2023",
      end: "July 2023",
      shortDescription: [
        "Leveraged Spring Boot's comprehensive ecosystem for rapid development, microservices architecture, and efficient data management",
        "Optimized website performance and ensured cross-browser compatibility",
        "Utilized Spring Security for authentication and authorization, ensuring the integrity and protection of client data in enterprise-level deployments.",
      ],
    },
    {
      name: "Gagner Global",
      role: "Software Developer - Intern",
      url: "https://www.linkedin.com/company/gagner-global/?originalSubdomain=in",
      start: "November 2018",
      end: "November 2023",
      shortDescription: [
        "Worked on the development of a web-based CRM application using ReactJS and Node.js.",
        "Implemented new features and enhancements to improve the user experience and performance of the application.",
      ],
    },
  ];
  return (
    <motion.div
      className="experience"
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <div className="title">
        <h2>Where I&apos;ve Worked</h2>
      </div>
      <div className="container">
        <ul className="exp-slider">
          <div className="underline"></div>
          {expereinces.map((expereince, index) => {
            return (
              <li
                className={`exp-slider-item ${
                  index === selected && "exp-slider-item-selected"
                }`}
                onClick={() => setSelected(index)}
                key={expereince.name}
              >
                <span>{expereince.name}</span>
              </li>
            );
          })}
        </ul>
        <div className="exp-details">
          <div className="exp-details-position">
            <h3>
              <span>{expereinces[selected].role}</span>
              <span className="exp-details-position-company">
                &nbsp;@&nbsp;
                <Link href={expereinces[selected].url} className="link">
                  {expereinces[selected].name}
                </Link>
              </span>
            </h3>
            <p className="exp-details-range">
              {expereinces[selected].start} - {expereinces[selected].end}
            </p>
            <ul className="exp-details-list">
              {expereinces[selected].shortDescription.map(
                (description, index) => (
                  <li key={index} className="exp-details-list-item">
                    {description}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Experience;
