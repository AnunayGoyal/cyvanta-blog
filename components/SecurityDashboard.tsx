"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SecurityDashboard() {
    const [isOpen, setIsOpen] = useState(false);
    const [metrics, setMetrics] = useState({
        tls: "ANALYZING",
        headers: "CHECKING",
        dns: "RESOLVING"
    });

    useEffect(() => {
        // Simulated checks (client-side only visualization)
        const protocol = window.location.protocol === "https:" ? "SECURE (TLS 1.3)" : "UNSECURE";

        setTimeout(() => setMetrics(prev => ({ ...prev, tls: protocol })), 800);
        setTimeout(() => setMetrics(prev => ({ ...prev, dns: "ENCRYPTED (DOH)" })), 1500);
        setTimeout(() => setMetrics(prev => ({ ...prev, headers: "HARDENED" })), 2200);
    }, []);

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 left-4 z-40 bg-black/80 border border-white/10 p-2 rounded-sm hover:border-primary/50 text-xs font-mono text-gray-400 uppercase tracking-wider backdrop-blur-sm transition-colors"
            >
                {isOpen ? "[-] HIDE INTEL" : "[+] SEC STATUS"}
            </button>

            {/* Dashboard Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-14 left-4 z-40 w-64 bg-black/90 border border-white/20 p-4 rounded-sm backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.5)] font-mono text-xs"
                    >
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            <span className="text-white font-bold tracking-widest">LIVE TELEMETRY</span>
                        </div>

                        <div className="space-y-3">
                            {/* TLS */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">PROTOCOL</span>
                                <span className={`tracking-wider ${metrics.tls.includes("SECURE") ? "text-emerald-400" : "text-yellow-500"}`}>
                                    {metrics.tls}
                                </span>
                            </div>

                            {/* DNS */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">DNS RESOLVER</span>
                                <span className="text-blue-400 tracking-wider">
                                    {metrics.dns}
                                </span>
                            </div>

                            {/* Headers */}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">HEADERS</span>
                                <span className="text-purple-400 tracking-wider">
                                    {metrics.headers}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-2 border-t border-white/10 text-[10px] text-gray-600 text-center uppercase tracking-widest">
                            Cyvanta Defense Grid Active
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
