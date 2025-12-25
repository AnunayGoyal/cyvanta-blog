"use client";

import { useEffect, useState } from "react";

export default function HeroTitle() {
  const [text, setText] = useState("");
  const fullText = "CYVANTA";

  useEffect(() => {
    let charIndex = 0;
    const timer = setInterval(() => {
      if (charIndex <= fullText.length) {
        setText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden">
      <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter md:tracking-[-0.05em] text-foreground select-none relative text-center whitespace-nowrap font-mono leading-none">
        {text}
        <span className="ml-1 text-primary animate-[blink_1s_step-end_infinite]">_</span>
      </h1>
    </div>
  );
}
