import React from 'react';
import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../constants';
import ThemeToggle from './ThemeToggle';
import { useScrollspy } from '../hooks/useScrollspy';
import { MenuIcon, XIcon } from './icons/Icons';
// Fix: Import `motion` and `AnimatePresence` from `framer-motion` instead of destructuring from `window.FramerMotion`.
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const sectionIds = NAV_LINKS.map(link => link.id);
  const activeId = useScrollspy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-lg border-b border-black/10 dark:border-white/10' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="text-2xl font-bold text-light-primary dark:text-dark-primary">
            H.
          </a>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium transition-colors duration-300 relative ${
                  activeId === link.id ? 'text-light-primary dark:text-dark-primary' : 'text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary'
                }`}
              >
                {link.title}
                {activeId === link.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 block h-[2px] w-full bg-light-primary dark:bg-dark-primary"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>
          <div className="flex items-center">
             <div className="hidden md:block">
                <ThemeToggle />
             </div>
            <div className="md:hidden ml-4">
              <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-light-card/95 dark:bg-dark-card/95 backdrop-blur-lg shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    activeId === link.id ? 'text-light-primary dark:text-dark-primary bg-black/5 dark:bg-white/5' : 'text-light-text dark:text-dark-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {link.title}
                </a>
              ))}
              <div className="border-t border-black/10 dark:border-white/10 pt-4 mt-4 flex justify-center">
                 <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
