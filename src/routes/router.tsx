import HomeLayout from "@/layouts/HomeLayout";
import About from "@/pages/About";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { ThemeProvider } from "@/provider/themeProvider";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";
import { AdminRoutes } from "./AdminRoute";
import { CustomerRoutes } from "./CustomerRoute";

function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomeLayout />} />

        <Route path="/dashboard" element={<Dashboard />}>
          {AdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {CustomerRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
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
