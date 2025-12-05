import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-12 w-full max-w-[1600px] mx-auto">

      {/* --- Top Section: Status & Bio --- */}
      <div className="w-full flex justify-between items-center mb-32 text-sm font-mono text-gray-400">
        
        {/* System Status Indicator */}
        <div className="border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3 bg-black/50 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="tracking-wide">System Status: <span className="text-white font-bold">ONLINE</span></span>
        </div>
        
        {/* Author Link */}
        <a href="https://anunaygoyal.github.io/portfolio" target="_blank" className="hover:text-primary transition-colors">
          By Anunay Goyal
        </a>
      </div>

      {/* --- Hero Section --- */}
      <div className="mb-32 relative z-10 text-center h-[120px] md:h-[160px] flex items-center justify-center">
        {/* Replaced static text with the typing component */}
        <HeroTitle />
        
        {/* Subtle glow behind the text */}
        <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full z-[-1] pointer-events-none"></div>
      </div>

{/* --- Content Grid (Cards) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        {/* CARD 1: RESEARCH (GREEN HOVER) */}
        <Link href="/blog/ai-driven-ddos" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-green-500/50 transition-all duration-300 flex flex-col justify-between min-h-[280px] overflow-hidden">
          {/* Hover Glow Effect (Green) */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-4">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-green-500 group-hover:text-green-500 transition-colors">RESEARCH</span>
            <span className="text-xs text-gray-500">Nov 28, 2025</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-green-500 transition-colors">AI-Driven DDoS -&gt;</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Analyzing patterns in adversarial machine learning attacks against critical infrastructure.</p>
          </div>
        </Link>

        {/* CARD 2: RED TEAM (RED HOVER - Default) */}
        <Link href="#" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-primary/50 transition-all duration-300 flex flex-col justify-between min-h-[280px] overflow-hidden">
          {/* Hover Glow Effect (Red) */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start mb-4">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-primary group-hover:text-primary transition-colors">RED TEAM</span>
            <span className="text-xs text-gray-500">Oct 15, 2025</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Wonderland CTF -&gt;</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Full walkthrough involving Python library hijacking and privilege escalation.</p>
          </div>
        </Link>

        {/* CARD 3: DEFENSE (BLUE HOVER) */}
        <Link href="#" className="group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between min-h-[280px] overflow-hidden">
           {/* Hover Glow Effect (Blue) */}
           <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10 flex justify-between items-start mb-4">
            <span className="text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">DEFENSE</span>
            <span className="text-xs text-gray-500">Sep 02, 2025</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-500 transition-colors">Splunk Analysis -&gt;</h2>
            <p className="text-gray-400 text-sm leading-relaxed">Detecting brute force attempts and lateral movement in Windows Event Logs.</p>
          </div>
        </Link>

      </div>
    </main>
  );
}