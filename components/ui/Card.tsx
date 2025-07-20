
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-800/20 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
