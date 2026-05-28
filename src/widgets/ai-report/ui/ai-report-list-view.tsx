"use client";

import { Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/src/shared/ui/button";
import { AIReportSummaryCard } from "@/src/entities/child";
import { AI_REPORT_MOCK_DATA } from "@/src/entities/child";

const CHILD_GRADIENTS: Record<string, string> = {
  "1": "from-orange-400 to-rose-400",
  "2": "from-violet-400 to-purple-500",
};

/**
 * AI 분석 리포트 목록 뷰 위젯
 * - 자녀별 AI 분석 요약 카드 목록
 * - 각 카드에서 상세 리포트로 이동 가능
 */
export function AIReportListView() {
  return (
    <div className="bg-background">
      <div className="container max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* 페이지 헤더 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">AI 성장 분석</h1>
              <p className="text-xs text-muted-foreground">자녀별 맞춤 성장 리포트</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-100">
            <p className="text-sm text-violet-800 font-medium leading-relaxed">
              "매일의 작은 기록들이 모여, 아이의 커다란 재능이 됩니다."
            </p>
            <p className="text-xs text-violet-600/80 mt-1">
              AI가 분석한 우리 아이만의 성장 스토리를 확인해보세요.
            </p>
          </div>
        </div>

        {/* 업데이트 시각 */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            총 <strong>{AI_REPORT_MOCK_DATA.length}명</strong>의 자녀 분석 완료
          </p>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1.5 h-7">
            <RefreshCw className="w-3.5 h-3.5" />
            새로고침
          </Button>
        </div>

        {/* 자녀별 요약 카드 목록 */}
        <div className="grid gap-4 md:grid-cols-2">
          {AI_REPORT_MOCK_DATA.map((report) => (
            <AIReportSummaryCard
              key={report.childId}
              report={report}
              gradient={CHILD_GRADIENTS[report.childId] ?? "from-slate-400 to-gray-500"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
