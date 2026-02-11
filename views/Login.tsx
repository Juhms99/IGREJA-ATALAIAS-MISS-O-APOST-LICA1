
import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ArrowRight } from 'lucide-react';
import { Member } from '../types';
import { MOCK_MEMBERS } from '../constants';
import Logo from '../components/Logo';

interface LoginProps {
  onLoginSuccess: (member: Member) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_MEMBERS.find(m => m.email === email);
    if (found) {
      onLoginSuccess(found);
    } else {
      setError('Credenciais inválidas. Tente pastor@atalaias.com');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-black px-8 transition-colors">
      <div className="text-center mb-12 animate-in fade-in zoom-in duration-700">
        <div className="flex justify-center mb-4">
          <Logo size="lg" />
        </div>
        <h1 className="text-3xl font-black text-amber-500 tracking-tighter leading-none uppercase">Igreja Atalaias</h1>
        <p className="text-amber-400 font-bold uppercase tracking-[0.2em] text-sm mt-1">Missão Apostólica</p>
      </div>

      <div className="bg-white/5 p-1.5 rounded-3xl flex mb-10 border border-white/10 backdrop-blur-xl">
        <button 
          onClick={() => { setIsRegistering(false); setError(''); }}
          className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${!isRegistering ? 'bg-amber-500 shadow-lg text-black' : 'text-amber-500/50'}`}
        >
          Entrar
        </button>
        <button 
          onClick={() => { setIsRegistering(true); setError(''); }}
          className={`flex-1 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${isRegistering ? 'bg-amber-500 shadow-lg text-black' : 'text-amber-500/50'}`}
        >
          Cadastrar
        </button>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        {isRegistering && (
          <div className="relative group">
            <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40 group-focus-within:text-amber-500 transition-colors" />
            <input 
              type="text" 
              placeholder="Nome Completo" 
              className="w-full bg-white/5 text-white border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        )}

        <div className="relative group">
          <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40 group-focus-within:text-amber-500 transition-colors" />
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail de Membro" 
            className="w-full bg-white/5 text-white border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        <div className="relative group">
          <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500/40 group-focus-within:text-amber-500 transition-colors" />
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha" 
            className="w-full bg-white/5 text-white border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
          />
        </div>

        {error && <p className="text-red-400 text-xs font-bold text-center animate-bounce">{error}</p>}

        <button 
          type="submit"
          className="w-full bg-amber-500 text-black py-5 rounded-2xl font-black tracking-[0.2em] uppercase text-xs shadow-xl shadow-amber-500/20 flex items-center justify-center space-x-2 hover:bg-amber-400 transition-all active:scale-[0.98]"
        >
          <span>{isRegistering ? 'Criar Conta' : 'Acessar Missão'}</span>
          <ArrowRight size={18} />
        </button>
      </form>

      <div className="mt-16 text-center text-[10px] text-amber-500/30 font-black uppercase tracking-[0.5em]">
        Escudo da Fé • AMA
      </div>
    </div>
  );
};

export default Login;
