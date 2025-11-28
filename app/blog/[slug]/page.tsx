import { getPostBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import rehypeHighlight from 'rehype-highlight'; // <--- Import this

// Force static generation
export const dynamic = 'force-static';

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, content } = getPostBySlug(slug);

  // Configure MDX options
  const options = {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight], // <--- Activate the highlighter
    },
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8 md:p-24">
      {/* Back Button */}
      <div className="w-full max-w-3xl mb-8">
        <Link 
          href="/blog" 
          className="text-neon-green hover:underline font-mono text-sm transition-all"
        >
          &lt; BACK TO INTEL
        </Link>
      </div>

      {/* Article Header */}
      <article className="w-full max-w-3xl">
        <header className="mb-10 pb-10 border-b border-cyber-gray">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight text-white">
            {meta.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-cyber-muted font-mono text-sm items-center">
            <span className="border border-cyber-gray px-2 py-1 rounded bg-cyber-black/50">
              {meta.date}
            </span>
            <span className="text-cyber-gray">|</span>
            <div className="flex gap-2">
              {meta.tags?.map((tag: string) => (
                <span key={tag} className="text-neon-blue">#{tag}</span>
              ))}
            </div>
          </div>
        </header>

        {/* The Markdown Content Renders Here */}
        <div className="prose prose-invert max-w-none text-cyber-text leading-relaxed prose-headings:text-white prose-a:text-neon-blue prose-pre:bg-[#1e1e1e] prose-pre:border prose-pre:border-cyber-gray">
          <div className="space-y-6">
             {/* Pass options to MDXRemote */}
             <MDXRemote source={content} options={options} />
          </div>
        </div>
      </article>
    </main>
  );
}