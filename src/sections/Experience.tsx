import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
function Experience() {
  const [selected, setSelected] = useState(0);

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
                <Link href={expereinces[selected].url} className="link" target="_blank" rel="noopener noreferrer">
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
