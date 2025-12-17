"use client";

import { useEffect, useState } from "react";

export default function HeroTitle() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const text1 = "Welcome to";
  const text2 = "CYVANTA";

  useEffect(() => {
    let charIndex1 = 0;
    let charIndex2 = 0;

    // Start typing Line 1
    const timer1 = setInterval(() => {
      if (charIndex1 <= text1.length) {
        setLine1(text1.slice(0, charIndex1));
        charIndex1++;
      } else {
        clearInterval(timer1);
        // Start Line 2 after a pause
        setTimeout(() => {
          const timer2 = setInterval(() => {
            if (charIndex2 <= text2.length) {
              setLine2(text2.slice(0, charIndex2));
              charIndex2++;
            } else {
              clearInterval(timer2);
            }
          }, 150);
        }, 300);
      }
    }, 80);

    return () => clearInterval(timer1);
  }, []);

  return (
    // FIX: Added 'min-h' constraints to ensure layout is stable before typing starts
    <div className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden">

      {/* LINE 1: Added 'min-h-[2rem]' to reserve space */}
      <div className="min-h-[2rem] md:min-h-[3rem] mb-2 flex items-center justify-center">
        <span className="text-sm md:text-2xl font-mono text-muted tracking-[2px] md:tracking-[3px] text-center whitespace-nowrap">
          {line1}
        </span>
        {/* Cursor logic: Only show if typing is active or waiting */}
        {line1.length < text1.length && (
          <span className="ml-1 w-1.5 h-4 md:w-2 md:h-5 bg-muted animate-pulse inline-block"></span>
        )}
      </div>

      {/* LINE 2: Added 'min-h' to reserve space for the big text */}
      <div className="min-h-[4rem] md:min-h-[8rem] flex items-center justify-center">
        <h1 className="text-5xl sm:text-6xl md:text-9xl font-bold tracking-[1px] md:tracking-[3px] text-foreground select-none relative text-center whitespace-nowrap">
          {line2}
          {/* Big Cursor: Only shows after Line 1 is done */}
          {line1.length === text1.length && (
            <span className="ml-1 text-primary animate-[blink_1s_step-end_infinite]">_</span>
          )}
        </h1>
      </div>

    </div>
  );
}