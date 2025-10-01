import React from 'react';
import type { Project } from '../types';
import { ArrowRightIcon } from './icons/Icons';
// Fix: Import `motion` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="cursor-pointer group rounded-lg overflow-hidden shadow-lg bg-light-bg dark:bg-dark-bg border border-black/10 dark:border-white/10"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
      </div>
      <div className="p-6">
        <p className="text-sm font-medium text-light-primary dark:text-dark-primary mb-1">{project.category}</p>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-light-secondary dark:text-dark-secondary mb-4">{project.description}</p>
        <div className="flex items-center text-light-primary dark:text-dark-primary font-semibold">
          <span>View Details</span>
          <ArrowRightIcon className="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
