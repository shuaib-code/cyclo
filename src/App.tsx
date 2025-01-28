import "./App.css";

import Footer from "@/components/base/footer/Footer";
import NavBar from "@/components/base/navbar/Navbar";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Outlet } from "react-router";

export default function App() {
  return (
    <main>
      <NavBar />
      <ScrollProgress className="top-[0px]" />
      <Outlet />
      <Footer />
    </main>
  );
}
