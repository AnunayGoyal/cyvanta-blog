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
    <div className="flex flex-col items-center">
      
      {/* LINE 1: Added tracking-[3px] */}
      <div className="h-8 mb-2 flex items-center">
        <span className="text-xl md:text-2xl font-mono text-gray-400 tracking-[3px]">
          {line1}
        </span>
        {line1.length < text1.length && (
          <span className="ml-1 w-2 h-5 bg-gray-400 animate-pulse inline-block"></span>
        )}
      </div>

      {/* LINE 2: Changed tracking-tighter to tracking-[3px] */}
      <h1 className="text-8xl md:text-9xl font-bold tracking-[3px] text-white select-none relative">
        {line2}
        {line1.length === text1.length && (
          <span className="ml-1 text-primary animate-[blink_1s_step-end_infinite]">_</span>
        )}
      </h1>

    </div>
  );
}