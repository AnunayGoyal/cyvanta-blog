"use client";

import { useEffect, useState } from "react";

type Heading = {
    id: string;
    text: string;
    level: number;
};

export default function TableOfContents({ content }: { content: any[] }) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // 1. Scope search to 'article' to prevent duplicates from other widgets
        const article = document.querySelector('article');
        if (!article) return;

        const domHeadings = article.querySelectorAll("h2, h3");

        const elements: Heading[] = [];
        const seenIds = new Set<string>();

        domHeadings.forEach((h, index) => {
            if (!h.id) h.id = `section-${index}`;

            // Dedupe logic
            if (!seenIds.has(h.id)) {
                seenIds.add(h.id);
                elements.push({
                    id: h.id,
                    text: h.textContent || "",
                    level: parseInt(h.tagName.substring(1))
                });
            }
        });

        setHeadings(elements);

        // 2. Setup Intersection Observer
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0px -60% 0px" }
        );

        domHeadings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, [content]);

    if (headings.length === 0) return null;

    return (
        <nav className="border-r border-white/10 pr-4 mr-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-6 transition-colors hover:text-white">
                Mission Index
            </h4>
            <ul className="space-y-4 text-xs">
                {headings.map((h) => (
                    <li
                        key={h.id}
                        style={{ paddingLeft: (h.level - 2) * 12 }}
                    >
                        <button
                            onClick={() => {
                                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className={`text-left transition-all duration-200 line-clamp-2 leading-relaxed group flex items-start ${activeId === h.id
                                ? "text-primary font-bold translate-x-1"
                                : "text-gray-500 hover:text-gray-300"
                                }`}
                        >
                            {activeId === h.id && (
                                <span className="mr-2 text-primary opacity-100 scale-100 transition-all text-[10px] my-auto">►</span>
                            )}
                            {h.text}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
