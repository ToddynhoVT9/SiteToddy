import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "../components/form";
import ButtonLinkCreateAccount from "../components/ButtonLinkCreateAccount";
import { useAuth } from "../lib/auth/authContext";

// ─── Validações ───────────────────────────────────────────────────────────────
function validateSignup({ name, email, password, confirm }) {
  if (!name || name.trim().length < 2)
    return "O nome deve ter ao menos 2 caracteres.";
  if (/\d/.test(name))
    return "O nome não pode conter números.";
  if (!email || !/\S+@\S+\.\S+/.test(email))
    return "Informe um email válido.";
  if (!password || password.length < 8)
    return "A senha deve ter ao menos 8 caracteres.";
  if (!/[a-zA-Z]/.test(password) || !/\d/.test(password))
    return "A senha deve conter letras e números.";
  if (password !== confirm)
    return "As senhas não conferem.";
  return null;
}

export default function Signup() {
  const { signup } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const name     = form.get("name").trim();
    const email    = form.get("email").trim();
    const password = form.get("password");
    const confirm  = form.get("confirm");

    const validationError = validateSignup({ name, email, password, confirm });
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await signup(name, email, password);
      // navegação para /profile feita dentro do authContext
    } catch (err) {
      setError(err.message ?? "Erro ao criar conta. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
        <h1 className="text-2xl font-semibold text-white">
          Crie sua conta
        </h1>
        <p className="mt-3 text-[#beb8b8]">
          Leva menos tempo do que decidir um nome de usuário perfeito.
        </p>

        <form onSubmit={handleSignup} className="mt-6 grid gap-4" noValidate>
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

          {error && (
            <p className="rounded-xl bg-red-900/30 border border-red-700/40
                          px-4 py-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <ButtonLinkCreateAccount
            as="button"
            label={loading ? "Criando conta…" : "Cadastrar"}
          />

          <Link
            to="/login"
            className="text-center text-sm text-[#beb8b8] hover:text-white transition"
          >
            Já tem conta? Entrar
          </Link>
        </form>
      </section>
    </main>
  );
}
