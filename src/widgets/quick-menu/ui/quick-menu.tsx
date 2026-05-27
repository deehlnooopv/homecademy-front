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

const menuItems = [
  {
    icon: LayoutDashboard,
    label: "대시보드",
    description: "학습 현황 한눈에",
    href: "/dashboard",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: BookOpen,
    label: "학습관리",
    description: "커리큘럼 설정",
    href: "/learning",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Sparkles,
    label: "AI 분석",
    description: "재능 & 성향 분석",
    href: "/analysis",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    icon: BarChart3,
    label: "성장 리포트",
    description: "주간/월간 리포트",
    href: "/reports",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    icon: Calendar,
    label: "학습 일정",
    description: "스케줄 관리",
    href: "/schedule",
    color: "bg-sky-500/10 text-sky-600",
  },
  {
    icon: MessageSquare,
    label: "커뮤니티",
    description: "부모 소통 공간",
    href: "/community",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Settings,
    label: "설정",
    description: "계정 & 알림 설정",
    href: "/settings",
    color: "bg-slate-500/10 text-slate-600",
  },
  {
    icon: HelpCircle,
    label: "도움말",
    description: "사용 가이드",
    href: "/help",
    color: "bg-indigo-500/10 text-indigo-600",
  },
];

export function QuickMenu() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-5 text-foreground">바로가기</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Card className="h-full hover:shadow-md hover:border-primary/30 transition-all group cursor-pointer bg-card">
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className={`p-3 rounded-xl ${item.color} transition-transform group-hover:scale-105`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground hidden sm:block mt-0.5">
                    {item.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
