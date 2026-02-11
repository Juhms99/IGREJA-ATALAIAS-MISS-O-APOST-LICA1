
import React from 'react';
import { Home, Video, IdCard, Users, Heart, User, LogOut, Bell, BookOpen, Music, HandHeart, Sun, Moon } from 'lucide-react';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
  isDark: boolean;
  toggleDark: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isAuthenticated, onLogout, isDark, toggleDark }) => {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'resources', label: 'Recursos', icon: BookOpen },
    { id: 'idcard', label: 'Cartão', icon: IdCard },
    { id: 'prayers', label: 'Oração', icon: HandHeart },
    { id: 'members', label: 'Família', icon: Users },
  ];

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 shadow-xl px-4 py-3 flex items-center justify-between transition-colors bg-black border-b border-amber-500/20`}>
        <div className="flex items-center space-x-3">
          <Logo size="sm" />
          <div className="flex flex-col">
            <h1 className="text-[12px] font-black tracking-tight uppercase leading-tight text-amber-500">Igreja Atalaias</h1>
            <span className="text-[10px] font-medium tracking-tighter uppercase opacity-80 text-amber-400/70">Missão Apostólica</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleDark}
            className="p-2 rounded-full transition-colors text-amber-400 hover:bg-amber-500/10"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="relative p-2 rounded-full transition-colors text-amber-400 hover:bg-amber-500/10">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-black"></span>
          </button>
          {isAuthenticated && (
            <button onClick={onLogout} className="p-2 hover:bg-red-500/10 rounded-full transition-colors text-red-500">
              <LogOut size={20} />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-24 pt-4 px-4 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className={`fixed bottom-0 left-0 right-0 border-t px-2 py-2 flex justify-around items-center shadow-[0_-10px_30px_-5px_rgba(0,0,0,0.3)] z-40 transition-colors ${isDark ? 'bg-black border-amber-500/10' : 'bg-white border-slate-200'}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
              activeTab === item.id 
                ? 'text-amber-500 bg-amber-500/10' 
                : (isDark ? 'text-slate-600' : 'text-slate-400')
            }`}
          >
            <item.icon size={22} className={activeTab === item.id ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
        {isAuthenticated && (
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center p-2 rounded-2xl transition-all ${
              activeTab === 'profile' 
                ? 'text-amber-500 bg-amber-500/10' 
                : (isDark ? 'text-slate-600' : 'text-slate-400')
            }`}
          >
            <User size={22} />
            <span className="text-[10px] font-black mt-1 uppercase tracking-tighter">Perfil</span>
          </button>
        )}
      </nav>
    </div>
  );
};

export default Layout;
