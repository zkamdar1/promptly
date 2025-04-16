import { motion } from 'framer-motion';
import { FiAlertCircle, FiX } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

export default function ErrorMessage({ message, onDismiss }: ErrorMessageProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="relative glass border border-red-500/30 rounded-xl p-5 mb-6 overflow-hidden"
    >
      <div className="absolute -top-8 -left-8 w-16 h-16 bg-red-500/20 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-red-500/20 rounded-full blur-xl"></div>
      
      <div className="flex justify-between items-center relative z-10">
        <div className="flex items-start space-x-3 flex-1">
          <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
          <p className="text-red-100">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-4 p-1.5 rounded-full hover:bg-surface-800 text-surface-400 hover:text-white transition-colors"
            aria-label="Dismiss error"
          >
            <FiX className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
} 