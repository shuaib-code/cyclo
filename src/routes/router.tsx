import HomeLayout from "@/layouts/HomeLayout";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import { ThemeProvider } from "@/provider/themeProvider";
import { Route, Routes } from "react-router";
import { Toaster } from "sonner";

function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<HomeLayout />} />

        <Route path="/dashboard" element={<Dashboard />} />
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
