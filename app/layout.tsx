import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar"; 

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cyvanta | Red Team Operations",
  description: "Advanced security research and offensive operations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono antialiased bg-black text-white selection:bg-primary selection:text-black">
        
        {/* --- NEW BACKGROUND START --- */}
        <div className="fixed inset-0 z-[-10] h-full w-full bg-black">
            {/* 1. Base Grid (Subtle dots) */}
            <div className="absolute h-full w-full bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
            
            {/* 2. Secondary Digital Noise (Adds texture) */}
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            
            {/* 3. Red Ambient Glow (Top Center) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-primary/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none"></div>
        </div>
        {/* --- NEW BACKGROUND END --- */}

        <Navbar />

        <main className="relative z-10 w-full">
          {children}
        </main>
        
      </body>
    </html>
  );
}