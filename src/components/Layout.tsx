import { Outlet } from "react-router-dom";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ===============================
          NAVBAR
      =============================== */}
      <Navbar />

      {/* ===============================
          MAIN CONTENT
      =============================== */}
      <main className="pt-20">
        <PageTransition>
          {/* GLOBAL RESPONSIVE CONTAINER */}
          <div className="page-container">
            <Outlet />
          </div>
        </PageTransition>
      </main>

      {/* ===============================
          FOOTER
      =============================== */}
      <Footer />
    </div>
  );
}
