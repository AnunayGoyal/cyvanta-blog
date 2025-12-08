import { getCategories, getPostsByCategorySlug } from "@/lib/mdx";
import Link from "next/link";
import type { CSSProperties } from "react";

// Same color helper used on homepage
const getHexColor = (color: string) => {
  const defaults: Record<string, string> = {
    emerald: "#10b981",
    red: "#ef4444",
    cyan: "#06b6d4",
    purple: "#a855f7",
    gray: "#6b7280",
    orange: "#f97316",
    yellow: "#eab308",
  };

  return defaults[color] || (color.startsWith("#") ? color : "#6b7280");
};

// IMPORTANT: params is a Promise in this Next.js version
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params; // e.g. "cloud-security", "defense-mechanisms", etc.

  const categories = getCategories();

  // Slug === folder name (what you use in href={`/blog/category/${cat.slug}`})
  const lowered = tag.toLowerCase();
  const category = categories.find(
    (c) => c.slug.toLowerCase() === lowered
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto p-8 text-gray-400 font-mono">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white transition block mb-4"
        >
          ← Return Root
        </Link>
        <h1 className="text-xl">Category not found.</h1>
      </div>
    );
  }

  const posts = getPostsByCategorySlug(category.slug);
  const themeColor = getHexColor(category.color);

  return (
    <div
      style={{ "--theme-color": themeColor } as CSSProperties}
      className="max-w-5xl mx-auto px-4 md:px-8 py-10 font-mono"
    >
      {/* Return Root */}
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-[var(--theme-color)] transition"
      >
        ← Return Root
      </Link>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mt-4">
        DIRECTORY:{" "}
        <span className="text-[var(--theme-color)]">{category.title}</span>
      </h1>

      {/* Record count */}
      <p className="text-xs tracking-[0.2em] text-gray-500 mt-2">
        {posts.length} RECORDS FOUND IN "{category.slug.toUpperCase()}"
      </p>

      {/* Category Description */}
      {category.description && (
        <p className="mt-4 max-w-2xl text-sm text-gray-400 leading-relaxed">
          {category.description}
        </p>
      )}

      {/* Divider line */}
      <div className="mt-6 h-px w-full bg-white/10" />

      {/* Posts */}
      <div className="mt-6 space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`
              group block border border-white/10 rounded-sm p-5 bg-black/30
              transition hover:border-[var(--theme-color)] hover:bg-black/40
            `}
          >
            {/* TAGS */}
            <div className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] mb-2">
              <span
                className="px-2 py-[3px] border rounded-sm"
                style={{
                  color: themeColor,
                  borderColor: themeColor,
                }}
              >
                {category.tag}
              </span>

              {post.tags?.map((t) => (
                <span
                  key={t}
                  className="px-2 py-[3px] border border-white/20 text-gray-300 rounded-sm"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Title & Date */}
            <div className="flex justify-between items-center gap-3">
              <h2 className="text-lg md:text-xl text-white group-hover:text-[var(--theme-color)] transition">
                {post.title}
              </h2>
              {post.date && (
                <span className="text-xs text-gray-400">{post.date}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
