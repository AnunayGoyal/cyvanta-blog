"use client";

import { useState } from "react";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 1500);
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4 mb-20 transition-colors duration-300">
            {/* Visual Connector Line */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-black/10 dark:to-white/20 mx-auto mb-[-1px]" />

            {/* Terminal Window */}
            <div className="w-full bg-white/50 dark:bg-black/80 backdrop-blur-md border border-black/5 dark:border-white/10 rounded-lg overflow-hidden relative shadow-lg dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] transition-colors duration-300">

                {/* Shield Icon Removed */}

                {/* Terminal Header */}
                <div className="bg-black/5 dark:bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-black/5 dark:border-white/10 transition-colors duration-300">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <div className="ml-4 text-xs text-muted font-mono flex-grow text-center mr-16">bash — 80x24</div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base text-gray-700 dark:text-gray-300 relative z-10 transition-colors duration-300">

                    {/* Command Prompt */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-emerald-600 dark:text-emerald-500 font-bold">user@cyvanta:~$</span>
                        <span className="text-foreground">./subscribe.sh --email</span>
                    </div>

                    {/* Logs */}
                    <div className="space-y-1 mb-8 text-muted">
                        <p>Initialize connection to Cyvanta Intelligence Feed...</p>
                        <p className="text-muted/80">{">"} Loading modules... <span className="text-emerald-600 dark:text-emerald-500">OK</span></p>
                        <p className="text-muted/80">{">"} Handshake... <span className="text-emerald-600 dark:text-emerald-500">OK</span></p>
                        <p className="text-foreground mt-4">{">"} Enter your payload (email) below to receive weekly intel briefings.</p>
                    </div>

                    {/* Interaction Area */}
                    {status === "success" ? (
                        <div className="mt-4 p-4 border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded">
                            <p className="font-bold flex items-center gap-2">
                                <span className="text-xl">✓</span> EXECUTION SUCCESSFUL. WELCOME TO THE NETWORK.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-stretch max-w-2xl">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="enter_email_address"
                                disabled={status === "loading"}
                                className="flex-grow bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-3 text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-muted rounded-sm"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
                            >
                                {status === "loading" ? "EXECUTING..." : "EXECUTE"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
