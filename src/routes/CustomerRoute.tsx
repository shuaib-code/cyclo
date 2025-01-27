import ChangePassword from "@/pages/ChangePassword";
import Orders from "@/pages/customer/Orders";
import Wishlist from "@/pages/customer/Wishlist";
import ProfileSettings from "@/pages/ProfileSetting";
import { Heart, Key, Package, User } from "lucide-react";

export const CustomerNavigation = [
  {
    name: "My Orders",
    url: "/dashboard/manage-orders",
    icon: Package,
  },
  {
    name: "Profile Settings",
    url: "/dashboard/user-profile",
    icon: User,
  },
  {
    name: "Change Password",
    url: "/dashboard/change-user-password",
    icon: Key,
  },
  {
    name: "Wishlist",
    url: "/dashboard/wishlist",
    icon: Heart,
  },
];

export const CustomerRoutes = [
  { path: "manage-orders", element: <Orders /> },
  { path: "user-profile", element: <ProfileSettings /> },
  { path: "change-user-password", element: <ChangePassword /> },
  { path: "wishlist", element: <Wishlist /> },
];
