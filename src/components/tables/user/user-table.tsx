/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import UserAvater from "@/components/base/navbar/Avater";
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
  useBlockMutation,
  useGetUserQuery,
} from "@/redux/features/user/userApi";
import { Ban, Ellipsis } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function UserTableAdmin() {
  const [limit, setLimit] = useState(10);
  const [block, { isLoading: isLoadingBlock }] = useBlockMutation();

  const { data, error, isLoading, isFetching, refetch } = useGetUserQuery({
    page: 1,
    limit: limit,
    sortOrder: "asc",
  });
  const initialData = data?.data ?? null;

  const handleLoadMore = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const handleConfirm = async (id: string) => {
    const action = toast.loading(`Blocking...`);
    try {
      const res = await block(id).unwrap();
      console.log(res);
      if (!isLoadingBlock && res.success) {
        toast.success("User blocked successfully!");
      }
    } catch (e) {
      toast.error("Error blocking user!");
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
            <TableHead className="w-[64px]">User</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialData?.user.map((user: any) => (
            <TableRow key={user._id}>
              <TableCell>
                <UserAvater userName={user.name || "User"} />
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>

              <TableCell className="hidden md:table-cell">
                {user.email}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge
                  variant="outline"
                  className={`${
                    !user.isBlocked
                      ? "text-green-600 border-green-600"
                      : "text-red-600 border-red-600"
                  }`}
                >
                  {user.isBlocked ? "Blocked" : "Allowed"}
                </Badge>
              </TableCell>
              <TableCell>
                <Button
                  disabled={isLoadingBlock || user.isBlocked}
                  variant="outline"
                  size="sm"
                  className="text-primary"
                  onClick={() => handleConfirm(user._id)}
                >
                  <Ban className=" h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Block</span>
                </Button>
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
