"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  showRadialGradient?: boolean;
}

export default function AuroraBackground({
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className="transition-bg fixed left-0 top-0 -z-10 hidden h-screen w-screen bg-background lg-l:block"
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={cn(
            `pointer-events-none absolute -inset-[10px] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--emerald-400)_10%,var(--indigo-200)_15%,var(--emerald-300)_20%,var(--violet-200)_25%,var(--purple-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] [background-image:var(--white-gradient),var(--aurora)] [background-position:50%_50%,50%_50%] [background-size:300%,_200%] after:absolute after:inset-0 after:animate-aurora after:mix-blend-difference after:content-[""] after:[background-attachment:fixed] after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] dark:invert-0 dark:[background-image:var(--dark-gradient),var(--aurora)] after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
}
