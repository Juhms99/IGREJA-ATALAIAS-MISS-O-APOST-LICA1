
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
import Profile from './views/Profile';
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
      case 'profile': return <Profile user={auth.user} onLogout={handleLogout} />;
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
