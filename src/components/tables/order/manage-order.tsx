/* eslint-disable @typescript-eslint/no-explicit-any */

import placeholder from "@/assets/placeholder.svg";
import handleImageError from "@/components/error/ImageError";
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
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export default function OrderTable() {
  const [limit, setLimit] = useState(10);
  const { data, error, isLoading, isFetching } = useGetOrdersQuery({
    page: 1,
    limit: limit,
    sortOrder: "asc",
  });
  const initialData = data?.data ?? null;

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  if (isLoading || isFetching) return <ProductTableSkeleton length={limit} />;
  if (error) return <ProductTableError error={error} />;

  console.log(initialData);
  const { page = 1, totalPage = 1 } = initialData.meta;
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[64px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData?.history.map((product: any) => (
            <TableRow key={product._id}>
              <TableCell>
                <img
                  alt={product.productId.name}
                  className="aspect-square rounded-md object-cover"
                  height="44"
                  src={product.productId.images[0] || placeholder}
                  width="44"
                  onError={handleImageError}
                />
              </TableCell>
              <TableCell className="font-medium">
                {product.productId.name}
              </TableCell>

              <TableCell className="hidden sm:table-cell">
                <Badge
                  variant="outline"
                  className={`${
                    product.status === "pending"
                      ? "text-yellow-500 border-yellow-500"
                      : product.status === "paid"
                      ? "text-green-600 border-green-600"
                      : product.status === "failed"
                      ? "text-red-600 border-red-600"
                      : product.status === "cancelled"
                      ? "text-gray-500 border-gray-500"
                      : ""
                  }`}
                >
                  {product.status.charAt(0).toUpperCase() +
                    product.status.slice(1)}
                </Badge>
              </TableCell>

              <TableCell>
                ${(product.price * product.quantity).toFixed(2)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.quantity}
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
