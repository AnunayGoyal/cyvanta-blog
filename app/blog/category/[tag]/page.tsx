import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategories, getPostsByCategorySlug } from "@/lib/mdx";

// In Next 15/16, `params` is a Promise in RSC routes
type CategoryPageProps = {
  params: Promise<{ tag: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { tag } = await params; // e.g. "defense-mechanisms", "cloud-security"

  // 1. Find the matching category by slug (slug === folder name in /content)
  const categories = getCategories();
  const category = categories.find((c) => c.slug === tag);

  if (!category) {
    notFound();
  }

  // 2. Get all posts under this category
  const posts = getPostsByCategorySlug(tag);
  const recordLabel = posts.length === 1 ? "RECORD" : "RECORDS";

  return (
    <main className="min-h-screen w-full max-w-6xl mx-auto px-4 py-10 md:py-16">
      {/* RETURN ROOT */}
      <div className="mb-4 md:mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-500 hover:text-primary transition-colors"
        >
          <span className="text-lg leading-none">←</span>
          <span className="uppercase tracking-[0.2em]">Return Root</span>
        </Link>
      </div>

      {/* DIRECTORY HEADER */}
      <header className="mb-8 md:mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
          <span className="text-gray-300">DIRECTORY:</span>{" "}
          <span className="text-cyan-400">
            {category.title.toUpperCase()}
          </span>
        </h1>

        <p className="text-[11px] md:text-xs font-mono uppercase tracking-[0.3em] text-gray-500 mb-2">
          {posts.length} {recordLabel} FOUND IN "{category.slug.toUpperCase()}"
        </p>

        <p className="text-sm md:text-base text-gray-400 max-w-2xl">
          {category.description}
        </p>
      </header>

      {/* POSTS LIST */}
      {posts.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No posts have been added to this directory yet.
        </p>
      ) : (
        <section className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`
                group relative block border border-white/10 rounded-sm 
                bg-black/60 px-4 py-4 md:px-6 md:py-5
                hover:border-cyan-400/60 hover:bg-black/80 transition
              `}
            >
              {/* TAG ROW */}
              <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-mono uppercase tracking-[0.18em]">
                {/* Primary category tag (from card) */}
                <span className="px-2 py-1 rounded-sm border border-cyan-400/40 bg-cyan-400/5 text-cyan-300">
                  {category.tag}
                </span>

                {/* Extra tags from post frontmatter, if any */}
                {post.tags &&
                  post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-sm border border-white/15 bg-white/5 text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* TITLE + DATE ROW */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <h2 className="text-base md:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h2>

                {post.date && (
                  <span className="text-xs font-mono text-gray-500">
                    {post.date}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
}

// Pre-generate static category pages based on all category slugs
export function generateStaticParams() {
  const categories = getCategories();
  return categories.map((cat) => ({ tag: cat.slug }));
}
