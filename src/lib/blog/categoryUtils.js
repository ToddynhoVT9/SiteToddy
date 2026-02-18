export function humanizeCategorySlug(slug) {
  if (typeof slug !== "string") {
    return "";
  }

  return slug
    .trim()
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function slugify(text) {
  if (typeof text !== "string") {
    return "";
  }

  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// Backward-compatible alias while pages are still migrating.
export const categorySlugToTitle = humanizeCategorySlug;
