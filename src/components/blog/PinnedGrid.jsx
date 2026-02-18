import PostCard from "./PostCard";

export default function PinnedGrid({ posts = [] }) {
  const pinned = posts.slice(0, 3);

  if (pinned.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-[#3d3d3d] p-4 text-sm text-[#7d7d7d]">
        Nenhum artigo em destaque nesta categoria.
      </div>
    );
  }

  const [primary, secondary, tertiary] = pinned;

  return (
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <PostCard post={primary} variant="featured" showCategory />
      </div>

      <div className="grid gap-3">
        {secondary && <PostCard post={secondary} variant="stacked" showCategory />}
        {tertiary && <PostCard post={tertiary} variant="stacked" showCategory />}
      </div>
    </div>
  );
}
