
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg', showText?: boolean }> = ({ size = 'md', showText = false }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-32'
  };

  return (
    <div className={`flex items-center gap-4 ${sizes[size]}`}>
      {/* Escudo vetorial conforme imagem original */}
      <svg viewBox="0 0 160 160" className="h-full drop-shadow-2xl">
        {/* Camada externa do escudo (Borda Dourada) */}
        <path 
          d="M80 5 C110 5, 145 20, 145 55 C145 90, 120 125, 80 155 C40 125, 15 90, 15 55 C15 20, 50 5, 80 5Z" 
          fill="none" 
          stroke="#fbbf24" 
          strokeWidth="6"
        />
        {/* Camada interna do escudo (Preto) */}
        <path 
          d="M80 12 C105 12, 136 25, 136 55 C136 85, 115 118, 80 145 C45 118, 24 85, 24 55 C24 25, 55 12, 80 12Z" 
          fill="#000000" 
        />
        {/* Borda interna dourada fina */}
        <path 
          d="M80 18 C100 18, 128 30, 128 55 C128 80, 110 110, 80 135 C50 110, 32 80, 32 55 C32 30, 60 18, 80 18Z" 
          fill="none" 
          stroke="#fbbf24" 
          strokeWidth="2"
        />
        {/* Texto AMA estilizado */}
        <text 
          x="80" 
          y="100" 
          textAnchor="middle" 
          fill="#fbbf24" 
          style={{ 
            fontSize: '70px', 
            fontWeight: '900', 
            fontFamily: "'Playfair Display', serif",
            letterSpacing: '-2px'
          }}
        >
          AMA
        </text>
      </svg>
      
      {showText && (
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-amber-500 leading-none uppercase">
            Igreja Atalaias
          </h1>
          <h2 className="text-xl md:text-3xl font-bold tracking-tight text-amber-400 leading-tight uppercase">
            Missão Apostólica
          </h2>
        </div>
      )}
    </div>
  );
};

export default Logo;
