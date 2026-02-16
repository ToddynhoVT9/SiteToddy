import { Link, useParams } from "react-router-dom";
import { portfolioData } from "../data/portfolio";

export default function PortfolioCategory() {
  const { categoria } = useParams();

  const category = portfolioData.find((c) => c.slug === categoria);

  if (!category) {
    return (
      <section className="text-white">
        <h1 className="text-3xl font-semibold">Categoria não encontrada</h1>
        <p className="mt-3 text-[#beb8b8]">
          Não existe nenhuma categoria com o slug:{" "}
          <span className="text-white font-semibold">{categoria}</span>
        </p>

        <Link
          to="/portfolio"
          className="mt-6 inline-flex rounded-xl border border-[#3d3d3d] bg-[#202020] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
        >
          Voltar ao Portfólio
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full text-white">
      <header className="mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{category.title}</h1>
            <p className="mt-2 text-[#beb8b8]">
              {category.items.length} imagem(ns) • visualização em coluna
            </p>
          </div>

          <Link
            to="/portfolio"
            className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
          >
            Voltar
          </Link>
        </div>
      </header>

      {/* Coluna vertical: imagem em tamanho real + descrição abaixo */}
      <div className="grid gap-10">
        {category.items.map((item) => (
          <article
            key={item.id}
            className="mx-auto w-full max-w-4xl rounded-2xl bg-[#202020] p-6"
          >
            <div className="mt-6">
              <p className="text-lg font-semibold">{item.alt}</p>
            </div>
            <img
              src={item.src}
              alt={item.alt}
              className="w-full rounded-xl border border-[#3d3d3d] bg-black/20"
              loading="lazy"
            />

            <div className="mt-6">
              <p className="mt-3 text-sm leading-relaxed text-[#beb8b8]">
                {item.description}
              </p>
            </div>
            <hr className="my-0 border-t-2 border-[#3d3d3d]" />
          </article>
        ))}
      </div>
    </section>
  );
}
