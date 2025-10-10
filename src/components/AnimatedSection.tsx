import { motion } from 'framer-motion';
import React from 'react';
import { cn } from '../lib/utils';

const AnimatedSection = ({ children, delay = 0, className }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;