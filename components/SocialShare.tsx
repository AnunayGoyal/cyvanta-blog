"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SocialShare({ title }: { title: string }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const url = `${window.location.origin}${pathname}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4 py-8 border-t border-dashed border-border/50 mt-12">
      <div className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
        &gt; DISTRIBUTE_INTEL
      </div>
      
      <div className="flex flex-wrap gap-3">
        {/* X / Twitter */}
        <a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 text-sm font-mono border border-border bg-background hover:border-primary/50 hover:bg-primary/5 transition-all rounded-sm"
        >
          <span className="text-muted-foreground group-hover:text-primary transition-colors">TYPE:X</span>
          <span className="text-xs opactiy-50">[EXEC]</span>
        </a>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 px-4 py-2 text-sm font-mono border border-border bg-background hover:border-blue-500/50 hover:bg-blue-500/5 transition-all rounded-sm"
        >
          <span className="text-muted-foreground group-hover:text-blue-400 transition-colors">TYPE:LINKEDIN</span>
          <span className="text-xs opactiy-50">[EXEC]</span>
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopy}
          className="group flex items-center gap-2 px-4 py-2 text-sm font-mono border border-border bg-background hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all rounded-sm"
        >
          <span className={`transition-colors ${copied ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-foreground'}`}>
            {copied ? 'COPIED::OK' : 'TYPE:CLIPBOARD'}
          </span>
          {!copied && <span className="text-xs opactiy-50">[CP]</span>}
        </button>
      </div>
    </div>
  );
}
