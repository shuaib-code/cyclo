/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "../ui/button";

export const ProductTableError = ({ error }: { error?: any }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="text-destructive text-lg font-semibold">
        Something went wrong!
      </div>
      <div className="text-sm text-muted-foreground">
        {error?.message || "Failed to fetch products."}
      </div>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Retry
      </Button>
    </div>
  );
};
