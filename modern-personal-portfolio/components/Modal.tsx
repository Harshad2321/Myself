import React from 'react';
import type { Project } from '../types';
import { XIcon, GithubIcon, ExternalLinkIcon } from './icons/Icons';
// Fix: Import `motion` and `AnimatePresence` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, project }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-light-card dark:bg-dark-card rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-light-secondary dark:text-dark-secondary hover:text-light-text dark:hover:text-dark-text"
            >
              <XIcon className="w-6 h-6" />
            </button>
            <img src={project.image} alt={project.title} className="w-full h-72 object-cover rounded-t-lg" />
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
              <p className="text-sm font-medium text-light-primary dark:text-dark-primary mb-4">{project.category}</p>
              <p className="text-light-secondary dark:text-dark-secondary mb-6">{project.longDescription}</p>
              
              <h3 className="text-lg font-semibold mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map(tech => (
                  <span key={tech} className="px-3 py-1 bg-black/5 dark:bg-white/10 text-sm rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-light-text text-light-bg dark:bg-dark-text dark:text-dark-bg font-semibold rounded-full hover:opacity-80 transition-opacity duration-300">
                  <GithubIcon className="w-5 h-5" />
                  GitHub
                </a>
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 bg-light-primary text-white dark:bg-dark-primary dark:text-dark-bg font-semibold rounded-full hover:opacity-80 transition-opacity duration-300">
                    <ExternalLinkIcon className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
