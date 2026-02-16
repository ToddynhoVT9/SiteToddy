import { NavLink } from "react-router-dom";
//import logo from "../assets/logo.png";

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

function ExternalItem({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-xl border border-[#3d3d3d] bg-[#121212] px-4 py-3 text-sm font-semibold text-[#beb8b8] transition hover:bg-[#3d3d3d] hover:text-white"
    >
      {label}
    </a>
  );
}

export default function Sidebar() {
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
        <SideNavItem to="/profile" label="Perfil" />
      </Section>

      <hr className="my-0 border-t-2 border-[#3d3d3d]" />

      {/*       <Section title="ME ENCONTRE POR AÍ">
        <ExternalItem
          href="https://substack.com/@toddynhovt"
          label="Substack"
        />
        <ExternalItem
          href="https://www.youtube.com/@toddynhoVT"
          label="YouTube"
        />
        <ExternalItem
          href="https://www.instagram.com/toddynho_vt/"
          label="Instagram"
        />
      </Section> */}

      <Section title="EXTRA">
        <SideNavItem to="/signup" label="Criar conta" />
      </Section>
    </div>
  );
}
