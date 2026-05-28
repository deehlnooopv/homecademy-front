"use client";

import Link from "next/link";
import { Button } from "@/src/shared/ui/button";
import { Badge } from "@/src/shared/ui/badge";
import { Card, CardContent } from "@/src/shared/ui/card";
import { Avatar, AvatarFallback } from "@/src/shared/ui/avatar";
import {
  Sparkles,
  TrendingUp,
  BookOpen,
  Trophy,
  ArrowRight,
  Star,
  Zap,
} from "lucide-react";

/** 자녀 요약 데이터 (실제 데이터는 API에서 가져와야 함) */
const CHILDREN_SUMMARY = [
  { name: "지우", grade: "초3", level: 85, trend: "+12", color: "from-orange-400 to-rose-400" },
  { name: "민준", grade: "초1", level: 72, trend: "+8", color: "from-violet-400 to-purple-500" },
];

/** 오늘의 학습 현황 통계 */
const TODAY_STATS = [
  { icon: BookOpen, label: "오늘 학습", value: "2과목", color: "text-blue-500", bg: "bg-blue-50" },
  { icon: Trophy, label: "이번 주 달성", value: "5개", color: "text-amber-500", bg: "bg-amber-50" },
  { icon: TrendingUp, label: "평균 성장", value: "+15%", color: "text-emerald-500", bg: "bg-emerald-50" },
  { icon: Zap, label: "연속 학습", value: "7일", color: "text-violet-500", bg: "bg-violet-50" },
];

/**
 * 대시보드 히어로 섹션 컴포넌트
 * - 부모님 환영 메시지 및 자녀 학습 요약 카드 표시
 * - 오늘의 학습 현황 통계 4개 항목 표시
 * - AI 분석 바로가기 CTA 버튼 포함
 */
export function HeroSection() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "좋은 아침이에요" : hour < 18 ? "안녕하세요" : "수고하셨어요";

  return (
    <section className="space-y-6">
      {/* 상단: 환영 메시지 + AI 분석 CTA */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className="bg-primary/10 text-primary border-0 font-semibold text-xs px-2.5 py-1"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              교육 리더
            </Badge>
          </div>
          <h1 className="text-2xl font-extrabold text-foreground">
            {greeting}, 김부모님 👋
          </h1>
          <p className="text-muted-foreground text-sm">
            오늘도 아이들의 재능을 찾아주는 여정을 함께해요
          </p>
        </div>

        <Button
          asChild
          className="shrink-0 bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] hover:from-[#FF5A20] hover:to-[#FF7A45] text-white rounded-xl shadow-md shadow-orange-100 font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <Link href="/analysis" className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            AI 재능 분석
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* 오늘의 통계 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TODAY_STATS.map(({ icon: Icon, label, value, color, bg }) => (
          <Card
            key={label}
            className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card"
          >
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`${bg} p-2.5 rounded-xl shrink-0`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground truncate">{label}</p>
                <p className="text-lg font-extrabold text-foreground leading-tight">{value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 자녀 요약 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CHILDREN_SUMMARY.map((child) => (
          <Link key={child.name} href={`/dashboard/children/${child.name}`}>
            <Card className="group border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${child.color} flex items-center justify-center shadow-md`}
                    >
                      <span className="text-white font-extrabold text-lg">{child.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-foreground">{child.name}</p>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4 bg-muted text-muted-foreground"
                        >
                          {child.grade}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-xs text-muted-foreground">
                          이번 주 성장 <span className="text-emerald-600 font-semibold">{child.trend}점</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-foreground">{child.level}</p>
                    <p className="text-xs text-muted-foreground">종합 점수</p>
                  </div>
                </div>

                {/* 진행률 바 */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>이번 주 학습 진도</span>
                    <span className="font-medium text-foreground">{child.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${child.color} rounded-full transition-all duration-700`}
                      style={{ width: `${child.level}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">상세 분석 보기</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
