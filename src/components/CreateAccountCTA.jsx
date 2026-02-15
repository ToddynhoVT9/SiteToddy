import { Link } from "react-router-dom";

export default function CreateAccountCTA() {
  return (
    <section className="rounded-2xl bg-[#202020] p-8 border border-[#545454]">
      <h2 className="text-2xl font-semibold text-white">Crie sua conta</h2>
      <p className="mt-3 text-zinc-300">
        Quer interagir, salvar coisas, comentar ou acompanhar atualizações? Crie
        uma conta rapidinho.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/signup"
          className="bg-[#7d7d7d] hover:bg-[#beb8b8] text-[#202020] font-semibold
                     px-5 py-3 rounded-xl transition"
        >
          Criar conta
        </Link>

        <Link
          to="/profile"
          className="bg-[#202020] hover:bg-[#545454] text-white px-5 py-3 rounded-xl transition"
        >
          Já tenho conta
        </Link>
      </div>
    </section>
  );
}
//"   [#202020]   [#545454]   [#7d7d7d]   [#beb8b8]   "
