import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">

      {/* --- Top Section: Status & Bio --- */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-16 md:mb-32 text-sm font-mono text-gray-400">
        <div className="border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3 bg-black/50 backdrop-blur-sm w-full md:w-auto justify-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="tracking-wide">System Status: <span className="text-white font-bold">ONLINE</span></span>
        </div>
        
        <a href="https://anunaygoyal.github.io/portfolio" target="_blank" className="hover:text-primary transition-colors text-xs md:text-sm">
          By Anunay Goyal
        </a>
      </div>

      {/* --- Hero Section --- */}
      <div className="mb-16 md:mb-32 relative z-10 text-center w-full min-h-[100px] flex items-center justify-center">
        <HeroTitle />
        <div className="absolute inset-0 bg-primary/10 blur-[80px] md:blur-[120px] rounded-full z-[-1] pointer-events-none"></div>
      </div>

      {/* --- Content Grid (Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full pb-10 items-stretch">
        
        {/* CARD 1: SIGNALS CATEGORY */}
        <Link href="/blog/category/signals" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-emerald-500/50 transition-all duration-300 flex flex-col h-full min-h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-auto">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-emerald-500 group-hover:text-emerald-500 transition-colors tracking-widest">
              SIGNALS
            </span>
            <span className="text-xs text-gray-500">LATEST INTEL</span>
          </div>

          <div className="relative z-10 mt-12">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-500 transition-colors">
              Threat Intelligence -&gt;
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Analysis of emerging patterns, AI-driven botnets, and global cyber warfare anomalies.
            </p>
          </div>
        </Link>

        {/* CARD 2: VECTORS CATEGORY */}
        <Link href="/blog/category/vectors" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-primary/50 transition-all duration-300 flex flex-col h-full min-h-[280px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start mb-auto">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-primary group-hover:text-primary transition-colors tracking-widest">
              VECTORS
            </span>
            <span className="text-xs text-gray-500">ACTIVE OPS</span>
          </div>

          <div className="relative z-10 mt-12">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
              Offensive Operations -&gt;
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Advanced simulation of attack paths, CTF walkthroughs, and privilege escalation techniques.
            </p>
          </div>
        </Link>

        {/* CARD 3: PROTOCOLS CATEGORY */}
        <Link href="/blog/category/protocols" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-cyan-500/50 transition-all duration-300 flex flex-col h-full min-h-[280px] overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start mb-auto">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-cyan-500 group-hover:text-cyan-500 transition-colors tracking-widest">
              PROTOCOLS
            </span>
            <span className="text-xs text-gray-500">SYSTEM HARDENING</span>
          </div>

          <div className="relative z-10 mt-12">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-500 transition-colors">
              Defense Mechanisms -&gt;
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Blue team strategies, SIEM log analysis, and infrastructure security compliance.
            </p>
          </div>
        </Link>

      </div>
    </main>
  );
}