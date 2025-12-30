import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useActiveSection } from "@/hooks/useActiveSection";
import MobileNavbar from "@/components/MobileNavbar";

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0, opacity: 0 });
  const navRefs = useRef<{ [key: string]: HTMLElement }>({});

  const sectionLinks = useMemo(
    () => [
      { name: "About", link: "#about", id: "about" },
      { name: "Experience", link: "#experience", id: "experience" },
      { name: "Work", link: "#work", id: "work" },
      { name: "Projects", link: "#other-projects", id: "other-projects" },
      { name: "Contact", link: "#contact", id: "contact" },
    ],
    []
  );

  const activeSection = useActiveSection(sectionLinks.map(s => s.id));
  useScrollLock(responsiveNavVisible);

  // Update active indicator position based on active link
  useEffect(() => {
    const updateIndicator = () => {
      if (activeSection && navRefs.current[activeSection]) {
        const activeElement = navRefs.current[activeSection];
        const navList = activeElement.closest(".nav-items-list");

        if (navList) {
          const navRect = navList.getBoundingClientRect();
          const itemRect = activeElement.getBoundingClientRect();

          setIndicatorStyle({
            width: itemRect.width,
            left: itemRect.left - navRect.left,
            opacity: 1,
          });
        }
      } else {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
      }
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeSection]);

  // Handle scroll for navbar visibility
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setNavbarVisible(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav>
      <div className={`wrapper ${navbarVisible ? "sticky-nav" : ""}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>

        <button
          className="nav-responsive-toggle"
          onClick={() => setResponsiveNavVisible(!responsiveNavVisible)}
          aria-label={responsiveNavVisible ? "Close menu" : "Open menu"}
          aria-expanded={responsiveNavVisible}
        >
          <GiHamburgerMenu />
        </button>

        {/* Desktop Navigation */}
        <div className="nav-items desktop-nav">
          <ul className="nav-items-list" role="navigation" aria-label="Main navigation">
            {sectionLinks.map(({ name, link, id }, index) => (
              <motion.li
                key={name}
                className="nav-items-list-item"
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2 + index * 0.1,
                }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  ref={(el) => {
                    if (el) navRefs.current[id] = el;
                  }}
                  href={link}
                  className={`nav-items-list-item-link ${activeSection === id ? "active" : ""
                    }`}
                  onClick={(e) => handleNavClick(e, id)}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  {name}
                </Link>
              </motion.li>
            ))}
            {/* Shared active indicator with animated position */}
            <motion.div
              className="nav-active-indicator"
              animate={{
                width: indicatorStyle.width,
                left: indicatorStyle.left,
                opacity: indicatorStyle.opacity,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          </ul>

          <motion.div
            className="nav-items-button"
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.5,
            }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <Button text="Resume" link="/resume.pdf" target="_blank" />
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavbar
          visible={responsiveNavVisible}
          onClose={() => setResponsiveNavVisible(false)}
          sectionLinks={sectionLinks}
          activeSection={activeSection}
          onNavClick={handleNavClick}
        />
      </div>
    </nav>
  );
}

export default Navbar;
