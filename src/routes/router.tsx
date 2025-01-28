import App from "@/App";
import About from "@/pages/About";
import AllProducts from "@/pages/AllProducts";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import ProviderWarpper from "@/provider/ProviderWarpper";
import { Route, Routes } from "react-router";
import RenderProtectedRoute from "./RenderProtectedRoute";
type TRenderRoute = { routes: { path: string; element: JSX.Element }[] };
type TRoute = { path: string; element: JSX.Element };

const routes: TRoute[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "*", element: <NotFound /> },
];

export default function AppRoutes() {
  return (
    <ProviderWarpper>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<AllProducts />} />
          <Route index element={<Home />} />
        </Route>
        {RenderProtectedRoute()}
        {RenderRoute({ routes })}
      </Routes>
    </ProviderWarpper>
  );
}

const RenderRoute = ({ routes }: TRenderRoute) =>
  routes.map(({ path, element }) => (
    <Route key={path} path={path} element={element} />
  ));
