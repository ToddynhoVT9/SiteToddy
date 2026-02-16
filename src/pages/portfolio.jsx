import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolio";

function Modal({ item, onClose }) {
  const modalRoot = document.getElementById("modal-root");

  useEffect(() => {
    // trava scroll do body enquanto o modal está aberto
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // ESC fecha
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização da imagem"
    >
      {/* backdrop */}
      <button
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
        aria-label="Fechar modal"
      />

      {/* content */}
      <div className="relative z-[10000] w-full max-w-4xl rounded-2xl border border-[#3d3d3d] bg-[#121212] shadow-2xl">
        <div className="flex items-start justify-between gap-4 p-4 border-b border-[#3d3d3d]">
          <div>
            <p className="text-sm font-semibold text-white">{item.alt}</p>
            <p className="mt-1 text-sm text-[#beb8b8]">{item.description}</p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
          >
            Fechar
          </button>
        </div>

        <div className="p-4">
          <img
            src={item.src}
            alt={item.alt}
            className="mx-auto max-h-[75vh] w-auto max-w-full rounded-xl border border-[#3d3d3d] bg-black/20"
            loading="lazy"
          />
        </div>
      </div>
    </div>,
    modalRoot,
  );
}

function ImageCard({ item, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl border border-[#3d3d3d] bg-[#121212] transition hover:bg-[#202020]"
      title={item.alt}
      aria-label={`Abrir ${item.alt}`}
      type="button"
    >
      {/* Card fixo: você pode ajustar h-28/h-32 etc */}
      <div className="h-24 w-full sm:h-28 md:h-65">
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover opacity-90 transition group-hover:opacity-100"
          loading="lazy"
        />
      </div>

      <div className="px-3 py-2">
        <p className="truncate text-left text-xs font-semibold text-white">
          {item.alt}
        </p>
      </div>
    </button>
  );
}

export default function Portfolio() {
  const [selected, setSelected] = useState(null);

  // garante que cada categoria tenha no máximo 12 itens no preview
  const categories = useMemo(() => {
    return portfolioData.map((c) => ({
      ...c,
      previewItems: (c.items || []).slice(0, 12),
    }));
  }, []);

  return (
    <section className="w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-white">Portfólio</h1>
        <p className="mt-2 text-[#beb8b8]">
          Categorias com prévia 3×4. Clique em uma imagem para ver em tamanho
          original.
        </p>
      </header>

      <div className="grid gap-10">
        {categories.map((cat) => (
          <section key={cat.slug} className="grid gap-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {cat.title}
                </h2>
                <p className="mt-1 text-sm text-[#beb8b8]">
                  {cat.previewItems.length} de {cat.items.length} imagens
                </p>
              </div>

              <Link
                to={`/portfolio/${cat.slug}`}
                className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-4 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
              >
                Ver tudo
              </Link>
            </div>

            {/* Grid 3x4 no “sentido lógico”: 3 colunas e até 4 linhas */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {cat.previewItems.map((item) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelected(item)}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
