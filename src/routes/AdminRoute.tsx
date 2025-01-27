import AddProduct from "@/pages/admin/AddProduct";
import Analytics from "@/pages/admin/Analytics";
import EditProduct from "@/pages/admin/EditProduct";
import ManageOrder from "@/pages/admin/ManageOrder";
import ManageProduct from "@/pages/admin/ManageProduct";
import ManageUser from "@/pages/admin/ManageUser";
import OrderDetails from "@/pages/admin/OrderDetails";
import ProfileSettings from "@/pages/ProfileSetting";
import {
  BarChart,
  Bike,
  ClipboardList,
  Eye,
  LineChart,
  ListOrdered,
  Package,
  Pencil,
  PlusCircle,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

export const AdminRoutes = [
  { path: "users", element: <ManageUser /> },
  { path: "products", element: <ManageProduct /> },
  { path: "products/new", element: <AddProduct /> },
  { path: "products/edit/:id", element: <EditProduct /> },
  { path: "orders", element: <ManageOrder /> },
  { path: "orders/:id", element: <OrderDetails /> },
  { path: "sales", element: <Analytics /> },
  { path: "admin-profile", element: <ProfileSettings /> },
];

export const AdminNavigation = [
  {
    title: "User Management",
    url: "#",
    icon: Users,
    items: [
      {
        title: "Manage Users",
        url: "/dashboard/users",
        icon: UserCog,
      },
    ],
  },
  {
    title: "Product Management",
    url: "#",
    icon: Bike,
    items: [
      {
        title: "Manage Bicycles",
        url: "/dashboard/products",
        icon: ListOrdered,
      },
      {
        title: "Add New Bicycle",
        url: "/dashboard/products/new",
        icon: PlusCircle,
      },
      {
        title: "Edit Bicycle",
        url: "/dashboard/products/edit/:id",
        icon: Pencil,
      },
    ],
  },
  {
    title: "Order Management",
    url: "#",
    icon: Package,
    items: [
      {
        title: "Manage Orders",
        url: "/dashboard/orders",
        icon: ClipboardList,
      },
      {
        title: "View Order Details",
        url: "/dashboard/orders/:id",
        icon: Eye,
      },
    ],
  },
  {
    title: "Analytics & Settings",
    url: "#",
    icon: BarChart,
    items: [
      {
        title: "Sales Analytics",
        url: "/dashboard/sales",
        icon: LineChart,
      },
      {
        title: "Settings",
        url: "/dashboard/admin-profile",
        icon: Settings,
      },
    ],
  },
];
