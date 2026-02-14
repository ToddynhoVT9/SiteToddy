import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const baseStyle = "px-4 py-2 rounded transition-colors duration-200";

  return (
    <nav className="bg-[#7d7d7d] text-white py-4 px-6 flex gap-4 items-center">
      <NavLink to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
      </NavLink>

      <NavLink
        to="/blog"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive ? "bg-[#202020]" : "bg-[#545454] hover:bg-[#beb8b8]"
          }`
        }
      >
        Blog
      </NavLink>

      <NavLink
        to="/portfolio"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive ? "bg-[#202020]" : "bg-[#545454] hover:bg-[#beb8b8]"
          }`
        }
      >
        portfólio
      </NavLink>

      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `${baseStyle} ${
            isActive ? "bg-[#202020]" : "bg-[#545454] hover:bg-[#beb8b8]"
          } ml-auto`
        }
      >
        Perfil
      </NavLink>
    </nav>
  );
}
