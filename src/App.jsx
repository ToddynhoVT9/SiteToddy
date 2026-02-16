import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/home";
import Blog from "./pages/blog";
import Profile from "./pages/profile";
import Portfolio from "./pages/portfolio";
import Signup from "./pages/signup";
import PortfolioCategory from "./pages/portfolioCategory";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="blog" element={<Blog />} />
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
