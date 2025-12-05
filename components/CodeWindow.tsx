"use client"; // <--- Required for this library

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function CodeWindow({ 
  title, 
  lang, 
  children 
}: { 
  title: string; 
  lang: string; 
  children: string 
}) {
  return (
    <div className="not-prose my-8">
      <div className="bg-[#0D0D0D] border border-white/10 rounded-md overflow-hidden shadow-2xl">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <span className="text-xs text-gray-500 font-mono">{title}</span>
          <span className="text-xs text-gray-600 font-bold border border-white/10 px-1 rounded uppercase">{lang}</span>
        </div>
        
        {/* The Magic: Syntax Highlighter */}
        <div className="overflow-x-auto">
          <SyntaxHighlighter
            language={lang.toLowerCase()}
            style={atomDark}
            customStyle={{
              background: '#0a0a0a', // Matches your website bg
              padding: '1.5rem',     // p-6 equivalent
              margin: 0,
              fontSize: '0.875rem',  // text-sm
              fontFamily: 'var(--font-mono)',
              lineHeight: '1.6',
            }}
            wrapLongLines={true}
          >
            {children}
          </SyntaxHighlighter>
        </div>

      </div>
    </div>
  );
}