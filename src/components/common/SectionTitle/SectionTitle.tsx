'use client';

import React from 'react';

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-10">
      <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
        {title}
      </h2>
      <div className="w-24 h-1 bg-indigo-600 rounded-full mt-4"></div>
    </div>
  );
};

export default SectionTitle;
