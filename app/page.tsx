import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx";

// Helper: Converts names to Hex, or passes through your custom Hex codes
const getHexColor = (color: string) => {
  const defaults: Record<string, string> = {
    emerald: "#10b981", // Bright Green
    red: "#ef4444",     // Danger Red
    cyan: "#06b6d4",    // Neon Blue
    purple: "#a855f7",  // Deep Purple
    gray: "#6b7280",    // Stealth Gray
    orange: "#f97316",  // Warning Orange
    yellow: "#eab308",  // Alert Yellow
  };

  // Return the mapped hex, or the raw string if it's already a hex code
  return defaults[color] || (color.startsWith("#") ? color : "#6b7280");
};

export default function Home() {
  const categories = getCategories();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-12 w-full max-w-[1600px] mx-auto overflow-x-hidden">

      {/* --- Top Section --- */}
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

      {/* --- Content Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pb-10">
        
        {categories.map((cat) => {
          // 1. Get the Hex Code
          const hexColor = getHexColor(cat.color);

          return (
            <Link 
              key={cat.slug}
              href={`/blog/category/${cat.slug}`} 
              // 2. Pass color as CSS Variable
              style={{ "--theme-color": hexColor } as React.CSSProperties}
              className={`
                group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm 
                transition-all duration-300 flex flex-col h-[350px] overflow-hidden
                
                /* Dynamic Hover Effects */
                hover:border-[var(--theme-color)] 
                hover:shadow-[0_0_20px_-10px_var(--theme-color)]
              `}
            >
              {/* Dynamic Background Glow */}
              <div 
                className="absolute inset-0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom right, color-mix(in srgb, var(--theme-color), transparent 90%), transparent)`
                }}
              ></div>
              
              {/* TOP SECTION: Fixed Height (48px) */}
              <div className="relative z-10 flex justify-between items-start h-12 shrink-0">
                <span className={`
                  text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 
                  transition-colors tracking-widest
                  group-hover:text-[var(--theme-color)]
                  group-hover:border-[var(--theme-color)]
                `}>
                  {cat.tag}
                </span>
                <span className="text-xs text-gray-500 uppercase">{cat.subtitle}</span>
              </div>

              {/* BOTTOM SECTION: Pushed Down */}
              <div className="relative z-10 mt-auto">
                
                {/* Heading Wrapper: Fixed Height (80px) */}
                <div className="h-20 flex items-end mb-2">
                  <h2 className={`
                    text-2xl font-bold transition-colors line-clamp-2
                    group-hover:text-[var(--theme-color)]
                  `}>
                    {cat.title} -&gt;
                  </h2>
                </div>
                
                {/* Description Wrapper: Fixed Height (96px) */}
                <div className="h-24 overflow-hidden">
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
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