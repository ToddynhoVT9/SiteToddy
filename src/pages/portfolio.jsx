import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolio";

function useEnterAnimation() {
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setEntered(true), 10);
    return () => window.clearTimeout(t);
  }, []);
  return entered;
}

function clampIndex(i, len) {
  if (len <= 0) return 0;
  return (i + len) % len; // wrap-around
}

function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const modalRoot = document.getElementById("modal-root");
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKeyDown);

    // enter animation
    const t = window.setTimeout(() => setOpen(true), 10);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(t);
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    // exit animation
    setOpen(false);
    closeTimer.current = window.setTimeout(() => onClose(), 180);
  }

  if (!modalRoot) return null;
  const item = items[index];

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      {/* backdrop */}
      <button
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          open ? "opacity-70" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-label="Fechar modal"
        type="button"
      />

      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Visualização da imagem"
        className={`relative z-10000 w-full max-w-5xl rounded-2xl border border-[#3d3d3d] bg-[#121212] shadow-2xl transition-all duration-200 ${
          open ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start justify-between gap-4 p-4 border-b border-[#3d3d3d]">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">
              {item.alt}
            </p>
            <p className="mt-1 text-sm text-[#beb8b8]">{item.description}</p>
          </div>

          <button
            onClick={handleClose}
            className="shrink-0 rounded-xl border border-[#3d3d3d] bg-[#202020] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
            type="button"
          >
            Fechar
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={onPrev}
              className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
              type="button"
            >
              ← Anterior
            </button>

            <p className="text-xs text-[#beb8b8]">
              {index + 1} / {items.length}
            </p>

            <button
              onClick={onNext}
              className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-3 py-2 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
              type="button"
            >
              Próximo →
            </button>
          </div>

          <img
            src={item.src}
            alt={item.alt}
            className="mt-4 mx-auto max-h-[72vh] w-auto max-w-full rounded-xl border border-[#3d3d3d] bg-black/20"
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
  const entered = useEnterAnimation();

  // Lightbox state: qual categoria está aberta e qual índice dentro dela
  const [openCatSlug, setOpenCatSlug] = useState(null);
  const [openIndex, setOpenIndex] = useState(0);

  const categories = useMemo(() => {
    return portfolioData.map((c) => ({
      ...c,
      previewItems: (c.items || []).slice(0, 12),
    }));
  }, []);

  const openCategory = useMemo(
    () => categories.find((c) => c.slug === openCatSlug) || null,
    [categories, openCatSlug],
  );

  function closeLightbox() {
    setOpenCatSlug(null);
  }

  function prev() {
    if (!openCategory) return;
    setOpenIndex((i) => clampIndex(i - 1, openCategory.previewItems.length));
  }

  function next() {
    if (!openCategory) return;
    setOpenIndex((i) => clampIndex(i + 1, openCategory.previewItems.length));
  }

  return (
    <section
      className={`w-full transition-all duration-300 ease-out ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
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
                className="rounded-xl border border-[#3d3d3d] bg-[#202020] px-4 py-4 text-sm font-semibold text-white hover:bg-[#3d3d3d] transition"
              >
                Ver toda a categoria
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {cat.previewItems.map((item, idx) => (
                <ImageCard
                  key={item.id}
                  item={item}
                  onClick={() => {
                    setOpenCatSlug(cat.slug);
                    setOpenIndex(idx);
                  }}
                />
              ))}
            </div>

            <hr className="my-0 border-t-8 border-[#3d3d3d]" />
          </section>
        ))}
      </div>

      {openCategory && (
        <Lightbox
          items={openCategory.previewItems}
          index={openIndex}
          onClose={closeLightbox}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
