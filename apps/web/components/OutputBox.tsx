import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCopy, FiCheck } from 'react-icons/fi';

// Assuming Mode is defined elsewhere and imported or passed down
type Mode = 'enhancer' | 'buildspec';

interface OutputBoxProps {
  outputContent: string; // Renamed from rewrittenPrompt
  mode: Mode; // Added mode prop
}

export default function OutputBox({ 
  outputContent,
  mode // Destructure mode
}: OutputBoxProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputContent); // Use outputContent
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const title = mode === 'enhancer' ? 'Enhanced Prompt' : 'Build Specification';

  return (
    <div className="card space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium text-gradient flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-accent-500 mr-2 animate-pulse"></span>
          {title} {/* Use dynamic title */}
        </h3>
        <div className="flex space-x-3">
          <motion.button
            onClick={handleCopy}
            className="btn-icon glass text-surface-300 hover:text-white"
            aria-label="Copy to clipboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copySuccess ? (
              <FiCheck className="w-5 h-5 text-green-500" />
            ) : (
              <FiCopy className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </div>

      <div className="p-5 glass rounded-xl overflow-x-auto"> {/* Added overflow-x-auto for long lines */}
        <pre className="whitespace-pre-wrap font-medium text-gray-900 dark:text-surface-100 text-sm leading-relaxed"> {/* Use <pre> for better formatting, adjust font size/leading */}
          {outputContent} {/* Use outputContent */}
        </pre>
      </div>
    </div>
  );
} 