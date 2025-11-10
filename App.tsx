import React, { useState, useCallback, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, User as FirebaseUser } from 'firebase/auth';
import { auth } from './firebase/config';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AnalyzePage from './pages/AnalyzePage';
import ResultsPage from './pages/ResultsPage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AccountPage from './pages/AccountPage';
import useDarkMode from './hooks/useDarkMode';
import { AppContext, Page, User } from './contexts/AppContext';

function App() {
  useDarkMode();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [currentAnalysisId, setCurrentAnalysisId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({ name: firebaseUser.displayName, email: firebaseUser.email });
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const navigate = useCallback((page: Page, analysisId?: string) => {
    setCurrentPage(page);
    if (analysisId) {
      setCurrentAnalysisId(analysisId);
    } else {
      setCurrentAnalysisId(null);
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isLoadingAuth) {
      const protectedPages: Page[] = ['dashboard', 'analyze', 'results', 'account'];
      const authPages: Page[] = ['login', 'register'];
      
      if (isAuthenticated && authPages.includes(currentPage)) {
        navigate('dashboard');
      }
      
      if (!isAuthenticated && protectedPages.includes(currentPage)) {
        navigate('login');
      }
    }
  }, [isAuthenticated, currentPage, navigate, isLoadingAuth]);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };
  
  const register = async (name: string, email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: name });
    setUser({ name, email });
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const logout = async () => {
    await signOut(auth);
    navigate('landing');
  };

  const renderPage = () => {
    if (isLoadingAuth) {
      return (
        <div className="flex items-center justify-center min-h-screen text-lg font-medium text-muted-foreground">
          Loading Application...
        </div>
      );
    }

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
    <AppContext.Provider value={{ currentPage, navigate, isAuthenticated, user, login, register, logout }}>
      <div className="min-h-screen bg-background text-foreground font-sans">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
}

export default App;
