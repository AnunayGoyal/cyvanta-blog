import { getTagProps } from "@/lib/tags";

type Props = {
    content: any[];
    skillLevel?: string | null;
};

export default function ArticleMeta({ content, skillLevel }: Props) {
    // Estimate reading time: ~200 words per minute
    // Ideally, this should be done server-side or during build, but runtime is fine for now.
    const text = JSON.stringify(content);
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);

    const safeLevel = skillLevel || "intermediate";

    // Skill Badge Logic
    const getSkillColor = (level: string) => {
        switch (level?.toLowerCase() || "intermediate") {
            case "beginner": return "text-green-400 border-green-500/30 bg-green-500/10";
            case "advanced": return "text-red-400 border-red-500/30 bg-red-500/10";
            default: return "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
        }
    };

    const skillColorClass = getSkillColor(safeLevel);

    return (
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider mb-8 text-gray-500">

            {/* Reading Time */}
            <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>~{minutes} MIN READ</span>
            </div>

            <span className="text-gray-700">|</span>

            {/* Skill Level */}
            <div className={`px-2 py-1 rounded border ${skillColorClass} flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${skillLevel === 'advanced' ? 'animate-pulse' : ''} bg-current`} />
                {skillLevel}
            </div>

        </div>
    );
}
