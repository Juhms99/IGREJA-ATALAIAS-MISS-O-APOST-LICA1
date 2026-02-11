
import React from 'react';
import { Member } from '../types';
import { User, Mail, Phone, Calendar, ShieldCheck, LogOut, Settings, Award, Heart, MessageSquare } from 'lucide-react';

interface ProfileProps {
  user: Member | null;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  if (!user) return null;

  const stats = [
    { label: 'Orações', value: '12', icon: Heart },
    { label: 'Hinos Favoritos', value: '5', icon: Award },
    { label: 'Comentários', value: '28', icon: MessageSquare },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header com Foto */}
      <div className="relative pt-10 pb-6 text-center">
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 rounded-full"></div>
          <img 
            src={user.photoUrl} 
            className="w-32 h-32 rounded-[3rem] object-cover border-4 border-amber-500 relative z-10 shadow-2xl" 
            alt={user.name}
          />
          <div className="absolute -bottom-2 -right-2 bg-black border-2 border-amber-500 p-2 rounded-2xl z-20 text-amber-500">
            <ShieldCheck size={20} />
          </div>
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white uppercase tracking-tighter mt-6">
          {user.name}
        </h2>
        <p className="text-xs font-black text-amber-500 uppercase tracking-[0.3em]">{user.role}</p>
      </div>

      {/* Estatísticas Rápidas */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-black p-4 rounded-3xl border border-slate-100 dark:border-amber-500/10 text-center">
            <stat.icon size={16} className="mx-auto mb-2 text-amber-500/50" />
            <div className="text-lg font-black dark:text-white leading-none">{stat.value}</div>
            <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Informações Pessoais */}
      <div className="bg-white dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-amber-500/10 overflow-hidden shadow-sm">
        <div className="p-6 space-y-5">
          <h3 className="text-[10px] font-black text-amber-500 uppercase tracking-[0.2em] flex items-center">
            <Settings size={14} className="mr-2" />
            Dados Cadastrais
          </h3>
          
          <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <Mail size={18} className="text-amber-500/40" />
            <div className="flex-1">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">E-mail</p>
              <p className="text-sm font-bold dark:text-slate-200">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <Phone size={18} className="text-amber-500/40" />
            <div className="flex-1">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Telefone</p>
              <p className="text-sm font-bold dark:text-slate-200">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-white/5 rounded-2xl">
            <Calendar size={18} className="text-amber-500/40" />
            <div className="flex-1">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Membro desde</p>
              <p className="text-sm font-bold dark:text-slate-200">Janeiro de 2022</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="space-y-3 pb-10">
        <button 
          onClick={onLogout}
          className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-500 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-2"
        >
          <LogOut size={18} />
          <span>Encerrar Sessão</span>
        </button>
        <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
          Versão do App: 2.1.0 • AMA Digital
        </p>
      </div>
    </div>
  );
};

export default Profile;
