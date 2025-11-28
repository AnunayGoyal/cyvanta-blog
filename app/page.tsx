import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen p-8 md:p-24">
      
      {/* HERO BAR */}
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-20">
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-cyber-gray bg-cyber-black/80 backdrop-blur-md pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-cyber-gray lg:p-4">
          <p className="flex w-full justify-center lg:static lg:w-auto">
            <span className="text-neon-green mr-2">&gt;_</span> 
            System Status: <span className="text-neon-green ml-2 font-bold animate-pulse">ONLINE</span>
          </p>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-cyber-black via-cyber-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0 hover:text-neon-blue transition-colors"
            href="https://anunaygoyal.github.io/portfolio"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Anunay Goyal
          </a>
        </div>
      </div>

      {/* HERO TITLE - Corrected to "CYVANTA" only */}
      <div className="relative flex place-items-center mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white">
          <span className="text-neon-green">CYVANTA</span>
        </h1>
      </div>

      {/* BLOG GRID */}
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left gap-6">
        
        {/* Card 1: LINKED to your actual MDX File */}
        <Link
          href="/blog/ai-driven-ddos"
          className="group rounded-lg border border-cyber-gray px-5 py-4 transition-colors hover:border-neon-green hover:bg-cyber-gray/50"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-neon-blue border border-neon-blue px-2 py-1 rounded-full">RESEARCH</span>
            <span className="text-xs text-cyber-muted">Nov 28, 2025</span>
          </div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            AI-Driven DDoS{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-neon-green">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Analyzing patterns in adversarial machine learning attacks.
          </p>
        </Link>

        {/* Card 2: Placeholder */}
        <Link
          href="#"
          className="group rounded-lg border border-cyber-gray px-5 py-4 transition-colors hover:border-neon-red hover:bg-cyber-gray/50"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-neon-red border border-neon-red px-2 py-1 rounded-full">RED TEAM</span>
            <span className="text-xs text-cyber-muted">Oct 15, 2025</span>
          </div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Wonderland CTF{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-neon-red">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Full walkthrough involving Python library hijacking.
          </p>
        </Link>

        {/* Card 3: Placeholder */}
        <Link
          href="#"
          className="group rounded-lg border border-cyber-gray px-5 py-4 transition-colors hover:border-neon-green hover:bg-cyber-gray/50"
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-neon-green border border-neon-green px-2 py-1 rounded-full">DEFENSE</span>
            <span className="text-xs text-cyber-muted">Sep 02, 2025</span>
          </div>
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Splunk Analysis{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none text-neon-green">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Detecting brute force attempts in Windows Event Logs.
          </p>
        </Link>

      </div>
    </main>
  );
}