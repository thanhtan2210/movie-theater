import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-1 items-center justify-center min-h-[60vh]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-primary animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;