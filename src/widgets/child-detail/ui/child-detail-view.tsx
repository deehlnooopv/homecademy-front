'use client';

import { SubjectLearningCard } from '@/src/entities/child/ui/subject-learning-card';
import { AIRecommendationCard } from '@/src/entities/child/ui/ai-recommendation-card';
import { Badge } from '@/src/shared/ui/badge';
import { Button } from '@/src/shared/ui/button';
import { Separator } from '@/src/shared/ui/separator';
import { Card, CardContent } from '@/src/shared/ui/card';
import {
  ArrowLeft,
  Trophy,
  Flame,
  Star,
  TrendingUp,
  BookOpen,
  Sparkles,
  Crown,
  ChevronRight,
  Target,
  Clock,
  CheckCircle2,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';
import type { ChildDetail } from '@/src/entities/child/model/types';

interface ChildDetailViewProps {
  child: ChildDetail;
  onNavigateToCourse?: (courseId: string) => void;
}

/** 자녀 레벨별 칭호 및 색상 */
const LEVEL_THEMES: Record<number, { title: string; gradient: string; badge: string }> = {
  1: { title: '새싹 학습자', gradient: 'from-emerald-400 to-teal-500', badge: 'bg-emerald-100 text-emerald-700' },
  2: { title: '성실한 탐구자', gradient: 'from-blue-400 to-indigo-500', badge: 'bg-blue-100 text-blue-700' },
  3: { title: '재능 발굴자', gradient: 'from-violet-400 to-purple-500', badge: 'bg-violet-100 text-violet-700' },
  4: { title: '성장 선도자', gradient: 'from-orange-400 to-rose-500', badge: 'bg-orange-100 text-orange-700' },
  5: { title: '탁월한 인재', gradient: 'from-amber-400 to-yellow-500', badge: 'bg-amber-100 text-amber-700' },
};

/**
 * 자녀 프로필 헤더 컴포넌트
 * - 자녀 이름, 레벨, 연속 학습 일수, 종합 점수 표시
 * - 성장 리포트 바로가기 버튼 포함
 */
function ChildProfileHeader({ child }: { child: ChildDetail }) {
  const levelNum = child.level ?? 1;
  const levelTheme = LEVEL_THEMES[Math.min(levelNum, 5)] ?? LEVEL_THEMES[1];

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${levelTheme.gradient} p-6 md:p-8`}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl pointer-events-none" />

      <Button
        asChild
        variant="ghost"
        size="sm"
        className="relative z-10 text-white/80 hover:text-white hover:bg-white/15 rounded-xl mb-4 -ml-1"
      >
        <Link href="/dashboard" className="flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" />
          대시보드로
        </Link>
      </Button>

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-start gap-5">
        {/* 아바타 */}
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/30 shrink-0">
          <span className="text-4xl font-extrabold text-white">{child.name[0]}</span>
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">{child.name}</h1>
            <Badge className={`${levelTheme.badge} border-0 font-bold text-xs`}>
              <Crown className="w-3 h-3 mr-1" />
              Lv.{levelNum} {levelTheme.title}
            </Badge>
          </div>
          <p className="text-white/75 text-sm">{child.grade ?? `${child.age}세`} · AI 맞춤 학습 진행 중</p>

          {/* 학습 현황 배지 */}
          <div className="flex flex-wrap gap-2 mt-3">
            {child.streak != null && (
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-white text-xs font-semibold">{child.streak}일 연속 학습</span>
              </div>
            )}
            {child.totalScore != null && (
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span className="text-white text-xs font-semibold">종합 {child.totalScore}점</span>
              </div>
            )}
            {child.weeklyGrowth != null && (
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-green-300" />
                <span className="text-white text-xs font-semibold">이번 주 +{child.weeklyGrowth}점 향상</span>
              </div>
            )}
          </div>
        </div>

        {/* 종합 점수 카드 */}
        {child.totalScore != null && (
          <div className="hidden sm:flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20 shrink-0">
            <p className="text-4xl font-extrabold text-white">{child.totalScore}</p>
            <p className="text-white/70 text-xs mt-0.5">종합 점수</p>
            {child.rank != null && (
              <div className="flex items-center gap-1 mt-1">
                <Trophy className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-amber-300 text-xs font-bold">상위 {child.rank}%</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 성장 분석 리포트 버튼 - 헤더 하단 */}
      <div className="relative z-10 mt-5 pt-4 border-t border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-white/90 text-sm font-semibold">AI 성장 분석 리포트</p>
            <p className="text-white/60 text-xs mt-0.5">
              쌓아온 학습 데이터를 바탕으로 {child.name}의 재능과 성장 궤적을 분석합니다.
            </p>
          </div>
          <Button
            asChild
            className="bg-white text-foreground hover:bg-white/90 font-bold text-sm h-9 px-5 shadow-md shrink-0"
          >
            <Link href={`/dashboard/ai-report/${child.id}`} className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              성장 리포트 보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * 학습 현황 요약 카드 컴포넌트
 * - 이번 주 학습 통계 (시간, 완료 과제, 성취도)
 */
function LearningStatsSummary({ child }: { child: ChildDetail }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Card className="border border-border/60 bg-card">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center mb-2">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xl font-extrabold text-foreground">4h 20m</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">이번 주 학습 시간</p>
        </CardContent>
      </Card>
      <Card className="border border-border/60 bg-card">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center mb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-xl font-extrabold text-foreground">12개</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">완료한 과제</p>
        </CardContent>
      </Card>
      <Card className="border border-border/60 bg-card">
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="text-xl font-extrabold text-primary">+8%</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">지난 주 대비 성취도</p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * 자녀 상세 페이지 전체 뷰 위젯
 * - 자녀 정보, 학습 요약, 과목별 학습 분석, 미래 학습 가이드 구성
 * - 성장 리포트는 헤더 내 버튼으로 연결
 * @param child - 자녀 상세 데이터 (ChildDetail 타입)
 * @param onNavigateToCourse - 강좌 이동 콜백 (선택적)
 */
export function ChildDetailView({ child, onNavigateToCourse }: ChildDetailViewProps) {
  return (
    <div className="bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-6 space-y-8">

        {/* 자녀 프로필 헤더 + 성장 리포트 버튼 */}
        <ChildProfileHeader child={child} />

        {/* 이번 주 학습 현황 요약 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold text-foreground">이번 주 학습 현황</h2>
          </div>
          <LearningStatsSummary child={child} />
        </section>

        <Separator />

        {/* 과목별 학습 요약 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold text-foreground">과목별 학습 요약</h2>
            <Badge variant="secondary" className="ml-auto text-xs">
              {child.subjects.length}개 과목
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground -mt-1">
            각 과목 카드를 클릭하면 AI가 분석한 강점, 보완 영역, 다음 학습 방향을 확인할 수 있습니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {child.subjects.map((subject) => (
              <SubjectLearningCard key={subject.subject} card={subject} />
            ))}
          </div>
        </section>

        {/* 미래 학습 가이드 섹션 */}
        {child.recommendations && child.recommendations.length > 0 && (
          <>
            <Separator />
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-foreground">미래 학습 가이드</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {child.name}의 현재 역량과 성향을 바탕으로 AI가 추천하는 다음 단계입니다.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {child.recommendations.map((rec, idx) => (
                  <AIRecommendationCard
                    key={idx}
                    recommendation={rec}
                    onNavigate={onNavigateToCourse}
                  />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
