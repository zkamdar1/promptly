import React from 'react';

interface SkeletonLoaderProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ className }) => {
  return (
    <div className={`card space-y-6 animate-pulse ${className}`}>
      <div className="flex items-center justify-between">
        <div className="h-6 bg-surface-200 dark:bg-surface-700 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-surface-200 dark:bg-surface-700 rounded-md"></div>
      </div>
      <div className="p-5 space-y-4 bg-surface-100 dark:bg-surface-800 rounded-xl">
        <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-full"></div>
        <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-5/6"></div>
        <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-full"></div>
        <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-3/4"></div>
         <div className="h-4 bg-surface-200 dark:bg-surface-700 rounded w-4/6"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader; 