"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Badge } from "@/src/shared/ui/badge";
import { Progress } from "@/src/shared/ui/progress";
import { Button } from "@/src/shared/ui/button";
import { ChevronRight, Star, TrendingUp, Clock, Sparkles, Flame } from "lucide-react";

/** 자녀 학습 현황 데이터 (실제 데이터는 API에서 가져와야 함) */
const CHILDREN_DATA = [
  {
    id: 1,
    name: "김서준",
    age: 8,
    avatar: "/avatars/child1.jpg",
    level: "탐험가",
    levelNum: 12,
    todayProgress: 75,
    todayTime: "1시간 20분",
    streak: 12,
    topTalent: "수학적 사고",
    recentAchievement: "곱셈 마스터",
    gradient: "from-orange-400 to-rose-400",
    subjects: [
      { name: "수학", progress: 85 },
      { name: "국어", progress: 70 },
      { name: "영어", progress: 60 },
    ],
  },
  {
    id: 2,
    name: "김하은",
    age: 6,
    avatar: "/avatars/child2.jpg",
    level: "호기심왕",
    levelNum: 7,
    todayProgress: 40,
    todayTime: "45분",
    streak: 5,
    topTalent: "언어 감각",
    recentAchievement: "한글 읽기 완성",
    gradient: "from-violet-400 to-purple-500",
    subjects: [
      { name: "국어", progress: 90 },
      { name: "미술", progress: 75 },
      { name: "음악", progress: 65 },
    ],
  },
] as const;

/**
 * 자녀 학습 현황 요약 위젯
 * - 각 자녀의 오늘 학습 진도, 연속 학습 일수, 강점 재능 표시
 * - 과목별 진도 미니 바 차트 포함
 * - 상세보기 링크로 자녀 상세 페이지 이동
 * - AI 분석 보기 버튼으로 AI 리포트 페이지 이동
 */
export function ChildrenSummary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">우리 아이 현황</h2>
        <div className="flex items-center gap-2">
          {/* AI 분석 보기 버튼 */}
          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-7 text-xs border-accent/30 text-accent hover:bg-accent/5 hover:text-accent hover:border-accent/50 gap-1.5"
          >
            <Link href="/dashboard/ai-report" className="flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              AI 분석 보기
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground text-xs h-7 px-2">
            <Link href="/children" className="flex items-center gap-1">
              전체보기
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CHILDREN_DATA.map((child) => (
          <Card
            key={child.id}
            className="group border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-card overflow-hidden"
          >
            {/* 상단 그라디언트 바 */}
            <div className={`h-1 bg-gradient-to-r ${child.gradient}`} />

            <CardHeader className="pb-3 pt-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${child.gradient} flex items-center justify-center shadow-md`}>
                    <span className="text-white font-extrabold text-lg">{child.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base text-foreground">{child.name}</CardTitle>
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4 bg-muted text-muted-foreground border-0">
                        {child.age}세
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Badge className="text-[10px] px-2 py-0 h-4 bg-primary/10 text-primary border-0 font-semibold">
                        Lv.{child.levelNum} {child.level}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* 연속 학습 배지 */}
                <div className="flex items-center gap-1 bg-amber-50 rounded-lg px-2.5 py-1.5">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  <span className="text-xs font-bold text-amber-600">{child.streak}일</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-4">
              {/* 오늘 학습 진도 */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground font-medium">오늘의 학습</span>
                  <span className="font-bold text-foreground">{child.todayProgress}%</span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${child.gradient} rounded-full transition-all duration-700`}
                    style={{ width: `${child.todayProgress}%` }}
                  />
                </div>
              </div>

              {/* 과목별 미니 진도 */}
              <div className="space-y-2">
                {child.subjects.map((subject) => (
                  <div key={subject.name} className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground w-8 shrink-0">{subject.name}</span>
                    <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${child.gradient} rounded-full opacity-70`}
                        style={{ width: `${subject.progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-medium text-foreground w-7 text-right">{subject.progress}%</span>
                  </div>
                ))}
              </div>

              {/* 하단 정보 */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{child.todayTime}</span>
                  </div>
                  <span className="text-border">·</span>
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent/10 text-accent border-accent/20 gap-1">
                    <Sparkles className="h-2.5 w-2.5" />
                    {child.recentAchievement}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  {/* AI 분석 버튼 (카드 내) */}
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-7 text-[11px] text-accent hover:text-accent hover:bg-accent/5 px-2"
                  >
                    <Link href={`/dashboard/ai-report/${child.id}`} className="flex items-center gap-0.5">
                      <Sparkles className="h-3 w-3" />
                      AI 분석
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-7 text-xs text-primary hover:text-primary hover:bg-primary/5 px-2 group-hover:bg-primary/5"
                  >
                    <Link href={`/dashboard/children/${child.id}`} className="flex items-center gap-1">
                      상세보기
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
