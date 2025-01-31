import OrderTableAdmin from "@/components/tables/order/manage-order-admin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ManageOrder() {
  return (
    <div className="flex h-full w-full flex-col">
      <main className="grid flex-1 items-start p-2 md:px-6">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Manage order</CardTitle>
            <CardDescription>So far user ordered</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTableAdmin />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
