import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import Footer from "@/components/Footer"; // <--- 1. IMPORT FOOTER

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
      <body className="font-mono antialiased bg-black text-white selection:bg-primary selection:text-black min-h-screen flex flex-col">
        
        {/* Background Effects */}
        <div className="fixed inset-0 h-full w-full bg-black bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />
        <div className="fixed top-0 z-[-2] h-screen w-screen bg-black bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(230,62,50,0.15),rgba(255,255,255,0))]" />

        <Navbar />

        {/* Main Content Area: Grows to fill space */}
        <main className="relative z-10 w-full flex-grow">
          {children}
        </main>
        
        {/* Footer at the bottom */}
        <Footer /> 

      </body>
    </html>
  );
}