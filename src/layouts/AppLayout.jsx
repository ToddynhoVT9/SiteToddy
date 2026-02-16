import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-[#202020] flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        <aside className="hidden lg:block w-72 bg-[#121212]">
          <div className="h-full p-4">
            <Sidebar />
          </div>
        </aside>

        <main className="flex-1">
          <div className="w-full px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
