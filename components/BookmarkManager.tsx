"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SavedPost = {
    slug: string;
    title: string;
    date: string; // ISO string
};

export default function BookmarkManager({
    currentPost
}: {
    currentPost?: { slug: string; title: string }
}) {
    const [saved, setSaved] = useState<SavedPost[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Load from local storage
    useEffect(() => {
        const data = localStorage.getItem("cyvanta_bookmarks");
        if (data) {
            try {
                setSaved(JSON.parse(data));
            } catch (e) {
                console.error("Failed to parse bookmarks", e);
            }
        }
    }, []);

    const isCurrentSaved = currentPost
        ? saved.some(p => p.slug === currentPost.slug)
        : false;

    const toggleSave = () => {
        if (!currentPost) return;

        let newSaved;
        if (isCurrentSaved) {
            newSaved = saved.filter(p => p.slug !== currentPost.slug);
        } else {
            newSaved = [
                ...saved,
                {
                    slug: currentPost.slug,
                    title: currentPost.title,
                    date: new Date().toISOString()
                }
            ];
        }

        setSaved(newSaved);
        localStorage.setItem("cyvanta_bookmarks", JSON.stringify(newSaved));
    };

    return (
        <div className="fixed top-24 right-4 z-40 flex flex-col items-end gap-2">
            {/* Toggle List View */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-black/80 border border-white/10 p-2 rounded-sm text-gray-400 hover:text-white hover:border-primary/50 transition-all backdrop-blur-sm"
                title="View Saved Intel"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                {saved.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-black">
                        {saved.length}
                    </span>
                )}
            </button>

            {/* Save Current Post Button (Only visible on blog posts) */}
            {currentPost && (
                <button
                    onClick={toggleSave}
                    className={`
            p-2 rounded-sm border transition-all backdrop-blur-sm
            ${isCurrentSaved
                            ? "bg-primary/20 border-primary text-primary"
                            : "bg-black/80 border-white/10 text-gray-500 hover:text-white"
                        }
          `}
                    title={isCurrentSaved ? "Remove from saved" : "Save for later"}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isCurrentSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </button>
            )}

            {/* Saved List Dropdown */}
            {isOpen && (
                <div className="absolute top-10 right-0 w-64 bg-black/95 border border-white/20 rounded-sm shadow-xl p-4 backdrop-blur-md">
                    <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-3 pb-2 border-b border-white/10">
                        SAVED INTELLIGENCE
                    </h3>

                    {saved.length === 0 ? (
                        <p className="text-xs text-gray-600 italic">No saved intel yet.</p>
                    ) : (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                            {saved.map(p => (
                                <div key={p.slug} className="group relative">
                                    <Link
                                        href={`/blog/${p.slug}`}
                                        className="block text-sm text-gray-300 group-hover:text-primary transition-colors line-clamp-2 leading-tight"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {p.title}
                                    </Link>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        {new Date(p.date).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
