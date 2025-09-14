'use client';

import React from 'react';
import { Skill } from '@/types/types';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';

interface SkillsProps {
  skills: Skill[];
}

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section
      id="skills"
      className="py-20 px-4 md:px-12 bg-gray-950 text-gray-300"
    >
      <SectionTitle title="Habilidades" />
      <div className="container mx-auto max-w-4xl mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold mb-4 text-white">
                {skill.category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item, i) => (
                  <li
                    key={i}
                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 hover:bg-indigo-600"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
