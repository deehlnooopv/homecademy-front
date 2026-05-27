"use client";

import { cn } from "@/src/shared/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "white";
}

/**
 * 홈카데미 로고 컴포넌트
 * - 집 모양 아이콘 + 브랜드명 조합
 * - size: sm(32px) | md(44px) | lg(56px) | xl(72px)
 * - variant: default(컬러) | white(흰색 버전)
 */
export function Logo({ className, size = "md", showText = true, variant = "default" }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: "text-base", sub: "text-[9px]", gap: "gap-2" },
    md: { icon: 44, text: "text-xl", sub: "text-[10px]", gap: "gap-2.5" },
    lg: { icon: 56, text: "text-2xl", sub: "text-[11px]", gap: "gap-3" },
    xl: { icon: 72, text: "text-3xl", sub: "text-[12px]", gap: "gap-3.5" },
  };

  const { icon, text, sub, gap } = sizes[size];
  const isWhite = variant === "white";

  return (
    <div className={cn("flex items-center", gap, className)}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="28" cy="28" r="28" fill={isWhite ? "rgba(255,255,255,0.15)" : "#FFF3EE"} />
        <rect x="12" y="26" width="32" height="22" rx="4" fill={isWhite ? "white" : "#FF8A5B"} />
        <path d="M8 27L28 10L48 27" stroke={isWhite ? "white" : "#FF6B35"} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="22" y="34" width="12" height="14" rx="6" fill={isWhite ? "rgba(255,255,255,0.3)" : "#FFF3EE"} />
        <circle cx="28" cy="14" r="4" fill={isWhite ? "rgba(255,255,255,0.9)" : "#7C3AED"} />
        <path d="M28 11.5V16.5M25.5 14H30.5" stroke={isWhite ? "#7C3AED" : "white"} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="14" y="32" width="6" height="6" rx="1.5" fill={isWhite ? "rgba(255,255,255,0.5)" : "#FFF3EE"} />
        <rect x="36" y="32" width="6" height="6" rx="1.5" fill={isWhite ? "rgba(255,255,255,0.5)" : "#FFF3EE"} />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-extrabold tracking-tight", text, isWhite ? "text-white" : "text-[#FF6B35]")}>
            홈카데미
          </span>
          <span className={cn("font-semibold tracking-widest uppercase mt-0.5", sub, isWhite ? "text-white/70" : "text-[#7C3AED]")}>
            Homecademy
          </span>
        </div>
      )}
    </div>
  );
}
