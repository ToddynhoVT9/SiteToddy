import { useEffect, useMemo } from "react";
import { getAllCategories, getAllPosts } from "../lib/blog/loadPosts";

export default function Blog() {
  const posts = useMemo(() => getAllPosts(), []);
  const categories = useMemo(() => getAllCategories(), []);

  useEffect(() => {
    console.log("[Blog sanity] total posts:", posts.length);
    console.log("[Blog sanity] categories:", categories);
  }, [posts.length, categories]);

  return (
    <section className="space-y-4 p-8 text-white">
      <h1 className="text-2xl font-bold">Blog sanity check (temporario)</h1>

      <p className="text-sm text-[#beb8b8]">Total de posts: {posts.length}</p>

      <div>
        <h2 className="mb-2 text-lg font-semibold">Categorias</h2>
        <ul className="list-inside list-disc space-y-1 text-sm text-[#beb8b8]">
          {categories.map((category) => (
            <li key={category.slug}>
              {category.name} ({category.count})
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
