export default function Loading() {
    return (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center font-mono text-sm md:text-base text-gray-300 select-none overflow-hidden p-4 md:p-8">

            {/* Terminal Container - Centered */}
            <div className="w-full max-w-[800px] flex flex-col gap-1 items-center md:items-start text-center md:text-left transition-all duration-500">

                {/* Boot Sequence Lines */}
                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.1s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Started Cyvanta Kernel Security.</span>
                </div>

                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.2s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Mounted Content Filesystem.</span>
                </div>

                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.3s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Reached target Graphical Interface.</span>
                </div>

                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.4s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Started Network Manager Override.</span>
                </div>

                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.6s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Initialized React Server Components.</span>
                </div>

                <div className="flex gap-4 items-center whitespace-nowrap animate-[fadeIn_0s_linear_0.8s_both]">
                    <span><span className="text-gray-300">[</span> <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span> <span className="text-gray-300">]</span></span>
                    <span className="text-white">Starting User Session...</span>
                </div>

                {/* Cinematic Access Granted */}
                <div className="mt-8 flex items-center justify-center w-full gap-2 animate-[fadeIn_0.5s_ease-out_1.5s_both]">
                    <span className="text-2xl md:text-3xl font-bold text-emerald-500 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                        ACCESS GRANTED
                    </span>
                    <span className="w-3 h-6 md:h-8 bg-emerald-500 animate-[blink_1s_step-end_infinite]" />
                </div>

            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
      `}</style>
        </div>
    )
}
