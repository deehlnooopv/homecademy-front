"use client";

import Link from "next/link";
import { Card, CardContent } from "@/src/shared/ui/card";
import {
  LayoutDashboard,
  BookOpen,
  Sparkles,
  BarChart3,
  Calendar,
  MessageSquare,
  Settings,
  HelpCircle,
} from "lucide-react";

/** 바로가기 메뉴 항목 데이터 */
const MENU_ITEMS = [
  { icon: LayoutDashboard, label: "대시보드", description: "학습 현황 한눈에", href: "/dashboard", gradient: "from-orange-400 to-rose-400" },
  { icon: BookOpen, label: "학습 관리", description: "커리큘럼 설정", href: "/learning", gradient: "from-blue-400 to-indigo-500" },
  { icon: Sparkles, label: "AI 분석", description: "재능 & 성향 분석", href: "/analysis", gradient: "from-violet-400 to-purple-500" },
  { icon: BarChart3, label: "성장 리포트", description: "주간/월간 리포트", href: "/reports", gradient: "from-emerald-400 to-teal-500" },
  { icon: Calendar, label: "학습 일정", description: "스케줄 관리", href: "/schedule", gradient: "from-sky-400 to-cyan-500" },
  { icon: MessageSquare, label: "커뮤니티", description: "부모 소통 공간", href: "/community", gradient: "from-pink-400 to-rose-500" },
  { icon: Settings, label: "설정", description: "계정 & 알림 설정", href: "/settings", gradient: "from-slate-400 to-gray-500" },
  { icon: HelpCircle, label: "도움말", description: "사용 가이드", href: "/help", gradient: "from-amber-400 to-orange-500" },
] as const;

/**
 * 바로가기 메뉴 위젯 컴포넌트
 * - 주요 기능으로 빠르게 이동할 수 있는 그리드 메뉴
 * - 각 항목은 그라디언트 아이콘 + 레이블 + 설명 구성
 * - 호버 시 카드 상승 애니메이션 효과
 */
export function QuickMenu() {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">바로가기</h2>
        <span className="text-xs text-muted-foreground">자주 쓰는 기능</span>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {MENU_ITEMS.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="group h-full border-0 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer bg-card">
              <CardContent className="p-3 flex flex-col items-center text-center gap-2.5">
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                  <item.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-xs text-foreground leading-tight">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground hidden sm:block mt-0.5 leading-tight">{item.description}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
