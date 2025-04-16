import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown, FiChevronUp, FiEdit3, FiTarget, FiVolume2, FiFileText } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';

interface PromptFormProps {
  onSubmit: (data: {
    prompt: string;
    task?: string;
    tone?: string;
    context?: string;
  }) => void;
  isLoading: boolean;
}

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [task, setTask] = useState('');
  const [tone, setTone] = useState('');
  const [context, setContext] = useState('');
  const [showOptional, setShowOptional] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmit({ prompt, task, tone, context });
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col space-y-6">
      <div>
        <label htmlFor="prompt" className="text-lg font-medium mb-2 flex items-center">
          <FiEdit3 className="mr-2 text-accent-400 flex-shrink-0" />
          <span className="text-gradient">Your Prompt</span>
          <span className="text-accent-500 ml-1">*</span>
        </label>
        <div className="relative z-10 transform translate-z-0 isolate">
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl min-h-[140px] resize-y font-medium border border-surface-300 dark:border-surface-700/50 bg-surface-100/80 dark:bg-surface-800/50 text-surface-800 dark:text-surface-100 placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50"
            placeholder="Write your prompt here (e.g., 'Write something about sleep')"
            required
          />
          <div className="absolute bottom-3 right-3 text-xs text-surface-400">
            {prompt.length > 0 ? `${prompt.length} chars` : ''}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <motion.button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="flex items-center text-surface-300 hover:text-white font-medium focus:outline-none transition-colors duration-200 self-start mb-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showOptional ? (
            <>
              <FiChevronUp className="mr-2 text-accent-400" /> Hide additional options
            </>
          ) : (
            <>
              <FiChevronDown className="mr-2 text-accent-400" /> Show additional options
            </>
          )}
        </motion.button>

        {showOptional && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden space-y-5 mt-2 p-5 glass rounded-xl border border-surface-800/50"
          >
            <div className="flex flex-col">
              <label htmlFor="task" className="text-sm font-medium mb-2 flex items-center">
                <FiTarget className="mr-2 text-primary-400 flex-shrink-0" />
                <span>Task</span>
                <span className="text-surface-400 ml-1 text-xs">(optional)</span>
              </label>
              <input
                id="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="input"
                placeholder="What's the task? (e.g., 'Summarize for a tweet')"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="tone" className="text-sm font-medium mb-2 flex items-center">
                <FiVolume2 className="mr-2 text-primary-400 flex-shrink-0" />
                <span>Tone</span>
                <span className="text-surface-400 ml-1 text-xs">(optional)</span>
              </label>
              <input
                id="tone"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="input"
                placeholder="What tone would you like? (e.g., 'Professional', 'Witty')"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="context" className="text-sm font-medium mb-2 flex items-center">
                <FiFileText className="mr-2 text-primary-400 flex-shrink-0" />
                <span>Context</span>
                <span className="text-surface-400 ml-1 text-xs">(optional)</span>
              </label>
              <textarea
                id="context"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="input min-h-[80px] resize-y"
                placeholder="Any extra context? (e.g., 'It's for a wellness blog')"
              />
            </div>
          </motion.div>
        )}
      </div>

      <div className="pt-2">
        <motion.button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-medium flex items-center justify-center space-x-2"
          disabled={isLoading || !prompt.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">Enhancing...</span>
            </>
          ) : (
            <span>Enhance My Prompt</span>
          )}
        </motion.button>
      </div>
    </form>
  );
} 