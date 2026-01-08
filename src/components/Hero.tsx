'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { siteConfig } from '@/config/site';
import Lottie from 'lottie-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch('/animations/hero-animation.json')
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch(() => {
        console.info('Hero animation not found, using fallback');
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="hero"
      className="particle-bg relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-accent-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-accent-secondary/10 blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Profile Image with Animation */}
          <motion.div
            variants={itemVariants}
            className="relative mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary opacity-20 blur-xl"
            />
            <img
              src="https://avatars.githubusercontent.com/u/182813327?v=4"
              alt={siteConfig.name}
              className="relative h-32 w-32 rounded-full border-4 border-accent-primary/30 shadow-2xl"
            />
          </motion.div>

          {/* Lottie Animation (if available) */}
          {animationData && (
            <motion.div
              variants={itemVariants}
              className="mb-4 h-32 w-32"
            >
              <Lottie animationData={animationData} loop />
            </motion.div>
          )}

          {/* Text Content */}
          <motion.h1
            variants={itemVariants}
            className="mb-4 text-5xl font-bold md:text-7xl"
          >
            Hi, I'm{' '}
            <span className="gradient-text">{siteConfig.name}</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mb-6 text-xl text-gray-300 md:text-2xl"
          >
            {siteConfig.tagline}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="mb-8 max-w-2xl text-gray-400"
          >
            2nd-year AI & ML student at SIT Pune, passionate about building intelligent
            systems and practical AI solutions that make a difference.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="glow-on-hover group glass-button px-8 py-3 font-semibold"
            >
              View Projects
              <ArrowDown className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button px-8 py-3 font-semibold transition-colors hover:bg-accent-primary/20"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              className="glass-button px-8 py-3 font-semibold transition-colors hover:bg-accent-secondary/20"
            >
              Get in Touch
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex gap-6"
          >
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button p-3 transition-colors hover:border-accent-primary"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button p-3 transition-colors hover:border-accent-primary"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="glass-button p-3 transition-colors hover:border-accent-primary"
              aria-label="Email"
            >
              <Mail className="h-6 w-6" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-8 w-8 text-accent-primary opacity-50" />
      </motion.div>
    </section>
  );
}
