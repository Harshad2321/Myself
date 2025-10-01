
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  useTheme();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <footer className="text-center p-6 bg-light-card dark:bg-dark-card border-t border-black/10 dark:border-white/10">
        <p className="text-sm text-light-secondary dark:text-dark-secondary">
          © {new Date().getFullYear()} Harshad. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default App;
