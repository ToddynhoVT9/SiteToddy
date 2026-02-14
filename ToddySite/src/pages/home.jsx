import Hero from "../components/Hero";
import LinkTree from "../components/LinkTree";
import CreateAccountCTA from "../components/CreateAccountCTA";

export default function Home() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="grid gap-6">
        <Hero />

        <div className="grid gap-6 md:grid-cols-2">
          <LinkTree />
          <CreateAccountCTA />
        </div>
      </div>
    </main>
  );
}
