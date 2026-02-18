import matter from "gray-matter";
import { humanizeCategorySlug } from "./categoryUtils";

const REQUIRED_FIELDS = ["title", "slug", "category", "updatedAt", "summary"];
const MAX_PINNED_PER_CATEGORY = 3;

const modules = import.meta.glob("../../content/blog/*.md", {
  eager: true,
  as: "raw",
});

let cachedPosts = null;
let pinnedWarningsEmitted = false;

function normalizeCategorySlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

function normalizeLimit(limit, fallback) {
  if (limit === undefined) {
    return fallback;
  }

  const parsed = Number(limit);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return 0;
  }

  return Math.trunc(parsed);
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) {
    return [];
  }

  return tags
    .filter((tag) => typeof tag === "string")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function assertRequiredFields(frontmatter, file) {
  const missing = REQUIRED_FIELDS.filter((field) => {
    const value = frontmatter[field];
    return value === undefined || value === null || String(value).trim() === "";
  });

  if (missing.length === 0) {
    return;
  }

  throw new Error(`Blog loader: missing required fields in ${file}: ${missing.join(", ")}`);
}

function parseUpdatedAt(value, file) {
  const updatedAt = new Date(value);

  if (Number.isNaN(updatedAt.getTime())) {
    throw new Error(
      `Blog loader: invalid updatedAt in ${file}. Expected format YYYY-MM-DD, got: "${value}"`,
    );
  }

  return updatedAt;
}

function normalizePost(file, rawMarkdown) {
  if (typeof rawMarkdown !== "string") {
    throw new Error(`Blog loader: invalid raw markdown content for ${file}`);
  }

  const { data, content } = matter(rawMarkdown);

  assertRequiredFields(data, file);

  return {
    title: String(data.title).trim(),
    slug: String(data.slug).trim(),
    category: String(data.category).trim(),
    updatedAt: parseUpdatedAt(data.updatedAt, file),
    summary: String(data.summary).trim(),
    cover: typeof data.cover === "string" ? data.cover.trim() : "",
    tags: normalizeTags(data.tags),
    pinned: Boolean(data.pinned),
    content: content.trim(),
    file,
  };
}

function assertUniqueSlugs(posts) {
  const bySlug = new Map();

  for (const post of posts) {
    const slugKey = normalizeCategorySlug(post.slug);

    if (!bySlug.has(slugKey)) {
      bySlug.set(slugKey, []);
    }

    bySlug.get(slugKey).push(post.file);
  }

  const duplicates = [...bySlug.entries()].filter(([, files]) => files.length > 1);

  if (duplicates.length === 0) {
    return;
  }

  const detail = duplicates
    .map(([slug, files]) => `- ${slug}: ${files.join(", ")}`)
    .join("\n");

  throw new Error(`Blog loader: duplicate slugs found:\n${detail}`);
}

function warnPinnedOverflow(posts) {
  if (pinnedWarningsEmitted) {
    return;
  }

  const byCategory = new Map();

  for (const post of posts) {
    if (!post.pinned) {
      continue;
    }

    const categoryKey = normalizeCategorySlug(post.category);

    if (!byCategory.has(categoryKey)) {
      byCategory.set(categoryKey, []);
    }

    byCategory.get(categoryKey).push(post);
  }

  for (const [categoryKey, pinnedPosts] of byCategory.entries()) {
    if (pinnedPosts.length <= MAX_PINNED_PER_CATEGORY) {
      continue;
    }

    const kept = pinnedPosts
      .slice(0, MAX_PINNED_PER_CATEGORY)
      .map((post) => post.slug)
      .join(", ");

    console.warn(
      `Blog loader: category "${categoryKey}" has ${pinnedPosts.length} pinned posts. ` +
        `Only the ${MAX_PINNED_PER_CATEGORY} most recent will be used: ${kept}`,
    );
  }

  pinnedWarningsEmitted = true;
}

function buildCache() {
  const posts = Object.entries(modules)
    .map(([file, rawMarkdown]) => normalizePost(file, rawMarkdown))
    .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());

  assertUniqueSlugs(posts);
  warnPinnedOverflow(posts);

  return posts;
}

function getCachedPosts() {
  if (!cachedPosts) {
    cachedPosts = buildCache();
  }

  return cachedPosts;
}

export function getAllPosts() {
  return [...getCachedPosts()];
}

export function getAllCategories() {
  const counts = new Map();

  for (const post of getCachedPosts()) {
    const category = post.category;
    counts.set(category, (counts.get(category) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([slug, count]) => ({
      slug,
      name: humanizeCategorySlug(slug) || slug,
      count,
    }))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getPostsByCategory(categorySlug) {
  const categoryKey = normalizeCategorySlug(categorySlug);

  return getCachedPosts().filter(
    (post) => normalizeCategorySlug(post.category) === categoryKey,
  );
}

export function getPinnedPostsByCategory(categorySlug, limit = 3) {
  const categoryKey = normalizeCategorySlug(categorySlug);
  const safeLimit = normalizeLimit(limit, 3);
  const cappedLimit = Math.min(safeLimit, MAX_PINNED_PER_CATEGORY);

  return getCachedPosts()
    .filter((post) => post.pinned && normalizeCategorySlug(post.category) === categoryKey)
    .slice(0, cappedLimit);
}

export function getLatestPosts(limit) {
  const posts = getCachedPosts();
  const safeLimit = normalizeLimit(limit, posts.length);

  return posts.slice(0, safeLimit);
}

// Example usage:
// console.log(getAllPosts());
