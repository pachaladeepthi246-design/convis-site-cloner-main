import React from 'react';
import { cn } from '../lib/utils';

const GlassCard = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;