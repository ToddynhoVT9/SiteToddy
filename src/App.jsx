import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import BlogDashboard from "./pages/blog/BlogDashboard";
import BlogCategory from "./pages/blog/BlogCategory";
import BlogArticle from "./pages/blog/BlogArticle";
import Profile from "./pages/profile";
import Portfolio from "./pages/portfolio";
import Signup from "./pages/signup";
import PortfolioCategory from "./pages/portfolioCategory";

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

        <Route path="profile" element={<Profile />} />
        <Route path="signup" element={<Signup />} />

        <Route path="portfolio">
          <Route index element={<Portfolio />} />
          <Route path=":categoria" element={<PortfolioCategory />} />
        </Route>
      </Route>
    </Routes>
  );
}
