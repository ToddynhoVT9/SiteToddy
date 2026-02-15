import Text from "../components/Text";

function LinkItem({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block w-full rounded-xl bg-[#202020] border border-[#545454] px-5 py-4 text-white
                 hover:bg-[#545454] transition"
    >
      {label}
    </a>
  );
}

export default function LinkTree() {
  return (
    <section className="rounded-2xl bg-[#202020] p-6 border border-[#545454]">
      <h2 className="text-xl font-semibold text-white">Me encontre por aí</h2>
      <p className="mt-2 text-[#beb8b8]">Links para as minhas redes:</p>

      <div className="mt-5 grid gap-3">
        <Text children="Meus textos:" />
        <LinkItem
          href="https://app.valete.org.br/u/toddynhoVT"
          label="Valete"
        />
        <LinkItem href="https://substack.com/@toddynhovt" label="Substack" />

        <Text children="Meus desenhos:" />
        <LinkItem
          href="https://www.instagram.com/toddynho_vt/"
          label="Instagram"
        />

        <Text children="Quer me doar algo?:" />
        <LinkItem href="https://livepix.gg/toddynhovt" label="Livepix" />

        <Text children="Outras redes:" />
        <LinkItem href="https://www.youtube.com/@toddynhoVT" label="YouTube" />
        <LinkItem href="https://x.com/ToddynhoVT" label="X (Twitter)" />
      </div>
    </section>
  );
}
//"   [#202020]   [#545454]   [#7d7d7d]   [#beb8b8]   "
