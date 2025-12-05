import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import { notFound } from "next/navigation";

// Force dynamic rendering to ensure new tags work instantly
export const dynamic = "force-dynamic";

// Helper for Tag Colors
const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes("signals") || t.includes("recon")) return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
  if (t.includes("vectors") || t.includes("red team")) return "text-red-500 border-red-500/20 bg-red-500/5";
  if (t.includes("protocols") || t.includes("defense")) return "text-cyan-400 border-cyan-400/20 bg-cyan-400/5";
  return "text-gray-400 border-gray-400/20 bg-gray-400/5";
};

// Next.js 15: params is a Promise
export default async function CategoryPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag).toLowerCase();

  // 1. Get ALL posts
  const allPosts = getAllPosts();

  // 2. Filter posts that have the matching tag
  const filteredPosts = allPosts.filter((post) => 
    post.frontmatter.tags?.some((t: string) => t.toLowerCase() === decodedTag)
  );

  // Optional: Sort by date (Newest first)
  const posts = filteredPosts.sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono pb-24">
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 md:pt-20">
        
        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-8">
          <Link href="/" className="text-sm text-gray-500 hover:text-primary mb-4 block">&lt;- RETURN ROOT</Link>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter uppercase mb-2">
            DIRECTORY: <span className={getTagColor(decodedTag).split(' ')[0]}>{decodedTag}</span>
          </h1>
          <p className="text-gray-400">
            {posts.length} RECORDS FOUND_
          </p>
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 gap-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group block border border-white/10 bg-[#0a0a0a] p-6 rounded-sm hover:border-white/30 transition-all duration-300 relative overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex gap-2 mb-2">
                      {post.frontmatter.tags?.map((t: string) => (
                        <span key={t} className={`text-[10px] font-bold border px-1.5 py-0.5 rounded uppercase tracking-wider ${getTagColor(t)}`}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {post.frontmatter.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500 font-mono shrink-0">
                    <span>{post.frontmatter.date}</span>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-2">
                      -&gt;
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-800 rounded">
              <p className="text-gray-500">NO DATA FOUND FOR CATEGORY "{decodedTag.toUpperCase()}"</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}