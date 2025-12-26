"use client";

import Link from "next/link";
import Image from "next/image";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="absolute top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl rounded-2xl border border-black/10 dark:border-white/10 bg-background/80 backdrop-blur-xl shadow-md transition-all duration-300">
      <div className="px-6 h-16 flex items-center justify-between">

        {/* Left: Logo (Visible) */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Image
            src="/logo_cyvanta.svg"
            alt="Cyvanta Logo"
            width={42}
            height={42}
            className="object-contain"
            priority
          />
          <span className="font-mono font-bold text-2xl tracking-tight text-foreground">
            CYVANTA
          </span>
        </Link>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          {/* Main Action Button (Index) */}
          <Link
            href="/blog/search"
            className="bg-foreground text-background font-mono text-xs font-bold px-5 py-2 rounded-lg hover:opacity-80 transition-all"
          >
            INDEX
          </Link>
        </div>

      </div>
    </nav>
  );
}