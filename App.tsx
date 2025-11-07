import React, { useState, useCallback, useEffect } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import useDarkMode from './hooks/useDarkMode';
import { AppContext, Page } from './contexts/AppContext';

function App() {
  useDarkMode();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('cultural_gpt_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData: { name: string; email: string }) => {
    localStorage.setItem('cultural_gpt_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const logout = () => {
    localStorage.removeItem('cultural_gpt_user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('landing');
  };

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
    const protectedPages: Page[] = ['dashboard', 'analyze', 'results', 'account'];
    if (protectedPages.includes(currentPage) && !isAuthenticated) {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'analyze':
        return <AnalyzePage />;
      case 'results':
        return <ResultsPage analysisId={currentAnalysisId || 'mock-id'} />;
      case 'pricing':
        return <PricingPage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'account':
        return <AccountPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <AppContext.Provider value={{ currentPage, navigate, isAuthenticated, user, login, logout }}>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
