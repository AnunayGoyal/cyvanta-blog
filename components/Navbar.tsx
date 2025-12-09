import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-2xl transition-all hover:bg-black/70 hover:border-white/20 hover:shadow-primary/10 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">

        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative">
            <Image
              src="/logo_cyvanta.svg"
              alt="Cyvanta Logo"
              width={32}
              height={32}
              className="object-contain w-8 h-8 md:w-8 md:h-8"
              priority
            />
          </div>

          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm md:text-base tracking-tight text-white group-hover:text-primary transition-colors">
              CYVANTA
              <span className="text-primary animate-pulse">_</span>
            </span>
          </div>
        </Link>

        {/* Separator */}
        <div className="h-4 w-[1px] bg-white/10"></div>

        {/* Navigation Links */}
        <div className="flex gap-6 text-[10px] md:text-xs font-mono font-bold tracking-widest text-gray-400">
          <Link href="https://github.com/AnunayGoyal" target="_blank" className="hover:text-white transition-all flex items-center gap-1 group">
            <span className="group-hover:text-primary">./</span>GITHUB
          </Link>
          <Link href="/blog/search" className="hover:text-white transition-all flex items-center gap-1 group">
            <span className="group-hover:text-primary">./</span>INDEX
          </Link>
        </div>
      </div>
    </nav>
  );
}