import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import MarkdownContent from "../../components/blog/MarkdownContent";
import { categorySlugToTitle } from "../../lib/blog/categoryUtils";
import { getAllPosts } from "../../lib/blog/loadPosts";

function normalizeValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    return "";
  }

  return date.toLocaleDateString("pt-BR");
}

export default function BlogArticle() {
  const { categoria = "", slug = "" } = useParams();
  const normalizedCategory = normalizeValue(categoria);
  const normalizedSlug = normalizeValue(slug);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  const postBySlug = getAllPosts().find((item) => normalizeValue(item.slug) === normalizedSlug);
  const post =
    postBySlug && normalizeValue(postBySlug.category) === normalizedCategory ? postBySlug : null;

  if (!post) {
    return (
      <>
        <Helmet>
          <title>Artigo nao encontrado | Blog | Toddynho</title>
          <meta name="description" content="Artigo nao encontrado no blog do Toddynho." />
        </Helmet>

        <section className="space-y-4 text-white">
          <h1 className="text-3xl font-bold">Artigo não encontrado</h1>
          <Link
            to="/blog"
            className="inline-flex rounded-lg border border-[#3d3d3d] px-3 py-2 text-sm transition hover:bg-[#3d3d3d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Voltar para /blog
          </Link>
        </section>
      </>
    );
  }

  const categoryTitle = categorySlugToTitle(post.category) || post.category;

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Blog | Toddynho`}</title>
        <meta name="description" content={post.summary} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary} />
        <meta property="og:type" content="article" />
        {post.cover && <meta property="og:image" content={post.cover} />}
        <meta property="og:url" content={currentUrl} />
      </Helmet>

      <article className="space-y-6 text-white">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-[#7d7d7d]">{categoryTitle}</p>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-[#beb8b8]">Atualizado em {formatDate(post.updatedAt)}</p>

          {post.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2" aria-label="Tags do artigo">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-[#3d3d3d] bg-[#121212] px-2.5 py-1 text-xs text-[#beb8b8]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </header>

        {post.summary && <p className="text-base text-[#beb8b8]">{post.summary}</p>}

        {post.cover && (
          <div className="overflow-hidden rounded-2xl border border-[#3d3d3d] bg-[#121212]">
            <img
              src={post.cover}
              alt={`Capa do artigo ${post.title}`}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
          </div>
        )}

        <MarkdownContent content={post.content} />

        <footer>
          <Link
            to={`/blog/${post.category}`}
            className="text-sm text-[#beb8b8] underline underline-offset-4"
          >
            Ver mais em {categoryTitle}
          </Link>
        </footer>
      </article>
    </>
  );
}
