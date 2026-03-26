import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "./MatrixRain";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex flex-col overflow-x-hidden">

      {/* Matrix Rain — fixed behind everything */}
      <MatrixRain />

      {/* Navbar — always on top */}
      <Navbar />

      {/* Main content — grows to fill space, pushes footer down */}
      <main className="relative z-10 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>

      {/* Footer — always at bottom */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}