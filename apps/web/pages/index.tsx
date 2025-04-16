import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TextTransition, { presets } from 'react-text-transition';
import PromptForm from '@/components/PromptForm';
import OutputBox from '@/components/OutputBox';
import ErrorMessage from '@/components/ErrorMessage';

const ROTATING_TEXTS = [
  "clearer instructions",
  "better results",
  "structured requests",
  "smarter AI interactions",
  "optimized prompts"
];

export default function Home() {
  const [rewrittenPrompt, setRewrittenPrompt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<{
    prompt: string;
    task?: string;
    tone?: string;
    context?: string;
  } | null>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Rotate text
  useEffect(() => {
    const intervalId = setInterval(
      () => setTextIndex((textIndex) => (textIndex + 1) % ROTATING_TEXTS.length),
      2000
    );
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (data: {
    prompt: string;
    task?: string;
    tone?: string;
    context?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setLastSubmission(data);
    
    // Determine the correct API endpoint based on environment
    const isDevelopment = process.env.NODE_ENV === 'development';
    const apiEndpoint = isDevelopment 
      ? 'http://localhost:3001/api/rewrite' // API runs on port 3001 locally
      : '/api/rewrite'; // Relative path for production (Vercel rewrite)
      
    console.log(`Fetching from API endpoint: ${apiEndpoint}`); // Add log for debugging
    
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'same-origin',
        mode: 'cors',
      });

      if (!response.ok) {
        let errorMessage = 'Failed to rewrite prompt';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error('Failed to parse error response', e);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      setRewrittenPrompt(result.rewritten_prompt);
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto"
    >
      <motion.div 
        variants={itemVariants}
        className="mb-12 text-center"
      >
        <div className="relative inline-block">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg blur opacity-25"></div>
          <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gradient pb-2">
            Prompt Like a Pro — Without Trying.
          </h1>
        </div>
        <div className="text-xl md:text-2xl text-surface-300 mt-4 text-center">
          We engineer your requests for{' '}
          <span className="font-semibold text-white">
            {mounted ? (
              <TextTransition springConfig={presets.gentle} inline>
                {ROTATING_TEXTS[textIndex]}
              </TextTransition>
            ) : (
              ROTATING_TEXTS[0]
            )}
          </span>
        </div>
      </motion.div>

      <div className="space-y-8">
        {error && (
          <motion.div variants={itemVariants}>
            <ErrorMessage 
              message={error} 
              onDismiss={() => setError(null)} 
            />
          </motion.div>
        )}
        
        <motion.div 
          variants={itemVariants}
          className="relative"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl blur opacity-30"></div>
          <div className="relative">
            <PromptForm onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
        </motion.div>

        {rewrittenPrompt && (
          <motion.div 
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur opacity-30"></div>
            <div className="relative">
              <OutputBox
                rewrittenPrompt={rewrittenPrompt}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
} 