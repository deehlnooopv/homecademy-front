"use client";

import Link from "next/link";
import { Card, CardContent } from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import {
  Sparkles,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  Star,
  Zap,
  Music,
  Calculator,
  Lightbulb,
  Brain,
} from "lucide-react";
import type { AIAnalysisReport } from "../model/types";

const BADGE_STYLES: Record<string, string> = {
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  purple: "bg-violet-50 text-violet-700 border-violet-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
  green: "bg-emerald-50 text-emerald-700 border-emerald-200",
  rose: "bg-rose-50 text-rose-700 border-rose-200",
};

const TALENT_ICONS: Record<string, React.ElementType> = {
  수학: Calculator,
  음악: Music,
  창의력: Lightbulb,
  국어: Brain,
  default: Zap,
};

function getTalentIcon(subject: string): React.ElementType {
  return TALENT_ICONS[subject] ?? TALENT_ICONS.default;
}

interface AIReportSummaryCardProps {
  report: AIAnalysisReport;
  gradient: string;
}

/**
 * 대시보드용 AI 분석 리포트 요약 카드
 * - 자녀별 핵심 재능 하이라이트
 * - 이번 주 학습 통계 요약
 * - 상세 리포트 링크
 */
export function AIReportSummaryCard({ report, gradient }: AIReportSummaryCardProps) {
  const topTalent = report.talents[0];
  const TalentIcon = topTalent ? getTalentIcon(topTalent.subject) : Sparkles;

  return (
    <Card className="group border border-border/60 hover:border-primary/30 hover:shadow-lg transition-all duration-200 bg-card overflow-hidden">
      {/* 상단 그라디언트 바 */}
      <div className={`h-1 bg-gradient-to-r ${gradient}`} />

      <CardContent className="p-5 space-y-4">
        {/* 헤더: 자녀 이름 + 생성 시각 */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
            >
              <span className="text-white font-extrabold text-lg">
                {report.childName.charAt(0)}
              </span>
            </div>
            <div>
              <p className="font-bold text-foreground text-sm">{report.childName}</p>
              <p className="text-[11px] text-muted-foreground">{report.childAge}세 · AI 분석 완료</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-[10px] bg-accent/10 text-accent border-0 gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            NEW
          </Badge>
        </div>

        {/* 요약 문구 */}
        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
          {report.summary}
        </p>

        {/* 핵심 재능 하이라이트 */}
        {topTalent && (
          <div className={`rounded-xl p-3 border ${BADGE_STYLES[topTalent.badgeColor]} bg-opacity-50`}>
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/70 flex items-center justify-center shrink-0 shadow-sm">
                <TalentIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-[11px] font-bold">{topTalent.category} 발견!</span>
                  {topTalent.topPercent && (
                    <span className="text-[10px] font-semibold opacity-80">
                      상위 {topTalent.topPercent}%
                    </span>
                  )}
                </div>
                <p className="text-[11px] leading-relaxed line-clamp-2 opacity-90">
                  {topTalent.episode}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 재능 배지 목록 */}
        <div className="flex flex-wrap gap-1.5">
          {report.talents.map((talent, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className={`text-[10px] px-2 py-0.5 border ${BADGE_STYLES[talent.badgeColor]}`}
            >
              {talent.badge}
            </Badge>
          ))}
        </div>

        {/* 이번 주 통계 */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-2">
            <Clock className="w-3.5 h-3.5 text-muted-foreground mb-1" />
            <span className="text-xs font-bold text-foreground">
              {Math.floor(report.weeklyStudyMinutes / 60)}h {report.weeklyStudyMinutes % 60}m
            </span>
            <span className="text-[10px] text-muted-foreground">학습 시간</span>
          </div>
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mb-1" />
            <span className="text-xs font-bold text-foreground">{report.completedTasks}개</span>
            <span className="text-[10px] text-muted-foreground">완료 과제</span>
          </div>
          <div className="flex flex-col items-center bg-muted/50 rounded-lg p-2">
            <TrendingUp className="w-3.5 h-3.5 text-primary mb-1" />
            <span className="text-xs font-bold text-primary">+{report.achievementChange}%</span>
            <span className="text-[10px] text-muted-foreground">성취도</span>
          </div>
        </div>

        {/* 상세보기 버튼 */}
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-full h-8 text-xs text-primary hover:text-primary hover:bg-primary/5 border border-primary/20 hover:border-primary/40 transition-all"
        >
          <Link
            href={`/dashboard/ai-report/${report.childId}`}
            className="flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            상세 리포트 보기
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
