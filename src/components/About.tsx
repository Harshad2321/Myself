'use client';

import { motion } from 'framer-motion';
import { Download, Briefcase, Target, Heart } from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function About() {
  const bioParagraphs = siteConfig.bio.split('\n\n');

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card glow-on-hover mb-8 overflow-hidden">
              <img
                src="https://avatars.githubusercontent.com/u/182813327?v=4"
                alt={siteConfig.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-accent-primary">12+</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-accent-secondary">8+</div>
                <div className="text-sm text-gray-400">Certificates</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-accent-tertiary">6+</div>
                <div className="text-sm text-gray-400">Hackathons</div>
              </div>
              <div className="glass-card p-4 text-center">
                <div className="mb-2 text-3xl font-bold text-accent-primary">2nd</div>
                <div className="text-sm text-gray-400">Year AIML</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold md:text-5xl">
              About <span className="gradient-text">Me</span>
            </h2>

            <div className="mb-6 space-y-4 text-gray-300">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Highlights */}
            <div className="mb-8 space-y-4">
              <div className="flex items-start gap-4">
                <div className="glass-button p-3">
                  <Briefcase className="h-6 w-6 text-accent-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Currently Learning</h3>
                  <p className="text-sm text-gray-400">
                    Deep Learning, Advanced ML algorithms, and Cloud Architecture
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass-button p-3">
                  <Target className="h-6 w-6 text-accent-secondary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Goals</h3>
                  <p className="text-sm text-gray-400">
                    Build a Jarvis-like AI assistant and contribute to open-source AI projects
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="glass-button p-3">
                  <Heart className="h-6 w-6 text-accent-tertiary" />
                </div>
                <div>
                  <h3 className="mb-1 font-semibold">Interests</h3>
                  <p className="text-sm text-gray-400">
                    AI Ethics, Natural Language Processing, and Computer Vision
                  </p>
                </div>
              </div>
            </div>

            {/* Resume Download */}
            <a
              href={siteConfig.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glow-on-hover glass-button inline-flex items-center gap-2 px-8 py-3 font-semibold transition-colors hover:border-accent-primary"
            >
              <Download className="h-5 w-5" />
              Download Resume
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
