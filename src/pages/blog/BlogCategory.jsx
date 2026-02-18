import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import PostCard from "../../components/blog/PostCard";
import { categorySlugToTitle } from "../../lib/blog/categoryUtils";
import { getPostsByCategory } from "../../lib/blog/loadPosts";

const CATEGORY_DESCRIPTIONS = {
  engenharia: "Artigos sobre praticas tecnicas, arquitetura, qualidade e evolucao de software.",
  filosofia: "Reflexoes sobre trabalho, processo criativo e tomada de decisao.",
};

export default function BlogCategory() {
  const { categoria = "" } = useParams();
  const categoryKey = String(categoria).trim().toLowerCase();

  const posts = getPostsByCategory(categoria)
    .slice()
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  const categoryTitle = categorySlugToTitle(categoria) || categoria;
  const categoryDescription = CATEGORY_DESCRIPTIONS[categoryKey] || "";

  if (posts.length === 0) {
    return (
      <>
        <Helmet>
          <title>Categoria nao encontrada | Blog | Toddynho</title>
          <meta name="description" content="Categoria nao encontrada no blog do Toddynho." />
        </Helmet>

        <section className="space-y-4 text-white">
          <h1 className="text-3xl font-bold">Categoria não encontrada</h1>
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

  return (
    <>
      <Helmet>
        <title>{`${categoryTitle} | Blog | Toddynho`}</title>
        <meta
          name="description"
          content={`${posts.length} artigo(s) na categoria ${categoryTitle} do blog do Toddynho.`}
        />
      </Helmet>

      <section className="space-y-6 text-white">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold">{categoryTitle}</h1>
          {categoryDescription && <p className="text-sm text-[#beb8b8]">{categoryDescription}</p>}
          <p className="text-sm text-[#beb8b8]">{posts.length} artigo(s)</p>
        </header>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {/* Virtualizacao futura: substituir este map por renderer em janela (windowing), mantendo posts ja ordenados por updatedAt. */}
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} showCategory={false} />
          ))}
        </div>
      </section>
    </>
  );
}
