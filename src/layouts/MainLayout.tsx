import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full">
      <Navbar />
      <div className="py-8 mb-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
