"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Header } from "@/src/widgets/header";
import { Footer } from "@/src/widgets/footer";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  RadialBarChart,
  RadialBar,
} from "recharts";
import { ArrowLeft, Star, ChevronRight, TrendingUp } from "lucide-react";

const children = [
  {
    id: 1,
    name: "김서준",
    age: 8,
    avatar: "/avatars/child1.jpg",
    level: "탐험가",
    streak: 12,
    todayProgress: 75,
    weeklyAchievement: 82,
    totalProgress: 68,
    skills: [
      { subject: "수학", value: 85 },
      { subject: "국어", value: 78 },
      { subject: "영어", value: 62 },
      { subject: "과학", value: 90 },
      { subject: "사고력", value: 74 },
      { subject: "창의력", value: 88 },
    ],
    weeklyStudy: [
      { day: "월", minutes: 45 },
      { day: "화", minutes: 60 },
      { day: "수", minutes: 30 },
      { day: "목", minutes: 75 },
      { day: "금", minutes: 50 },
      { day: "토", minutes: 90 },
      { day: "일", minutes: 40 },
    ],
    radialData: [{ name: "성취율", value: 82, fill: "#FF8A5B" }],
  },
  {
    id: 2,
    name: "김하은",
    age: 6,
    avatar: "/avatars/child2.jpg",
    level: "호기심왕",
    streak: 5,
    todayProgress: 40,
    weeklyAchievement: 58,
    totalProgress: 45,
    skills: [
      { subject: "수학", value: 55 },
      { subject: "국어", value: 88 },
      { subject: "영어", value: 45 },
      { subject: "과학", value: 60 },
      { subject: "사고력", value: 70 },
      { subject: "창의력", value: 82 },
    ],
    weeklyStudy: [
      { day: "월", minutes: 20 },
      { day: "화", minutes: 35 },
      { day: "수", minutes: 0 },
      { day: "목", minutes: 40 },
      { day: "금", minutes: 25 },
      { day: "토", minutes: 50 },
      { day: "일", minutes: 15 },
    ],
    radialData: [{ name: "성취율", value: 58, fill: "#4F86C6" }],
  },
];

const radarConfig = {
  value: { label: "점수", color: "#FF8A5B" },
} satisfies ChartConfig;

const barConfig = {
  minutes: { label: "학습 시간(분)", color: "#FF8A5B" },
} satisfies ChartConfig;

const radialConfig = {
  value: { label: "주간 성취율", color: "#FF8A5B" },
} satisfies ChartConfig;

export default function ChildrenPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container px-4 py-8 space-y-8">
          {/* 헤더 */}
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                대시보드
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">우리 아이 현황</h1>
              <p className="text-sm text-muted-foreground">아이들의 학습률과 성취율을 한눈에 확인하세요</p>
            </div>
          </div>

          {/* 자녀 카드 목록 */}
          {children.map((child) => {
            const childRadarConfig: ChartConfig = {
              value: { label: "점수", color: child.id === 1 ? "#FF8A5B" : "#4F86C6" },
            };
            const childBarConfig: ChartConfig = {
              minutes: { label: "학습 시간(분)", color: child.id === 1 ? "#FF8A5B" : "#4F86C6" },
            };
            const childRadialConfig: ChartConfig = {
              value: { label: "주간 성취율", color: child.id === 1 ? "#FF8A5B" : "#4F86C6" },
            };

            return (
              <div key={child.id} className="space-y-4">
                {/* 자녀 프로필 헤더 */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                      <AvatarImage src={child.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                        {child.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold text-foreground">{child.name}</h2>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                          {child.level}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-sm text-muted-foreground">{child.age}세</span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="h-3.5 w-3.5 fill-current" />
                          <span className="text-xs font-medium">{child.streak}일 연속</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5">
                    <Link href={`/dashboard/children/${child.id}`}>
                      상세보기
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>

                {/* 차트 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 역량 레이더 차트 */}
                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-foreground">과목별 역량</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={childRadarConfig} className="aspect-square max-h-[220px]">
                        <RadarChart data={child.skills}>
                          <PolarGrid stroke="hsl(var(--border))" />
                          <PolarAngleAxis
                            dataKey="subject"
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          />
                          <Radar
                            name="점수"
                            dataKey="value"
                            stroke={child.id === 1 ? "#FF8A5B" : "#4F86C6"}
                            fill={child.id === 1 ? "#FF8A5B" : "#4F86C6"}
                            fillOpacity={0.25}
                            strokeWidth={2}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </RadarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* 주간 학습 시간 바 차트 */}
                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-foreground">주간 학습 시간</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer config={childBarConfig} className="aspect-square max-h-[220px]">
                        <BarChart data={child.weeklyStudy} barSize={20}>
                          <CartesianGrid vertical={false} stroke="hsl(var(--border))" />
                          <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                          />
                          <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                            unit="분"
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="minutes"
                            fill={child.id === 1 ? "#FF8A5B" : "#4F86C6"}
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  {/* 주간 성취율 Radial 차트 */}
                  <Card className="md:col-span-1">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-foreground">주간 성취율</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                      <ChartContainer config={childRadialConfig} className="aspect-square max-h-[220px]">
                        <RadialBarChart
                          data={child.radialData}
                          startAngle={90}
                          endAngle={90 - (child.weeklyAchievement / 100) * 360}
                          innerRadius="60%"
                          outerRadius="80%"
                        >
                          <RadialBar
                            dataKey="value"
                            background={{ fill: "hsl(var(--muted))" }}
                            cornerRadius={8}
                          />
                          <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                        </RadialBarChart>
                      </ChartContainer>
                      <div className="text-center -mt-4">
                        <p className="text-3xl font-bold text-foreground">{child.weeklyAchievement}%</p>
                        <p className="text-xs text-muted-foreground mt-1">이번 주 목표 달성률</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* 학습 요약 수치 */}
                <div className="grid grid-cols-3 gap-3">
                  <Card className="bg-primary/5 border-primary/10">
                    <CardContent className="pt-4 pb-4 text-center">
                      <p className="text-2xl font-bold text-primary">{child.todayProgress}%</p>
                      <p className="text-xs text-muted-foreground mt-1">오늘의 학습률</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-accent/5 border-accent/10">
                    <CardContent className="pt-4 pb-4 text-center">
                      <p className="text-2xl font-bold text-accent">{child.weeklyAchievement}%</p>
                      <p className="text-xs text-muted-foreground mt-1">주간 성취율</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted border-border">
                    <CardContent className="pt-4 pb-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <p className="text-2xl font-bold text-foreground">{child.totalProgress}%</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">전체 진도율</p>
                    </CardContent>
                  </Card>
                </div>

                {/* 구분선 */}
                {child.id !== children[children.length - 1].id && (
                  <div className="border-t border-border pt-4" />
                )}
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </div>
  );
}
