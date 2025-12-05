import Link from "next/link";

// Helper function to get colors for different tags
const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  
  // 1. SIGNALS (Formerly Research) -> EMERALD/GREEN
  if (t.includes("signals") || t.includes("recon")) 
    return "text-emerald-400 border-emerald-400/20 bg-emerald-400/5";
    
  // 2. VECTORS (Formerly Red Team) -> RED
  if (t.includes("vectors") || t.includes("offensive") || t.includes("ops")) 
    return "text-red-500 border-red-500/20 bg-red-500/5";

  // 3. PROTOCOLS (Formerly Defense) -> CYAN/BLUE
  if (t.includes("protocols") || t.includes("hardening") || t.includes("defense")) 
    return "text-cyan-400 border-cyan-400/20 bg-cyan-400/5";

  // 4. Tech Sub-tags
  if (t.includes("ai")) return "text-purple-400 border-purple-400/20 bg-purple-400/5";
  if (t.includes("network")) return "text-yellow-400 border-yellow-400/20 bg-yellow-400/5";
  
  // Default Gray
  return "text-gray-400 border-gray-400/20 bg-gray-400/5";
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  // MOCK DATA - Updated tags to match the new "System Theme"
  const post = {
    title: "AI-Driven DDoS: The New Threat Landscape",
    date: "2025-11-28",
    tags: ["Signals", "Network", "AI"], // changed 'Research' to 'Signals'
  };

  return (
    <div className="min-h-screen bg-black text-gray-300 font-mono selection:bg-primary selection:text-black pb-24">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-12 md:pt-20">
        
        {/* Back Button */}
        <Link 
          href="/blog" 
          className="group inline-flex items-center text-sm text-gray-500 hover:text-primary transition-colors mb-8"
        >
          <span className="mr-2 transition-transform group-hover:-translate-x-1">&lt;-</span>
          BACK TO INTEL
        </Link>

        {/* Report Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <div className="flex gap-3 mb-6">
            {post.tags.map((tag) => (
              <span key={tag} className={`text-xs font-bold border px-2 py-1 rounded uppercase tracking-wider ${getTagColor(tag)}`}>
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center text-sm text-gray-500 font-mono">
            <span className="text-primary mr-2">::</span>
            <time>{post.date}</time>
            <span className="mx-4">|</span>
            <span>By Anunay Goyal</span>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-invert prose-headings:text-white prose-a:text-primary prose-code:text-primary prose-pre:bg-[#0a0a0a] prose-pre:border prose-pre:border-white/10 max-w-none">
             
             <p className="text-lg leading-relaxed mb-8">
               Traditional DDoS attacks rely on sheer volume. They flood a target with UDP packets until the pipes burst.
               But <strong className="text-white">AI-driven botnets</strong> are different. They are surgical.
             </p>

             <h3 className="text-xl font-bold text-white mb-4">Code Analysis</h3>
             <p className="mb-6">Here is a Python snippet showing how a basic anomaly detection system might flag these requests:</p>
             
             {/* STYLED CODE BLOCK START */}
             <div className="not-prose my-8">
               <div className="bg-[#0D0D0D] border border-white/10 rounded-md overflow-hidden shadow-2xl">
                 {/* Terminal Header */}
                 <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                   </div>
                   <span className="text-xs text-gray-500 font-mono">script.py</span>
                 </div>
                 
                 {/* Code Content */}
                 <div className="p-6 overflow-x-auto bg-[#0a0a0a]">
                   {/* NOTE: Used 'whitespace-pre' and manual {"\n"} to force line breaks.
                      The code is aligned to the left to prevent extra indentation.
                   */}
                    <pre className="text-sm font-mono leading-relaxed whitespace-pre">
                      {/* Line 1 */}
                      <span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np{"\n"}
                      {"\n"}
                      {/* Line 2 */}
                      <span className="text-purple-400">def</span> <span className="text-blue-400">detect_anomaly</span>(latency_array):{"\n"}
                      {/* Line 3 */}
                      {"    "}<span className="text-gray-500"># Calculate dynamic threshold based on standard deviation</span>{"\n"}
                      {/* Line 4 */}
                      {"    "}threshold = np.<span className="text-blue-400">mean</span>(latency_array) + (<span className="text-orange-400">3</span> * np.<span className="text-blue-400">std</span>(latency_array)){"\n"}
                      {/* Line 5 */}
                      {"    "}anomalies = []{"\n"}
                      {"\n"}
                      {/* Line 6 */}
                      {"    "}<span className="text-purple-400">for</span> val <span className="text-purple-400">in</span> latency_array:{"\n"}
                      {/* Line 7 */}
                      {"        "}<span className="text-purple-400">if</span> val &gt; threshold:{"\n"}
                      {/* Line 8 */}
                      {"            "}anomalies.<span className="text-blue-400">append</span>(val){"\n"}
                      {"\n"}
                      {/* Line 9 */}
                      {"    "}<span className="text-purple-400">return</span> anomalies
                    </pre>
                 </div>
               </div>
             </div>
             {/* STYLED CODE BLOCK END */}

             <p>This script looks for outliers that statistically deviate from the baseline latency...</p>
        </article>

      </div>
    </div>
  );
}