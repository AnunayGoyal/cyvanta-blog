import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* -------------------------------------------------------------------------- */
/*                         Helper: find all MDX files                         */
/* -------------------------------------------------------------------------- */

function getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/* -------------------------------------------------------------------------- */
/*                                Single Post                                 */
/* -------------------------------------------------------------------------- */

export async function getPostBySlug(slug: string) {
  if (!slug) return null;

  const realSlug = slug.replace(/\.mdx$/, "");
  const allFiles = getAllMdxFiles(CONTENT_DIR);

  const matchedPath = allFiles.find((filePath) => {
    const fileName = path.basename(filePath, ".mdx");
    return fileName === realSlug;
  });

  if (!matchedPath) return null;

  const fileContents = fs.readFileSync(matchedPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    frontmatter: data,
    content,
  };
}

/**
 * Legacy helper: all posts across all categories, minimal info.
 */
export function getAllPosts() {
  const allFiles = getAllMdxFiles(CONTENT_DIR);

  return allFiles.map((filePath) => {
    const slug = path.basename(filePath, ".mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return { slug, frontmatter: data };
  });
}

/* -------------------------------------------------------------------------- */
/*                                Categories                                  */
/* -------------------------------------------------------------------------- */

export interface CategoryMeta {
  slug: string;        // folder name under /content
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  color: string;
}

/**
 * Reads all category folders from /content and their meta.json files.
 * - slug = folder name (e.g. "cloud-security")
 */
export function getCategories(): CategoryMeta[] {
  const items = fs.readdirSync(CONTENT_DIR);

  const categories: CategoryMeta[] = items
    .filter((item) => {
      const fullPath = path.join(CONTENT_DIR, item);
      return fs.statSync(fullPath).isDirectory();
    })
    .map((folderName) => {
      const metaPath = path.join(CONTENT_DIR, folderName, "meta.json");

      // Default values if meta.json is missing
      let meta = {
        title: folderName.replace(/-/g, " ").toUpperCase(),
        subtitle: "CATEGORY",
        tag: folderName.toUpperCase(),
        description: "No description available.",
        color: "gray",
      };

      if (fs.existsSync(metaPath)) {
        const fileContent = fs.readFileSync(metaPath, "utf8");
        try {
          meta = { ...meta, ...JSON.parse(fileContent) };
        } catch (e) {
          console.error(`Error parsing meta.json for ${folderName}`, e);
        }
      }

      return {
        slug: folderName, // URL segment & category identifier
        ...meta,
      };
    });

  return categories;
}

/* -------------------------------------------------------------------------- */
/*                             Posts by Category                              */
/* -------------------------------------------------------------------------- */

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  categorySlug: string; // folder name
  tags?: string[];
};

/**
 * Returns all posts under a given category.
 * categorySlug MUST equal the folder name (e.g. "cloud-security").
 */
export function getPostsByCategorySlug(categorySlug: string): PostMeta[] {
  const categoryDir = path.join(CONTENT_DIR, categorySlug);

  if (!fs.existsSync(categoryDir)) {
    return [];
  }

  const files = fs
    .readdirSync(categoryDir)
    .filter((file) => file.endsWith(".mdx"));

  const posts: PostMeta[] = files.map((file) => {
    const fullPath = path.join(categoryDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);

    const slug = file.replace(/\.mdx$/, "");

    return {
      slug,
      title: (data as any).title ?? slug,
      date: (data as any).date ?? undefined,
      summary: (data as any).summary ?? "",
      categorySlug,
      tags: (data as any).tags ?? [],
    };
  });

  // Sort by date descending (if date is present)
  return posts.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}

/* -------------------------------------------------------------------------- */
/*                    Global helpers for search / filters                     */
/* -------------------------------------------------------------------------- */

export type FullPostMeta = PostMeta & {
  categoryTitle: string;   // Human readable category name
  categoryTag: string;     // Short label (PROTOCOLS, VECTORS, etc.)
  categoryColor: string;   // "cyan", "emerald", "#ff0000", etc.
};

/**
 * Returns all posts across all categories with full metadata,
 * ideal for search, filters, and recommendations.
 */
export function getAllPostsDetailed(): FullPostMeta[] {
  const categories = getCategories();
  const all: FullPostMeta[] = [];

  for (const cat of categories) {
    const posts = getPostsByCategorySlug(cat.slug);
    for (const post of posts) {
      all.push({
        ...post,
        categoryTitle: cat.title,
        categoryTag: cat.tag,
        categoryColor: cat.color,
      });
    }
  }

  // Sort globally by date desc when available
  return all.sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });
}

/**
 * Get a unique, sorted list of all tags across all posts.
 */
export function getAllTags(): string[] {
  const posts = getAllPostsDetailed();
  const tagSet = new Set<string>();

  for (const post of posts) {
    (post.tags ?? []).forEach((t) => {
      if (t && typeof t === "string") {
        tagSet.add(t);
      }
    });
  }

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
}

/**
 * Get related posts for a given slug based on shared tags + same category.
 * By default, returns up to `limit` posts.
 */
export function getRelatedPosts(
  slug: string,
  limit: number = 4
): FullPostMeta[] {
  const posts = getAllPostsDetailed();
  const current = posts.find((p) => p.slug === slug);

  if (!current) return [];

  const currentTags = new Set(current.tags ?? []);

  // Score other posts
  const scored = posts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      let score = 0;

      // Same category gets a base boost
      if (p.categorySlug === current.categorySlug) score += 2;

      // Shared tags → +1 per tag
      const sharedTags = (p.tags ?? []).filter((t) => currentTags.has(t));
      score += sharedTags.length;

      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((x) => x.post);
}
