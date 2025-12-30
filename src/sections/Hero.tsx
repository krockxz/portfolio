import React from 'react';
import CopyButton from "@/components/CopyButton";
import KineticText from "@/components/KineticText";

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1 className="hero-title">Hi,</h1>
        <KineticText
          text="I'm Kunal"
          className="hero-title-large hero-title-sub"
          delay={0.5}
          staggerDelay={0.05}
        />
        <p className="hero-text">
          Powered by caffeine, curiosity, and a healthy respect for Stack Overflow. I enjoy the entire journey of taking a project from a rough concept to a polished, real-world application, one commit at a time.
        </p>
        <div className="hero-button">
          <a
            className="copy-btn copy-btn--lg"
            href="https://github.com/krockxz?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check out my latest work
          </a>
          <CopyButton text="npx kunalrc" className="copy-btn--sm" />
        </div>
      </div>
      <div className="hero-aside" aria-hidden="true" />
    </section>
  );
}

export default Hero;
