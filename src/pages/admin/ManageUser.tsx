import UserTableAdmin from "@/components/tables/user/user-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ManageUser() {
  return (
    <div className="flex h-full w-full flex-col">
      <main className="grid flex-1 items-start p-2 md:px-6">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader>
            <CardTitle>Manage User</CardTitle>
            <CardDescription>So far user have created account</CardDescription>
          </CardHeader>
          <CardContent>
            <UserTableAdmin />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
