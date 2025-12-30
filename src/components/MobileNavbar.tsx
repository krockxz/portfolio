import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "@/components/Button";

interface MobileNavbarProps {
    visible: boolean;
    onClose: () => void;
    sectionLinks: { name: string; link: string; id: string }[];
    activeSection: string;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
    visible,
    onClose,
    sectionLinks,
    activeSection,
    onNavClick,
}) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="mobile-menu-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="mobile-menu-content"
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="mobile-menu-close"
                            onClick={onClose}
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>

                        <nav className="mobile-nav" aria-label="Main navigation">
                            {sectionLinks.map(({ name, link, id }) => (
                                <Link
                                    key={name}
                                    href={link}
                                    className={`mobile-nav-link ${activeSection === id ? "active" : ""
                                        }`}
                                    onClick={(e) => {
                                        onNavClick(e, id);
                                        onClose();
                                    }}
                                >
                                    {name}
                                </Link>
                            ))}
                        </nav>

                        <div className="mobile-menu-footer">
                            <Button text="Resume" link="/resume.pdf" target="_blank" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileNavbar;
