import { Outlet } from "react-router-dom";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MatrixRain from "./MatrixRain";

export default function Layout() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">

      {/* ===============================
          MATRIX RAIN — fixed behind everything
          zIndex: 0, pointerEvents: none (set inside MatrixRain)
      =============================== */}
      <MatrixRain />

      {/* ===============================
          NAVBAR — z-50 stays on top
      =============================== */}
      <Navbar />

      {/* ===============================
          MAIN CONTENT — z-10 above matrix
      =============================== */}
      <main className="relative z-10 pt-20">
        <PageTransition>
          <div className="page-container">
            <Outlet />
          </div>
        </PageTransition>
      </main>

      {/* ===============================
          FOOTER — z-10 above matrix
      =============================== */}
      <div className="relative z-10">
        <Footer />
      </div>

    </div>
  );
}