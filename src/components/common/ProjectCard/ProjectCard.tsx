'use client';

import React from 'react';
import Image from 'next/image';
import { RiGithubFill, RiExternalLinkLine } from 'react-icons/ri';
import { Project } from '@/types/types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-xl overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
      <div className="relative w-full h-48">
        <Image
          src={project.image}
          alt={`Preview do projeto ${project.title}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <RiGithubFill className="h-6 w-6" />
          </a>
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
            >
              <RiExternalLinkLine className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
