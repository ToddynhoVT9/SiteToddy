import { NavLink } from "react-router-dom";
import { useAuth } from "../lib/auth/authContext";

function Section({ title, children }) {
  return (
    <section className="grid gap-2">
      <p className="text-xs font-semibold tracking-wider text-[#7d7d7d]">
        {title}
      </p>
      <div className="grid gap-2">{children}</div>
    </section>
  );
}

function SideNavItem({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-xl px-4 py-3 text-sm font-semibold transition
         ${
           isActive
             ? "bg-[#202020] text-white"
             : "bg-[#121212] text-[#beb8b8] hover:bg-[#3d3d3d] hover:text-white"
         }`
      }
    >
      {label}
    </NavLink>
  );
}

function LogoutItem({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-xl px-4 py-3 text-sm font-semibold text-left transition
                 bg-[#121212] text-[#beb8b8] hover:bg-[#3d3d3d] hover:text-white w-full"
    >
      Sair
    </button>
  );
}

export default function Sidebar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="grid gap-6 rounded-2xl bg-[#121212] p-4 text-white">
      <div className="flex items-center gap-3">
        <div className="leading-tight">
          <p className="font-semibold">Menus:</p>
        </div>
      </div>

      <hr className="my-0 border-t-2 border-[#3d3d3d]" />

      <Section title="NAVEGAÇÃO">
        <SideNavItem to="/" label="Início" />
        <SideNavItem to="/blog" label="Blog" />
        <SideNavItem to="/portfolio" label="Portfólio" />
      </Section>

      <hr className="my-0 border-t-2 border-[#3d3d3d]" />

      <Section title="CONTA">
        {isAuthenticated ? (
          <>
            <SideNavItem to="/profile" label="Meu perfil" />
            <LogoutItem onClick={logout} />
          </>
        ) : (
          <>
            <SideNavItem to="/login" label="Entrar" />
            <SideNavItem to="/signup" label="Criar conta" />
          </>
        )}
      </Section>
    </div>
  );
}
