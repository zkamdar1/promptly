import React from 'react';
import { FiInfo, FiX } from 'react-icons/fi';

interface InfoBannerProps {
  title: string;
  description: string;
  onDismiss: () => void;
  className?: string;
}

const InfoBanner: React.FC<InfoBannerProps> = ({ title, description, onDismiss, className }) => {
  return (
    <div
      className={`bg-primary-50 dark:bg-surface-800/60 border border-primary-200 dark:border-surface-700 rounded-lg p-4 mb-4 relative overflow-hidden ${className}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <FiInfo className="h-5 w-5 text-primary-500 dark:text-primary-400" aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <div className="text-sm text-primary-700 dark:text-surface-200">
            <p className="font-semibold mb-1">{title}</p>
            <p>{description}</p>
          </div>
          <div className="mt-3 md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={onDismiss}
              className="p-1 rounded-md text-primary-600 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-surface-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-50 dark:focus:ring-offset-surface-800 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors"
              aria-label="Dismiss"
            >
              <FiX className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner; 