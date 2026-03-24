"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

function getGreeting() {
  const currentHour = new Date().getHours();
  if (currentHour >= 5 && currentHour < 12) {
    return "좋은 아침이에요";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "좋은 오후예요";
  } else {
    return "좋은 저녁이에요";
  }
}

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    setMounted(true);
    setGreeting(getGreeting());
  }, []);

  return (
    <section className="relative overflow-hidden rounded-2xl bg-card border border-border p-6 md:p-8 shadow-sm">
      {/* Subtle gradient decoration */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-accent/8 to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr from-primary/5 to-transparent rounded-full translate-y-1/2 -translate-x-1/3" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 min-h-[24px]" suppressHydrationWarning>
              {mounted ? (
                <>
                  <span className="text-muted-foreground">{greeting}, 민지님</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
                    <Sparkles className="h-3 w-3" />
                    프리미엄
                  </span>
                </>
              ) : (
                <span className="text-muted-foreground">&nbsp;</span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold leading-tight text-balance">
              오늘도 아이의 성장을
              <br />
              <span className="text-primary">함께 만들어가요</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-md leading-relaxed">
              서준이가 오늘 수학 학습에서 큰 진전을 보였어요.
              <br className="hidden md:block" />
              AI 분석 리포트를 확인해보세요.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link href="/dashboard">
                  대시보드 바로가기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
                AI 분석 보기
              </Button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="w-44 h-44 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border border-border">
                <div className="w-32 h-32 rounded-xl bg-card border border-border flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-primary">87%</p>
                    <p className="text-xs text-muted-foreground mt-1">이번 주 목표 달성률</p>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                12일 연속 학습
              </div>
              <div className="absolute -bottom-2 -left-2 bg-card border border-border text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                <span className="text-accent">+15%</span> 성장
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
