import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="py-8">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
