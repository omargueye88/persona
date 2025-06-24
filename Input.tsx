import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', ...props }) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 bg-dark-surface border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-colors ${className}`}
        {...props}
      />
    </div>
  );
};