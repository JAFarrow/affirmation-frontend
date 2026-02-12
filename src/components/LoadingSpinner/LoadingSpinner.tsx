import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div 
      className="loading-spinner" 
      role="status" 
      aria-label="Loading"
    >
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="dot"></span>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;
