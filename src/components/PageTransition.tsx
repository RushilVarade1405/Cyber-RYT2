import { motion } from "framer-motion";
import React from "react";

/* ================================================================
   CYBER PAGE TRANSITION
   — A fast, clean fade+slide that respects the cyberpunk aesthetic
   — Adds a brief horizontal scan-wipe on enter for extra edge
================================================================ */

const variants = {
  initial: {
    opacity: 0,
    y: 16,
    filter: "brightness(0.4) blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "brightness(1) blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "brightness(0.3) blur(3px)",
  },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.38,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      style={{ willChange: "opacity, transform, filter" }}
    >
      {/* Scan-line wipe effect on entry */}
      <motion.div
        initial={{ scaleX: 1, opacity: 0.6 }}
        animate={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 z-[60] pointer-events-none origin-left"
        style={{
          background: "linear-gradient(90deg, rgba(0,255,231,0.06) 0%, rgba(0,255,231,0.12) 50%, rgba(0,255,231,0.06) 100%)",
          backdropFilter: "brightness(1.05)",
        }}
      />

      {children}
    </motion.div>
  );
}