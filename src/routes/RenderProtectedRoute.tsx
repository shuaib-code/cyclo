import { WelcomeDashboard } from "@/components/card/welcome-dashboard";
import Dashboard from "@/pages/Dashboard";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useAppSelector } from "@/redux/hook";
import { Route } from "react-router";
import { AdminRoutes } from "./AdminRoute";
import { CustomerRoutes } from "./CustomerRoute";
import { ProtectedRoute, ProtectRouteByRole } from "./ProtectedRoute";

export default function RenderProtectedRoute() {
  const user = useAppSelector(useCurrentUser) as ITokenData | null;
  return (
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<WelcomeDashboard />} />
      {user &&
        [...AdminRoutes, ...CustomerRoutes].map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <ProtectRouteByRole role={user.role}>
                {route.element}
              </ProtectRouteByRole>
            }
          />
        ))}
    </Route>
  );
}
