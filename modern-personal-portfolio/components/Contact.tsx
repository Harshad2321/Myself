import React from 'react';
import Section from './Section';
import { SOCIAL_LINKS } from '../constants';
// Fix: Import `motion` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const email = "your.email@example.com";

  return (
    <Section id="contact">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
        <p className="max-w-2xl mx-auto text-lg text-light-secondary dark:text-dark-secondary mb-12">
          I'm currently open to new opportunities and collaborations. Feel free to reach out!
        </p>
        <motion.a
          href={`mailto:${email}`}
          className="inline-block px-10 py-5 bg-light-primary text-white dark:bg-dark-primary dark:text-dark-bg font-bold rounded-full text-lg shadow-lg hover:scale-105 transition-transform duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Say Hello
        </motion.a>
        <div className="mt-16 flex justify-center gap-6">
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-light-secondary dark:text-dark-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              <link.icon className="w-8 h-8" />
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Contact;
