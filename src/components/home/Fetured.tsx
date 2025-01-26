"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "../card/product-card";
import { ProductSkeleton } from "../skeletion/product-skeleton";
import { Button } from "../ui/button";

const del = {
  image:
    "https://media.trekbikes.com/image/upload/w_1920,h_1440,c_pad,f_auto,fl_progressive:semi,q_auto/4x3_RoadBuydersguide_04",
  title: "Fuel EXe 8 GX AXS",
  rating: 4.5,
  description:
    "The Fuel EXe 8 is a trail-ready aluminium electric mountain bike that quietly assists you on the climbs so you've got all the power you need on descents",
  price: 28.99,
  inStock: true,
};

const products = [
  { ...del },
  { ...del },
  { ...del },
  { ...del, inStock: false },
  { ...del },
  { ...del },
];

export default function FeturedProduct() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="container mx-auto p-4 py-16">
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="scroll-m-20 border-b pb-2 text-4xl font-semibold tracking-tight transition-colors first:mt-0">
          Fetured Bicycle
        </h2>
        <p className="mt-1 text-muted-foreground lg:text-xl">
          Whatever your choose, our offers evolve according to your needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((product, i) => <ProductCard key={i} {...product} />)}
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center mt-8">
        <Button variant="outline" className="px-10 py-2">
          View more
        </Button>
      </div>
    </section>
  );
}
