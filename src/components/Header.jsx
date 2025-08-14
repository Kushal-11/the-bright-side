import React from 'react';
import { Menu, X } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass backdrop-blur-md">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-foreground">The Bright Side</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a
                href="#help"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                Help
              </a>
              <a
                href="#login"
                className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
              >
                Login
              </a>
              <button className="btn-primary">
                Try for free
              </button>
            </div>
          </div>

          {/* Theme Switcher and Mobile menu button */}
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="glass-card p-2 rounded-lg hover:scale-105 transition-all duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5 text-foreground" />
                ) : (
                  <Menu className="h-5 w-5 text-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 glass-card rounded-xl mt-2 mb-4">
              <a
                href="#about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="#help"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={toggleMenu}
              >
                Help
              </a>
              <a
                href="#login"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200 font-medium"
                onClick={toggleMenu}
              >
                Login
              </a>
              <div className="px-3 py-2">
                <button className="btn-primary w-full">
                  Try for free
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
