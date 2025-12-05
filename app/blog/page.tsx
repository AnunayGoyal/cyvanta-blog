import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/mdx"; // <--- This connects to your file system
import { MDXRemote } from "next-mdx-remote/rsc"; 

// Define components to use inside MDX files
const components = {
};

// Helper function to get colors for different tags
const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  
  // SIGNALS (Green)
  if (t.includes("signals") || t.includes("recon") || t.includes("research")) 
    return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
    
  // VECTORS (Red)
  if (t.includes("vectors") || t.includes("offensive") || t.includes("ops") || t.includes("red team")) 
    return "text-red-500 border-red-500/20 bg-red-500/5";

  // PROTOCOLS (Cyan)
  if (t.includes("protocols") || t.includes("hardening") || t.includes("defense")) 
    return "text-cyan-400 border-cyan-400/20 bg-cyan-400/5";

  // Tech Sub-tags
  if (t.includes("ai")) return "text-purple-400 border-purple-400/20 bg-purple-400/5";
  if (t.includes("siem")) return "text-orange-400 border-orange-400/20 bg-orange-400/5";
  if (t.includes("blue team")) return "text-blue-400 border-blue-400/20 bg-blue-400/5";
  if (t.includes("network")) return "text-yellow-400 border-yellow-400/20 bg-yellow-400/5";
  
  return "text-gray-400 border-gray-400/20 bg-gray-400/5";
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // 1. Fetch the post from the file system (lib/mdx.ts)
  const post = await getPostBySlug(params.slug);

  // 2. If file not found in folders, return 404
  if (!post) {
    return notFound();
  }

  const { frontmatter, content } = post;

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono selection:bg-primary selection:text-black pb-24">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 md:pt-20">
        
        {/* Back Button */}
        <Link href="/" className="group inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-8">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">&lt;-</span>
          BACK TO INTEL
        </Link>

        {/* Report Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex gap-3 mb-6">
            {/* Map over tags from the MDX Frontmatter */}
            {frontmatter.tags && frontmatter.tags.map((tag: string) => (
              <span key={tag} className={`text-xs font-bold border px-2 py-1 rounded uppercase tracking-wider ${getTagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            {frontmatter.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 font-mono">
            <span className="text-primary mr-2">::</span>
            <time>{frontmatter.date}</time>
            <span className="mx-4">|</span>
            <span>By Anunay Goyal</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 max-w-none">
             {/* Render the MDX Content dynamically */}
             <MDXRemote source={content} components={components} />
        </article>

      </div>
    </div>
  );
}