"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export function Logo({ className, size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 36, text: "text-lg" },
    md: { icon: 44, text: "text-xl" },
    lg: { icon: 56, text: "text-2xl" },
  };

  const { icon, text } = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Rounded house base */}
        <rect
          x="8"
          y="20"
          width="32"
          height="24"
          rx="4"
          className="fill-primary"
        />
        {/* Roof */}
        <path
          d="M4 22L24 6L44 22"
          className="stroke-primary"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Door/Window - represents learning */}
        <rect
          x="18"
          y="28"
          width="12"
          height="16"
          rx="2"
          className="fill-background"
        />
        {/* AI Brain circle with pulse */}
        <circle cx="24" cy="34" r="4" className="fill-accent" />
        <circle cx="24" cy="34" r="1.5" className="fill-background" />
        {/* Connection dots - tech feel */}
        <circle cx="14" cy="30" r="2" className="fill-accent/80" />
        <circle cx="34" cy="30" r="2" className="fill-accent/80" />
        {/* Small decorative element on roof */}
        <circle cx="24" cy="12" r="3" className="fill-accent" />
      </svg>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold tracking-tight text-primary", text)}>
            홈카데미
          </span>
          <span className="text-[10px] font-medium text-accent tracking-widest uppercase">
            Homecademy
          </span>
        </div>
      )}
    </div>
  );
}
