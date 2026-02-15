import { Link } from "react-router-dom";
import Form from "../components/form";

export default function Signup() {
  function handleSignup(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const confirm = form.get("confirm");

    if (password !== confirm) {
      alert("As senhas não conferem.");
      return;
    }

    console.log("signup:", { name, email, password });
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
        <h1 className="text-2xl font-semibold text-white">
          Crie sua conta (ainda em construção)
        </h1>
        <p className="mt-3 text-[#beb8b8]">
          Leva menos tempo do que decidir um nome de usuário perfeito.
        </p>

        <form onSubmit={handleSignup} className="mt-6 grid gap-4">
          <Form id="name" name="Nome" type="text" placeholder="Seu nome" />

          <Form
            id="email"
            name="Email"
            type="email"
            placeholder="seuemail@exemplo.com"
          />

          <Form
            id="password"
            name="Escolha uma senha"
            type="password"
            placeholder="••••••••"
          />

          <Form
            id="confirm"
            name="Confirme sua senha"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="mt-2 rounded-xl bg-[#202020] hover:bg-[#3d3d3d]
                       border border-[#3d3d3d] text-white font-semibold
                       px-5 py-3 transition"
          >
            Criar conta
          </button>

          <Link
            to="/"
            className="text-center text-sm text-[#beb8b8] hover:text-white transition"
          >
            Voltar para login
          </Link>
        </form>
      </section>
    </main>
  );
}
