"use client";
import { motion } from "framer-motion";
import React from "react";

interface AnimatedSectionWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSectionWrapper: React.FC<AnimatedSectionWrapperProps> = ({ children, className }) => {
  return (
    <motion.section
      className={`h-screen w-full flex items-center justify-center p-4 sm:p-8 ${className || ''}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.section>
  );
};