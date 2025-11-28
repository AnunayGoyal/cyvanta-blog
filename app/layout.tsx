import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google"; 
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css"; 
// 1. IMPORT THE NAVBAR
import Navbar from "@/components/Navbar"; 

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
          
          {/* 2. PLACE THE NAVBAR HERE */}
          <Navbar /> 
          
          {/* 3. ADD PADDING (pt-20) so content isn't hidden behind the fixed Navbar */}
          <div className="pt-20 flex-grow">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}