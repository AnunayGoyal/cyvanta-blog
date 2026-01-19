"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const segments = pathname.split("/").filter((item) => item !== "");
  
  // Custom display name map
  const nameMap: Record<string, string> = {
    blog: "INTEL",
    category: "SECTOR",
    author: "OPERATIVE",
    team: "UNIT",
    join: "RECRUITMENT"
  };

  return (
    <nav className="flex items-center gap-2 text-xs md:text-sm font-mono text-muted-foreground mb-8 overflow-hidden whitespace-nowrap">
      <Link href="/" className="hover:text-primary transition-colors">
        HOME
      </Link>
      
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const displayName = nameMap[segment] || segment.toUpperCase().replace(/-/g, "_");

        return (
          <div key={href} className="flex items-center gap-2">
            <span className="text-muted-foreground/50">/</span>
            {isLast ? (
              <span className="text-foreground max-w-[200px] truncate">
                {displayName}
              </span>
            ) : (
                // Only link if it's not a dynamic route placeholder like [slug] which might not have an index page
                // In this site structure: /blog is valid, /blog/category/web-security is valid
                <Link href={href} className="hover:text-primary transition-colors">
                    {displayName}
                </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
