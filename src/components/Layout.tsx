import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "./MatrixRain";

/* ================================================================
   LAYOUT
   — MatrixRain fixed behind everything
   — Navbar always on top (z-50)
   — Page transitions via AnimatePresence
   — Footer always at bottom
================================================================ */
export default function Layout() {
  const location = useLocation();

  return (
    <div
      className="relative min-h-screen text-white flex flex-col overflow-x-hidden"
      style={{
        background: "#020509",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      {/* Matrix Rain — fixed, behind everything */}
      <MatrixRain />

      {/* Global atmospheric glows — match Home.tsx */}
      <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 18% 0%, rgba(0,255,231,0.04) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 82% 55%, rgba(59,130,246,0.04) 0%, transparent 50%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.03) 0%, transparent 50%)" }} />
        {/* Edge vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)" }} />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}