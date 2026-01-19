import Link from "next/link";
import { FullPostMeta } from "@/lib/mdx";
import CategoryCard from "@/components/CategoryCard";

export default function RelatedIntel({ posts }: { posts: FullPostMeta[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 mt-24 mb-12 border-t border-border pt-12">
      <div className="flex items-center gap-2 mb-8 text-sm font-mono text-muted-foreground uppercase tracking-widest">
        <span className="text-primary text-xl font-bold mr-2">&gt;</span>
        RELATED_INTEL
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          // Use CategoryCard logic but mapped for post data structure
          // CategoryCard expects: { slug, tag, color, subtitle, title, description }
          // PostMeta has: { slug, title, summary, categorySlug, tags, categoryTitle, categoryColor, categoryTag }
          
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group relative border border-border bg-background p-5 rounded-sm transition-all duration-300 hover:border-primary/50 flex flex-col h-[280px]"
          >
            {/* Tag */}
            <div className="flex justify-between items-start mb-auto">
                <span 
                    className="text-[10px] font-bold border px-2 py-1 rounded-sm uppercase tracking-widest"
                    style={{ 
                        color: post.categoryColor || 'currentColor',
                        borderColor: post.categoryColor || 'currentColor'
                    }}
                >
                    {post.categoryTag || 'INTEL'}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                    {post.date ? new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </span>
            </div>

            {/* Content */}
            <div className="mt-4">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.summary}
                </p>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-xs text-muted-foreground font-mono">
                <span>READ_LOG</span>
                 <span className="group-hover:translate-x-1 transition-transform">-&gt;</span>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}
