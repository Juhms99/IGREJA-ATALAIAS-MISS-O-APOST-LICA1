
import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', centered = false }) => {
  const textSizes = {
    sm: 'text-[14px]',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-5xl'
  };

  const subTextSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-sm',
    xl: 'text-base'
  };

  return (
    <div className={`flex flex-col ${centered ? 'items-center text-center' : 'items-start text-left'}`}>
      <h1 className={`${textSizes[size]} font-black tracking-tighter text-amber-500 uppercase leading-none`}>
        Igreja Atalaias
      </h1>
      <p className={`${subTextSizes[size]} font-bold tracking-[0.2em] text-amber-400/60 uppercase mt-0.5`}>
        Missão Apostólica
      </p>
    </div>
  );
};

export default Logo;
