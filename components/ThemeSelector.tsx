'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSelector() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    if (initialTheme) {
      setTheme(initialTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const toggleTheme = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-1 shadow-sm transition-colors duration-200">
      <button
        onClick={() => toggleTheme('light')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'light' 
            ? 'bg-amber-100 text-amber-600 shadow-sm' 
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        aria-label="Light mode"
      >
        <Sun size={16} />
      </button>
      <button
        onClick={() => toggleTheme('dark')}
        className={`p-1.5 rounded-lg transition-all ${
          theme === 'dark' 
            ? 'bg-indigo-600 text-white shadow-sm' 
            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        }`}
        aria-label="Dark mode"
      >
        <Moon size={16} />
      </button>
    </div>
  );
}
