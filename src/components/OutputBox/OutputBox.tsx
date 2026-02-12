import React from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { OutputBoxProps } from '../../types';

const OutputBox: React.FC<OutputBoxProps> = ({ content, isError, isLoading }) => {
  const getContent = (): string => {
    if (isLoading) return '';
    if (content) return content;
    return 'Your affirmation will appear here...';
  };

  const getContentClass = (): string => {
    const classes = ['output-content'];
    if (!content && !isLoading) classes.push('placeholder');
    if (isError) classes.push('error');
    return classes.join(' ');
  };

  const getBoxClass = (): string => {
    const classes = ['output-box'];
    if (isLoading) classes.push('loading');
    if (isError) classes.push('error');
    return classes.join(' ');
  };

  return (
    <div 
      className={getBoxClass()}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <p className={getContentClass()}>
        {getContent()}
      </p>
      
      {isLoading && (
        <div className="loading-overlay">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default OutputBox;
