import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dawn');

  useEffect(() => {
    const savedTheme = localStorage.getItem('bright-side-theme') || 'dawn';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.removeAttribute('data-theme');
    
    // Apply new theme
    if (newTheme === 'midnight') {
      root.setAttribute('data-theme', 'midnight');
    } else if (newTheme === 'solar') {
      root.setAttribute('data-theme', 'solar');
    }
    // dawn theme is the default (no data-theme attribute needed)
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('bright-side-theme', newTheme);
  };

  const themes = {
    dawn: {
      name: 'Calm Dawn',
      description: 'Soft lavender and blush tones for gentle reflection'
    },
    midnight: {
      name: 'Midnight Focus',
      description: 'Deep blues and purples for evening contemplation'
    },
    solar: {
      name: 'Solar Warmth',
      description: 'Golden hues and warm oranges for energizing thoughts'
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme, themes, currentTheme: themes[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
};
