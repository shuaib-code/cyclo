import {
  useCurrentToken,
  useCurrentUser,
} from "@/redux/features/auth/authSlice";
import { ITokenData, TRole } from "@/redux/features/auth/types";
import { useAppSelector } from "@/redux/hook";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const route = pathname.split("/")[1]?.replace(/^./, (c) => c.toUpperCase());
  const token = useAppSelector(useCurrentToken);
  if (!token) {
    setTimeout(() => {
      toast.warning(`Please, login to continue to ${route}`);
    });
  }
  return token ? children : <Navigate to="/login" />;
};

export const ProtectRouteByRole = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role: TRole;
}) => {
  const { pathname } = useLocation();
  const route = pathname.split("/")[1]?.replace(/^./, (c) => c.toUpperCase());
  const user = useAppSelector(useCurrentUser) as ITokenData;

  if (!user || user.role !== role) {
    toast.warning(`Only authorized users can access ${route} route`);
    return <Navigate to="/" />;
  }

  return children;
};
