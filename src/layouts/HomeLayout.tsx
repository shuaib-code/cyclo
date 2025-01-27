import Footer from "@/components/base/footer/Footer";
import NavBar from "@/components/base/navbar/Navbar";
import FeturedProduct from "@/components/home/Fetured";
import HeroSection from "@/components/home/hero";
import Testimonial from "@/components/home/Testimonial";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function HomeLayout() {
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <ScrollProgress className="top-[0px]" />
      <HeroSection />
      <FeturedProduct />
      <Testimonial />
      <Footer />
    </div>
  );
}
