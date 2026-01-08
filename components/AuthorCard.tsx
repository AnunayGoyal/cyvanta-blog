"use client";

import type { Author } from "@/lib/mdx";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export default function AuthorCard({ author }: { author: Author }) {
  const CardContent = (
    <div className="group relative overflow-hidden rounded-lg border border-border/50 bg-card/30 p-6 transition-all hover:border-emerald-500/50 hover:bg-card/50 h-full">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Author Image */}
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-emerald-500/20 group-hover:border-emerald-500 transition-colors">
          {author.image ? (
            <Image
              src={urlFor(author.image).width(200).height(200).url()}
              alt={author.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <span className="text-2xl font-mono">?</span>
            </div>
          )}
        </div>

        {/* Name & Role */}
        <h3 className="mb-1 font-mono text-lg font-bold text-foreground group-hover:text-emerald-400 transition-colors">
          {author.name}
        </h3>
        <p className="mb-4 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          [ {author.profileTag || 'Core Contributor'} ]
        </p>

        {/* Bio */}
        {author.bio && (
          <p className="mb-6 line-clamp-3 text-sm text-muted-foreground">
            {author.bio}
          </p>
        )}
        
        {/* Visual Indicator of Link */}
         {author.linkedin && (
           <div className="absolute top-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
           </div>
         )}
      </div>
    </div>
  );

  return (
      <Link href={`/author/${author.slug}`} className="block h-full">
          {CardContent}
      </Link>
  );
}
