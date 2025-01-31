import OrderTable from "@/components/tables/order/manage-order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Orders() {
  return (
    <div className="flex h-full w-full flex-col">
      <main className="grid flex-1 items-start p-2 md:px-6">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Order history</CardTitle>
            <CardDescription>The product you orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTable />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
