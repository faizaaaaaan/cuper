'use client';

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function AnimatedContent({ children }: { children: ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border"
    >
      {children}
    </motion.div>
  );
}