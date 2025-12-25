"use client";

import Link from "next/link";
import { CSSProperties, useRef, useEffect, useState } from "react";
import { getCategoryHex } from "@/lib/tags";

interface CategoryCardProps {
    category: any;
    index: number;
}

export default function CategoryCard({ category: cat, index }: CategoryCardProps) {
    const hexColor = getCategoryHex(cat.color);

    return (
        <Link
            key={cat.slug}
            href={`/blog/category/${cat.slug}`}
            style={
                {
                    "--theme-color": hexColor,
                    animationDelay: `${220 + index * 80}ms`,
                } as CSSProperties
            }
            className={`
                group relative border p-4 md:p-5 rounded-sm transition-all duration-300 
                flex flex-col h-[260px] md:h-[280px] overflow-hidden
                motion-safe:animate-fadeInUp

                /* Light Mode / Dark Mode Base Styles */
                bg-white border-black/20 shadow-sm
                dark:bg-[#0a0a0a] dark:border-white/10 dark:shadow-none

                /* Hover State */
                hover:-translate-y-1
                hover:border-[var(--theme-color)]
              `}
        >
            {/* Continuous scanline sweep on hover */}
            <div
                className="pointer-events-none absolute inset-x-0 -inset-y-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:motion-safe:animate-scanlineLoop"
                style={{
                    background:
                        "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                }}
            />

            {/* TOP SECTION */}
            <div className="relative z-10 flex justify-between items-start h-10 shrink-0">
                {/* Tag chip */}
                <span
                    style={{ color: hexColor, borderColor: hexColor }}
                    className={`
                    text-[11px] font-bold border px-3 py-[3px] rounded-sm 
                    transition-colors tracking-[0.22em]
                    opacity-100 group-hover:opacity-100
                  `}
                >
                    {cat.tag}
                </span>

                <span className="text-[11px] text-muted uppercase tracking-wider">
                    {cat.subtitle}
                </span>
            </div>

            {/* BOTTOM SECTION */}
            <div className="relative z-10 mt-auto">
                {/* Title */}
                <div className="h-[70px] flex items-end mb-1">
                    <h2
                        className={`
                      text-lg md:text-xl font-bold transition-colors line-clamp-2
                      text-foreground
                      group-hover:text-[var(--theme-color)]
                    `}
                    >
                        {cat.title} →
                    </h2>
                </div>

                {/* Description */}
                <div className="h-[80px] overflow-hidden">
                    <p className="text-xs md:text-sm text-muted leading-relaxed line-clamp-3">
                        {cat.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}
