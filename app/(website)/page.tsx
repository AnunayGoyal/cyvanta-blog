import type { CSSProperties } from "react";
import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx";

// Helper: Converts names to Hex, or passes through your custom Hex codes
// Helper: Converts names to Hex, or passes through your custom Hex codes
const getHexColor = (color: string | undefined) => {
  const c = (color || "").toLowerCase().trim();
  const defaults: Record<string, string> = {
    emerald: "#10b981",
    green: "#10b981",
    red: "#ef4444",
    cyan: "#06b6d4",
    blue: "#3b82f6",
    purple: "#a855f7",
    gray: "#6b7280",
    orange: "#f97316",
    yellow: "#eab308",
    pink: "#ec4899",
    indigo: "#6366f1",
  };

  return defaults[c] || (c.startsWith("#") ? c : "#6b7280");
};

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">
      {/* --- Top Section --- */}
      <div
        className={`
          w-full flex flex-col md:flex-row justify-between items-center gap-4 
          mb-10 md:mb-16 text-sm font-mono text-gray-400
          motion-safe:animate-fadeInUp
        `}
        style={{ animationDelay: "80ms" }}
      >
        <div className="border border-white/20 px-4 py-2 rounded-sm flex items-center gap-3 bg-black/40 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="motion-safe:animate-pulseSoft absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="tracking-wide">
            System Status: <span className="text-white font-bold">ONLINE</span>
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
        <div className="text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] text-gray-500 flex items-center gap-1">
          Security Research Console
          <span className="animate-blink">▌</span>
        </div>

        <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full z-[-1] pointer-events-none" />
      </div>

      {/* --- Category Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full pb-10">
        {categories.map((cat, index) => {
          const hexColor = getHexColor(cat.color);

          return (
            <Link
              key={cat.slug}
              href={`/blog/category/${cat.slug}`}
              style={
                {
                  "--theme-color": hexColor,
                  animationDelay: `${220 + index * 80}ms`,
                } as CSSProperties
              }
              className={`
                group relative border border-white/10 bg-[#0a0a0a] 
                p-4 md:p-5 rounded-sm transition-all duration-300 
                flex flex-col h-[260px] md:h-[280px] overflow-hidden
                hover:border-[var(--theme-color)] 
                hover:-translate-y-1
                motion-safe:animate-fadeInUp
              `}
            >
              {/* Continuous scanline sweep on hover */}
              <div
                className="pointer-events-none absolute inset-x-0 -inset-y-4 opacity-0 group-hover:opacity-100 group-hover:motion-safe:animate-scanlineLoop"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                }}
              />

              {/* (Glow background removed to avoid white flash) */}

              {/* TOP SECTION */}
              <div className="relative z-10 flex justify-between items-start h-10 shrink-0">
                {/* Tag chip */}
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
