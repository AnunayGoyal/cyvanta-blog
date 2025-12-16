import type { CSSProperties } from "react";
import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx";
import NetworkBackground from "@/components/NetworkBackground";
import CategoryCard from "@/components/CategoryCard";


export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 pt-32 md:p-12 md:pt-36 w-full max-w-[90vw] mx-auto overflow-x-hidden relative">
      <NetworkBackground />

      {/* --- Top Section --- */}
      <div
        className={`
          w-full flex flex-col md:flex-row justify-between items-center gap-4 
          mb-10 md:mb-16 text-sm font-mono text-muted
          motion-safe:animate-fadeInUp
        `}
        style={{ animationDelay: "80ms" }}
      >
        <div className="border border-black/20 dark:border-white/20 px-4 py-2 rounded-sm flex items-center gap-3 bg-white/80 dark:bg-black/40 backdrop-blur-sm transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-pulseSoft absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="tracking-wide">
            System Status: <span className="text-foreground font-bold">ONLINE</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://anunaygoyal.github.io/portfolio"
            target="_blank"
            className="hover:text-primary transition-colors text-xs md:text-sm"
          >
            By Anunay Goyal
          </a>


        </div>
      </div>

      {/* --- Hero Section --- */}
      <div
        className="
          mb-10 md:mb-16 relative z-10 text-center w-full min-h-[80px] 
          flex flex-col items-center justify-center gap-2
          motion-safe:animate-fadeInUp
        "
        style={{ animationDelay: "180ms" }}
      >
        <HeroTitle />

        {/* Typing cursor / console subtitle */}
        <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-muted flex items-center gap-1">
          Security Research Console
          <span className="animate-blink">▌</span>
        </div>

        {/* Glow removed for cleaner solid look */}
      </div>

      {/* --- Category Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full pb-10">
        {categories.map((cat, index) => (
          <CategoryCard key={cat.slug} category={cat} index={index} />
        ))}
      </div>
    </main>
  );
}
