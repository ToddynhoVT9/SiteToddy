import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";
import ButtonLinkCreateAccount from "../components/ButtonLinkCreateAccount";
import { useAuth } from "../lib/auth/authContext";

export default function Login() {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");

    setError(null);

    // Validação de cliente
    if (!email || !password) {
      setError("Preencha email e senha para continuar.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // navegação para /profile feita dentro do authContext
    } catch (err) {
      setError(err.message ?? "Erro ao entrar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
        <h1 className="text-2xl font-semibold text-white">
          Entrar na sua conta
        </h1>
        <p className="mt-3 text-[#beb8b8]">
          Bem-vindo de volta.
        </p>

        <form onSubmit={handleLogin} className="mt-6 grid gap-4" noValidate>
          <Form
            id="email"
            name="Email"
            type="email"
            placeholder="seuemail@exemplo.com"
          />

          <Form
            id="password"
            name="Senha"
            type="password"
            placeholder="••••••••"
          />

          {error && (
            <p className="rounded-xl bg-red-900/30 border border-red-700/40
                          px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <ButtonLinkCreateAccount
            as="button"
            label={loading ? "Entrando…" : "Entrar"}
          />

          <p className="text-center text-sm text-[#7d7d7d]">
            Esqueceu sua senha?{" "}
            <span className="text-[#beb8b8]">Em breve disponível.</span>
          </p>

          <Link
            to="/signup"
            className="text-center text-sm text-[#beb8b8] hover:text-white transition"
          >
            Não tem conta? Criar conta
          </Link>
        </form>
      </section>
    </main>
  );
}
