import { useState, Dispatch, SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Popover, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiChevronDown, FiChevronUp, FiEdit3, FiTarget, FiVolume2, FiFileText, FiSettings, FiCode, FiList, FiXCircle, FiZap, FiTool, FiInfo } from 'react-icons/fi';
import LoadingSpinner from './LoadingSpinner';
import SegmentedControl from '@/components/SegmentedControl';
import InfoBanner from '@/components/InfoBanner';

type Mode = 'enhancer' | 'buildspec';

interface PromptFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  mode: Mode;
  setMode: Dispatch<SetStateAction<Mode>>;
}

interface EnhancerFormData {
  prompt: string;
  task?: string;
  tone?: string;
  context?: string;
}

interface BuildSpecFormData {
  prompt: string;
  techStack?: string;
  features?: string;
  exclusions?: string;
}

const modeExplanations: Record<Mode, { title: string; description: string }> = {
  enhancer: {
    title: "✨ Prompt Engineering: Supercharge Your AI Instructions",
    description: "Leverage expert prompt engineering. Transform your basic ideas into highly effective, structured prompts that guide AI models like ChatGPT or Claude to deliver precisely the results you need."
  },
  buildspec: {
    title: "🛠️ One-Shot Mode: Create App Scaffolding To One-Shot Build Your Idea",
    description: "Go from idea to execution-ready spec. Define your app concept, and generate a detailed, one-shot build plan for AI agents (like Cursor, Bolt, etc.) to construct your software with minimal ambiguity."
  }
};

