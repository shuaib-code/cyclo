import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col h-full w-full">
      <div className="w-full max-h-52 rounded-lg overflow-hidden">
        <Skeleton className="h-72 w-full" />
      </div>
      <CardContent className="flex-grow p-4 space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="flex items-center gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-4" />
          ))}
          <Skeleton className="h-4 w-8" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-4 grid grid-cols-5 gap-4">
        <Skeleton className="col-span-2 h-10" />
        <Skeleton className="col-span-3 h-10" />
      </CardFooter>
    </Card>
  );
}
