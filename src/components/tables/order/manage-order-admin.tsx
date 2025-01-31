/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  useGetOrdersQuery,
  useStatusMutation,
} from "@/redux/features/order/orderApi";
import { CheckIcon, Ellipsis, TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function OrderTableAdmin() {
  const [limit, setLimit] = useState(10);
  const [status, { isLoading: isLoadingStatus }] = useStatusMutation();

  const { data, error, isLoading, isFetching, refetch } = useGetOrdersQuery({
    page: 1,
    limit: limit,
    sortOrder: "asc",
  });
  const initialData = data?.data ?? null;

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const handleCancel = async (id: string) => {
    const action = toast.loading(`Cancelling...`);
    try {
      const res = await status({ id, status: "canceled" }).unwrap();
      console.log(res);
      if (!isLoadingStatus && res.success) {
        toast.success("Order cancelled successfully!");
      }
    } catch (e) {
      toast.error("Error cancelling order!");
      return null;
    } finally {
      toast.dismiss(action);
      refetch();
    }
  };
  const handleConfirm = async (id: string) => {
    const action = toast.loading(`Confirming...`);
    try {
      const res = await status({ id, status: "paid" }).unwrap();

      if (!isLoadingStatus && res.success) {
        toast.success("Order confirmed successfully!");
      }
    } catch (e) {
      toast.error("Error confirming order!");
      return null;
    } finally {
      toast.dismiss(action);
      refetch();
    }
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
            <TableHead>Status</TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Action</TableHead>
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
              <TableCell>
                <div className="grid grid-cols-2 gap-2 max-w-44">
                  <Button
                    disabled={isLoadingStatus || product.status == "paid"}
                    variant="outline"
                    size="sm"
                    className="text-primary"
                    onClick={() => handleConfirm(product._id)}
                  >
                    <CheckIcon className=" h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Confirm</span>
                  </Button>
                  <Button
                    disabled={isLoadingStatus || product.status == "canceled"}
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                    onClick={() => handleCancel(product._id)}
                  >
                    <TrashIcon className=" h-4 w-4" />
                    <span className="sr-only sm:not-sr-only">Cancel</span>
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
