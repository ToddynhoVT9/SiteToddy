import Text from "./src/components/Text";

function LinkItem({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-xl bg-zinc-900 border border-zinc-800 px-5 py-4 text-white
                 hover:bg-zinc-800 transition"
    >
      {label}
    </a>
  );
}

export default function LinkTree() {
  return (
    <section className="rounded-2xl bg-zinc-950 p-6 border border-zinc-800">
      <h2 className="text-xl font-semibold text-white">Me encontra por aí</h2>
      <p className="mt-2 text-zinc-400">Links principais:</p>

      <div className="mt-5 grid gap-3">
        <Text children="Meus textos" />
        <LinkItem
          href="https://app.valete.org.br/u/toddynhoVT"
          label="Valete"
        />
        <LinkItem href="https://substack.com/@toddynhovt" label="Substack" />

        <Text children="Meus desenhos" />
        <LinkItem
          href="https://www.instagram.com/toddynho_vt/"
          label="Instagram"
        />

        <Text children="Quer me doar algo?" />
        <LinkItem href="https://livepix.gg/toddynhovt" label="Livepix" />

        <Text children="Outras redes" />
        <LinkItem href="https://www.youtube.com/@toddynhoVT" label="YouTube" />
        <LinkItem href="https://x.com/ToddynhoVT" label="X (Twitter)" />
      </div>
    </section>
  );
}
