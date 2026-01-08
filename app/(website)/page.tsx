import type { CSSProperties } from "react";
import Link from "next/link";
import HeroTitle from "@/components/HeroTitle";
import { getCategories } from "@/lib/mdx";
import CategoryCard from "@/components/CategoryCard";

export default async function Home() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen w-full relative overflow-x-hidden">
      
      {/* --- Massive Hero Section (Full Height) --- */}
      <div className="min-h-screen w-full flex flex-col items-center justify-center relative z-10 px-4">
        
        {/* Top Center "Status Pill" */}
        <div className="mb-12 animate-fadeInUp">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-background/30 backdrop-blur-md text-xs md:text-sm font-mono text-muted-foreground">
             <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SYSTEM ONLINE</span>
            <span className="mx-1 opacity-30">|</span>
            <span className="text-foreground">V 2.0.4</span>
          </div>
        </div>

        {/* Brand / Intro Label */}
        <div className="mb-6 text-sm font-mono tracking-[0.2em] md:tracking-[0.4em] text-muted-foreground uppercase opacity-0 animate-fadeInUp" style={{ animationDelay: "200ms", animationFillMode: "forwards" }}>
          Advanced Security Research
        </div>

        {/* Impactful Title */}
        <div className="mb-10 w-full flex justify-center">
          <HeroTitle />
        </div>

        {/* Subtitle / Value Prop */}
        <p className="max-w-2xl text-base md:text-xl text-muted-foreground font-mono leading-relaxed mb-12 opacity-0 animate-fadeInUp px-4 text-center" style={{ animationDelay: "400ms", animationFillMode: "forwards" }}>
          Experience the next-generation of offensive security operations and red teaming insights.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 opacity-0 animate-fadeInUp" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
           <a 
            href="#categories" // Scroll to content
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-foreground px-8 font-medium text-background transition-all duration-300 hover:bg-foreground/90 hover:w-full sm:hover:w-auto"
          >
            <span className="mr-2">Start Reading</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
          
          <a
            href="https://github.com/AnunayGoyal"
            target="_blank"
            className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-background/50 backdrop-blur-sm px-8 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            View GitHub
          </a>
        </div>

      </div>

      {/* --- Category Cards Grid (Pushed Below Fold) --- */}
      <div id="categories" className="relative z-10 w-full max-w-[90vw] mx-auto px-4 pb-32 pt-24 opacity-0 animate-fadeInUp" style={{ animationDelay: "800ms", animationFillMode: "forwards" }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <CategoryCard key={cat.slug} category={cat} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
