import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;