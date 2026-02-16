import { Link } from "react-router-dom";

export default function ButtonLinkCreateAccount({
  as = "link",
  label = "Criar conta",
  to = "/signup",
}) {
  if (as === "button") {
    return (
      <button
        type="submit"
        className="mt-2 rounded-xl bg-[#202020] hover:bg-[#3d3d3d]
                   border border-[#3d3d3d] text-white font-semibold
                   px-5 py-3 transition"
      >
        {label}
      </button>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-[#3d3d3d]">
      <h3 className="text-lg font-semibold text-white">Crie sua conta</h3>

      <p className="mt-2 text-[#beb8b8]">
        Quer interagir, salvar coisas, comentar ou acompanhar atualizações? Crie
        uma conta rapidinho.
      </p>

      <div className="mt-4 flex items-center gap-3">
        <Link
          to={to}
          className="rounded-xl bg-[#202020] hover:bg-[#7d7d7d]
                     text-white font-semibold px-5 py-3 transition"
        >
          {label}
        </Link>
      </div>
    </div>
  );
}
