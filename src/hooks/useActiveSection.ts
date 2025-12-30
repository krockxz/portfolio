import { useState, useEffect } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-10% 0px -60% 0px",
            threshold: 0,
        };

        let visibleSectionId = "";
        let timeoutId: NodeJS.Timeout;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSectionId = entry.target.id;
                    }
                });

                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    if (visibleSectionId) {
                        setActiveSection(visibleSectionId);
                    }
                }, 50);
            },
            observerOptions
        );

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
            clearTimeout(timeoutId);
        };
    }, [sectionIds]);

    return activeSection;
};
