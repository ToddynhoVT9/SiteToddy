import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Blog from "./pages/blog";
import Portfolio from "./pages/portfolio";
import Signup from "./pages/singUp";

export default function App() {
  return (
    <div className="min-h-screen bg-[#202020] flex flex-col">
      {/* Navbar fixa no topo estruturalmente */}
      <Navbar />

      {/* Área abaixo da navbar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden lg:block w-72 bg-[#121212]">
          <div className="h-full p-4">
            <Sidebar />
          </div>
        </aside>

        {/* Conteúdo */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-7xl px-6 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
