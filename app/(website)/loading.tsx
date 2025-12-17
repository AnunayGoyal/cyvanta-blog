"use client";

import { useEffect, useState } from "react";

const LOG_LINES = [
    "Started Cyvanta Kernel Security.",
    "Mounted Content Filesystem.",
    "Reached target Graphical Interface.",
    "Started Network Manager Override.",
    "Initialized React Server Components.",
    "Starting User Session..."
];

const ACCESS_TEXT = "ACCESS GRANTED";

export default function Loading() {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);

    // Access Granted Typing State
    const [showAccessCursor, setShowAccessCursor] = useState(false);
    const [accessTextTyped, setAccessTextTyped] = useState("");
    const [accessCharIndex, setAccessCharIndex] = useState(0);
    const [typingAccess, setTypingAccess] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    // Typing Speed Configuration (Slower)
    const CHAR_DELAY = 40; // ms per char (was 15)
    const LINE_DELAY = 400; // ms between lines (was 100)
    const PRE_ACCESS_DELAY = 800; // Delay before typing ACCESS GRANTED

    useEffect(() => {
        // Phase 1: Typing Log Lines
        if (currentLineIndex < LOG_LINES.length) {
            const currentFullLine = LOG_LINES[currentLineIndex];

            if (currentCharIndex < currentFullLine.length) {
                // Type next char
                const timer = setTimeout(() => {
                    const char = currentFullLine[currentCharIndex];

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
        }
        // Phase 2: Prepare for Access Granted
        else if (!typingAccess && !isComplete) {
            const timer = setTimeout(() => {
                setTypingAccess(true);
                setShowAccessCursor(true);
            }, PRE_ACCESS_DELAY);
            return () => clearTimeout(timer);
        }
        // Phase 3: Typing "ACCESS GRANTED"
        else if (typingAccess && !isComplete) {
            if (accessCharIndex < ACCESS_TEXT.length) {
                const timer = setTimeout(() => {
                    setAccessTextTyped(prev => prev + ACCESS_TEXT[accessCharIndex]);
                    setAccessCharIndex(prev => prev + 1);
                }, CHAR_DELAY * 1.5); // Slightly slower for dramatic effect
                return () => clearTimeout(timer);
            } else {
                // Access Granted Typing Complete
                setIsComplete(true);
            }
        }
    }, [currentLineIndex, currentCharIndex, typingAccess, accessCharIndex, isComplete]);

    return (
        <div className="fixed inset-0 bg-[#000000] z-[9999] flex flex-col items-center justify-center font-mono text-sm md:text-base text-gray-300 select-none overflow-hidden p-4 md:p-8">

            {/* Terminal Container */}
            <div className="w-full max-w-[800px] flex flex-col gap-1 items-start text-left">

                {/* Render Typed Lines */}
                {lines.map((line, i) => (
                    <div key={i} className="flex gap-4 items-center whitespace-nowrap">
                        <span className="shrink-0 opacity-80">
                            <span className="text-gray-500">[</span>
                            <span className="text-emerald-500 font-bold">&nbsp;&nbsp;OK&nbsp;&nbsp;</span>
                            <span className="text-gray-500">]</span>
                        </span>
                        <span className="text-white">
                            {line}
                            {/* Blinking cursor only on active log line */}
                            {!typingAccess && i === currentLineIndex && (
                                <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-[blink_0.8s_step-end_infinite] align-middle" />
                            )}
                        </span>
                    </div>
                ))}

                {/* Typed Access Granted */}
                {typingAccess && (
                    <div className="mt-8 flex items-center justify-center w-full min-h-[3rem] border-t border-white/10 pt-8">
                        <div className="flex items-center gap-2">
                            <span className="text-emerald-500 font-bold text-xl md:text-2xl mr-2">{">"}</span>
                            <span className="text-2xl md:text-3xl font-bold text-emerald-500 tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                                {accessTextTyped}
                            </span>
                            {/* Cursor for Access Text - Always blink if typing or complete */}
                            <span className="w-3 h-6 md:h-8 bg-emerald-500 animate-[blink_1s_step-end_infinite]" />
                        </div>
                    </div>
                )}

            </div>

            <style>{`
            @keyframes blink {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
          `}</style>
        </div>
    )
}
