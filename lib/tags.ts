// Standardized Hex Palette (Optimized for Dark Mode Contrast)
const COLORS = {
    emerald: "#34d399", // emerald-400
    red: "#ef4444",     // red-500
    cyan: "#22d3ee",    // cyan-400
    purple: "#c084fc",  // purple-400
    orange: "#fb923c",  // orange-400
    blue: "#60a5fa",    // blue-400
    gray: "#9ca3af",    // gray-400
    yellow: "#facc15",  // yellow-400
    pink: "#f472b6",    // pink-400
    indigo: "#818cf8",  // indigo-400
};

// Keyword mapping strategy (Priority Order)
const KEYWORD_MAP: Array<{ keywords: string[]; color: string }> = [
    { keywords: ["signals", "recon", "research", "intel"], color: COLORS.emerald },
    { keywords: ["vectors", "offensive", "ops", "red team", "attack"], color: COLORS.red },
    { keywords: ["protocols", "hardening", "defense", "blue team", "shield"], color: COLORS.cyan },
    { keywords: ["ai", "ml", "automation", "bot"], color: COLORS.purple },
    { keywords: ["siem", "logs", "monitor", "alert"], color: COLORS.orange },
    { keywords: ["cloud", "azure", "aws", "network"], color: COLORS.blue },
];

/**
 * Returns properties (className, style) for a tag.
 * Prioritizes colorOverride (Sanity) > tag keyword match > fallback.
 */
export function getTagProps(tag: string | undefined, colorOverride?: string | null) {
    const baseClasses = "text-xs font-bold border px-2 py-1 rounded uppercase tracking-wider";

    // Default Gray
    let hex = COLORS.gray;

    if (tag) {
        const t = tag.toLowerCase().trim();

        // 1. Sanity Override
        if (colorOverride) {
            // It's a hex?
            if (colorOverride.startsWith("#")) {
                hex = colorOverride;
            }
            // It's a legacy name? Map it.
            else if (COLORS[colorOverride.toLowerCase() as keyof typeof COLORS]) {
                hex = COLORS[colorOverride.toLowerCase() as keyof typeof COLORS];
            }
        }
        // 2. Keyword Match
        else {
            const match = KEYWORD_MAP.find((entry) =>
                entry.keywords.some((keyword) => t.includes(keyword))
            );
            if (match) {
                hex = match.color;
            }
        }
    }

    return {
        className: baseClasses,
        style: {
            color: hex,
            borderColor: `${hex}33`, // ~20% opacity
            backgroundColor: `${hex}0D`, // ~5% opacity
        }
    };
}

/**
 * Returns the Hex color code for a given category/tag.
 */
export function getCategoryHex(tag: string | undefined): string {
    if (!tag) return COLORS.gray;

    const t = tag.toLowerCase().trim();

    // Check if passed string is already a hex
    if (t.startsWith("#")) return t;

    // Check if it's a known color name
    if (COLORS[t as keyof typeof COLORS]) {
        return COLORS[t as keyof typeof COLORS];
    }

    const match = KEYWORD_MAP.find((entry) =>
        entry.keywords.some((keyword) => t.includes(keyword))
    );

    return match ? match.color : COLORS.gray;
}
