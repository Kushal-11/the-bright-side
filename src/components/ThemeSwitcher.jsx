import React from 'react';
import { Palette, Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const ThemeSwitcher = () => {
  const { theme, changeTheme, themes } = useTheme();

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'dawn':
        return <Palette className="w-4 h-4" />;
      case 'midnight':
        return <Moon className="w-4 h-4" />;
      case 'solar':
        return <Sun className="w-4 h-4" />;
      default:
        return <Palette className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative group">
      <button
        className="glass-card p-2 rounded-lg hover:scale-105 transition-all duration-200 flex items-center justify-center"
        aria-label="Switch theme"
        title={`Current theme: ${themes[theme]?.name || 'Unknown'}`}
      >
        {getThemeIcon(theme)}
      </button>
      
      <div className="absolute top-full right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="glass-card p-3 rounded-xl min-w-[200px] shadow-xl">
          <h3 className="text-sm font-semibold mb-2 text-foreground">Choose Theme</h3>
          <div className="space-y-2">
            {Object.entries(themes).map(([key, themeInfo]) => (
              <button
                key={key}
                onClick={() => changeTheme(key)}
                className={`w-full text-left p-2 rounded-lg transition-all duration-200 flex items-center gap-3 hover:bg-glass-bg ${
                  theme === key ? 'bg-primary/10 border border-primary/20' : ''
                }`}
              >
                {getThemeIcon(key)}
                <div>
                  <div className="text-sm font-medium text-foreground">{themeInfo.name}</div>
                  <div className="text-xs text-foreground/70">{themeInfo.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSwitcher;
