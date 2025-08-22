


import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

export default function Card({
  icon,
  title,
  description,
  className = '',
}: CardProps) {
  return (
    <div
      className={`p-4 bg-[var(--color-1)] flex items-start justify-center gap-4 lg:!gap-10 shadow-md pt-6 ${className}`}
    >
      <div className="flex flex-col items-center justify-center gap-2 ">
        <span className="text-7xl mb-4">{icon}</span>
        <div className="text-lg font-bold mb-2 text-center">{title}</div>
        <span className="text-black text-sm lg:text-base font-medium lg:font-normal leading-relaxed tracking-wide text-center max-w-[260px]  whitespace-normal break-words">
          {description}
        </span>
      </div>
    </div>
  );
}
