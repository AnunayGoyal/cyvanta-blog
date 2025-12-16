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
        <div className="w-full max-w-4xl mx-auto p-4 mb-20">
            {/* Visual Connector Line */}
            <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/20 mx-auto mb-[-1px]" />

            {/* Terminal Window */}
            <div className="w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden relative shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]">

                {/* Shield Icon - Absolute Positioned */}
                <div className="absolute top-6 right-6 opacity-20 pointer-events-none mix-blend-screen">
                    <svg width="100" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L3 7V12C3 17.52 7.02 21.74 12 23C16.98 21.74 21 17.52 21 12V7L12 2Z" fill="#ef4444" />
                        <path d="M12 22.96V2.04" stroke="black" strokeWidth="2" strokeOpacity="0.5" />
                        <path d="M3 12H21" stroke="black" strokeWidth="2" strokeOpacity="0.5" />
                    </svg>
                </div>

                {/* Terminal Header */}
                <div className="bg-white/5 px-4 py-2 flex items-center gap-2 border-b border-white/10">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    <div className="ml-4 text-xs text-gray-500 font-mono flex-grow text-center mr-16">bash — 80x24</div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base text-gray-300 relative z-10">

                    {/* Command Prompt */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <span className="text-green-500">user@cyvanta:~$</span>
                        <span className="text-white">./subscribe.sh --email</span>
                    </div>

                    {/* Logs */}
                    <div className="space-y-1 mb-8 text-gray-400">
                        <p>Initialize connection to Cyvanta Intelligence Feed...</p>
                        <p className="text-gray-500">{">"} Loading modules... <span className="text-green-500">OK</span></p>
                        <p className="text-gray-500">{">"} Handshake... <span className="text-green-500">OK</span></p>
                        <p className="text-white mt-4">{">"} Enter your payload (email) below to receive weekly intel briefings.</p>
                    </div>

                    {/* Interaction Area */}
                    {status === "success" ? (
                        <div className="mt-4 p-4 border border-green-500/30 bg-green-500/10 text-green-500 rounded">
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
                                className="flex-grow bg-white/5 border border-white/10 p-3 text-gray-300 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all placeholder:text-gray-600 rounded-sm"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 tracking-wider transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-sm shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
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
