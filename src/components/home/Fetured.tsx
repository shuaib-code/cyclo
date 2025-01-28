import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/redux/features/product/types";
import { nanoid } from "@reduxjs/toolkit";
import { Link } from "react-router";
import { ProductCard } from "../card/product-card";
import { ProductCardSkeleton } from "../skeletion/product-card-skeleton";
import { Button } from "../ui/button";

export default function FeturedProduct() {
  const { data, isLoading } = useGetProductsQuery({
    page: 1,
    limit: 6,
    sortBy: "_id",
    sortOrder: "asc",
  });
  const initialData = data?.data ?? null;

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
        {!isLoading
          ? initialData?.data.map((product: TProduct, idx: number) => (
              <ProductCard key={`${nanoid()}-${idx}`} product={product} />
            ))
          : Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
      </div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center mt-8">
        <Link to="/products">
          <Button variant="outline" size={"lg"} className="px-10 py-2">
            View more
          </Button>
        </Link>
      </div>
    </section>
  );
}
