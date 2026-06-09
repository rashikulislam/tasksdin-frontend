"use client";
import React from "react";
import { motion } from "framer-motion";

interface TypingIndicatorProps {
  size?: number;
  color?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  size = 6,
  color = "#a1a7b3",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 5 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="flex items-center justify-start mb-1"
    >
      <div className="flex items-center gap-1 px-2 rounded-full">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -3, 0], scale: [1, 1.2, 1] }}
            transition={{
              repeat: Infinity,
              duration: 0.6,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
            className="rounded-full"
            style={{ width: size, height: size, backgroundColor: color }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
