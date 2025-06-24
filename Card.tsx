import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', glow = false }) => {
  const glowClass = glow ? 'shadow-lg shadow-neon-purple/20 border-neon-purple/30' : '';
  
  return (
    <div className={`bg-dark-card border border-gray-700 rounded-lg p-6 ${glowClass} ${className}`}>
      {children}
    </div>
  );
};