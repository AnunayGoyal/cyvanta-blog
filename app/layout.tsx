import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css"; 
import Navbar from "@/components/Navbar"; 
// 1. IMPORT ANALYTICS - Updated import path
import { Analytics } from "@vercel/analytics/next";

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  title: "Cyvanta | Security Research",
  description: "Advanced Cyber Security Research, CTF Writeups, and GRC Notes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrains.variable} font-mono bg-cyber-black text-cyber-text`}>
        <div className="bg-grid min-h-screen flex flex-col">
          <Navbar /> 
          
          <div className="pt-20 flex-grow">
            {children}
          </div>
          
          {/* 2. PLACE ANALYTICS COMPONENT HERE */}
          <Analytics />
        </div>
      </body>
    </html>
  );
}