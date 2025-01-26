import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <Card className="h-full">
      <Skeleton className="w-full h-72 rounded-lg mb-2" />
      <CardContent className="w-full">
        <div className="space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
            <Skeleton className="h-3 w-12 ml-2" />
          </div>
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>
      </CardContent>
      <div className="px-4 pb-4 flex gap-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </Card>
  );
}

{
  /* <CardFooter className="p-4 flex gap-4">
  <Skeleton className="h-10 w-full" />
</CardFooter> */
}
