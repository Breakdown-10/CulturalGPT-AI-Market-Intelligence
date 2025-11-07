
import React, { useContext, useState } from 'react';
import { Logo, SunIcon, MoonIcon, MenuIcon, XIcon } from '../../constants';
import useDarkMode from '../../hooks/useDarkMode';
import Button from '../ui/Button';
import { AppContext } from '../../contexts/AppContext';

const Header: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const { navigate } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Features', action: () => {} },
    { name: 'Pricing', action: () => {} },
    { name: 'Contact', action: () => {} },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate('landing')} className="flex items-center space-x-2">
            <Logo className="h-8 w-8 text-foreground" />
            <span className="font-bold text-lg">CulturalGPT</span>
          </button>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <a key={link.name} href="#" className="text-muted-foreground transition-colors hover:text-foreground">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" onClick={() => toggleDarkMode()} size="sm" className="w-9 h-9 p-0">
            {isDarkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" onClick={() => navigate('dashboard')}>Log In</Button>
          <Button onClick={() => navigate('analyze')}>Try Demo</Button>
        </div>

        <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
        </div>
      </div>
       {isMenuOpen && (
            <div className="md:hidden px-4 pt-2 pb-4 space-y-2 border-t">
                 {navLinks.map((link) => (
                    <a key={link.name} href="#" className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent">
                        {link.name}
                    </a>
                ))}
                 <div className="pt-4 border-t border-border/40 flex items-center space-x-2">
                    <Button variant="outline" onClick={() => navigate('dashboard')} className="w-full">Log In</Button>
                    <Button onClick={() => navigate('analyze')} className="w-full">Try Demo</Button>
                </div>
            </div>
        )}
    </header>
  );
};

export default Header;
