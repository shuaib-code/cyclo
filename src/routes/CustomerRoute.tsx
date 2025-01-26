import ChangePassword from "@/pages/ChangePassword";
import Orders from "@/pages/customer/Orders";
import Wishlist from "@/pages/customer/Wishlist";
import ProfileSettings from "@/pages/ProfileSetting";
import { Heart, Key, Package, User } from "lucide-react";

export const CustomerNavigation = [
  {
    name: "My Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    name: "Profile Settings",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    name: "Change Password",
    url: "/dashboard/change-password",
    icon: Key,
  },
  {
    name: "Wishlist",
    url: "/dashboard/wishlist",
    icon: Heart,
  },
];

export const CustomerRoutes = [
  { path: "orders", element: <Orders /> },
  { path: "profile", element: <ProfileSettings /> },
  { path: "change-password", element: <ChangePassword /> },
  { path: "wishlist", element: <Wishlist /> },
];
