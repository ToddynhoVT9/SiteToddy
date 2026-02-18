import { Link } from "react-router-dom";
import { categorySlugToTitle } from "../../lib/blog/categoryUtils";

function formatDate(date) {
  if (!(date instanceof Date)) {
    return "";
  }

  return date.toLocaleDateString("pt-BR");
}

const variantStyles = {
  default: "min-h-[360px] p-4",
  featured: "h-full min-h-[460px] p-6",
  stacked: "min-h-[260px] p-4",
  rail: "min-h-[300px] p-4",
};

const titleStyles = {
  default: "text-lg",
  featured: "text-2xl",
  stacked: "text-base",
  rail: "text-base",
};

export default function PostCard({ post, variant = "default", className = "", showCategory = false }) {
  if (!post) {
    return null;
  }

  const wrapperStyle = variantStyles[variant] || variantStyles.default;
  const titleStyle = titleStyles[variant] || titleStyles.default;

  return (
    <Link
      to={`/blog/${post.category}/${post.slug}`}
      className={[
        "block rounded-2xl border border-[#3d3d3d] bg-[#121212] text-white transition",
        "hover:bg-[#1a1a1a]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
        wrapperStyle,
        className,
      ].join(" ")}
    >
      <div className="flex h-full flex-col">
        <div className="mb-3 overflow-hidden rounded-xl border border-[#3d3d3d] bg-[#202020]">
          {post.cover ? (
            <img
              src={post.cover}
              alt={`Capa do artigo ${post.title}`}
              loading="lazy"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="aspect-video w-full bg-[#202020]" aria-hidden="true" />
          )}
        </div>

        {(showCategory || post.updatedAt) && (
          <div className="mb-2 flex flex-wrap items-center gap-2 text-xs text-[#7d7d7d]">
            {showCategory && <span>{categorySlugToTitle(post.category) || post.category}</span>}
            {showCategory && post.updatedAt && <span>•</span>}
            {post.updatedAt && <time dateTime={post.updatedAt.toISOString()}>{formatDate(post.updatedAt)}</time>}
          </div>
        )}

        <h3 className={`${titleStyle} font-semibold`}>{post.title}</h3>

        {post.summary && <p className="mt-2 line-clamp-3 text-sm text-[#beb8b8]">{post.summary}</p>}
      </div>
    </Link>
  );
}
