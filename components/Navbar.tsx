import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    // Changed 'max-w-6xl' to 'w-full px-8' to remove the side gaps
    <nav className="w-full border-b border-white/10 bg-black/60 backdrop-blur-md sticky top-0 z-50">
      <div className="w-full px-8 md:px-12 flex items-center justify-between py-4">
        
        {/* Logo Section */}
        <Link href="/" className="group flex items-center gap-4 transition-opacity hover:opacity-80">
          <div className="relative">
            {/* REMOVED the drop-shadow class here */}
            <Image
              src="/logo_cyvanta.svg"
              alt="Cyvanta Logo"
              width={50} 
              height={50}
              className="object-contain" 
              priority
            />
          </div>
          
          <div className="flex flex-col">
            <span className="font-mono font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
              <span className="text-primary mr-1">&gt;</span>CYVANTA
              <span className="animate-pulse">_</span>
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex gap-8 text-sm font-mono text-gray-400">
          <Link 
            href="/blog" 
            className="hover:text-white transition-all"
          >
            ./INTEL
          </Link>
          <Link 
            href="https://github.com/AnunayGoyal" 
            target="_blank" 
            className="hover:text-white transition-all"
          >
            ./GITHUB
          </Link>
        </div>
      </div>
    </nav>
  );
}