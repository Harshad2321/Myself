
import React, { useState } from 'react';
import Section from './Section';
import ProjectCard from './ProjectCard';
import Modal from './Modal';
import { PROJECTS } from '../constants';
import type { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects" className="bg-light-card dark:bg-dark-card">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">My Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      <Modal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </Section>
  );
};

export default Projects;
