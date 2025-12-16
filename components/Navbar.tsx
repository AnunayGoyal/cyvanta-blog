"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 z-50 flex w-full border-b border-black/5 dark:border-white/10 bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="w-full max-w-[95vw] mx-auto px-6 h-20 flex items-center justify-between">

        {/* Left: Logo (Visible) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/logo_cyvanta.svg"
            alt="Cyvanta Logo"
            width={40}
            height={40}
            className="object-contain"
            priority
          />
          <span className="font-mono font-bold text-2xl tracking-tight text-foreground">
            CYVANTA<span className="text-primary">_</span>
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          <ThemeToggle />

          {/* Main Action Button (Index) */}
          <Link
            href="/blog/search"
            className="bg-foreground text-background font-mono text-xs font-bold px-6 py-2.5 rounded-full hover:opacity-80 transition-all"
          >
            INDEX
          </Link>
        </div>

      </div>
    </nav>
  );
}