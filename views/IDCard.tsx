
import React from 'react';
import { Member } from '../types';
import { QrCode, ShieldCheck, Calendar, MapPin, Activity, Fingerprint } from 'lucide-react';

interface IDCardProps {
  member: Member | null;
}

const IDCard: React.FC<IDCardProps> = ({ member }) => {
  if (!member) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <ShieldCheck size={64} className="text-amber-500/20 mb-4" />
        <h2 className="text-xl font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter">Acesso Restrito</h2>
        <p className="text-slate-500 mt-2 px-8 text-xs font-bold uppercase tracking-widest">Faça login para acessar sua credencial ministerial oficial.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="text-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter">Cartão de Membro</h2>
        <p className="text-[10px] text-slate-500 dark:text-amber-400/50 font-black uppercase tracking-[0.3em] mt-1">Identificação Digital Oficial</p>
      </header>

      {/* Cartão Digital - Design de Alta Segurança */}
      <div className="relative max-w-sm mx-auto aspect-[1.58/1] w-full rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group">
        {/* Fundo do Cartão */}
        <div className="absolute inset-0 bg-black">
          {/* Efeitos de Iluminação Ouro */}
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,rgba(251,191,36,0.15)_0%,transparent_50%)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_100%,rgba(251,191,36,0.05)_0%,transparent_50%)]"></div>
          {/* Textura de Segurança */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        </div>

        {/* Conteúdo do Cartão */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Cabeçalho do Cartão */}
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border-2 border-amber-500/50 rounded-xl flex items-center justify-center bg-black">
                <svg viewBox="0 0 160 160" className="w-7 h-7">
                  <path d="M80 5 C110 5, 145 20, 145 55 C145 90, 120 125, 80 155 C40 125, 15 90, 15 55 C15 20, 50 5, 80 5Z" fill="none" stroke="#fbbf24" strokeWidth="8"/>
                  <text x="80" y="105" textAnchor="middle" fill="#fbbf24" style={{ fontSize: '70px', fontWeight: '900' }}>A</text>
                </svg>
              </div>
              <div className="flex flex-col">
                <h3 className="text-[11px] font-black uppercase tracking-tight text-amber-500 leading-none">Igreja Atalaias</h3>
                <span className="text-[9px] font-bold uppercase tracking-tighter text-amber-400/60">Missão Apostólica</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-amber-500/10 border border-amber-500/30 px-2 py-1 rounded-lg">
                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest">MEMBRO ATIVO</span>
              </div>
            </div>
          </div>

          {/* Área Central: Foto e Dados Principais */}
          <div className="flex items-center space-x-5">
            <div className="relative shrink-0">
              <div className="absolute inset-0 bg-amber-500 blur-xl opacity-20 rounded-full"></div>
              <img 
                src={member.photoUrl} 
                alt={member.name}
                className="w-24 h-24 object-cover rounded-2xl border-2 border-amber-500/40 relative z-10 shadow-2xl"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-black text-white uppercase tracking-tighter truncate leading-tight">
                {member.name}
              </h4>
              <div className="mt-2 space-y-1">
                <div className="flex items-center text-amber-500">
                  <Fingerprint size={10} className="mr-1.5" />
                  <span className="text-[9px] font-black uppercase tracking-[0.1em]">{member.role}</span>
                </div>
                <div className="flex items-center text-amber-400/70">
                  <Activity size={10} className="mr-1.5" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Unção: {member.uncao}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé: Documento, Validade e QR */}
          <div className="flex justify-between items-end border-t border-amber-500/20 pt-4">
            <div className="flex space-x-6">
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase text-amber-500/40 tracking-[0.2em] mb-0.5">Documento</span>
                <span className="text-[10px] font-mono font-bold text-amber-100">{member.documentNumber}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[7px] font-black uppercase text-amber-500/40 tracking-[0.2em] mb-0.5">Validade</span>
                <span className="text-[10px] font-mono font-bold text-amber-100">{member.validity}</span>
              </div>
            </div>
            
            <div className="bg-white p-1 rounded-lg shadow-xl hover:scale-110 transition-transform cursor-pointer">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${member.qrCodeData}`} 
                className="w-10 h-10 grayscale brightness-0"
                alt="QR Code de Membro"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Informativos Adicionais */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-black p-5 rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black dark:text-amber-500 uppercase tracking-tight leading-none">Membro desde</h4>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Jan / 2022</p>
          </div>
        </div>
        <div className="bg-white dark:bg-black p-5 rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <MapPin size={20} />
          </div>
          <div>
            <h4 className="text-[10px] font-black dark:text-amber-500 uppercase tracking-tight leading-none">Congregação</h4>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Sede Brasil</p>
          </div>
        </div>
      </div>

      {/* Nota Ministerial */}
      <div className="bg-black border border-amber-500/20 p-6 rounded-[2rem] relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-5 text-amber-500">
          <ShieldCheck size={120} />
        </div>
        <h4 className="font-black text-amber-500 mb-2 flex items-center uppercase tracking-widest text-[10px]">
          <ShieldCheck size={16} className="mr-2" />
          Validação Ministerial
        </h4>
        <p className="text-[10px] text-amber-400/40 leading-relaxed font-medium uppercase tracking-tight">
          ESTA CREDENCIAL É DE USO PESSOAL E INTRANSFERÍVEL. EM CASO DE PERDA OU EXTRAVIO, COMUNIQUE IMEDIATAMENTE A SECRETARIA DA MISSÃO APOSTÓLICA ATALAIAS. VÁLIDA EM TODO TERRITÓRIO NACIONAL PARA FINS DE IDENTIFICAÇÃO ECLESIÁSTICA.
        </p>
      </div>
    </div>
  );
};

export default IDCard;
