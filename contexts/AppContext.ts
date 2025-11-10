import React, { createContext } from 'react';

export type Page = 'landing' | 'dashboard' | 'analyze' | 'results' | 'pricing' | 'login' | 'register' | 'account';

export interface User {
  name: string | null;
  email: string | null;
}

interface AppContextType {
  currentPage: Page;
  navigate: (page: Page, analysisId?: string) => void;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AppContext = createContext<AppContextType>({
  currentPage: 'landing',
  navigate: () => console.warn('Navigate function not ready'),
  isAuthenticated: false,
  user: null,
  login: () => Promise.reject(new Error('Login function not ready')),
  register: () => Promise.reject(new Error('Register function not ready')),
  logout: () => console.warn('Logout function not ready'),
});
