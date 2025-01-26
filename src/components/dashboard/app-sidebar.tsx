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
import { AdminNavigation } from "@/routes/AdminRoute";
import { CustomerNavigation } from "@/routes/CustomerRoute";
import { DashboardLogo } from "./dashboard-logo";
import { NavAdmin } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useAppSelector(useCurrentUser);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <DashboardLogo />
      </SidebarHeader>
      <SidebarContent>
        {(user as ITokenData).role == Role.admin && (
          <NavAdmin items={AdminNavigation} />
        )}
        {(user as ITokenData).role == Role.admin && (
          <NavCustomer projects={CustomerNavigation} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
