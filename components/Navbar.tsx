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
          
          {/* Main Action Button (Index) */}
          <Link
            href="/blog/search"
            className="flex items-center justify-center p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 text-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              href="/about" 
              className="font-mono text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
            >
              ABOUT
            </Link>
          </div>

          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}