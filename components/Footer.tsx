"use client";

import { useState } from "react";

export default function Footer() {
  const [shutdown, setShutdown] = useState(false);

  const handleShutdown = () => {
    setShutdown(true);
    // You could add a redirect here later if you want
  };

  if (shutdown) {
    return (
      <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
        <span className="text-primary font-mono animate-pulse">SYSTEM HALTED. IT IS NOW SAFE TO TURN OFF YOUR TERMINAL.</span>
      </div>
    );
  }

  return (
    <footer className="w-full border-t border-white/10 bg-black text-gray-500 font-mono text-xs py-8 mt-20">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Left: Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-white font-bold tracking-widest">CYVANTA GROUP</span>
          <span>© 2025 // SECURE OPERATIONS</span>
        </div>

        {/* Center: System Details */}
        <div className="hidden md:flex gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-600">Region</span>
            <span>ZURICH / GLOBAL</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-600">Latency</span>
            <span className="text-green-500">12ms</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase text-gray-600">Encryption</span>
            <span className="text-blue-500">AES-256</span>
          </div>
        </div>

        {/* Right: Shutdown Button */}
        <button 
          onClick={handleShutdown}
          className="group flex items-center gap-2 hover:text-red-500 transition-colors"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full group-hover:bg-red-500 transition-colors shadow-[0_0_5px_rgba(34,197,94,0.5)] group-hover:shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
          [ TERMINATE_SESSION ]
        </button>

      </div>
    </footer>
  );
}