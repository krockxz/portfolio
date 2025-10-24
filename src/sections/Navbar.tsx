import Button from "@/components/Button";
import Logo from "@/components/Logo";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from 'react-intersection-observer';

function Navbar() {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [responsiveNavVisible, setResponsiveNavVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  const sectionLinks = useMemo(() => [
    { name: "About", link: "#about", id: "about" },
    { name: "Experience", link: "#experience", id: "experience" },
    { name: "Work", link: "#work", id: "work" },
    { name: "Projects", link: "#other-projects", id: "other-projects" },
    { name: "Contact", link: "#contact", id: "contact" },
  ], []);
  
  // Set up intersection observer for each section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);
    
    // Observe all sections
    sectionLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    
    return () => observer.disconnect();
  }, [sectionLinks]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setNavbarVisible(scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll(".nav-items-list-item-link");
    links.forEach((link) => {
      link.addEventListener("click", () => setResponsiveNavVisible(false));
    });
    const nav = document.querySelector(".nav-items");
    nav?.addEventListener("click", (e) => {
      e.stopPropagation();
    });
    const html = document.querySelector("html");
    html?.addEventListener("click", (e) => {
      setResponsiveNavVisible(false);
    });
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (responsiveNavVisible) {
      main?.classList.add("blur");
    } else {
      main?.classList.remove("blur");
    }
  }, [responsiveNavVisible]);

  return (
    <nav>
      <div className={`wrapper ${navbarVisible ? "sticky-nav" : ""}`}>
        <motion.div
          className="brand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="/">
            <Logo />
          </Link>
        </motion.div>
        <motion.div
          className="nav-responsive-toggle"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          aria-label={responsiveNavVisible ? "Close menu" : "Open menu"}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setResponsiveNavVisible(!responsiveNavVisible);
            }
          }}
        >
          <AnimatePresence mode="wait">
            {responsiveNavVisible ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CgClose
                  onClick={(e) => {
                    e.stopPropagation();
                    setResponsiveNavVisible(false);
                  }}
                />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <GiHamburgerMenu
                  onClick={(e) => {
                    e.stopPropagation();
                    setResponsiveNavVisible(true);
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
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
                  href={link}
                  className={`nav-items-list-item-link ${activeSection === id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const target = document.getElementById(id);
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  aria-current={activeSection === id ? 'page' : undefined}
                >
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                    className="relative"
                  >
                    {name}
                    {activeSection === id && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-theme"
                        layoutId="activeSection"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30
                        }}
                      />
                    )}
                  </motion.span>
                </Link>
              </motion.li>
            ))}
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
        <AnimatePresence>
          {responsiveNavVisible && (
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setResponsiveNavVisible(false)}
            >
              <motion.div
                className="mobile-menu-content"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mobile-menu-header">
                  <motion.button
                    className="mobile-menu-close"
                    onClick={() => setResponsiveNavVisible(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close menu"
                  >
                    <CgClose />
                  </motion.button>
                </div>

                <ul className="mobile-nav-list" role="navigation" aria-label="Main navigation">
                  {sectionLinks.map(({ name, link, id }, index) => (
                    <motion.li
                      key={name}
                      className="mobile-nav-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.1 + index * 0.1,
                      }}
                    >
                      <Link 
                        href={link}
                        className={`mobile-nav-link ${activeSection === id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const target = document.getElementById(id);
                          if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                            setResponsiveNavVisible(false);
                          }
                        }}
                        aria-current={activeSection === id ? 'page' : undefined}
                      >
                        {name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  className="mobile-menu-footer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <Button text="Resume" link="/resume.pdf" target="_blank" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;
