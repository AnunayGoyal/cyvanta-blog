import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    // FIX: Reduced padding from px-8 to px-4 for mobile
    <nav className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-4 md:px-12 flex items-center justify-between py-4">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="relative">
             {/* FIX: Responsive logo size (40px mobile, 50px desktop) */}
            <Image
              src="/logo_cyvanta.svg"
              alt="Cyvanta Logo"
              width={40} 
              height={40}
              className="object-contain w-10 h-10 md:w-[50px] md:h-[50px]" 
              priority
            />
          </div>
          
          <div className="flex flex-col">
            {/* FIX: Smaller text on mobile (text-lg), larger on desktop (text-2xl) */}
            <span className="font-mono font-bold text-lg md:text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
              <span className="text-primary mr-1">&gt;</span>CYVANTA
              <span className="animate-pulse">_</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-4 md:gap-8 text-xs md:text-sm font-mono text-gray-400">
          <Link href="/blog" className="hover:text-white transition-all">./INTEL</Link>
          <Link href="https://github.com/AnunayGoyal" target="_blank" className="hover:text-white transition-all">./GITHUB</Link>
        </div>
      </div>
    </nav>
  );
}