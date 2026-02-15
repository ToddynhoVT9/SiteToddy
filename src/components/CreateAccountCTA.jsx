import { Link } from "react-router-dom";

export default function CreateAccountCTA() {
  return (
    <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
      <h2 className="text-2xl font-semibold text-white">Crie sua conta</h2>
      <p className="mt-3 text-zinc-300">
        Quer interagir, salvar coisas, comentar ou acompanhar atualizações? Crie
        uma conta rapidinho.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/signup"
          className="bg-[#202020] hover:bg-[#7d7d7d] text-[#202020] font-semibold
                     px-5 py-3 rounded-xl transition"
        >
          Criar conta
        </Link>

        <Link
          to="/profile"
          className="bg-[#121212] hover:bg-[#202020] text-white px-5 py-3 rounded-xl transition"
        >
          Já tenho conta
        </Link>
      </div>
    </section>
  );
}
//"   [#121212]   [#202020]   [#545454]   [#7d7d7d]   [#beb8b8]   "
