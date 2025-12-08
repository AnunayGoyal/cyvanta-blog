"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="relative w-full flex-1">
      {/* Top wipe bar – re-runs on every route change */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-30 overflow-hidden">
        <div
          key={pathname}
          className="
            h-[2px] md:h-[3px] w-full
            bg-primary/70
            motion-safe:animate-routeWipe
          "
        />
      </div>

      {/* Page content – fade/slide in on each route */}
      <div key={pathname} className="motion-safe:animate-fadeInUp">
        {children}
      </div>
    </div>
  );
}
