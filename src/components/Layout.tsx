import { Outlet } from "react-router-dom";
import PageTransition from "./PageTransition";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      <main className="pt-20">
        <div
          className="
            w-full
            max-w-[1920px]
            mx-auto
            px-4
            sm:px-6
            md:px-8
            lg:px-12
            xl:px-16
          "
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </main>

      <Footer />
    </div>
  );
}
