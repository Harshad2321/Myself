'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, Star } from 'lucide-react';
import { useState } from 'react';
import { projectsData, type Project } from '@/data/projects';

const categories = ['All', 'AI', 'Full-Stack', 'Web', 'Data Science', 'Algorithms'];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? projectsData.filter((p) => p.featured)
      : projectsData.filter((p) => p.category === selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            A collection of my best work in AI, machine learning, and full-stack development.
            Each project showcases different skills and technologies.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`glass-button px-6 py-2 text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'border-accent-primary bg-accent-primary/20 text-accent-primary'
                  : 'text-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="glass-card glow-on-hover group cursor-pointer overflow-hidden p-6"
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="mb-4 h-48 overflow-hidden rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="text-6xl font-bold opacity-20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-xl font-bold">{project.title}</h3>
                {project.stars && (
                  <div className="flex items-center gap-1 text-sm text-accent-secondary">
                    <Star className="h-4 w-4 fill-current" />
                    <span>{project.stars}</span>
                  </div>
                )}
              </div>

              <p className="mb-4 text-sm text-gray-400">{project.description}</p>

              {/* Tech Stack */}
              <div className="mb-4 flex flex-wrap gap-2">
                {project.tech.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-accent-primary/10 px-3 py-1 text-xs text-accent-primary"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="rounded-full bg-dark-border px-3 py-1 text-xs text-gray-400">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-accent-primary"
                >
                  <Github className="h-4 w-4" />
                  Code
                </a>
                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-accent-secondary"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href={`${projectsData[0].github_url.split('/').slice(0, -1).join('/')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-button inline-flex items-center gap-2 px-8 py-3 font-semibold transition-colors hover:border-accent-primary"
          >
            <Github className="h-5 w-5" />
            View All on GitHub
          </a>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-3xl font-bold">{selectedProject.title}</h3>
            <p className="mb-4 text-gray-300">
              {selectedProject.longDescription || selectedProject.description}
            </p>

            <div className="mb-6">
              <h4 className="mb-2 font-semibold">Technologies:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-accent-primary/10 px-3 py-1 text-sm text-accent-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={selectedProject.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button flex items-center gap-2 px-6 py-3 font-semibold"
              >
                <Github className="h-5 w-5" />
                View Code
              </a>
              {selectedProject.demo_url && (
                <a
                  href={selectedProject.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button flex items-center gap-2 px-6 py-3 font-semibold"
                >
                  <ExternalLink className="h-5 w-5" />
                  Live Demo
                </a>
              )}
              <button
                onClick={() => setSelectedProject(null)}
                className="glass-button ml-auto px-6 py-3 font-semibold"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
