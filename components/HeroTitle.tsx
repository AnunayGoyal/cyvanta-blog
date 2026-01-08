"use client";

import { useEffect, useState } from "react";

export default function HeroTitle() {
  const [text, setText] = useState("");
  const fullText = "CYVANTA";

  useEffect(() => {
    setText(""); // Reset on mount
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 150); // 150ms typing speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-full overflow-hidden">
      <h1 className="text-6xl sm:text-8xl md:text-[10rem] font-bold tracking-tighter md:tracking-[-0.05em] text-foreground select-none relative text-center whitespace-nowrap font-mono leading-none">
        {text}
        <span className="ml-1 text-primary animate-blink">_</span>
      </h1>
    </div>
  );
}
