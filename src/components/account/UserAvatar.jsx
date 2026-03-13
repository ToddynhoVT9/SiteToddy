/**
 * UserAvatar
 * Avatar circular com fallback de iniciais quando não há foto.
 *
 * Props:
 *   avatarUrl  string | null
 *   name       string
 *   size       "sm" | "md" | "lg"  (default: "md")
 */

const sizeMap = {
  sm: { container: "w-8 h-8 text-xs", img: "w-8 h-8" },
  md: { container: "w-12 h-12 text-sm", img: "w-12 h-12" },
  lg: { container: "w-20 h-20 text-xl", img: "w-20 h-20" },
};

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default function UserAvatar({ avatarUrl, name = "", size = "md" }) {
  const { container, img } = sizeMap[size] ?? sizeMap.md;

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={`Avatar de ${name}`}
        className={`${img} rounded-full object-cover border-2 border-[#3d3d3d]`}
      />
    );
  }

  return (
    <div
      aria-label={`Avatar de ${name}`}
      className={`${container} rounded-full bg-[#3d3d3d] border-2 border-[#545454]
                  flex items-center justify-center font-semibold text-white select-none`}
    >
      {getInitials(name) || "?"}
    </div>
  );
}
