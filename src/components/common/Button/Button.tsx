'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  target,
  rel,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center px-6 py-3 font-semibold rounded-full transition-colors duration-300 ease-in-out';

  const variantClasses = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-gray-200',
    ghost:
      'bg-transparent hover:bg-gray-800 text-gray-200 border border-gray-700',
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={buttonClasses}>
        {children}
      </a>
    );
  }

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
