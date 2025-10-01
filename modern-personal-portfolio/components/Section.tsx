import React, { ReactNode } from 'react';
// Fix: Import `motion` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, children, className = '' }) => {
  return (
    <motion.section
      id={id}
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 ${className}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
};

export default Section;
