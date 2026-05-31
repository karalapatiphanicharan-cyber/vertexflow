import React from 'react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'blue' | 'danger';
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-primary-yellow hover:bg-yellow-300',
    secondary: 'bg-white hover:bg-gray-100',
    outline: 'bg-transparent hover:bg-gray-50 border-gray-200',
    blue: 'bg-primary-blue text-white hover:bg-blue-600',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <button
      className={`
        border-4 border-black px-6 py-3 font-black uppercase tracking-tight
        transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none
        rounded-[16px] text-sm md:text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
