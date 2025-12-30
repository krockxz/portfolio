import Link from "next/link";
import React, { useEffect, useState, useCallback, useRef } from "react";

const experiences = [
  {
    name: "Indian Kanoon",
    role: "Software Developer",
    url: "https://indiankanoon.org/",
    start: "April 2025",
    end: "Present",
    description: "Building high-performance document processing pipelines and integrating AI into the legal search engine. I focus on accelerating the digitization of regional law archives and improving search accuracy for millions of users.",
  },
  {
    name: "Chargebee",
    role: "Software Engineer Intern",
    url: "https://www.chargebee.com/",
    start: "September 2024",
    end: "April 2025",
    description: "Refined large-scale data migration systems and optimized database interactions. I developed automated validation tools to ensure billing accuracy and performance across global customer environments.",
  },
  {
    name: "AiDash",
    role: "Software Engineer- Intern",
    url: "https://www.linkedin.com/company/aidash/",
    start: "January 2024",
    end: "September 2024",
    description: "Designed scalable APIs and data retrieval frameworks. I implemented efficient paging and filtering logic for massive datasets, ensuring smooth data access for enterprise utility management.",
  },
  {
    name: "PowerGrid",
    role: "Project Intern",
    url: "https://www.powergrid.in/",
    start: "June 2023",
    end: "July 2023",
    description: "Developed internal web tools to streamline project management and resource tracking. I focused on building secure, responsive interfaces for enterprise-level data visualization.",
  },
];

function Experience() {
  const [selected, setSelected] = useState(0);
  const underlineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLUListElement>(null);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, index: number) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelected(Math.min(index + 1, experiences.length - 1));
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
        setSelected(experiences.length - 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        setSelected(index);
        break;
    }
  }, []);

  useEffect(() => {
    const updateUnderline = () => {
      const underline = underlineRef.current;
      const container = containerRef.current;
      if (!underline || !container) return;

      const items = container.querySelectorAll(".exp-slider-item");
      if (items.length === 0) return;

      const selectedItem = items[selected] as HTMLElement;
      if (!selectedItem) return;

      underline.style.top = `${selectedItem.offsetTop}px`;
      underline.style.height = `${selectedItem.offsetHeight}px`;
    };
    updateUnderline();
  }, [selected]);

  const { role, url, name, start, end, description } = experiences[selected];

  return (
    <section className="experience" id="experience">
      <div className="title">
        <h2>Where I&apos;ve Worked</h2>
      </div>
      <div className="container">
        <ul
          ref={containerRef}
          className="exp-slider"
          role="tablist"
          aria-label="Professional experience timeline"
        >
          <div ref={underlineRef} className="underline" />
          {experiences.map((exp, index) => (
            <li
              className={`exp-slider-item ${index === selected ? "exp-slider-item-selected" : ""}`}
              onClick={() => setSelected(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              key={exp.name}
              tabIndex={0}
              role="tab"
              aria-selected={selected === index}
              aria-controls={`panel-${index}`}
              id={`tab-${index}`}
            >
              <span>{exp.name}</span>
            </li>
          ))}
        </ul>
        <div
          className="exp-details"
          role="tabpanel"
          id={`panel-${selected}`}
          aria-labelledby={`tab-${selected}`}
          key={selected}
        >
          <div className="exp-details-position">
            <h3>
              <span>{role}</span>
              <span className="exp-details-position-company">
                &nbsp;@&nbsp;
                <Link href={url} className="link" target="_blank" rel="noopener noreferrer">
                  {name}
                </Link>
              </span>
            </h3>
            <p className="exp-details-range">
              {start} - {end}
            </p>
            <p className="exp-details-description">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
