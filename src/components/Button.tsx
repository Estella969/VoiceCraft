import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'text';
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'primary',
  fullWidth = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const baseClasses = 'flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ease-in-out';
  
  const typeClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30',
    secondary: 'bg-white/20 hover:bg-white/30 text-white',
    outline: 'border border-purple-400 text-purple-400 hover:bg-purple-400/10',
    text: 'text-purple-400 hover:text-purple-300 px-4 py-2',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`${baseClasses} ${typeClasses[type]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;