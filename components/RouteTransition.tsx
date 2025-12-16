"use client";

import { usePathname } from "next/navigation";
import React from "react";
import LoadingScreen from "./LoadingScreen";

export default function RouteTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showSplash, setShowSplash] = React.useState(true);

  React.useEffect(() => {
    // Show splash screen for 2.5 seconds on initial load
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full flex-1">
      {/* Splash Screen */}
      {showSplash && <LoadingScreen />}

      {/* Page content – fade/slide in on each route */}
      <div className={`motion-safe:animate-fadeInUp ${showSplash ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        {children}
      </div>
    </div>
  );
}
