import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="flex flex-col items-center min-h-screen p-8 md:p-24">
      
      {/* HEADER */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <Link href="/" className="text-cyber-muted hover:text-neon-green transition-colors">
          &lt; RETURN TO BASE
        </Link>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-12 text-center">
        INTELLIGENCE <span className="text-neon-green">FEED</span>
      </h1>

      {/* POSTS GRID */}
      <div className="grid gap-6 w-full max-w-4xl">
        {posts.map((post: any) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block border border-cyber-gray bg-cyber-black/50 p-6 rounded-xl hover:border-neon-green transition-all"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 group-hover:text-neon-green transition-colors">
                  {post.meta.title}
                </h2>
                <p className="text-cyber-muted mb-3 text-sm">{post.meta.description}</p>
                
                {/* Tags Section */}
                <div className="flex gap-2">
                  {/* FIX: Added '?' here to prevent crash if tags are missing */}
                  {post.meta.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs font-mono border border-cyber-gray px-2 py-1 rounded text-neon-blue bg-cyber-gray/30">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Date Badge */}
              <span className="text-xs font-mono text-cyber-muted border border-cyber-gray px-3 py-1 rounded whitespace-nowrap">
                {post.meta.date}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}