export default function PromptForm({ onSubmit, isLoading, mode, setMode }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [task, setTask] = useState('');
  const [tone, setTone] = useState('');
  const [context, setContext] = useState('');
  const [appIdea, setAppIdea] = useState('');
  const [techStack, setTechStack] = useState('');
  const [features, setFeatures] = useState('');
  const [exclusions, setExclusions] = useState('');
  const [showOptional, setShowOptional] = useState(false);

  const [showEnhancerBanner, setShowEnhancerBanner] = useState(true);
  const [showBuildSpecBanner, setShowBuildSpecBanner] = useState(true);

  const currentPrompt = mode === 'enhancer' ? prompt : appIdea;
  const setCurrentPrompt = mode === 'enhancer' ? setPrompt : setAppIdea;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPrompt.trim()) return;

    // Prevent submission if in buildspec mode (as it's "Coming Soon")
    if (mode === 'buildspec') {
      console.log("BuildSpec mode is coming soon and is currently disabled.");
      return;
    }

    let formData: EnhancerFormData | BuildSpecFormData;
    if (mode === 'enhancer') {
      formData = { prompt, task, tone, context };
    } else {
      formData = { prompt: appIdea, techStack, features, exclusions };
    }
    onSubmit(formData);
  };

  const modeOptions = [
    { label: '✨ Enhancer', value: 'enhancer' },
    { label: '🛠️ BuildSpec (Coming Soon)', value: 'buildspec' },
  ];

  const currentExplanation = modeExplanations[mode];
  const showCurrentBanner = mode === 'enhancer' ? showEnhancerBanner : showBuildSpecBanner;
  const dismissCurrentBanner = () => {
    if (mode === 'enhancer') {
      setShowEnhancerBanner(false);
    } else {
      setShowBuildSpecBanner(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card flex flex-col space-y-6">
      <div className="flex justify-center items-center space-x-2 mb-4">
        <SegmentedControl
          options={modeOptions}
          value={mode}
          onChange={(newMode: string) => setMode(newMode as Mode)}
        />
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button 
                className={`p-1.5 rounded-full transition-colors duration-200 
                  ${open ? 'bg-accent-100 dark:bg-accent-800/50 text-accent-600 dark:text-accent-300' : 'text-surface-400 hover:text-surface-600 dark:hover:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-700'}
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-opacity-75`}
                aria-label="Mode information"
              >
                <FiInfo className="w-5 h-5" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-20 w-72 px-4 mt-2 transform -translate-x-1/2 left-1/2 sm:px-0">
                  <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative bg-white dark:bg-surface-800 p-4">
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white mb-1">
                        {currentExplanation.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-surface-300">
                        {currentExplanation.description}
                      </p>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>

      <div className={`relative transition-[min-height] duration-300 ease-in-out ${showCurrentBanner ? 'min-h-[50px]' : 'min-h-0'}`}>
        <AnimatePresence mode="wait">
          {showCurrentBanner && (
            <motion.div
              key={mode}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: 'hidden' }}
            >
              <InfoBanner 
                title={currentExplanation.title}
                description={currentExplanation.description}
                onDismiss={dismissCurrentBanner}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div>
        <label htmlFor="promptInput" className="text-lg font-medium mb-2 flex items-center">
          {mode === 'enhancer' ? (
             <><FiEdit3 className="mr-2 text-accent-400 flex-shrink-0" /> <span className="text-gradient">Your Prompt</span></>
          ) : (
             <><FiTool className="mr-2 text-accent-400 flex-shrink-0" /> <span className="text-gradient">Describe your app or product idea</span></>
          )}
          <span className="text-accent-500 ml-1">*</span>
        </label>
        <div className="relative z-10 transform translate-z-0 isolate">
          <textarea
            id="promptInput"
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl min-h-[140px] resize-y font-medium border border-surface-300 dark:border-surface-700/50 bg-surface-100/80 dark:bg-surface-800/50 text-surface-800 dark:text-surface-100 placeholder-surface-500 dark:placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-accent-500/50 focus:border-accent-500/50"
            placeholder={mode === 'enhancer' ? "Write your prompt here (e.g., 'Write something about sleep')" : "Describe the core concept, target users, and main goal of your app or product..."}
            required
          />
          <div className="absolute bottom-3 right-3 text-xs text-surface-400">
            {currentPrompt.length > 0 ? `${currentPrompt.length} chars` : ''}
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
              <FiChevronUp className="mr-2 text-accent-400" /> Hide optional details
            </>
          ) : (
            <>
              <FiChevronDown className="mr-2 text-accent-400" /> Add optional details
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
            {mode === 'enhancer' && (
              <>
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
              </>
            )}

            {mode === 'buildspec' && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="techStack" className="text-sm font-medium mb-2 flex items-center">
                    <FiCode className="mr-2 text-primary-400 flex-shrink-0" />
                    <span>Preferred tech stack</span>
                    <span className="text-surface-400 ml-1 text-xs">(optional)</span>
                  </label>
                  <input
                    id="techStack"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="input"
                    placeholder="Any preferred technologies? (e.g., 'React, Node.js, Tailwind CSS')"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="features" className="text-sm font-medium mb-2 flex items-center">
                    <FiList className="mr-2 text-primary-400 flex-shrink-0" />
                    <span>Key features/pages to include</span>
                     <span className="text-surface-400 ml-1 text-xs">(optional)</span>
                 </label>
                  <textarea
                    id="features"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    className="input min-h-[80px] resize-y"
                    placeholder="List specific features or pages (e.g., 'User profiles, dashboard, settings page')"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="exclusions" className="text-sm font-medium mb-2 flex items-center">
                    <FiXCircle className="mr-2 text-primary-400 flex-shrink-0" />
                    <span>Anything to exclude</span>
                    <span className="text-surface-400 ml-1 text-xs">(optional)</span>
                  </label>
                  <textarea
                    id="exclusions"
                    value={exclusions}
                    onChange={(e) => setExclusions(e.target.value)}
                    className="input min-h-[80px] resize-y"
                    placeholder="Specify anything the AI should NOT build (e.g., 'No database, no user login')"
                  />
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      <div className="pt-2">
        <motion.button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg font-medium flex items-center justify-center space-x-2"
          disabled={isLoading || !currentPrompt.trim() || mode === 'buildspec'}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" color="white" />
              <span className="ml-2">{mode === 'enhancer' ? 'Enhancing...' : 'Building Spec...'}</span>
            </>
          ) : (
            <>
              {mode === 'enhancer' ? <FiZap className="mr-1"/> : <FiTool className="mr-1"/>}
              <span>{mode === 'enhancer' ? 'Enhance My Prompt' : (mode === 'buildspec' ? 'Coming Soon' : 'Generate BuildSpec')}</span>
            </>
          )}
        </motion.button>
      </div>
    </form>
  );
} 