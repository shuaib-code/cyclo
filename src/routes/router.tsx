import { WelcomeDashboard } from "@/components/card/welcome-dashboard";
import HomeLayout from "@/layouts/HomeLayout";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { ThemeProvider } from "@/provider/themeProvider";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { ITokenData } from "@/redux/features/auth/types";
import { useAppSelector } from "@/redux/hook";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { AdminRoutes } from "./AdminRoute";
import { CustomerRoutes } from "./CustomerRoute";
import { ProtectedRoute, ProtectRouteByRole } from "./ProtectedRoute";

function RenderProtectedRoute() {
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

export default function AppRoutes() {
  return (
    <ProviderWarpper>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        {RenderProtectedRoute()}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ProviderWarpper>
  );
}

function ProviderWarpper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {children}
      <Toaster richColors expand={false} position="top-right" />
    </ThemeProvider>
  );
}
