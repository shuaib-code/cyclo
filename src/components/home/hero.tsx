import { ArrowDownRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero1 = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid items-center gap-8 lg:grid-cols-2  px-4 lg:px-0">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              <span className="bg-gradient-to-r from-black dark:from-white to-[#0061ff] dark:to-[#0061ff]  text-transparent bg-clip-text">
                New Arrival
              </span>
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Discover the Perfect Ride with{"  "}
              <span className="bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
                Cyclo
              </span>
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Explore our latest collection of high-performance bicycles
              designed for speed, comfort, and adventure. Ride with confidence
              and style!
            </p>
            <div className="flex w-full max-w-80 flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Shop Now</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Explore Collection
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <HeroImage />
        </div>
      </div>
    </section>
  );
};

export default Hero1;

export function HeroImage() {
  return (
    <div className="relative w-full max-h-60 md:max-h-96 overflow-hidden rounded-md shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5),inset_-4px_-4px_10px_rgba(0,0,0,0.5)]">
      <img
        src="https://media.trekbikes.com/image/upload/w_1920,h_1440,c_pad,f_auto,fl_progressive:semi,q_auto/4x3_RoadBuydersguide_08"
        alt="Cycling Adventure"
        className="w-full max-h-96 object-cover transform transition-transform duration-500 ease-in-out rotate-2 hover:rotate-0 scale-110 hover:scale-100"
      />
    </div>
  );
}
