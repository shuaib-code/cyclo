import HomeLayout from "@/layouts/HomeLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import ProviderWarpper from "@/provider/ProviderWarpper";
import { Route, Routes } from "react-router";
import RenderProtectedRoute from "./RenderProtectedRoute";

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
