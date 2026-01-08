"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { CSSProperties } from "react";
import type { FullPostMeta } from "@/lib/mdx";

type Props = {
  posts: FullPostMeta[];
};

// Same color mapping as homepage
const getHexColor = (color: string | undefined) => {
  const c = (color || "").toLowerCase().trim();
  const defaults: Record<string, string> = {
    emerald: "#10b981",
    green: "#10b981",
    red: "#ef4444",
    cyan: "#06b6d4",
    blue: "#3b82f6",
    purple: "#a855f7",
    gray: "#6b7280",
    orange: "#f97316",
    yellow: "#eab308",
    pink: "#ec4899",
    indigo: "#6366f1",
  };

  return defaults[c] || (c.startsWith("#") ? c : "#6b7280");
};

export default function BlogExplorer({ posts }: Props) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [tag, setTag] = useState<string>("all");

  const categories = useMemo(() => {
    const map = new Map<string, string>(); // slug -> title
    posts.forEach((p) => {
      if (!map.has(p.categorySlug)) {
        map.set(p.categorySlug, p.categoryTitle || 'Uncategorized');
      }
    });
    return Array.from(map.entries()).map(([slug, title]) => ({ slug, title }));
  }, [posts]);

  const tags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => (p.tags ?? []).forEach((t) => set.add(t)));
    return Array.from(set.values()).sort((a, b) => a.localeCompare(b));
  }, [posts]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return posts.filter((post) => {
      if (category !== "all" && post.categorySlug !== category) return false;
      if (tag !== "all" && !(post.tags ?? []).some((t) => t === tag)) return false;

      if (!q) return true;

      const haystack = (
        post.title +
        " " +
        (post.summary ?? "") +
        " " +
        post.categoryTitle +
        " " +
        (post.tags ?? []).join(" ")
      ).toLowerCase();

      return haystack.includes(q);
    });
  }, [posts, search, category, tag]);

  const isFiltered =
    search.trim().length > 0 || category !== "all" || tag !== "all";

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Controls */}
      <section className="mb-8 border border-white/10 bg-black/40 rounded-sm p-4 md:p-5">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search box */}
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Search
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, summary, or tags..."
              className="w-full bg-black/60 border border-white/15 rounded-sm px-3 py-2 text-sm text-gray-100 outline-none focus:border-primary"
            />
          </div>

          {/* Category select */}
          <div className="w-full md:w-[200px]">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.16em] text-gray-100 outline-none focus:border-primary"
            >
              <option value="all">ALL CATEGORIES</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Tag select */}
          <div className="w-full md:w-[200px]">
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
              Tag
            </label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              className="w-full bg-black/60 border border-white/15 rounded-sm px-3 py-2 text-xs uppercase tracking-[0.16em] text-gray-100 outline-none focus:border-primary"
            >
              <option value="all">ALL TAGS</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Result meta */}
      <div className="mb-4 text-xs font-mono text-gray-500 tracking-[0.18em] uppercase">
        {filtered.length} records found
        {isFiltered && <span className="text-gray-400"> (filtered)</span>}
      </div>

      {/* Main list */}
      <section className="space-y-3">
        {filtered.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-gray-500">
            No posts match your query. Try clearing filters or changing the
            search terms.
          </p>
        )}
      </section>
    </div>
  );
}

function PostRow({
  post,
  highlightCategory,
}: {
  post: FullPostMeta;
  highlightCategory?: boolean;
}) {
  const themeColor = getHexColor(post.categoryColor || 'gray');

  const rowStyle: CSSProperties = {
    "--theme-color": themeColor,
  } as CSSProperties;

  if (highlightCategory) {
    // Slight glow for recommended, but border itself stays white
    rowStyle.boxShadow = "0 0 18px -14px var(--theme-color)";
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={rowStyle}
      className={`
        group relative block rounded-sm 
        border border-white/20 bg-transparent
        px-4 py-3 md:px-5 md:py-4
        hover:border-white/60 hover:bg-white/5
        hover:-translate-y-[2px]
        transition
        motion-safe:animate-fadeInUp
      `}
    >
      {/* Scanline sweep on hover */}
      <div
        className="pointer-events-none absolute inset-x-0 -inset-y-4 opacity-0 group-hover:opacity-100 group-hover:motion-safe:animate-scanline"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)",
        }}
      />

      {/* Category chip only (no repeated tags) */}
      <div className="mb-2 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em]">
        <span
          className="px-2 py-[3px] rounded-sm border"
          style={{
            borderColor: themeColor,
            color: themeColor,
          }}
        >
          {post.categoryTag || 'GENERAL'}
        </span>
      </div>

      {/* Title + date */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 mb-1">
        <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-[var(--theme-color)] transition-colors">
          {post.title}
        </h3>
        {post.date && (
          <span className="text-[11px] font-mono text-gray-500">
            {post.date}
          </span>
        )}
      </div>

      {/* Summary */}
      {post.summary && (
        <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
          {post.summary}
        </p>
      )}
    </Link>
  );
}
