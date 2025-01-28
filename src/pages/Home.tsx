import FeturedProduct from "@/components/home/Fetured";
import HeroSection from "@/components/home/hero";
import Testimonial from "@/components/home/Testimonial";

export default function HomeLayout() {
  return (
    <>
      <HeroSection />
      <FeturedProduct />
      <Testimonial />
    </>
  );
}
