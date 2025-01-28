import { Skeleton } from "@/components/ui/skeleton"; // Assuming you're using shadcn/ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const ProductTableSkeleton = ({ length = 3 }: { length?: number }) => {
  return (
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
        {Array.from({ length: length }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Skeleton className="h-[44px] w-[44px] rounded-md" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-[80px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-[60px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-[100px]" />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Skeleton className="h-4 w-[120px]" />
            </TableCell>
            <TableCell>
              <div className="grid grid-cols-2 gap-2 max-w-44">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
