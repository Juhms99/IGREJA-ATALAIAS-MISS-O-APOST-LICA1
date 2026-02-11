
import React, { useState } from 'react';
import { Search, Info, Users, Tag, ChevronRight } from 'lucide-react';
import { MOCK_MEMBERS } from '../constants';
import { MemberRole } from '../types';

const Members: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('Todos');

  const roles = ['Todos', ...Object.values(MemberRole).filter(r => r !== MemberRole.ADMIN)];

  const filteredMembers = MOCK_MEMBERS.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'Todos' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <header>
        <h2 className="text-2xl font-black tracking-tighter text-amber-500 uppercase">Família AMA</h2>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Corpo de Cristo em Missão</p>
      </header>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40" />
          <input 
            type="text"
            placeholder="Buscar irmão(ã)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-amber-500/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 outline-none transition-all text-white placeholder-slate-600"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-5 py-2.5 rounded-full text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedRole === role 
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' 
                  : 'bg-white/5 text-slate-500 border border-white/5 hover:border-amber-500/30'
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white/5 p-6 rounded-[2.5rem] border border-white/5 hover:border-amber-500/20 transition-all group relative overflow-hidden">
            <div className="flex items-center space-x-5">
              <div className="relative">
                <img 
                  src={member.photoUrl} 
                  alt={member.name} 
                  className="w-20 h-20 rounded-[2rem] object-cover ring-2 ring-amber-500/20 group-hover:scale-105 transition-transform"
                />
                <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-xl border-4 border-black shadow-lg ${
                  member.role === MemberRole.PASTOR ? 'bg-amber-500 text-black' : 'bg-slate-800 text-amber-500'
                }`}>
                  <Tag size={12} fill="currentColor" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-black text-white truncate text-xl uppercase tracking-tighter">
                  {member.name}
                </h3>
                <div className="flex flex-col mt-1">
                  <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                    {member.role}
                  </span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase mt-0.5">Unção: {member.uncao}</span>
                </div>
              </div>
              <ChevronRight className="text-white/10 group-hover:text-amber-500/30 transition-colors" />
            </div>
            
            {/* Observations Area */}
            <div className="mt-5 pt-5 border-t border-white/5">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-500/10 p-2 rounded-xl">
                  <Info size={14} className="text-amber-500" />
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 block mb-1">Notas Pastorais</span>
                  <p className="text-xs text-slate-400 italic leading-relaxed">
                    {member.observations || "Sem observações adicionais."}
                  </p>
                </div>
              </div>
            </div>

            {/* Background Branding */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] text-amber-500 group-hover:opacity-[0.05] transition-opacity pointer-events-none">
              <Users size={120} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
