import Head from "next/head";
import React, { useState } from "react";
import Email from "@/components/Email";
import Loader from "@/components/Loader";
import SocialIcons from "@/components/SocialIcons";
import GitHubActivity from "@/components/GitHubActivity";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import Navbar from "@/sections/Navbar";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Projects from "@/sections/Projects";
import OtherProjects from "@/sections/OtherProjects";
import Experience from "@/sections/Experience";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoaderLoaded = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 200);
  };

  return (
    <div className="app">
      <Head>
        <title>Kunal Roy Choudhury</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Kunal Roy Choudhury",
              "url": "https://kunalroy.dev",
              "sameAs": [
                "https://github.com/krockxz",
                "https://www.linkedin.com/in/kunal-roy-choudhury-7407211a7/",
                "https://x.com/kunalgoesbyken"
              ],
              "jobTitle": "Full-Stack Developer",
              "description": "Full-stack developer specializing in React, Node.js, and modern web technologies."
            })
          }}
        />
      </Head>
      {showContent && (
        <>
          <Navbar />
          <SocialIcons />
          <Email />
          <main>
            <Hero />
            <About />
            <GitHubActivity />
            <Experience />
            <Projects />
            <OtherProjects />
            <Contact />
          </main>
          <Footer />
        </>
      )}
      <Loader isLoading={isLoading} setIsLoading={handleLoaderLoaded} />
    </div>
  );
}
