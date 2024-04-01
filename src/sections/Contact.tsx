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
      Always seeking new opportunities! My digital door is open for queries and friendly hellos. I will respond to you as soon as possible.
      </p>
      <div className="contact-cta">
        <Button link="mailto:kunalrc.workmail7@gmail.com" text="Say Hi" />
      </div>
    </motion.div>
  );
}

export default Contact;
