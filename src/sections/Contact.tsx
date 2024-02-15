import Button from "@/components/Button";
import React from "react";
import { motion } from "framer-motion";
function Contact() {
  return (
    <motion.div
      className="contact"
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={{
        visible: { opacity: 1, y: -50 },
        hidden: { opacity: 0, y: 0 },
      }}
    >
      <h2 className="contact-title">What&apos;s Next?</h2>
      <h2 className="contact-sub-title">Get In Touch</h2>
      <p className="contact-text">
      Even though I’m not actively seeking new opportunities at the moment, my digital door is always open. Whether you’re bursting with queries or just want to share a friendly hello, I’ll make it my mission to respond to you as soon as I can!
      </p>
      <div className="contact-cta">
        <Button link="mailto:kunalrc.workmail7@gmail.com" text="Say Hi" />
      </div>
    </motion.div>
  );
}

export default Contact;
