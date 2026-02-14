import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Text from "./components/Text";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Blog from "./pages/Blog";
import Portfolio from "./pages/portfolio";
import Signup from "./pages/singUp";

export default function App() {
  return (
    <div className="min-h-screen bg-[#202020]">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
