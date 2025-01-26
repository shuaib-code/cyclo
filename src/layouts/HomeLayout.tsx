import Footer from "@/components/base/footer/Footer";
import NavBar from "@/components/base/navbar/Navbar";
import FeturedProduct from "@/components/home/Fetured";
import HeroSection from "@/components/home/hero";
import Testimonial from "@/components/home/Testimonial";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <HeroSection />
      <FeturedProduct />
      <Testimonial />
      <main className=" min-h-screen container mx-auto px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
