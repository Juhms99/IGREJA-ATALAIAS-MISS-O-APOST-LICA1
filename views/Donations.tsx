
import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, Coins, HandCoins, ShieldCheck } from 'lucide-react';

const Donations: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const presets = [10, 30, 50, 100];
  const pixKey = "00020126580014br.gov.bcb.pix0136igrejaatalaias@pix.com.br5204000053039865802BR5925Igreja Atalaias Missao Ap6009SAO PAULO62070503***6304E224";

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
          <Heart size={32} fill="currentColor" />
        </div>
        <h2 className="text-2xl font-black text-slate-800 dark:text-amber-500 uppercase tracking-tighter">Generosidade</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-[80%] mx-auto mt-2 font-medium">
          "Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria."
        </p>
      </header>

      {/* Preset Amounts */}
      <div className="grid grid-cols-2 gap-4">
        {presets.map((amount) => (
          <button
            key={amount}
            onClick={() => { setSelectedAmount(amount); setShowQR(true); }}
            className={`p-6 rounded-3xl border transition-all flex flex-col items-center justify-center space-y-2 ${
              selectedAmount === amount 
                ? 'bg-amber-500 border-amber-500 text-black shadow-xl scale-105' 
                : 'bg-white dark:bg-black border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-amber-500/30'
            }`}
          >
            <Coins size={24} className={selectedAmount === amount ? 'text-black' : 'text-amber-500/40'} />
            <span className="text-2xl font-black">R$ {amount}</span>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Escolher</span>
          </button>
        ))}
      </div>

      {/* Custom Amount */}
      <div className="bg-white dark:bg-black p-6 rounded-3xl border border-slate-100 dark:border-amber-500/10 shadow-sm">
        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Valor Livre</label>
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 font-black">R$</span>
            <input 
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
              placeholder="0,00"
              className="w-full bg-slate-50 dark:bg-white/5 border-none rounded-2xl pl-12 pr-4 py-4 text-xl font-black focus:ring-1 focus:ring-amber-500 outline-none dark:text-white"
            />
          </div>
          <button 
            disabled={!customAmount}
            onClick={() => setShowQR(true)}
            className="bg-black dark:bg-amber-500 text-amber-500 dark:text-black p-4 rounded-2xl shadow-lg disabled:opacity-50 hover:scale-105 transition-all active:scale-95 border border-amber-500/20"
          >
            <HandCoins size={24} />
          </button>
        </div>
      </div>

      {/* PIX Area - Black/Gold Aesthetic */}
      {showQR && (
        <div className="bg-black border border-amber-500/20 p-8 rounded-[3rem] text-white text-center animate-in zoom-in duration-300 shadow-[0_20px_50px_-10px_rgba(251,191,36,0.1)]">
          <h3 className="text-xl font-black mb-6 text-amber-500 uppercase tracking-tighter">Oferta via PIX</h3>
          <div className="bg-white p-4 rounded-3xl inline-block mb-6 shadow-2xl">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${pixKey}`} 
              alt="PIX QR Code"
              className="w-48 h-48"
            />
          </div>
          <p className="text-[11px] text-amber-500/60 mb-8 max-w-[80%] mx-auto font-medium leading-relaxed uppercase tracking-widest">
            Escaneie o código no app do seu banco ou use a chave abaixo.
          </p>
          <button 
            onClick={handleCopy}
            className={`w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
              copied ? 'bg-green-600 text-white' : 'bg-amber-500 text-black hover:bg-amber-600'
            }`}
          >
            {copied ? (
              <><Check size={18} /> <span>Copiado com Sucesso</span></>
            ) : (
              <><Copy size={18} /> <span>Copiar Chave PIX</span></>
            )}
          </button>
        </div>
      )}

      <div className="text-center pb-10">
        <p className="text-[10px] text-slate-400 font-black flex items-center justify-center uppercase tracking-widest">
          <ShieldCheck size={14} className="mr-1 text-amber-500" />
          Segurança • Banco Central do Brasil
        </p>
      </div>
    </div>
  );
};

export default Donations;
