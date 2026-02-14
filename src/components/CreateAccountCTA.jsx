import { Link } from "react-router-dom";

export default function CreateAccountCTA() {
  return (
    <section className="rounded-2xl bg-zinc-900 p-8 border border-zinc-800">
      <h2 className="text-2xl font-semibold text-white">Crie sua conta</h2>
      <p className="mt-3 text-zinc-300">
        Quer interagir, salvar coisas, comentar ou acompanhar atualizações? Crie
        uma conta rapidinho.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          to="/signup"
          className="bg-[#7d7d7d] hover:bg-[#9a9a9a] text-zinc-950 font-semibold
                     px-5 py-3 rounded-xl transition"
        >
          Criar conta
        </Link>

        <Link
          to="/profile"
          className="bg-zinc-800 hover:bg-zinc-700 text-white px-5 py-3 rounded-xl transition"
        >
          Já tenho conta
        </Link>
      </div>
    </section>
  );
}
