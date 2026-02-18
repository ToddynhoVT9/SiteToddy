import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import CategoryRail from "../../components/blog/CategoryRail";
import PinnedGrid from "../../components/blog/PinnedGrid";
import PostCard from "../../components/blog/PostCard";
import RailSkeleton from "../../components/blog/RailSkeleton";
import {
  getAllCategories,
  getLatestPosts,
  getPinnedPostsByCategory,
  getPostsByCategory,
} from "../../lib/blog/loadPosts";

function LatestGridSkeleton() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-label="Carregando ultimos artigos">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-[#3d3d3d] bg-[#121212] p-4 min-h-360px"
          aria-hidden="true"
        >
          <div className="aspect-video w-full rounded-xl bg-[#2b2b2b]" />
          <div className="mt-3 h-3 w-24 rounded bg-[#2b2b2b]" />
          <div className="mt-3 h-5 w-11/12 rounded bg-[#2b2b2b]" />
          <div className="mt-2 h-4 w-full rounded bg-[#2b2b2b]" />
          <div className="mt-1 h-4 w-4/5 rounded bg-[#2b2b2b]" />
        </div>
      ))}
    </div>
  );
}

export default function BlogDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  const latestPosts = getLatestPosts(15);
  const categories = getAllCategories();

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsLoading(false);
    }, 200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Blog | Toddynho</title>
        <meta
          name="description"
          content="Ultimos artigos do blog do Toddynho sobre engenharia e filosofia."
        />
      </Helmet>

      <section className="space-y-10 text-white">
        <section className="space-y-4" aria-labelledby="blog-latest-title">
          <header className="space-y-1">
            <h1 id="blog-latest-title" className="text-3xl font-bold">
              Ultimos artigos
            </h1>
            <p className="text-sm text-[#beb8b8]">
              15 artigos mais recentes de todas as categorias.
            </p>
          </header>

          {isLoading ? (
            <LatestGridSkeleton />
          ) : (
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} variant="default" showCategory />
              ))}
            </div>
          )}
        </section>

        {categories.map((category) => {
          // Regra do rail: inclui posts pinned e nao pinned, sempre pelos 10 mais recentes da categoria.
          const categoryPosts = getPostsByCategory(category.slug).slice(0, 10);
          const pinnedPosts = getPinnedPostsByCategory(category.slug, 3);

          return (
            <section
              key={category.slug}
              className="space-y-4"
              aria-labelledby={`category-${category.slug}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h2 id={`category-${category.slug}`} className="text-2xl font-bold">
                  {category.name || category.slug}
                </h2>

                <Link
                  to={`/blog/${category.slug}`}
                  className="rounded-lg border border-[#3d3d3d] px-3 py-2 text-sm font-semibold transition hover:bg-[#3d3d3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Ver todos
                </Link>
              </div>

              {isLoading ? (
                <>
                  <div className="grid gap-3 lg:grid-cols-3" aria-label="Carregando destaques">
                    <div className="animate-pulse rounded-2xl border border-[#3d3d3d] bg-[#121212] min-h-460px" />
                    <div className="grid gap-3">
                      <div className="animate-pulse rounded-2xl border border-[#3d3d3d] bg-[#121212] min-h-260px" />
                      <div className="animate-pulse rounded-2xl border border-[#3d3d3d] bg-[#121212] min-h-260px" />
                    </div>
                  </div>

                  <RailSkeleton cards={3} />
                </>
              ) : (
                <>
                  <PinnedGrid posts={pinnedPosts} />
                  <CategoryRail posts={categoryPosts} categorySlug={category.slug} />
                </>
              )}
            </section>
          );
        })}
      </section>
    </>
  );
}
