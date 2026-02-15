import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

function LinkItemNav({ to, text, className = "" }) {
  const baseStyle = "px-4 py-2 rounded transition-colors duration-200";

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseStyle} ${
          isActive ? "bg-[#202020]" : "bg-[#545454] hover:bg-[#beb8b8]"
        } ${className}`
      }
    >
      {text}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-[#7d7d7d] text-white py-4 px-6 flex gap-4 items-center">
      <NavLink to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </NavLink>

      <LinkItemNav to="/blog" text="Blog" />
      <LinkItemNav to="/portfolio" text="Portfólio" />
      <LinkItemNav to="/profile" text="Perfil" className="ml-auto" />
    </nav>
  );
}
