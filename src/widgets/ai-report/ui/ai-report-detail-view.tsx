"use client";

import { AIReportDetail } from "@/src/entities/child";
import { AI_REPORT_MOCK_DATA } from "@/src/entities/child";
import { Button } from "@/src/shared/ui/button";
import { Badge } from "@/src/shared/ui/badge";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  TrendingUp,
  Star,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

const CHILD_GRADIENTS: Record<string, string> = {
  "1": "from-orange-400 to-rose-400",
  "2": "from-violet-400 to-purple-500",
};

interface AIReportDetailViewProps {
  childId: string;
}

/**
 * AI 성장 분석 리포트 상단 자녀 요약 카드
 * - 자녀 이름, 나이, 이번 주 통계, 학습 요약 페이지 이동 버튼
 */
function ChildSummaryHeader({
  report,
  gradient,
}: {
  report: (typeof AI_REPORT_MOCK_DATA)[0];
  gradient: string;
}) {
  const generatedDate = new Date(report.generatedAt).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} p-6 md:p-8`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      {/* 뒤로가기 */}
      <Button
        asChild
        variant="ghost"
        size="sm"
        className="relative z-10 text-white/80 hover:text-white hover:bg-white/15 rounded-xl mb-4 -ml-1"
      >
        <Link href="/dashboard/ai-report" className="flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          분석 목록으로
        </Link>
      </Button>

      {/* 자녀 정보 */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/30 shrink-0">
          <span className="text-4xl font-extrabold text-white">{report.childName[0]}</span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{report.childName}</h1>
            <Badge className="bg-white/20 text-white border-white/30 font-bold text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              AI 성장 분석
            </Badge>
          </div>
          <p className="text-white/75 text-sm">{report.childAge}세 · {generatedDate} 기준</p>

          {/* 이번 주 학습 통계 */}
          <div className="flex flex-wrap gap-2 mt-3">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Clock className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white text-xs font-semibold">
                {Math.floor(report.weeklyStudyMinutes / 60)}h {report.weeklyStudyMinutes % 60}m 학습
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white text-xs font-semibold">{report.completedTasks}개 과제 완료</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-white/80" />
              <span className="text-white text-xs font-semibold">+{report.achievementChange}% 성장</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span className="text-white text-xs font-semibold">{report.talents.length}개 재능 발견</span>
            </div>
          </div>
        </div>

        {/* 성장률 카드 */}
        <div className="hidden sm:flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shrink-0">
          <p className="text-4xl font-extrabold text-white">+{report.achievementChange}%</p>
          <p className="text-white/70 text-xs mt-0.5">이번 주 성장</p>
        </div>
      </div>

      {/* 한 줄 요약 + 학습 요약 페이지 이동 버튼 */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/20 space-y-3">
        <div className="bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/20">
          <p className="text-sm text-white/95 leading-relaxed">{report.summary}</p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-white/90 text-sm font-semibold">학습 요약 및 과목별 분석</p>
            <p className="text-white/60 text-xs mt-0.5">
              {report.childName}의 과목별 학습 현황과 미래 학습 가이드를 확인하세요.
            </p>
          </div>
          <Button
            asChild
            className="bg-white text-foreground hover:bg-white/90 font-bold text-sm h-9 px-5 shadow-md shrink-0"
          >
            <Link href={`/dashboard/children/${report.childId}`} className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              학습 요약 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * AI 성장 분석 리포트 상세 뷰 위젯
 * - 상단: 자녀 요약 정보 + 학습 요약 페이지 이동 버튼
 * - 하단: 재능 발견, 역량 레이더, 과정 분석, 성장 타임라인, 대화 가이드, 다음 단계
 */
export function AIReportDetailView({ childId }: AIReportDetailViewProps) {
  const report = AI_REPORT_MOCK_DATA.find((r) => r.childId === childId);

  if (!report) {
    return (
      <div className="bg-background flex items-center justify-center py-20">
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-foreground">리포트를 찾을 수 없습니다.</p>
          <p className="text-sm text-muted-foreground">
            해당 자녀의 분석 데이터가 아직 준비되지 않았습니다.
          </p>
        </div>
      </div>
    );
  }

  const gradient = CHILD_GRADIENTS[childId] ?? "from-slate-400 to-gray-500";

  return (
    <div className="bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 자녀 요약 헤더 */}
        <ChildSummaryHeader report={report} gradient={gradient} />

        {/* AI 성장 분석 상세 내용 (헤더 제외) */}
        <AIReportDetail report={report} gradient={gradient} />
      </div>
    </div>
  );
}
