import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'blue';
  children: React.ReactNode;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-yellow hover:bg-yellow-300',
    secondary: 'bg-white hover:bg-gray-100',
    outline: 'bg-transparent hover:bg-gray-50',
    blue: 'bg-primary-blue text-white hover:bg-blue-600'
  };

  return (
    <button
      className={`
        border-4 border-black px-6 py-2 font-black uppercase tracking-tight
        transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none
        rounded-[16px] ${variants[variant]} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
