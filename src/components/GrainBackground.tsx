
import React from 'react';
import { cn } from '@/lib/utils';

interface GrainBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

const GrainBackground: React.FC<GrainBackgroundProps> = ({ children, className }) => {
  return (
    <div className={cn("grain-bg relative", className)}>
      <div className="absolute inset-0 bg-grain opacity-25 pointer-events-none"></div>
      {children}
    </div>
  );
};

export default GrainBackground;
