/* eslint-disable @typescript-eslint/no-explicit-any */

import { ProductTableError } from "@/components/error/product-error";
import { ProductTableSkeleton } from "@/components/skeletion/product-table-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetProductsQuery } from "@/redux/features/product/productApi";
import { formatDistanceToNow } from "date-fns";
import { Ellipsis, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function ProductTable() {
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading, isFetching } = useGetProductsQuery({
    page: 1,
    limit: limit,
    sortBy: "name",
    sortOrder: "asc",
  });
  const initialData = data?.data ?? null;

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  if (isLoading || isFetching) return <ProductTableSkeleton length={limit} />;
  if (error) return <ProductTableError error={error} />;
  const { page = 1, totalPage = 1 } = initialData.meta;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Brand</TableHead>
            <TableHead className="hidden md:table-cell">Stock</TableHead>
            <TableHead>Price</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData?.data.map((product: any) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  alt={product.name}
                  className="aspect-square rounded-md object-cover"
                  height="44"
                  src={product.images[0] || "./src/assets/crank1.png"}
                  width="44"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {product.brand}
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                <div className="flex items-center">
                  {/* Badge for medium and larger screens */}
                  <Badge
                    variant="outline"
                    className={`${
                      product.stock > 10
                        ? "text-green-600 border-green-600"
                        : product.stock > 0
                        ? "text-yellow-600 border-yellow-600"
                        : "text-red-600 border-red-600"
                    } hidden md:inline`} // Hide on mobile, show on medium and larger screens
                  >
                    <span>
                      {product.stock > 10
                        ? "In Stock"
                        : product.stock > 0
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>
                    <span className="ml-1">{product.stock}</span>
                  </Badge>

                  {/* Circle for mobile */}
                  <div
                    className={`${
                      product.stock > 10
                        ? "text-green-600 border-green-600"
                        : product.stock > 0
                        ? "text-yellow-600 border-yellow-600"
                        : "text-red-600 border-red-600"
                    } md:hidden w-2.5 h-2.5 rounded-full`}
                  />
                </div>
              </TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {product.category}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDistanceToNow(new Date(product.createdAt), {
                  addSuffix: false,
                })}
              </TableCell>
              <TableCell>
                <div className="grid grid-cols-2 gap-2 max-w-44">
                  <Button variant="outline" size="sm" className="text-primary">
                    <PencilIcon className=" h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                  >
                    <TrashIcon className=" h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Delete</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {page < totalPage && (
        <div className="flex justify-center pt-6 pb-2">
          <Button onClick={handleLoadMore} disabled={isFetching}>
            <Ellipsis /> {isFetching ? "Loading more..." : "Show More"}
          </Button>
        </div>
      )}
    </>
  );
}
