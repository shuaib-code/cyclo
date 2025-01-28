import {
  logout,
  useCurrentToken,
  useCurrentUser,
  useIsTokenExpired,
} from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isExpired = useAppSelector(useIsTokenExpired);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const route = pathname.split("/")[1]?.replace(/^./, (c) => c.toUpperCase());
  const token = useAppSelector(useCurrentToken);

  useEffect(() => {
    if (isExpired) {
      console.log("effect", token);
      dispatch(logout());
      toast.warning("Session expired. Please log in again.");
    }
  }, [isExpired, dispatch]);

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
  role: string;
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
