"use client";

import {
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  CheckCircle2,
  RefreshCw,
  Brain,
  MessageCircle,
  Lightbulb,
  Trophy,
  Zap,
  Music,
  Calculator,
  ChevronRight,
  ArrowLeft,
  Target,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/shared/ui/card";
import { Badge } from "@/src/shared/ui/badge";
import { Button } from "@/src/shared/ui/button";
import { Progress } from "@/src/shared/ui/progress";
import { Separator } from "@/src/shared/ui/separator";
import { HexagonSkillChart } from "./hexagon-skill-chart";
import type { AIAnalysisReport, TalentDiscovery } from "../model/types";

// ─── 스타일 헬퍼 ──────────────────────────────────────────────────────────────

const BADGE_BG: Record<string, string> = {
  gold: "from-amber-400 to-yellow-500",
  purple: "from-violet-500 to-purple-600",
  blue: "from-blue-500 to-indigo-600",
  green: "from-emerald-500 to-teal-600",
  rose: "from-rose-500 to-pink-600",
};

const BADGE_CARD: Record<string, string> = {
  gold: "border-amber-200 bg-amber-50/80",
  purple: "border-violet-200 bg-violet-50/80",
  blue: "border-blue-200 bg-blue-50/80",
  green: "border-emerald-200 bg-emerald-50/80",
  rose: "border-rose-200 bg-rose-50/80",
};

const BADGE_TEXT: Record<string, string> = {
  gold: "text-amber-700",
  purple: "text-violet-700",
  blue: "text-blue-700",
  green: "text-emerald-700",
  rose: "text-rose-700",
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

// ─── 재능 발견 카드 ──────────────────────────────────────────────────────────

interface TalentCardProps {
  talent: TalentDiscovery;
  rank: number;
}

function TalentCard({ talent, rank }: TalentCardProps) {
  const Icon = getTalentIcon(talent.subject);
  const isTop = rank === 0;

  return (
    <div
      className={`relative rounded-2xl border-2 p-5 transition-all ${BADGE_CARD[talent.badgeColor]} ${
        isTop ? "ring-2 ring-offset-2 ring-amber-300/60" : ""
      }`}
    >
      {/* 1위 왕관 */}
      {isTop && (
        <div className="absolute -top-3 -right-2">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Trophy className="w-3 h-3" />
            핵심 재능
          </div>
        </div>
      )}

      <div className="flex items-start gap-4">
        {/* 아이콘 */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${BADGE_BG[talent.badgeColor]} flex items-center justify-center shadow-lg shrink-0`}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h3 className={`font-extrabold text-base ${BADGE_TEXT[talent.badgeColor]}`}>
              {talent.category}
            </h3>
            <Badge
              className={`text-[10px] px-2 py-0.5 bg-gradient-to-r ${BADGE_BG[talent.badgeColor]} text-white border-0 font-bold`}
            >
              {talent.badge}
            </Badge>
            {talent.topPercent && (
              <Badge variant="outline" className={`text-[10px] ${BADGE_TEXT[talent.badgeColor]} border-current`}>
                상위 {talent.topPercent}%
              </Badge>
            )}
          </div>

          {/* 성장률 */}
          <div className="flex items-center gap-1.5 mb-3">
            <TrendingUp className={`w-3.5 h-3.5 ${BADGE_TEXT[talent.badgeColor]}`} />
            <span className={`text-xs font-bold ${BADGE_TEXT[talent.badgeColor]}`}>
              이전 대비 +{talent.growthRate}% 성장
            </span>
          </div>

          {/* 에피소드 */}
          <div className="bg-white/60 rounded-xl p-3 border border-white/80">
            <div className="flex items-start gap-2">
              <Star className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${BADGE_TEXT[talent.badgeColor]} fill-current`} />
              <p className="text-xs text-foreground/80 leading-relaxed">{talent.episode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 과정 중심 데이터 섹션 ───────────────────────────────────────────────────

interface ProcessSectionProps {
  report: AIAnalysisReport;
}

function ProcessSection({ report }: ProcessSectionProps) {
  const { processData } = report;

  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-600" />
          </div>
          <CardTitle className="text-base font-extrabold">과정 중심 분석</CardTitle>
          <Badge variant="secondary" className="ml-auto text-[10px] bg-blue-50 text-blue-600 border-0">
            끈기 & 사고력
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          결과가 아닌 <strong>과정</strong>에서 발견한 {report.childName}의 성장 데이터입니다.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-blue-50/80 rounded-xl p-3 border border-blue-100">
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-blue-700">수정 & 재도전</span>
            </div>
            <p className="text-2xl font-extrabold text-blue-700">{processData.revisionCount}회</p>
            <p className="text-[11px] text-blue-600/80 mt-0.5">
              포기 없이 {processData.retryCount}번 다시 도전
            </p>
          </div>
          <div className="bg-violet-50/80 rounded-xl p-3 border border-violet-100">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-violet-600" />
              <span className="text-xs font-bold text-violet-700">깊이 생각하기</span>
            </div>
            <p className="text-2xl font-extrabold text-violet-700">
              {Math.floor(processData.avgThinkingTime / 60)}분 {processData.avgThinkingTime % 60}초
            </p>
            <p className="text-[11px] text-violet-600/80 mt-0.5">문제당 평균 사고 시간</p>
          </div>
        </div>

        {/* 끈기 점수 */}
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                끈기 지수
              </span>
              <span className="font-bold text-foreground">{processData.persistenceScore}/100</span>
            </div>
            <Progress value={processData.persistenceScore} className="h-2.5" />
            <p className="text-[10px] text-muted-foreground mt-1">
              어려운 문제 앞에서도 포기하지 않는 힘
            </p>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-foreground flex items-center gap-1">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                사고 유연성
              </span>
              <span className="font-bold text-foreground">{processData.flexibilityScore}/100</span>
            </div>
            <Progress value={processData.flexibilityScore} className="h-2.5" />
            <p className="text-[10px] text-muted-foreground mt-1">
              다양한 방법으로 문제를 접근하는 능력
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── 성장 타임라인 ───────────────────────────────────────────────────────────

interface GrowthTimelineProps {
  report: AIAnalysisReport;
}

function GrowthTimeline({ report }: GrowthTimelineProps) {
  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <CardTitle className="text-base font-extrabold">성장 기록</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          다른 아이가 아닌 <strong>어제의 {report.childName}</strong>과 비교한 성장 스토리입니다.
        </p>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* 세로 라인 */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 to-emerald-100" />

          <div className="space-y-4">
            {report.growthTimeline.map((item, idx) => (
              <div key={idx} className="flex gap-4 relative">
                {/* 타임라인 점 */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 shadow-md ${
                    item.highlight
                      ? "bg-gradient-to-br from-emerald-400 to-teal-500"
                      : "bg-white border-2 border-emerald-200"
                  }`}
                >
                  {item.highlight ? (
                    <Star className="w-4 h-4 text-white fill-white" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  )}
                </div>

                <div
                  className={`flex-1 rounded-xl p-3 border ${
                    item.highlight
                      ? "bg-emerald-50/80 border-emerald-200"
                      : "bg-muted/30 border-border/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-bold text-muted-foreground">{item.date}</span>
                    <span
                      className={`text-xs font-extrabold ${
                        item.highlight ? "text-emerald-600" : "text-foreground"
                      }`}
                    >
                      {item.score}점
                    </span>
                  </div>
                  <p className="text-xs font-bold text-foreground">{item.label}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── 부모 대화 가이드 ─────────────────────────────────────────────────────────

interface ConversationGuideProps {
  report: AIAnalysisReport;
}

function ConversationGuideSection({ report }: ConversationGuideProps) {
  return (
    <Card className="border border-border/60 bg-gradient-to-br from-violet-50/50 to-purple-50/30">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
            <MessageCircle className="w-4 h-4 text-violet-600" />
          </div>
          <CardTitle className="text-base font-extrabold">오늘의 대화 가이드</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          리포트를 보고 끝내지 마세요. <strong>이런 질문</strong>으로 아이와 대화해보세요.
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {report.conversationGuides.map((guide, idx) => (
          <div key={idx} className="bg-white/80 rounded-xl p-4 border border-violet-100 space-y-2">
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              <span className="font-semibold text-violet-600">상황: </span>
              {guide.context}
            </p>
            <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-violet-500 mt-0.5 shrink-0" />
                <p className="text-xs text-violet-800 font-medium leading-relaxed italic">
                  {guide.question}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
              <p className="text-[11px] text-muted-foreground leading-relaxed">{guide.tip}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ─── 다음 단계 추천 ───────────────────────────────────────────────────────────

interface NextStepsProps {
  report: AIAnalysisReport;
}

function NextStepsSection({ report }: NextStepsProps) {
  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-base font-extrabold">성장 가이드 (Next Step)</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          발견된 재능을 바탕으로 더 깊이 탐구할 수 있는 활동을 추천합니다.
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2.5">
          {report.nextSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-primary/5 rounded-xl p-3 border border-primary/10"
            >
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[11px] font-extrabold text-primary">{idx + 1}</span>
              </div>
              <p className="text-xs text-foreground/80 leading-relaxed flex-1">{step}</p>
              <ChevronRight className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── 메인 AI 분석 상세 리포트 컴포넌트 ───────────────────────────────────────

interface AIReportDetailProps {
  report: AIAnalysisReport;
  gradient: string;
}

/**
 * AI 성장 분석 상세 리포트 컴포넌트
 * - 재능 발견 강조 (에피소드 기반)
 * - 과정 중심 데이터 (끈기, 사고 시간)
 * - 성장 타임라인 (자기 자신과 비교)
 * - 부모 대화 가이드
 * - 다음 단계 추천
 */
export function AIReportDetail({ report, gradient }: AIReportDetailProps) {
  const generatedDate = new Date(report.generatedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 뒤로가기 */}
        <div>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground -ml-2">
            <Link href="/dashboard/ai-report" className="flex items-center gap-1.5">
              <ArrowLeft className="w-4 h-4" />
              AI 분석 목록으로
            </Link>
          </Button>
        </div>

        {/* 리포트 헤더 */}
        <div
          className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 text-white shadow-lg`}
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-white/90" />
                  <span className="text-white/90 text-sm font-semibold">AI 성장 분석 리포트</span>
                </div>
                <h1 className="text-3xl font-extrabold mb-1">{report.childName}</h1>
                <p className="text-white/80 text-sm">{report.childAge}세 · {generatedDate} 기준</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center border border-white/20">
                <p className="text-3xl font-extrabold">+{report.achievementChange}%</p>
                <p className="text-white/80 text-xs mt-0.5">이번 주 성장</p>
              </div>
            </div>

            <div className="mt-4 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-sm text-white/95 leading-relaxed">{report.summary}</p>
            </div>

            {/* 이번 주 통계 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <Clock className="w-4 h-4 text-white/80 mx-auto mb-1" />
                <p className="text-lg font-extrabold">
                  {Math.floor(report.weeklyStudyMinutes / 60)}h {report.weeklyStudyMinutes % 60}m
                </p>
                <p className="text-white/70 text-[10px]">학습 시간</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <CheckCircle2 className="w-4 h-4 text-white/80 mx-auto mb-1" />
                <p className="text-lg font-extrabold">{report.completedTasks}개</p>
                <p className="text-white/70 text-[10px]">완료 과제</p>
              </div>
              <div className="bg-white/15 rounded-xl p-3 text-center">
                <Trophy className="w-4 h-4 text-white/80 mx-auto mb-1" />
                <p className="text-lg font-extrabold">{report.talents.length}개</p>
                <p className="text-white/70 text-[10px]">발견된 재능</p>
              </div>
            </div>
          </div>
        </div>

        {/* 재능 발견 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Star className="w-4 h-4 text-amber-600 fill-amber-600" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">발견된 재능</h2>
            <Badge className="ml-auto bg-amber-100 text-amber-700 border-amber-200 text-[10px]">
              {report.talents.length}개 발견
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground -mt-2">
            데이터가 읽어주는 <strong>{report.childName}</strong>만의 고유한 가능성입니다.
          </p>
          <div className="space-y-3">
            {report.talents.map((talent, idx) => (
              <TalentCard key={idx} talent={talent} rank={idx} />
            ))}
          </div>
        </section>

        <Separator />

        {/* 6대 역량 레이더 차트 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-xl font-extrabold text-foreground">능력치 성장 레이더</h2>
          </div>
          <HexagonSkillChart data={report.skills} childName={report.childName} />
        </section>

        <Separator />

        {/* 과정 중심 분석 */}
        <ProcessSection report={report} />

        {/* 성장 타임라인 */}
        <GrowthTimeline report={report} />

        {/* 부모 대화 가이드 */}
        <ConversationGuideSection report={report} />

        {/* 다음 단계 추천 */}
        <NextStepsSection report={report} />

        {/* 하단 문구 */}
        <div className="text-center py-4 space-y-1">
          <p className="text-sm font-semibold text-muted-foreground">
            "매일의 작은 기록들이 모여, 아이의 커다란 재능이 됩니다."
          </p>
          <p className="text-xs text-muted-foreground/60">
            AI가 분석한 {report.childName}만의 성장 스토리
          </p>
        </div>
      </div>
    </div>
  );
}
