import type { CSSProperties } from "react";
import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx";

// Helper: Converts names to Hex, or passes through your custom Hex codes
const getHexColor = (color: string) => {
  const defaults: Record<string, string> = {
    emerald: "#10b981",
    red: "#ef4444",
    cyan: "#06b6d4",
    purple: "#a855f7",
    gray: "#6b7280",
    orange: "#f97316",
    yellow: "#eab308",
  };

  return defaults[color] || (color.startsWith("#") ? color : "#6b7280");
};

export default function Home() {
  const categories = getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">

      {/* --- Top Section --- */}
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-10 md:mb-16 text-sm font-mono text-gray-400">
        <div className="border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3 bg-black/50 backdrop-blur-sm w-full md:w-auto justify-center">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>

          <span className="tracking-wide">
            System Status: <span className="text-white font-bold">ONLINE</span>
          </span>
        </div>

        <a
          href="https://anunaygoyal.github.io/portfolio"
          target="_blank"
          className="hover:text-primary transition-colors text-xs md:text-sm"
        >
          By Anunay Goyal
        </a>
      </div>

      {/* --- Hero Section --- */}
      <div className="mb-10 md:mb-16 relative z-10 text-center w-full min-h-[80px] flex items-center justify-center">
        <HeroTitle />
        <div className="absolute inset-0 bg-primary/10 blur-[80px] md:blur-[120px] rounded-full z-[-1] pointer-events-none" />
      </div>

      {/* --- Category Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full pb-10">
        {categories.map((cat) => {
          const hexColor = getHexColor(cat.color);

          return (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              style={{ "--theme-color": hexColor } as CSSProperties}
              className={`
                group relative border border-white/10 bg-[#0a0a0a] 
                p-4 md:p-5 rounded-sm transition-all duration-300 
                flex flex-col h-[260px] md:h-[280px] overflow-hidden
                hover:border-[var(--theme-color)] 
                hover:shadow-[0_0_18px_-10px_var(--theme-color)]
              `}
            >

              {/* Glow BG */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom right, color-mix(in srgb, var(--theme-color), transparent 90%), transparent)",
                }}
              />

              {/* TOP SECTION */}
              <div className="relative z-10 flex justify-between items-start h-10 shrink-0">
                {/* --- Bigger TAG Chip --- */}
                <span
                  className={`
                    text-[11px] font-bold border border-white/25 px-3 py-[3px] rounded-sm text-gray-300 
                    transition-colors tracking-[0.22em]
                    group-hover:text-[var(--theme-color)]
                    group-hover:border-[var(--theme-color)]
                  `}
                >
                  {cat.tag}
                </span>

                <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                  {cat.subtitle}
                </span>
              </div>

              {/* BOTTOM SECTION */}
              <div className="relative z-10 mt-auto">
                {/* Title */}
                <div className="h-[70px] flex items-end mb-1">
                  <h2
                    className={`
                      text-lg md:text-xl font-bold transition-colors line-clamp-2
                      group-hover:text-[var(--theme-color)]
                    `}
                  >
                    {cat.title} →
                  </h2>
                </div>

                {/* Description */}
                <div className="h-[80px] overflow-hidden">
                  <p className="text-xs md:text-sm text-gray-400 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
