
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './views/Home';
import Live from './views/Live';
import Members from './views/Members';
import IDCard from './views/IDCard';
import Donations from './views/Donations';
import Login from './views/Login';
import HolyResources from './views/HolyResources';
import PrayerRequests from './views/PrayerRequests';
import { AuthState, Member } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('atalaias_theme');
    return saved === 'dark';
  });
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('atalaias_auth');
    if (saved) {
      setAuth(JSON.parse(saved));
    }
  }, []);

  const toggleDark = () => {
    setIsDark(prev => {
      const newVal = !prev;
      localStorage.setItem('atalaias_theme', newVal ? 'dark' : 'light');
      return newVal;
    });
  };

  const handleLoginSuccess = (member: Member) => {
    const newState = { user: member, isAuthenticated: true };
    setAuth(newState);
    localStorage.setItem('atalaias_auth', JSON.stringify(newState));
    setActiveTab('home');
  };

  const handleLogout = () => {
    const newState = { user: null, isAuthenticated: false };
    setAuth(newState);
    localStorage.removeItem('atalaias_auth');
    setActiveTab('home');
  };

  const renderContent = () => {
    if (!auth.isAuthenticated) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    }

    switch (activeTab) {
      case 'home': return <Home onNavigate={setActiveTab} />;
      case 'live': return <Live />;
      case 'members': return <Members />;
      case 'resources': return <HolyResources />;
      case 'prayers': return <PrayerRequests user={auth.user} />;
      case 'idcard': return <IDCard member={auth.user} />;
      case 'donations': return <Donations />;
      case 'profile': return (
        <div className="p-4 space-y-6">
          <header className="flex items-center space-x-4">
            <img src={auth.user?.photoUrl} className="w-20 h-20 rounded-[2.5rem] object-cover ring-4 ring-amber-500/20 shadow-xl" />
            <div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{auth.user?.name}</h2>
              <span className="text-xs font-black text-amber-500 bg-amber-50 dark:bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest">{auth.user?.role}</span>
            </div>
          </header>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] space-y-4 shadow-sm border border-slate-100 dark:border-white/5">
             <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-white/5">
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Email</span>
               <span className="text-sm font-medium">{auth.user?.email}</span>
             </div>
             <div className="flex justify-between items-center py-2 border-b border-slate-50 dark:border-white/5">
               <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Telefone</span>
               <span className="text-sm font-medium">{auth.user?.phone}</span>
             </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 dark:bg-red-950/20 text-red-600 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-red-100"
          >
            Encerrar Sessão
          </button>
        </div>
      );
      default: return <Home onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAuthenticated={auth.isAuthenticated}
        onLogout={handleLogout}
        isDark={isDark}
        toggleDark={toggleDark}
      >
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
