import React from 'react';

interface SegmentedControlOption {
  label: string;
  value: string;
}

interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex rounded-lg bg-surface-200 dark:bg-surface-700 p-1 space-x-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200 ease-in-out focus:outline-none 
            ${value === option.value
              ? 'bg-white dark:bg-surface-900 text-primary-600 dark:text-primary-400 shadow'
              : 'text-surface-600 dark:text-surface-300 hover:bg-surface-300/50 dark:hover:bg-surface-600/50'
            }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default SegmentedControl; 