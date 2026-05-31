import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`border-4 border-black p-6 bg-white shadow-brutal rounded-[32px] ${className}`}>
      {children}
    </div>
  );
};
