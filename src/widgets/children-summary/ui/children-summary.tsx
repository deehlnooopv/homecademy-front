"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { ChevronRight, Clock, Sparkles, Flame, AlertTriangle, CalendarX } from "lucide-react";

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
    /** 마지막 학습 날짜 (ISO 8601) */
    lastStudiedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1일 전
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
    /** 마지막 학습 날짜 (ISO 8601) - 테스트용: 10일 전 */
    lastStudiedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10일 전
    subjects: [
      { name: "국어", progress: 90 },
      { name: "미술", progress: 75 },
      { name: "음악", progress: 65 },
    ],
  },
] as const;

/**
 * 마지막 학습 시기를 사람이 읽기 쉬운 형태로 변환
 * @param lastStudiedAt - ISO 8601 날짜 문자열
 * @returns { label, daysDiff, staleness } 형태의 객체
 */
function getLastStudiedInfo(lastStudiedAt: string) {
  const now = Date.now();
  const last = new Date(lastStudiedAt).getTime();
  const diffMs = now - last;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  let label: string;
  if (diffDays === 0) {
    label = "오늘 학습";
  } else if (diffDays === 1) {
    label = "어제 학습";
  } else if (diffDays < 7) {
    label = `${diffDays}일 전 학습`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    label = `${weeks}주 전 학습`;
  } else {
    const months = Math.floor(diffDays / 30);
    label = `${months}개월 전 학습`;
  }

  /** 카드 낡음 정도: 'fresh' | 'week' | 'month' */
  let staleness: "fresh" | "week" | "month";
  if (diffDays >= 30) {
    staleness = "month";
  } else if (diffDays >= 7) {
    staleness = "week";
  } else {
    staleness = "fresh";
  }

  return { label, diffDays, staleness };
}

/**
 * 낡음 정도에 따른 카드 스타일 클래스 반환
 */
function getStaleCardClasses(staleness: "fresh" | "week" | "month") {
  switch (staleness) {
    case "month":
      // 한달 이상: 세피아 필터 + 채도 감소 + 테두리 변색
      return "opacity-70 saturate-50 border-amber-200/80 bg-amber-50/30";
    case "week":
      // 일주일 이상: 약한 채도 감소 + 약한 테두리 변색
      return "opacity-85 saturate-75 border-muted/80";
    default:
      return "";
  }
}

/**
 * 자녀 학습 현황 요약 위젯
 * - 각 자녀의 오늘 학습 진도, 연속 학습 일수, 강점 재능 표시
 * - 과목별 진도 미니 바 차트 포함
 * - 마지막 학습 시기 표시 (일주일/한달 경과 시 카드 낡아지는 효과)
 * - 상세보기 링크로 자녀 상세 페이지 이동
 */
export function ChildrenSummary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">우리 아이 현황</h2>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground text-xs h-7 px-2">
          <Link href="/children" className="flex items-center gap-1">
            전체보기
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {CHILDREN_DATA.map((child) => {
          const { label: lastStudiedLabel, staleness } = getLastStudiedInfo(child.lastStudiedAt);
          const staleClasses = getStaleCardClasses(staleness);

          return (
            <Card
              key={child.id}
              className={`group border transition-all duration-200 bg-card overflow-hidden ${
                staleness === "fresh"
                  ? "border-border/60 hover:border-primary/30 hover:shadow-lg"
                  : `${staleClasses} hover:opacity-100 hover:saturate-100`
              }`}
            >
              {/* 상단 그라디언트 바 - 낡음 정도에 따라 흐려짐 */}
              <div
                className={`h-1 bg-gradient-to-r ${child.gradient} ${
                  staleness === "month" ? "opacity-40" : staleness === "week" ? "opacity-60" : ""
                }`}
              />

              {/* 낡음 경고 배너 */}
              {staleness !== "fresh" && (
                <div
                  className={`flex items-center gap-2 px-4 py-2 text-xs font-medium ${
                    staleness === "month"
                      ? "bg-red-50 text-red-600 border-b border-red-100"
                      : "bg-amber-50 text-amber-600 border-b border-amber-100"
                  }`}
                >
                  {staleness === "month" ? (
                    <CalendarX className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  <span>
                    {staleness === "month"
                      ? "한 달 이상 학습이 없었어요. 다시 시작해볼까요?"
                      : "일주일 이상 학습이 없었어요. 슬슬 시작해볼까요?"}
                  </span>
                </div>
              )}

              <CardHeader className="pb-3 pt-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${child.gradient} flex items-center justify-center shadow-md ${
                        staleness !== "fresh" ? "opacity-70" : ""
                      }`}
                    >
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
                    {/* 마지막 학습 시기 */}
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        staleness === "month"
                          ? "text-red-500 font-semibold"
                          : staleness === "week"
                          ? "text-amber-500 font-medium"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      <span>{lastStudiedLabel}</span>
                    </div>
                    <span className="text-border">·</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4 bg-accent/10 text-accent border-accent/20 gap-1">
                      <Sparkles className="h-2.5 w-2.5" />
                      {child.recentAchievement}
                    </Badge>
                  </div>
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
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
