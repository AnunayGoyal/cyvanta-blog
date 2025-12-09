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


      {/* Page content – fade/slide in on each route */}
      <div className="motion-safe:animate-fadeInUp">
        {children}
      </div>
    </div>
  );
}
