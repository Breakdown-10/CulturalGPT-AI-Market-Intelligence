import React, { createContext } from 'react';

export type Page = 'landing' | 'dashboard' | 'analyze' | 'results' | 'pricing' | 'login' | 'register' | 'account';

interface User {
  name: string;
  email: string;
}

interface AppContextType {
  currentPage: Page;
  navigate: (page: Page, analysisId?: string) => void;
  isAuthenticated: boolean;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  currentPage: 'landing',
  navigate: () => console.warn('Navigate function not ready'),
  isAuthenticated: false,
  user: null,
  login: () => console.warn('Login function not ready'),
  logout: () => console.warn('Logout function not ready'),
});
