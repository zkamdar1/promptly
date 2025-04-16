import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TextTransition, { presets } from 'react-text-transition';
import PromptForm from '@/components/PromptForm';
import OutputBox from '@/components/OutputBox';
import ErrorMessage from '@/components/ErrorMessage';
import SkeletonLoader from '@/components/SkeletonLoader';

// Define the types for the modes and form data
type Mode = 'enhancer' | 'buildspec';

interface EnhancerFormData {
  prompt: string;
  task?: string;
  tone?: string;
  context?: string;
}

interface BuildSpecFormData {
  prompt: string; // Represents the app idea in this mode
  techStack?: string;
  features?: string;
  exclusions?: string;
}

type FormData = EnhancerFormData | BuildSpecFormData;

const ROTATING_TEXTS = [
  "clearer instructions",
  "better results",
  "structured requests",
  "smarter AI interactions",
  "optimized prompts"
];

export default function Home() {
  const [mode, setMode] = useState<Mode>('enhancer'); // Add mode state
  const [outputContent, setOutputContent] = useState<string | null>(null); // Renamed from rewrittenPrompt
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmission, setLastSubmission] = useState<FormData | null>(null); // Updated type
  const [textIndex, setTextIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  // Ref for the results/loading area
  const resultsRef = useRef<HTMLDivElement>(null);

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

  // Clear output when mode changes
  useEffect(() => {
    setOutputContent(null);
    setError(null);
    setLastSubmission(null);
  }, [mode]);

  const handleSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    setOutputContent(null); // Clear previous output
    setLastSubmission(data);
    
    // Scroll to the results area shortly after loading starts
    setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100); // Small delay ensures the element is ready
    
    let apiEndpoint = '';
    let requestBody = {};
    let responseKey = '';

    if (mode === 'enhancer') {
      // Always use relative path
      apiEndpoint = '/api/rewrite';
      requestBody = data; // Already in the correct format for enhancer
      responseKey = 'rewritten_prompt';
      console.log(`Fetching from Enhancer API endpoint: ${apiEndpoint}`);
    } else { // mode === 'buildspec'
      // Always use relative path
      apiEndpoint = '/api/buildspec'; 
      const buildSpecData = data as BuildSpecFormData; 
      requestBody = {
        idea: buildSpecData.prompt, // Map 'prompt' to 'idea' for the backend
        tech_stack: buildSpecData.techStack,
        features: buildSpecData.features,
        exclusions: buildSpecData.exclusions,
      };
      responseKey = 'build_spec_document'; 
      console.log(`Fetching from BuildSpec API endpoint: ${apiEndpoint}`);
    }
      
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the appropriate request body
        credentials: 'same-origin', // Keep unless specific cross-origin needs arise
        mode: 'cors', // Keep unless specific cross-origin needs arise
      });

      if (!response.ok) {
        // Attempt to get more specific error from JSON body, otherwise use status text
        let errorMessage = response.statusText; // Default to status text
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            try {
                const errorData = await response.json();
                errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
                console.error('Failed to parse JSON error response', e);
                // Keep the original statusText as errorMessage
            }
        } else {
            // If not JSON, maybe try to read as text?
            try {
              const textError = await response.text();
              // Avoid setting a very long HTML page as the error
              errorMessage = textError.substring(0, 100) + (textError.length > 100 ? '...' : ''); 
            } catch (textErr) {
              // Ignore error reading text body, stick with status text
            }
        }
        // Construct a user-friendly message prefix
        const userFriendlyPrefix = `Failed to ${mode === 'enhancer' ? 'rewrite prompt' : 'generate build spec'}`;
        throw new Error(`${userFriendlyPrefix}: ${errorMessage}`);
      }

      const result = await response.json();
      if (result[responseKey]) {
        setOutputContent(result[responseKey]); // Use the dynamic response key
      } else {
        throw new Error(`Invalid response format: Missing '${responseKey}' key.`);
      }
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
            <PromptForm 
              onSubmit={handleSubmit} 
              isLoading={isLoading} 
              mode={mode} 
              setMode={setMode} 
            />
          </div>
        </motion.div>

        {/* Container for Loading/Output results - Attach ref here */}
        <div ref={resultsRef} className="scroll-mt-8"> {/* Added scroll-mt for padding */} 
          {/* Loading State: Show Skeleton Loader */} 
          {isLoading && (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                {/* Add blur effect container if desired */}
                {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur opacity-30"></div> */}
                <div className="relative">
                   <SkeletonLoader />
                </div>
              </motion.div>
          )}

          {/* Output Content: Show OutputBox only when not loading and content exists */} 
          {!isLoading && outputContent && (
            <motion.div 
              key="output-box" 
              ref={inViewRef} // Attach intersection observer ref here now
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-500 to-primary-500 rounded-2xl blur opacity-30"></div>
              <div className="relative">
                <OutputBox
                  outputContent={outputContent}
                  mode={mode} 
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
} 