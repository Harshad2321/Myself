import React from 'react';
import Section from './Section';
import { ArrowDownIcon } from './icons/Icons';
// Fix: Import `motion` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const name = "Harshad";
  const tagline = "Creative Developer | Building Interactive Experiences";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Section id="home" className="relative min-h-screen flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 bg-[200%_200%] animate-gradient-bg" />
        <div className="absolute inset-0 -z-10 bg-light-bg dark:bg-dark-bg opacity-80" />

      <div className="z-10">
        <motion.h1 
            className="text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
          {name.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className="inline-block">
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
            className="text-lg md:text-2xl text-light-secondary dark:text-dark-secondary max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
        >
          {tagline}
        </motion.p>
        <motion.a 
            href="#projects"
            className="mt-12 inline-flex items-center gap-2 px-8 py-4 bg-light-primary text-white dark:bg-dark-primary dark:text-dark-bg font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
        >
          View My Work
        </motion.a>
      </div>
       <motion.div 
        className="absolute bottom-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5, repeat: Infinity, repeatType: 'reverse' }}
        >
        <a href="#about" aria-label="Scroll down">
           <ArrowDownIcon className="h-8 w-8 text-light-secondary dark:text-dark-secondary" />
        </a>
      </motion.div>
    </Section>
  );
};

export default Hero;
