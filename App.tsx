
import React, { useState, useCallback } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import useDarkMode from './hooks/useDarkMode';
import { AppContext, Page } from './contexts/AppContext';

function App() {
  useDarkMode();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);

  const navigate = useCallback((page: Page, analysisId?: string) => {
    setCurrentPage(page);
    if (analysisId) {
      setCurrentAnalysisId(analysisId);
    } else {
      setCurrentAnalysisId(null);
    }
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'analyze':
        return <AnalyzePage />;
      case 'results':
        return <ResultsPage analysisId={currentAnalysisId || 'mock-id'} />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AppContext.Provider value={{ currentPage, navigate }}>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
