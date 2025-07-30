import React from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
}

export default function Card({ icon, title, description, className = '' }: CardProps) {
  return (
    <div className={`p-8  bg-[var(--color-1)] flex items-start gap-4 shadow-md pt-8 ${className}`}>
      <div className='flex flex-col items-center justify-center gap-4'>
      <span className="flex-shrink-0 text-black">{icon}</span>
        <div className="text-lg font-semibold mb-1 text-black text-center">{title}</div>
        <div className="text-black text-sm leading-7 tracking-widest text-center">{description}</div>
      </div>
    </div>
  );
}
