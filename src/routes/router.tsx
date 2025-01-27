import HomeLayout from "@/layouts/HomeLayout";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { ThemeProvider } from "@/provider/themeProvider";
import { Role } from "@/redux/features/auth/types";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { AdminRoutes } from "./AdminRoute";
import { CustomerRoutes } from "./CustomerRoute";
import { ProtectedRoute, ProtectRouteByRole } from "./ProtectedRoute";

function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomeLayout />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {AdminRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectRouteByRole role={Role.admin}>
                  {route.element}
                </ProtectRouteByRole>
              }
            />
          ))}
          {CustomerRoutes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <ProtectRouteByRole role={Role.customer}>
                  {route.element}
                </ProtectRouteByRole>
              }
            />
          ))}
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors expand={false} position="top-right" />
    </ThemeProvider>
  );
}

export default AppRoutes;
