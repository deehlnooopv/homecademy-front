"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, TrendingUp, Lightbulb, Bell } from "lucide-react";

const newsItems = [
  {
    id: 1,
    category: "공지",
    title: "홈카데미 3.0 업데이트 안내",
    summary: "새로운 AI 재능 분석 기능이 추가되었습니다.",
    date: "2024.01.15",
    isNew: true,
    icon: Bell,
    categoryColor: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    category: "교육팁",
    title: "초등 저학년 수학, 이렇게 가르치세요",
    summary: "수 감각을 키우는 일상 속 놀이 5가지를 소개합니다.",
    date: "2024.01.14",
    isNew: true,
    icon: Lightbulb,
    categoryColor: "bg-amber-500/10 text-amber-600",
  },
  {
    id: 3,
    category: "트렌드",
    title: "2024 초등교육 트렌드 리포트",
    summary: "AI 시대, 우리 아이에게 필요한 역량은?",
    date: "2024.01.12",
    isNew: false,
    icon: TrendingUp,
    categoryColor: "bg-accent/10 text-accent",
  },
];

const tips = [
  {
    id: 1,
    title: "오늘의 교육 팁",
    content: "아이가 틀렸을 때 '왜 그렇게 생각했어?'라고 물어보세요. 사고 과정을 이해하는 것이 더 중요합니다.",
  },
  {
    id: 2,
    title: "AI 추천 활동",
    content: "서준이의 수학적 사고력을 키우기 좋은 보드게임 '블로커스'를 추천드립니다.",
  },
];

export function NewsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-foreground">최근 소식</h2>
          <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
            <Link href="/news">
              전체보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="space-y-3">
          {newsItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group bg-card">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl shrink-0 ${item.categoryColor}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs border-border">
                        {item.category}
                      </Badge>
                      {item.isNew && (
                        <Badge className="text-xs bg-accent text-accent-foreground border-0">
                          NEW
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {item.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                    <Clock className="h-3 w-3" />
                    {item.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-5 text-foreground">AI 추천</h2>
        <div className="space-y-3">
          {tips.map((tip) => (
            <Card key={tip.id} className="bg-gradient-to-br from-primary/5 via-card to-accent/5 border-primary/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  {tip.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tip.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
