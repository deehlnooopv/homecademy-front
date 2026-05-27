"use client";

import { AIReportDetail } from "@/src/entities/child";
import { AI_REPORT_MOCK_DATA } from "@/src/entities/child";

const CHILD_GRADIENTS: Record<string, string> = {
  "1": "from-orange-400 to-rose-400",
  "2": "from-violet-400 to-purple-500",
};

interface AIReportDetailViewProps {
  childId: string;
}

/**
 * AI 분석 상세 리포트 뷰 위젯
 * - childId에 해당하는 리포트 데이터 조회
 * - AIReportDetail 컴포넌트로 렌더링
 */
export function AIReportDetailView({ childId }: AIReportDetailViewProps) {
  const report = AI_REPORT_MOCK_DATA.find((r) => r.childId === childId);

  if (!report) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-lg font-bold text-foreground">리포트를 찾을 수 없습니다.</p>
          <p className="text-sm text-muted-foreground">해당 자녀의 분석 데이터가 아직 준비되지 않았습니다.</p>
        </div>
      </div>
    );
  }

  const gradient = CHILD_GRADIENTS[childId] ?? "from-slate-400 to-gray-500";

  return <AIReportDetail report={report} gradient={gradient} />;
}
