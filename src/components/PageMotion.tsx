import { motion, type Variants } from "framer-motion";
import React from "react";

/* ================================================================
   PAGE MOTION — stagger wrapper for page sections
================================================================ */

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function PageMotion({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="px-6 sm:px-10 py-16 max-w-7xl mx-auto text-white"
      style={{ fontFamily: "'Rajdhani', sans-serif" }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={item}>
              {child}
            </motion.div>
          ))
        : (
          <motion.div variants={item}>
            {children}
          </motion.div>
        )}
    </motion.div>
  );
}