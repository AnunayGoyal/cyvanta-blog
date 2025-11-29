"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// KEY FIX: Must use 'export default' here
export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-cyber-gray bg-cyber-black/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="font-bold text-xl tracking-tighter hover:text-neon-green transition-colors">
          CYVANTA <span className="text-neon-green">/&gt;</span>
        </Link>

        {/* LINKS */}
        <div className="flex gap-6 font-mono text-sm">
          <Link 
            href="/" 
            className={`${isActive("/") ? "text-neon-green" : "text-cyber-muted"} hover:text-neon-green transition-colors`}
          >
            BASE
          </Link>
          <Link 
            href="/blog" 
            className={`${isActive("/blog") ? "text-neon-green" : "text-cyber-muted"} hover:text-neon-green transition-colors`}
          >
            INTEL
          </Link>
          <Link 
            href="https://github.com/AnunayGoyal" 
            target="_blank"
            className="text-cyber-muted hover:text-neon-blue transition-colors"
          >
            GITHUB
          </Link>
        </div>
      </div>
    </nav>
  );
}