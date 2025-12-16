"use client";

import { useEffect, useState, useRef } from "react";

const LOG_LINES = [
    "Started Cyvanta Kernel Security.",
    "Mounted Content Filesystem.",
    "Reached target Graphical Interface.",
    "Started Network Manager Override.",
    "Initialized React Server Components.",
    "Starting User Session..."
];

export default function Loading() {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [accessGranted, setAccessGranted] = useState(false);

    // Typing Speed Configuration
    const CHAR_DELAY = 15; // ms per char
    const LINE_DELAY = 100; // ms between lines
    const ACCESS_GRANTED_DELAY = 500;

    useEffect(() => {
        if (currentLineIndex >= LOG_LINES.length) {
            // Logs done, show access granted after delay
            const timer = setTimeout(() => setAccessGranted(true), ACCESS_GRANTED_DELAY);
            return () => clearTimeout(timer);
        }

        const currentFullLine = LOG_LINES[currentLineIndex];

        if (currentCharIndex < currentFullLine.length) {
            // Type next char
            const timer = setTimeout(() => {
                const char = currentFullLine[currentCharIndex];

                // Update the current line state
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines[currentLineIndex] === undefined) {
                        newLines[currentLineIndex] = char;
                    } else {
                        newLines[currentLineIndex] += char;
                    }
                    return newLines;
                });

                setCurrentCharIndex(prev => prev + 1);
            }, CHAR_DELAY);
            return () => clearTimeout(timer);
        } else {
            // Line complete, wait then move to next line
            const timer = setTimeout(() => {
                setCurrentLineIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }, LINE_DELAY);
            return () => clearTimeout(timer);
        }
    }, [currentLineIndex, currentCharIndex]);


    return (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center font-mono text-sm md:text-base text-gray-300 select-none overflow-hidden p-4 md:p-8">

            {/* Terminal Container */}
            <div className="w-full max-w-[800px] flex flex-col gap-1 items-start text-left">

                {/* Render Typed Lines */}
                {lines.map((line, i) => (
                    <div key={i} className="flex gap-4 items-center whitespace-nowrap">
                        <span className="shrink-0">
                            <span className="text-gray-500">[</span>
                            <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span>
                            <span className="text-gray-500">]</span>
                        </span>
                        <span className="text-white">
                            {line}
                            {/* Blinking cursor only on active line */}
                            {!accessGranted && i === currentLineIndex && (
                                <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-[blink_0.8s_step-end_infinite align-middle]" />
                            )}
                        </span>
                    </div>
                ))}

                {/* Cinematic Access Granted */}
                {accessGranted && (
                    <div className="mt-8 flex items-center justify-center w-full gap-2 animate-[fadeIn_0.5s_ease-out_both] border-t border-white/10 pt-8">
                        <span className="text-2xl md:text-3xl font-bold text-emerald-500 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                            ACCESS GRANTED
                        </span>
                        <span className="w-3 h-6 md:h-8 bg-emerald-500 animate-[blink_1s_step-end_infinite]" />
                    </div>
                )}

            </div>

            <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
    )
}
