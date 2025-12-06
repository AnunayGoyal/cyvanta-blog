import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx"; // Import the new function

// Helper to map color names to Tailwind classes dynamically
const getColorClasses = (color: string) => {
  const colors: Record<string, any> = {
    emerald: {
      border: "hover:border-emerald-500/50",
      text: "group-hover:text-emerald-500",
      tagBorder: "group-hover:border-emerald-500",
      tagText: "group-hover:text-emerald-500",
      gradient: "from-emerald-500/10",
    },
    red: {
      border: "hover:border-red-500/50",
      text: "group-hover:text-red-500",
      tagBorder: "group-hover:border-red-500",
      tagText: "group-hover:text-red-500",
      gradient: "from-red-500/10",
    },
    cyan: {
      border: "hover:border-cyan-500/50",
      text: "group-hover:text-cyan-500",
      tagBorder: "group-hover:border-cyan-500",
      tagText: "group-hover:text-cyan-500",
      gradient: "from-cyan-500/10",
    },
    purple: { // Example of a new color you might use later
      border: "hover:border-purple-500/50",
      text: "group-hover:text-purple-500",
      tagBorder: "group-hover:border-purple-500",
      tagText: "group-hover:text-purple-500",
      gradient: "from-purple-500/10",
    },
    gray: { // Default fallback
      border: "hover:border-gray-500/50",
      text: "group-hover:text-gray-500",
      tagBorder: "group-hover:border-gray-500",
      tagText: "group-hover:text-gray-500",
      gradient: "from-gray-500/10",
    },
  };

  return colors[color] || colors.gray;
};

export default function Home() {
  // 1. Fetch categories dynamically from folders
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

      {/* --- Dynamic Content Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full pb-10 items-stretch">
        
        {categories.map((cat) => {
          const theme = getColorClasses(cat.color);

          return (
            <Link 
              key={cat.slug}
              href={`/blog/category/${cat.slug}`} 
              className={`group relative border border-white/10 bg-[#0a0a0a] p-8 rounded-sm ${theme.border} transition-all duration-300 flex flex-col h-full min-h-[280px] overflow-hidden`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
              
              <div className="relative z-10 flex justify-between items-start mb-auto">
                <span className={`text-xs font-bold border border-white/20 px-2 py-1 rounded text-gray-300 ${theme.tagBorder} ${theme.tagText} transition-colors tracking-widest`}>
                  {cat.tag}
                </span>
                <span className="text-xs text-gray-500 uppercase">{cat.subtitle}</span>
              </div>

              <div className="relative z-10 mt-12">
                <h2 className={`text-2xl font-bold mb-3 ${theme.text} transition-colors`}>
                  {cat.title} -&gt;
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}

      </div>
    </main>
  );
}