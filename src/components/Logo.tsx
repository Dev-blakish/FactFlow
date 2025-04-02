
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img 
        src="/lovable-uploads/39f06b2e-884c-47c9-b972-879f7b4aaa64.png" 
        alt="FactFlow Logo" 
        className="h-14 w-auto" // Increased from h-10 to h-14
      />
    </div>
  );
};

export default Logo;
