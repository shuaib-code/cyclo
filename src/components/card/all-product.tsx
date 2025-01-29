import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyGetProductsQuery } from "@/redux/features/product/productApi";
import { TProduct } from "@/redux/features/product/types";
import { nanoid } from "@reduxjs/toolkit";
import { Smile } from "lucide-react";
import { useEffect, useState } from "react";
import { ErrorMessage } from "../error/ErrorMessage";
import { ProductCardSkeleton } from "../skeletion/product-card-skeleton";
import { ProductCard } from "./product-card";

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [total, setTotal] = useState(0);

  const [getProducts, { data, error, isLoading, isFetching }] =
    useLazyGetProductsQuery();

  const initialData = data?.data ?? null;

  // Update total pages when data changes (and when it's not loading)
  useEffect(() => {
    if (!isLoading && initialData?.meta) {
      setTotal(initialData.meta.totalPage);
    }
  }, [isLoading, initialData]); // Only run when isLoading or initialData changes

  // Trigger the product query on initial load (empty searchTerm)
  useEffect(() => {
    getProducts({
      searchTerm: "",
      page: 1,
      limit,
      sortBy,
      sortOrder,
    });
  }, [getProducts, page, limit, sortBy, sortOrder]); // Only trigger once on component mount

  if (isLoading || isFetching) return <ProductListSkeleton />;
  if (error)
    return <ErrorMessage message={data.message || "Something went worng"} />;

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to the first page on search
    getProducts({
      searchTerm,
      page: 1,
      limit,
      sortBy,
      sortOrder,
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= total) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="flex-grow"
        />
        <Button type="submit">Search</Button>
      </form>

      <div className="mb-4 flex gap-2">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {[
              { label: "Brand", value: "brand" },
              { label: "Category", value: "category" },
              { label: "Model", value: "model" },
              { label: "Name", value: "name" },
              { label: "Price", value: "price" },
              { label: "Rating", value: "rating" },
              { label: "Stock", value: "stock" },
              { label: "Latest", value: "updatedAt" },
            ].map(({ label, value }, index) => (
              <SelectItem key={index} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortOrder} onValueChange={setSortOrder}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={limit.toString()}
          onValueChange={(value) => setLimit(Number.parseInt(value))}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 per page</SelectItem>
            <SelectItem value="10">10 per page</SelectItem>
            <SelectItem value="20">20 per page</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        {!isLoading ? (
          initialData?.data.length === 0 ? (
            <NoDataFound searchTerm={searchTerm} />
          ) : (
            initialData?.data.map((product: TProduct, idx: number) => (
              <ProductCard key={`${nanoid()}-${idx}`} product={product} />
            ))
          )
        ) : (
          Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        {/* <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </Button>
        <span>
          Page {page} of {total}
        </span>
        <Button onClick={() => setPage(page + 1)} disabled={page >= total}>
          Next
        </Button> */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={page === 1 ? "#" : undefined}
                onClick={(e) => {
                  if (page > 1) {
                    handlePageChange(page - 1);
                  } else {
                    e.preventDefault();
                  }
                }}
                className={page === 1 ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>

            {/* Displaying page numbers */}
            {[...Array(total)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={page === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href={page >= total ? "#" : undefined}
                onClick={(e) => {
                  if (page < total) {
                    handlePageChange(page + 1);
                  } else {
                    e.preventDefault();
                  }
                }}
                className={page >= total ? "cursor-not-allowed opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

export function ProductListSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex gap-2">
        <Skeleton className="flex-grow h-10" />
        <Skeleton className="w-24 h-10" />
      </div>

      <div className="mb-4 flex gap-2">
        <Skeleton className="w-[180px] h-10" />
        <Skeleton className="w-[180px] h-10" />
        <Skeleton className="w-[180px] h-10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="w-24 h-10" />
        <Skeleton className="w-20 h-6" />
        <Skeleton className="w-24 h-10" />
      </div>
    </div>
  );
}

export function NoDataFound({
  searchTerm,
  onReset,
}: {
  searchTerm?: string;
  onReset?: () => void;
}) {
  return (
    <div className="w-full mx-auto col-span-3 py-12">
      <div className=" flex flex-col items-center justify-center gap-4 p-8">
        {/* Icon */}
        <Smile className="w-12 h-12 text-muted-foreground" />

        {/* Title and Description */}
        <Alert className="max-w-md text-center border-none">
          <AlertTitle className="text-xl font-semibold">
            No Data Found
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {searchTerm
              ? `No results found for "${searchTerm}". Try a different search term.`
              : "No data available. Please adjust your filters or try again later."}
          </AlertDescription>
        </Alert>

        {/* Reset Button (Optional) */}
        {onReset && (
          <Button variant="outline" onClick={onReset}>
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
