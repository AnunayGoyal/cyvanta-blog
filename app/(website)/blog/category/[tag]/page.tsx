import { getCategories, getPostsByCategorySlug } from "@/lib/mdx";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getCategoryHex, getTagProps } from "@/lib/tags";

// IMPORTANT: params is a Promise in this Next.js version
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params; // e.g. "cloud-security", "defense-mechanisms", etc.

  const categories = await getCategories();

  // Slug === folder name (what you use in href={`/blog/category/${cat.slug}`})
  const lowered = tag.toLowerCase();
  const category = categories.find(
    (c) => c.slug.toLowerCase() === lowered
  );

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto p-8 pt-32 text-gray-500 dark:text-gray-400 font-mono">
        <Link
          href="/"
          className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition block mb-4"
        >
          ← Return Root
        </Link>
        <h1 className="text-xl">Category not found.</h1>
      </div>
    );
  }

  const posts = await getPostsByCategorySlug(category.slug);
  const themeColor = getCategoryHex(category.color);

  return (
    <div
      style={{ "--theme-color": themeColor } as CSSProperties}
      className="max-w-5xl mx-auto px-4 md:px-8 pt-32 pb-10 font-mono"
    >
      {/* Return Root */}
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[var(--theme-color)] transition"
      >
        ← Return Root
      </Link>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold mt-4 text-foreground">
        DIRECTORY:{" "}
        <span className="text-[var(--theme-color)]">{category.title}</span>
      </h1>

      {/* Record count */}
      <p className="text-xs tracking-[0.2em] text-gray-500 mt-2">
        {posts.length} RECORDS FOUND IN "{category.slug.toUpperCase()}"
      </p>

      {/* Category Description */}
      {category.description && (
        <p className="mt-4 max-w-2xl text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {category.description}
        </p>
      )}

      {/* Divider line */}
      <div className="mt-6 h-px w-full bg-foreground/10" />

      {/* Posts */}
      <div className="mt-6 space-y-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={`
              group block border border-foreground/10 rounded-sm p-5 bg-card
              transition hover:border-[var(--theme-color)] hover:shadow-md
            `}
          >
            {/* TAGS */}
            <div className="flex items-center flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] mb-2">
              {/* Category Tag */}
              <span
                className="px-2 py-[3px] border rounded-sm"
                style={{
                  color: themeColor,
                  borderColor: themeColor,
                }}
              >
                {category.tag}
              </span>

              {/* Post Tags - STRICT FILTER for strings only */}
              {post.tags?.filter(t => typeof t === 'string').map((tag) => {
                const props = getTagProps(tag, null);
                return (
                  <span
                    key={tag}
                    className={props.className}
                    style={props.style}
                  >
                    {tag}
                  </span>
                )
              })}
            </div>

            {/* Title & Date */}
            <div className="flex justify-between items-center gap-3">
              <h2 className="text-lg md:text-xl text-foreground group-hover:text-[var(--theme-color)] transition line-clamp-1">
                {post.title}
              </h2>
              {post.date && (
                <span className="text-xs text-gray-500 whitespace-nowrap">{post.date}</span>
              )}
            </div>

            {/* Summary */}
            {post.summary && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                {post.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
