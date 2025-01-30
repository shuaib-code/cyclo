import HeroSection from "@/components/home/hero";
import Testimonial from "@/components/home/Testimonial";
import { Skeleton } from "@/components/ui/skeleton";
import { lazy, Suspense } from "react";

const FeturedProduct = lazy(() =>
  import("@/components/home/Fetured").then((module) => ({
    default: module.default,
  }))
);

export default function HomeLayout() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <FeturedProduct />
      </Suspense>
      <Testimonial />
    </>
  );
}
