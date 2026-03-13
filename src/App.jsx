import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import BlogDashboard from "./pages/blog/BlogDashboard";
import BlogCategory from "./pages/blog/BlogCategory";
import BlogArticle from "./pages/blog/BlogArticle";
import Profile from "./pages/profile";
import Portfolio from "./pages/portfolio";
import Login from "./pages/login";
import Signup from "./pages/signup";
import PortfolioCategory from "./pages/portfolioCategory";
import { ProtectedRoute, PublicOnlyRoute } from "./lib/auth/guards";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />

        <Route path="blog">
          <Route index element={<BlogDashboard />} />
          <Route path=":categoria" element={<BlogCategory />} />
          <Route path=":categoria/:slug" element={<BlogArticle />} />
        </Route>

        {/* Rotas públicas: redireciona para /profile se já logado */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="login"  element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>

        {/* Rotas protegidas: redireciona para /login se não autenticado */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route path="portfolio">
          <Route index element={<Portfolio />} />
          <Route path=":categoria" element={<PortfolioCategory />} />
        </Route>
      </Route>
    </Routes>
  );
}
