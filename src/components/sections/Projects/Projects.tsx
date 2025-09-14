'use client';

import React from 'react';

import { Project } from '@/types/types';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import ProjectCard from '@/components/common/ProjectCard/ProjectCard';

interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section
      id="projects"
      className="py-20 px-4 md:px-12 bg-gray-950 text-gray-300"
    >
      <div className="container mx-auto max-w-6xl">
        <SectionTitle title="Projetos" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projects.map((project, index) => (
            <div key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
