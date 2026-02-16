import Hero from "../components/Hero";
import LinkTree from "../components/LinkTree";
import Form from "../components/form";
import ButtonLinkCreateAccount from "../components/ButtonLinkCreateAccount";

export default function Home() {
  function handleLogin(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");
    console.log("login:", { email, password });
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid gap-6">
        <Hero />

        <div className="grid gap-6 md:grid-cols-2">
          <LinkTree />

          {/* Painel de Login + CTA de cadastro */}
          <section className="rounded-2xl bg-[#121212] p-8 border border-[#545454]">
            <h2 className="text-2xl font-semibold text-white">
              Entrar (ainda em construção)
            </h2>
            <p className="mt-3 text-[#beb8b8]">
              Entre para interagir, salvar coisas e acompanhar atualizações.
            </p>

            <form onSubmit={handleLogin} className="mt-6 grid gap-4">
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

              <button
                type="submit"
                className="mt-2 rounded-xl bg-[#202020] hover:bg-[#3d3d3d]
                           border border-[#3d3d3d] text-white font-semibold
                           px-5 py-3 transition"
              >
                Entrar
              </button>
            </form>

            <ButtonLinkCreateAccount />
          </section>
        </div>
      </div>
    </main>
  );
}
