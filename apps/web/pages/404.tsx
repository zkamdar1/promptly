import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiHome } from 'react-icons/fi';

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg blur opacity-25"></div>
        <h1 className="relative text-8xl font-bold text-gradient mb-6">404</h1>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-2xl md:text-3xl font-medium mb-6 text-white"
      >
        Page Not Found
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="text-surface-300 max-w-md mb-8"
      >
        The page you're looking for seems to have vanished into the digital void.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Link 
          href="/"
          className="btn btn-primary flex items-center justify-center"
        >
          <FiHome className="mr-2" />
          Go to Homepage
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="btn btn-outline flex items-center justify-center"
        >
          <FiArrowLeft className="mr-2" />
          Go Back
        </button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-12"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl"></div>
          <div className="relative h-1 w-40 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
        </div>
      </motion.div>
    </div>
  );
} 