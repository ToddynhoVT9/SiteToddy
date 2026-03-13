import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAuth } from "../lib/auth/authContext";
import UserAvatar from "./account/UserAvatar";

function LinkItemNav({ to, text, className = "" }) {
  const baseStyle = "px-4 py-2 rounded transition-colors duration-200";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseStyle} ${
          isActive ? "bg-[#202020]" : "bg-[#121212] hover:bg-[#3d3d3d]"
        } ${className}`
      }
    >
      {text}
    </NavLink>
  );
}

// "   [#121212]   [#202020]   [#545454]   [#3d3d3d]   [#7d7d7d]   [#beb8b8]   "
export default function Navbar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="bg-[#121212] text-white py-4 px-6 flex gap-4 items-center">
      <NavLink to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </NavLink>

      <LinkItemNav to="/blog" text="Blog" />
      <LinkItemNav to="/portfolio" text="Portfólio" />

      {isAuthenticated ? (
        <NavLink
          to="/profile"
          className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded
                     hover:bg-[#3d3d3d] transition-colors duration-200"
          title="Meu perfil"
        >
          <UserAvatar avatarUrl={user?.avatarUrl} name={user?.name} size="sm" />
          <span className="hidden sm:block text-sm text-[#beb8b8]">
            {user?.name}
          </span>
        </NavLink>
      ) : (
        <LinkItemNav to="/login" text="Entrar" className="ml-auto" />
      )}
    </nav>
  );
}
