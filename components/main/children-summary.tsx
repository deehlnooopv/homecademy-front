"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, TrendingUp, Clock, Sparkles } from "lucide-react";

const children = [
  {
    id: 1,
    name: "김서준",
    age: 8,
    avatar: "/avatars/child1.jpg",
    level: "탐험가",
    todayProgress: 75,
    todayTime: "1시간 20분",
    streak: 12,
    topTalent: "수학적 사고",
    recentAchievement: "곱셈 마스터",
  },
  {
    id: 2,
    name: "김하은",
    age: 6,
    avatar: "/avatars/child2.jpg",
    level: "호기심왕",
    todayProgress: 40,
    todayTime: "45분",
    streak: 5,
    topTalent: "언어 감각",
    recentAchievement: "한글 읽기 완성",
  },
];

export function ChildrenSummary() {
  return (
    <section>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-foreground">우리 아이 현황</h2>
        <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-primary">
          <Link href="/children">
            전체보기
            <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id} className="group hover:shadow-md hover:border-primary/30 transition-all bg-card">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                    <AvatarImage src={child.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {child.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base text-foreground">{child.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">{child.age}세</span>
                      <Badge variant="secondary" className="text-xs px-2 py-0 bg-primary/10 text-primary border-0">
                        {child.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="text-xs font-medium">{child.streak}일</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">오늘의 학습</span>
                  <span className="font-semibold text-foreground">{child.todayProgress}%</span>
                </div>
                <Progress value={child.todayProgress} className="h-2 bg-muted [&>div]:bg-accent" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                  <Clock className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">학습 시간</p>
                    <p className="text-sm font-semibold text-foreground">{child.todayTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
                  <TrendingUp className="h-4 w-4 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">강점 재능</p>
                    <p className="text-sm font-semibold text-foreground">{child.topTalent}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20 gap-1">
                  <Sparkles className="h-3 w-3" />
                  {child.recentAchievement}
                </Badge>
                <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5">
                  <Link href={`/dashboard/children/${String(child.id)}`}>
                    상세보기
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
