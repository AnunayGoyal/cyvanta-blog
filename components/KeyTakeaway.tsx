export default function KeyTakeaway({ children }: { children: React.ReactNode }) {
    return (
        <div className="my-8 relative overflow-hidden group">
            {/* Hacker-style borders */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />

            <div className="bg-primary/5 border-l-2 border-r-2 border-primary/20 p-6">
                <h4 className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm mb-2">
                    <span className="animate-pulse">⚡</span> Mission Critical
                </h4>
                <div className="text-gray-300 italic">
                    {children}
                </div>
            </div>
        </div>
    );
}
