import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'accent' | 'white';
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'primary' 
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const colors = {
    primary: 'text-primary-500',
    accent: 'text-accent-500',
    white: 'text-white',
  };

  const sizeClass = sizes[size];
  const colorClass = colors[color];

  return (
    <div className="flex justify-center items-center">
      <div className={`relative ${sizeClass}`}>
        <motion.div
          className={`absolute inset-0 rounded-full border-t-2 border-b-2 ${colorClass}`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div
          className={`absolute inset-0 rounded-full border-l-2 border-r-2 ${colorClass}`}
          animate={{ rotate: -360 }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <div className={`absolute inset-1/4 rounded-full bg-surface-900/80 backdrop-blur-sm`} />
      </div>
    </div>
  );
} 