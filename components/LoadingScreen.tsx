import React from "react";

export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center font-mono text-xs md:text-sm text-gray-300 select-none overflow-hidden">

            {/* Terminal Container */}
            <div className="w-full max-w-3xl px-6 flex flex-col gap-3">

                {/* Boot Sequence Lines */}
                <div className="flex flex-col gap-2 opacity-90 text-sm md:text-base font-medium font-mono">
                    <div className="flex gap-3">
                        <span className="text-gray-600">0x0001</span>
                        <span className="text-blue-400">[KERNEL]</span>
                        <span>initializing_neural_link...</span>
                    </div>

                    <div className="flex gap-3 animate-[fadeIn_0.3s_ease-out_0.2s_both]">
                        <span className="text-gray-600">0x00A4</span>
                        <span className="text-yellow-500">[WARN]</span>
                        <span>encryption_protocol :: <span className="text-white">AES-256-GCM</span></span>
                    </div>

                    <div className="flex gap-3 animate-[fadeIn_0.3s_ease-out_0.4s_both]">
                        <span className="text-gray-600">0x0F22</span>
                        <span className="text-blue-400">[MEM]</span>
                        <span>allocating_buffer (0x7F...3DA) <span className="text-emerald-500">COMPLETE</span></span>
                    </div>

                    <div className="flex gap-3 animate-[fadeIn_0.3s_ease-out_0.6s_both]">
                        <span className="text-gray-600">0x0041</span>
                        <span className="text-purple-400">[NET]</span>
                        <span>verifying_integrity... <span className="text-emerald-500">[OK]</span></span>
                    </div>

                    <div className="flex gap-3 animate-[fadeIn_0.3s_ease-out_0.8s_both]">
                        <span className="text-gray-600">0x011B</span>
                        <span className="text-purple-400">[NET]</span>
                        <span>bypassing_firewall... <span className="text-emerald-500">[SUCCESS]</span></span>
                    </div>

                    <div className="flex gap-3 animate-[fadeIn_0.3s_ease-out_1.0s_both]">
                        <span className="text-gray-600">0x08C4</span>
                        <span className="text-blue-400">[SYS]</span>
                        <span>decrypting_payload...</span>
                    </div>
                </div>

                {/* Main Action / Cursor */}
                <div className="mt-8 flex items-center gap-3 text-primary font-bold text-2xl md:text-4xl animate-[fadeIn_0.5s_ease-out_1.4s_both]">
                    <span>{'>'}</span>
                    <span className="uppercase tracking-[0.15em] drop-shadow-[0_0_10px_rgba(230,62,50,0.5)]">ACCESS_GRANTED</span>
                    <span className="w-3 h-8 md:h-10 bg-primary animate-[blink_0.8s_infinite] ml-2 shadow-[0_0_15px_#E63E32]" />
                </div>

            </div>

            {/* CSS for custom delays using standard Tailwind classes where possible, or inline styles/global css if needed. 
                 Using simple standard blink definition inside. 
             */}
            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    )
}
