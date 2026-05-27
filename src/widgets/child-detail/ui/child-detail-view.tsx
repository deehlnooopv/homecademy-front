'use client';

import { HexagonSkillChart } from '@/src/entities/child/ui/hexagon-skill-chart';
import { SubjectLearningCard } from '@/src/entities/child/ui/subject-learning-card';
import { AIRecommendationCard } from '@/src/entities/child/ui/ai-recommendation-card';
import { Badge } from '@/src/shared/ui/badge';
import { Button } from '@/src/shared/ui/button';
import { Separator } from '@/src/shared/ui/separator';
import { ArrowLeft, Trophy, Flame, Star, TrendingUp, BookOpen, Sparkles, Crown } from 'lucide-react';
import Link from 'next/link';
import type { ChildDetail } from '@/src/entities/child/model/types';

interface ChildDetailViewProps {
  child: ChildDetail;
  onNavigateToCourse?: (courseId: string) => void;
}

/** 자녀 레벨별 칭호 및 색상 */
const LEVEL_THEMES: Record<number, { title: string; gradient: string; badge: string }> = {
  1: { title: '새싹 탐험가', gradient: 'from-emerald-400 to-teal-500', badge: 'bg-emerald-100 text-emerald-700' },
  2: { title: '호기심 왕', gradient: 'from-blue-400 to-indigo-500', badge: 'bg-blue-100 text-blue-700' },
  3: { title: '재능 발굴자', gradient: 'from-violet-400 to-purple-500', badge: 'bg-violet-100 text-violet-700' },
  4: { title: '성장 챔피언', gradient: 'from-orange-400 to-rose-500', badge: 'bg-orange-100 text-orange-700' },
  5: { title: '천재 마스터', gradient: 'from-amber-400 to-yellow-500', badge: 'bg-amber-100 text-amber-700' },
};

/**
 * 자녀 프로필 헤더 컴포넌트
 * - 자녀 이름, 레벨, 연속 학습 일수, 종합 점수 표시
 * - 그라디언트 배경과 장식 요소로 게임형 느낌 연출
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

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl border-2 border-white/30">
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
          <p className="text-white/75 text-sm">{child.grade ?? `${child.age}세`} · AI 맞춤 학습 중</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {child.streak != null && (
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-lg px-3 py-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-white text-xs font-semibold">{child.streak}일 연속</span>
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
                <span className="text-white text-xs font-semibold">이번 주 +{child.weeklyGrowth}점</span>
              </div>
            )}
          </div>
        </div>

        {child.totalScore != null && (
          <div className="hidden sm:flex flex-col items-center bg-white/15 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
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
    </div>
  );
}

/**
 * 자녀 상세 페이지 전체 뷰 위젯
 * - 프로필 헤더, 역량 차트, 과목별 학습 카드, AI 추천 섹션 조합
 * - FSD widgets 계층에서 entities를 조합하여 완성된 페이지 구성
 * @param child - 자녀 상세 데이터 (ChildDetail 타입)
 * @param onNavigateToCourse - 강좌 이동 콜백 (선택적)
 */
export function ChildDetailView({ child, onNavigateToCourse }: ChildDetailViewProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-5xl mx-auto px-4 py-6 space-y-8">
        <ChildProfileHeader child={child} />

        {/* 역량 분석 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold text-foreground">6대 역량 분석</h2>
          </div>
          <HexagonSkillChart data={child.skills} childName={child.name} />
        </section>

        <Separator />

        {/* 과목별 학습 분석 섹션 */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-extrabold text-foreground">과목별 학습 분석</h2>
            <Badge variant="secondary" className="ml-auto text-xs">
              {child.subjects.length}개 과목
            </Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {child.subjects.map((subject) => (
              <SubjectLearningCard key={subject.subject} card={subject} />
            ))}
          </div>
        </section>

        {/* AI 추천 섹션 */}
        {child.recommendations && child.recommendations.length > 0 && (
          <>
            <Separator />
            <section className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-extrabold text-foreground">AI 선생님 추천</h2>
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
