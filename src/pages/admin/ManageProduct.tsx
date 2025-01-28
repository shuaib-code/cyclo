import ProductTable from "@/components/tables/product/manage-product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ManageProduct() {
  return (
    <div className="flex h-full w-full flex-col">
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Manage Products</CardTitle>
            <CardDescription>
              Manage your products and edit your product data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
