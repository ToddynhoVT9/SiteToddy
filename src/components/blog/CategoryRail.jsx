import { useEffect, useRef, useState } from "react";
import PostCard from "./PostCard";
import DotIndicator from "./DotIndicator";

const SCROLL_STEP_RATIO = 0.8;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export default function CategoryRail({ posts = [], categorySlug }) {
  const railRef = useRef(null);
  const recentPosts = posts.slice(0, 10);

  const [totalPages, setTotalPages] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [canGoPrev, setCanGoPrev] = useState(false);
  const [canGoNext, setCanGoNext] = useState(false);

  useEffect(() => {
    const railElement = railRef.current;

    if (!railElement) {
      return;
    }

    function updateMetrics() {
      const { scrollLeft, scrollWidth, clientWidth } = railElement;

      if (clientWidth <= 0) {
        setTotalPages(1);
        setActivePage(0);
        setCanGoPrev(false);
        setCanGoNext(false);
        return;
      }

      const pages = Math.max(1, Math.ceil(scrollWidth / clientWidth));
      const pageIndex = clamp(Math.round(scrollLeft / clientWidth), 0, pages - 1);
      const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

      setTotalPages(pages);
      setActivePage(pageIndex);
      setCanGoPrev(scrollLeft > 1);
      setCanGoNext(scrollLeft < maxScrollLeft - 1);
    }

    function handleScroll() {
      updateMetrics();
    }

    updateMetrics();

    railElement.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);

    return () => {
      railElement.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMetrics);
    };
  }, [recentPosts.length, categorySlug]);

  useEffect(() => {
    const railElement = railRef.current;

    if (!railElement) {
      return;
    }

    railElement.scrollTo({ left: 0, behavior: "auto" });
  }, [categorySlug]);

  if (recentPosts.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#3d3d3d] p-4 text-sm text-[#7d7d7d]">
        Nenhum artigo para mostrar no trilho.
      </div>
    );
  }

  function scrollByPage(direction) {
    const railElement = railRef.current;

    if (!railElement) {
      return;
    }

    const distance = railElement.clientWidth * SCROLL_STEP_RATIO * direction;
    railElement.scrollBy({ left: distance, behavior: "smooth" });
  }

  function handlePrev() {
    scrollByPage(-1);
  }

  function handleNext() {
    scrollByPage(1);
  }

  function handleWheel(event) {
    if (!event.shiftKey) {
      return;
    }

    const railElement = railRef.current;

    if (!railElement) {
      return;
    }

    event.preventDefault();

    const delta = event.deltaY !== 0 ? event.deltaY : event.deltaX;
    railElement.scrollBy({ left: delta, behavior: "auto" });
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByPage(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByPage(1);
    }
  }

  function handleSelectPage(pageIndex) {
    const railElement = railRef.current;

    if (!railElement) {
      return;
    }

    railElement.scrollTo({
      left: railElement.clientWidth * pageIndex,
      behavior: "smooth",
    });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-[#beb8b8]">Mais recentes da categoria</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Mostrar artigos anteriores no trilho"
            className={[
              "rounded-lg border border-[#3d3d3d] px-3 py-1.5 text-sm transition",
              canGoPrev ? "hover:bg-[#3d3d3d]" : "cursor-not-allowed opacity-40",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            ].join(" ")}
          >
            Anterior
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Mostrar proximos artigos no trilho"
            className={[
              "rounded-lg border border-[#3d3d3d] px-3 py-1.5 text-sm transition",
              canGoNext ? "hover:bg-[#3d3d3d]" : "cursor-not-allowed opacity-40",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
            ].join(" ")}
          >
            Proximo
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="overflow-x-auto pb-2"
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Trilho horizontal de artigos da categoria"
      >
        <div className="flex gap-3">
          {recentPosts.map((post) => (
            <div key={post.slug} className="w-[85%] max-w-420px shrink-0 sm:w-[70%] lg:w-[38%] xl:w-[32%]">
              <PostCard post={post} variant="rail" showCategory />
            </div>
          ))}
        </div>
      </div>

      <DotIndicator total={totalPages} active={activePage} onSelect={handleSelectPage} />
    </div>
  );
}
