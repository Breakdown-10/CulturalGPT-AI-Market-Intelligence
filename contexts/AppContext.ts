
import React, { createContext } from 'react';

export type Page = 'landing' | 'dashboard' | 'analyze' | 'results' | 'pricing';

interface AppContextType {
  currentPage: Page;
  navigate: (page: Page, analysisId?: string) => void;
}

export const AppContext = createContext<AppContextType>({
  currentPage: 'landing',
  navigate: () => console.warn('Navigate function not ready'),
});
