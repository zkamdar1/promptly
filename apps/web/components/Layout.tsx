import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  FiMoon, 
  FiSun, 
  FiHome, 
  FiBook, 
  FiInfo, 
  FiLock,
  FiMenu,
  FiX
} from 'react-icons/fi';

interface LayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: '/', label: 'Editor', icon: <FiHome className="w-5 h-5" /> },
  { path: '/examples', label: 'Examples', icon: <FiBook className="w-5 h-5" /> },
  { path: '/about', label: 'About', icon: <FiInfo className="w-5 h-5" /> },
  { path: '/privacy', label: 'Privacy', icon: <FiLock className="w-5 h-5" /> },
];

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState(true); // Default to dark mode
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has a preference stored
    const savedMode = localStorage.getItem('darkMode');
    const userPrefersDark = savedMode !== null 
      ? savedMode === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    setDarkMode(userPrefersDark);
    
    // Apply the theme
    if (userPrefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Save preference to localStorage
    localStorage.setItem('darkMode', String(newDarkMode));
    
    // Apply the theme
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col relative ${darkMode ? 'dark' : ''}`}>
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <header className="sticky top-0 z-10 backdrop-blur-md bg-surface-900/70 border-b border-surface-800/50">
        <div className="container mx-auto px-4 flex justify-between items-center h-16 md:h-20">
          <Link 
            href="/" 
            className="text-2xl font-bold text-gradient"
          >
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Promptly
            </motion.span>
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-icon glass text-surface-300 hover:text-white"
            >
              {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <nav className="flex items-center mr-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 hover:text-white group ${
                    router.pathname === item.path 
                      ? 'text-white' 
                      : 'text-surface-400'
                  }`}
                >
                  {router.pathname === item.path && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute inset-0 bg-surface-800/70 rounded-lg -z-10"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                  <span>{item.label}</span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-accent-500 group-hover:w-1/2 group-hover:left-1/4 transition-all duration-200"></span>
                </Link>
              ))}
            </nav>
            
            <button 
              onClick={toggleDarkMode}
              className="btn-icon glass text-surface-300 hover:text-white"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-surface-800"
          >
            <nav className="flex flex-col py-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-6 py-3 ${
                    router.pathname === item.path
                      ? 'text-white bg-surface-800'
                      : 'text-surface-300'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </Link>
              ))}
              <div className="mx-4 mt-2 pt-2 border-t border-surface-800 flex items-center">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center px-2 py-3 text-surface-300"
                >
                  {darkMode ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 relative z-1">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="mt-auto border-t border-surface-800/50 backdrop-blur-sm bg-surface-900/30">
        <div className="container mx-auto px-4 py-6 text-center text-surface-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Promptly. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 