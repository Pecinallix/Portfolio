'use client';

import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import React from 'react';

interface AboutProps {
  description: string;
}

const About: React.FC<AboutProps> = ({ description }) => {
  return (
    <section
      id="about"
      className="py-20 px-4 md:px-12 bg-gray-950 text-gray-300"
    >
      <div className="container mx-auto max-w-4xl">
        <SectionTitle title="Sobre Mim" />
        <p className="mt-8 text-lg md:text-xl leading-relaxed text-center">
          {description}
        </p>
      </div>
    </section>
  );
};

export default About;
