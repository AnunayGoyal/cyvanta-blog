"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Newsletter from "@/components/Newsletter";

export default function Footer() {
  const [shutdown, setShutdown] = useState(false);
  const [latency, setLatency] = useState(12);

  // Fake Latency Fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * (25 - 10 + 1) + 10));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Shutdown Handler
  const handleShutdown = () => {
    setShutdown(true);
  };

  // The Shutdown Overlay
  if (shutdown) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center space-y-6">
        <span className="text-red-500 font-mono text-3xl tracking-widest animate-pulse font-bold">SYSTEM HALTED</span>
        <div className="text-gray-500 font-mono text-sm">
          Please reboot terminal to resume operations.
        </div>
        <button
          onClick={() => setShutdown(false)}
          className="text-white text-sm font-mono hover:bg-white/10 border border-white/20 px-6 py-2 rounded transition-all"
        >
          [ REBOOT_KERNEL ]
        </button>
      </div>
    );
  }

  return (
    <>
      <Newsletter />

      {/* UPDATED: Contrast and padding */}
      <footer className="w-full border-t border-black/10 dark:border-white/20 bg-background py-10 mt-32 text-sm font-mono text-muted transition-colors duration-300">
        <div className="w-full max-w-[95vw] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Left Side: Identity */}
          <div className="flex items-center gap-6 tracking-wide">
            <span className="text-foreground font-bold text-base">CYVANTA</span>
            <span className="text-muted/50">|</span>

            <span className="group relative cursor-default">
              <span className="group-hover:text-primary transition-colors">MADE_IN_BHARAT</span>
              {/* Subtle Tricolor Underline on Hover */}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-orange-500 via-white to-green-500 group-hover:w-full transition-all duration-500"></span>
            </span>

            <span className="hidden md:inline text-muted/50">|</span>

            <span className="hidden md:inline hover:text-foreground transition-colors">© 2025</span>

            <span className="hidden md:inline text-muted/50">|</span>

            {/* Socials */}
            <div className="flex items-center gap-6">
              <div className="flex gap-4">
                <a href="https://linkedin.com/in/anunay-goyal" target="_blank" className="hover:text-primary transition-colors">LI</a>
                <a href="https://instagram.com/cyvanta" target="_blank" className="hover:text-primary transition-colors">IG</a>
              </div>
            </div>
          </div>

          {/* Right Side: System Stats & Controls */}
          <div className="flex items-center gap-8 md:gap-12">

            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-green-600 dark:text-green-400 font-bold tracking-wider text-xs">ALL SYSTEMS OPERATIONAL</span>
            </div>

            {/* Fake Latency */}
            <div className="hidden md:block text-xs uppercase tracking-wider">
              LATENCY: <span className="text-foreground font-bold">{latency}ms</span>
            </div>

            {/* Terminate Button */}
            <button
              onClick={handleShutdown}
              className="group flex items-center gap-2 hover:text-red-500 transition-colors uppercase tracking-widest text-xs font-bold"
            >
              [ TERMINATE ]
            </button>

          </div>

        </div>
      </footer>
    </>
  );
}
