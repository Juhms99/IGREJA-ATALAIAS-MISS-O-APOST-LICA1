
import React, { useState } from 'react';
import { Music, Search, Heart } from 'lucide-react';
import { MOCK_HYMNS } from '../constants';

const Harpa: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHymns = MOCK_HYMNS.filter(h => 
    h.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    h.number.toString().includes(searchTerm)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-800 dark:text-amber-500 uppercase">Harpa Cristã</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Louvores e Adoração</p>
        </div>
        <div className="w-12 h-12 bg-black text-amber-500 rounded-2xl flex items-center justify-center shadow-lg border border-amber-500/20">
          <Music size={24} />
        </div>
      </header>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40" size={18} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Número ou nome do hino..." 
          className="w-full bg-white dark:bg-black border border-slate-100 dark:border-amber-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-1 focus:ring-amber-500 outline-none transition-all shadow-sm dark:text-white"
        />
      </div>

      <div className="space-y-3">
        {filteredHymns.map((hymn) => (
          <div 
            key={hymn.number}
            className="p-5 bg-white dark:bg-black rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm hover:shadow-md transition-all flex items-center space-x-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex flex-col items-center justify-center text-amber-500 font-black border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              <span className="text-[8px] uppercase tracking-tighter opacity-50 font-bold">Nº</span>
              <span className="text-lg leading-none">{hymn.number}</span>
            </div>
            <div className="flex-1">
              <h4 className="font-black text-slate-800 dark:text-amber-100 uppercase tracking-tight text-base">{hymn.title}</h4>
              <p className="text-[11px] text-slate-500 italic mt-1 line-clamp-1">"{hymn.lyrics}"</p>
            </div>
            <button className="text-slate-200 dark:text-white/10 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Harpa;
