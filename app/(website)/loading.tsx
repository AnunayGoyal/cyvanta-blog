export default function Loading() {
    return (
        <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-white select-none">
            <div className="flex flex-col items-center gap-8 w-full max-w-lg px-4">

                {/* Title Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-wider animate-pulse">
                        CYVANTA
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 tracking-[0.2em] uppercase">
                        System Initialization
                    </p>
                </div>

                {/* Status Text */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="text-sm text-gray-400 tracking-widest uppercase flex items-center gap-2">
                        Initialize Neural Network
                        <span className="animate-[blink_1s_infinite]">_</span>
                    </p>
                </div>

                {/* Progress Bar Container */}
                <div className="w-full h-[2px] bg-gray-900 rounded-full overflow-hidden relative">
                    {/* Animated Bar */}
                    <div
                        className="absolute top-0 left-0 h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-[loading_2s_ease-in-out_infinite]"
                        style={{ width: '100%' }}
                    />
                </div>

                {/* Status Percentage (Static simulation) */}
                <p className="text-[10px] text-gray-600 tracking-widest">
                    ESTABLISHING SECURE CONNECTION...
                </p>

            </div>

            {/* Tailwind/CSS Animations */}
            <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </div>
    )
}
