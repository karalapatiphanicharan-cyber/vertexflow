import React from 'react';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const NeoCard: React.FC<NeoCardProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div className={`border-4 border-black bg-white shadow-brutal rounded-[32px] overflow-hidden ${noPadding ? '' : 'p-6 md:p-8'} ${className}`}>
      {children}
    </div>
  );
};
