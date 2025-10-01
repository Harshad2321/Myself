import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { SunIcon, MoonIcon } from './icons/Icons';
// Fix: Import `motion` and `AnimatePresence` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion, AnimatePresence } from 'framer-motion';


const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
