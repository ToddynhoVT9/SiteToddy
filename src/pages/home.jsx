import Hero from "../components/Hero";
import LinkTree from "../components/LinkTree";
import Form from "../components/form";
import ButtonLinkCreateAccount from "../components/ButtonLinkCreateAccount";
import CreateAccountCTA from "../components/CreateAccountCTA";
import { useAuth } from "../lib/auth/authContext";
import { useState } from "react";

export default function Home() {
  const { isAuthenticated, login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email").trim();
    const password = form.get("password");
    setError(null);
    if (!email || !password) {
      setError("Preencha email e senha.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message ?? "Email ou senha incorretos.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid gap-6">
        <Hero />

        <div className="grid gap-6 md:grid-cols-2">
          <LinkTree />

          {/* Painel de Login ou CTA de cadastro — condicional por auth */}
          {isAuthenticated ? (
            /* Usuário logado: substitui o painel por um CTA de boas-vindas */
            <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454] flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-white">
                Você está logado!
              </h2>
              <p className="mt-3 text-[#beb8b8]">
                Acesse seu perfil para ver ou editar seus dados.
              </p>
              <div className="mt-6">
                <ButtonLinkCreateAccount
                  label="Ver meu perfil"
                  to="/profile"
                />
              </div>
            </section>
          ) : (
            /* Usuário deslogado: formulário de login rápido + CTA cadastro */
            <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
              <h2 className="text-2xl font-semibold text-white">
                Entrar
              </h2>
              <p className="mt-3 text-[#beb8b8]">
                Entre para interagir, salvar coisas e acompanhar atualizações.
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

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 rounded-xl bg-[#202020] hover:bg-[#3d3d3d]
                             border border-[#3d3d3d] text-white font-semibold
                             px-5 py-3 transition disabled:opacity-50"
                >
                  {loading ? "Entrando…" : "Entrar"}
                </button>
              </form>

              <CreateAccountCTA />
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
