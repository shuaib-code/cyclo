import Icon from "@/assets/crank1.png";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router";

export function DashboardLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
            <Link to="/">
              <img
                src={Icon}
                alt="Cycling Logo"
                className="rounded-lg rotate-180"
              />
            </Link>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <Link to="/">
              <span className="truncate font-semibold pb-1 text-2xl bg-gradient-to-r from-[#0061ff] to-[#60efff] text-transparent bg-clip-text">
                Cyclo
              </span>
            </Link>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
