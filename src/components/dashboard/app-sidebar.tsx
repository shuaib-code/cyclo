import {
  BarChart,
  Bike,
  ClipboardList,
  Eye,
  Frame,
  LineChart,
  ListOrdered,
  Map,
  Package,
  Pencil,
  PieChart,
  PlusCircle,
  Settings,
  UserCog,
  Users,
} from "lucide-react";
import * as React from "react";

import { NavCustomer } from "@/components/card/nav-projects";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData, Role } from "@/redux/features/auth/types";
import { useAppSelector } from "@/redux/hook";
import { DashboardLogo } from "./dashboard-logo";
import { NavAdmin } from "./nav-main";
import { NavUser } from "./nav-user";

// const data = {

//   teams: [
//     {
//       name: "Acme Inc",
//       logo: GalleryVerticalEnd,
//       plan: "Enterprise",
//     },
//   ],
//   Admin: [
//     {
//       title: "Playground",
//       url: "#",
//       icon: SquareTerminal,
//       isActive: true,
//       items: [
//         {
//           title: "History",
//           url: "#",
//         },
//         {
//           title: "Starred",
//           url: "#",
//         },
//         {
//           title: "Settings",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Models",
//       url: "#",
//       icon: Bot,
//       items: [
//         {
//           title: "Genesis",
//           url: "#",
//         },
//         {
//           title: "Explorer",
//           url: "#",
//         },
//         {
//           title: "Quantum",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Documentation",
//       url: "#",
//       icon: BookOpen,
//       items: [
//         {
//           title: "Introduction",
//           url: "#",
//         },
//         {
//           title: "Get Started",
//           url: "#",
//         },
//         {
//           title: "Tutorials",
//           url: "#",
//         },
//         {
//           title: "Changelog",
//           url: "#",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "#",
//       icon: Settings2,
//       items: [
//         {
//           title: "General",
//           url: "#",
//         },
//         {
//           title: "Team",
//           url: "#",
//         },
//         {
//           title: "Billing",
//           url: "#",
//         },
//         {
//           title: "Limits",
//           url: "#",
//         },
//       ],
//     },
//   ],

// };
const User = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};
const Customer = [
  {
    name: "Design Engineering",
    url: "#",
    icon: Frame,
  },
  {
    name: "Sales & Marketing",
    url: "#",
    icon: PieChart,
  },
  {
    name: "Travel",
    url: "#",
    icon: Map,
  },
];

const AdminRoute = [
  {
    title: "User Management",
    url: "#",
    icon: Users,
    items: [
      {
        title: "Manage Users",
        url: "/dashboard/admin/users",
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
        url: "/dashboard/admin/bicycles",
        icon: ListOrdered,
      },
      {
        title: "Add New Bicycle",
        url: "/dashboard/admin/bicycles/new",
        icon: PlusCircle,
      },
      {
        title: "Edit Bicycle",
        url: "/dashboard/admin/bicycles/edit/:id",
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
        url: "/dashboard/admin/orders",
        icon: ClipboardList,
      },
      {
        title: "View Order Details",
        url: "/dashboard/admin/orders/:id",
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
        url: "/dashboard/admin/sales",
        icon: LineChart,
      },
      {
        title: "Settings",
        url: "/dashboard/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(useCurrentUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        {(user as ITokenData).role == Role.admin && (
          // <NavAdmin items={data.Admin} />
          <NavAdmin items={AdminRoute} />
        )}
        {(user as ITokenData).role == Role.customer && (
          <NavCustomer projects={Customer} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={User} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
