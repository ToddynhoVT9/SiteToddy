import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useParams } from "react-router-dom";
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
  return (i + len) % len;
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
    setOpen(false);
    closeTimer.current = window.setTimeout(() => onClose(), 180);
  }

  if (!modalRoot) return null;
  const item = items[index];

  return createPortal(
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <button
        className={`absolute inset-0 bg-black transition-opacity duration-200 ${
          open ? "opacity-70" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-label="Fechar modal"
        type="button"
      />

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

export default function PortfolioCategory() {
  const entered = useEnterAnimation();
  const { categoria } = useParams();

  const category = useMemo(
    () => portfolioData.find((c) => c.slug === categoria) || null,
    [categoria],
  );

  const [openIndex, setOpenIndex] = useState(null);

  if (!category) {
    return (
      <section
        className={`text-white transition-all duration-300 ease-out ${
          entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}
      >
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

  function close() {
    setOpenIndex(null);
  }

  function prev() {
    setOpenIndex((i) => clampIndex(i - 1, category.items.length));
  }

  function next() {
    setOpenIndex((i) => clampIndex(i + 1, category.items.length));
  }

  return (
    <section
      className={`w-full text-white transition-all duration-300 ease-out ${
        entered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
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

      {/* Coluna elegante: max-w-4xl centralizado */}
      <div className="grid gap-10">
        {category.items.map((item, idx) => (
          <article
            key={item.id}
            className="mx-auto w-full max-w-4xl rounded-2xl bg-[#202020] p-6"
          >
            <div className="mt-6">
              <p className="text-lg font-semibold">{item.alt}</p>
            </div>

            <button
              type="button"
              onClick={() => setOpenIndex(idx)}
              className="block w-full"
              aria-label={`Abrir ${item.alt}`}
              title={item.alt}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full rounded-xl border border-[#3d3d3d] bg-black/20"
                loading="lazy"
              />
            </button>

            <div>
              <p className="mt-3 text-sm leading-relaxed text-[#beb8b8]">
                {item.description}
              </p>
            </div>

            <hr className="my-0 border-t-8 border-[#3d3d3d]" />
          </article>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          items={category.items}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}
