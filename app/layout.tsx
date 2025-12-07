import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer";

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
      <body className="font-mono antialiased bg-[#050505] text-white selection:bg-primary selection:text-black min-h-screen flex flex-col">
        
        {/* --- BACKGROUND SYSTEM --- */}
        
        {/* 1. Base Noise Texture */}
        <div 
          className="fixed inset-0 z-[-1] opacity-[0.04] pointer-events-none"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
          }}
        />

        {/* 2. Tactical Grid */}
        <div className="fixed inset-0 z-[-2] h-full w-full bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* 3. The Pulsing "Heartbeat" Glow */}
        {/* UPDATED: Added 'animate-breathe' class and increased base size */}
        <div className="fixed top-[-10%] left-[-10%] right-[-10%] h-[700px] z-[-3] bg-gradient-to-b from-primary/20 via-primary/5 to-transparent blur-3xl pointer-events-none animate-breathe" />

        {/* 4. Optional: A secondary bottom glow for depth */}
        <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-20" />

        {/* ----------------------------- */}

        <Navbar />

        <main className="relative z-10 w-full flex-grow">
          {children}
        </main>
        
        <Footer /> 

      </body>
    </html>
  );
}
