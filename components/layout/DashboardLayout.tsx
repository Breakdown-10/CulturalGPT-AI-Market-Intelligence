
import React, { useContext } from 'react';
import useDarkMode from '../../hooks/useDarkMode';
import { AppContext } from '../../contexts/AppContext';
import { Logo, SunIcon, MoonIcon } from '../../constants';
import Button from '../ui/Button';

const SidebarIcon: React.FC<{ icon: React.FC<React.SVGProps<SVGSVGElement>>; text: string; active?: boolean, onClick?: () => void }> = ({ icon: Icon, text, active, onClick }) => (
    <button onClick={onClick} className={`flex items-center p-2 w-full text-sm font-medium rounded-lg transition-colors ${active ? 'bg-accent text-accent-foreground' : 'text-muted-foreground hover:bg-accent hover:text-foreground'}`}>
        <Icon className="w-5 h-5 mr-3" />
        <span>{text}</span>
    </button>
);

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { navigate } = useContext(AppContext);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const ProjectsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  );

  const ReportsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
  );

  const AccountIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="7" r="3"/><path d="M12 22a7.5 7.5 0 0 0 5.6-12.2"/></svg>
  );

  return (
    <div className="flex h-screen bg-muted/40">
      <aside className="hidden md:flex w-64 flex-col border-r bg-background p-4">
        <div className="flex items-center space-x-2 mb-8">
            <Logo className="h-8 w-8 text-foreground" />
            <span className="font-bold text-lg">CulturalGPT</span>
        </div>
        <nav className="flex-1 space-y-2">
            <SidebarIcon icon={ProjectsIcon} text="Projects" active onClick={() => navigate('dashboard')} />
            <SidebarIcon icon={ReportsIcon} text="Reports" />
            <SidebarIcon icon={AccountIcon} text="Account" />
        </nav>
        <div>
            <button onClick={() => toggleDarkMode()} className="flex items-center p-2 w-full text-sm font-medium rounded-lg text-muted-foreground hover:bg-accent hover:text-foreground">
                {isDarkMode ? <SunIcon className="w-5 h-5 mr-3" /> : <MoonIcon className="w-5 h-5 mr-3" />}
                <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-end gap-4 border-b bg-background px-6">
            <Button onClick={() => navigate('analyze')}>+ New Analysis</Button>
        </header>
        <div className="flex-1 p-6">
            {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

