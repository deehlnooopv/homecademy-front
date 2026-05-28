'use client';

import { Card, CardContent } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import {
  Sparkles,
  BarChart3,
  Users,
  BookOpen,
  Trophy,
  Zap,
  Crown,
  Target,
} from 'lucide-react';

/** 핵심 기능 목록 데이터 */
const FEATURES = [
  {
    icon: Crown,
    title: '부모가 교육 리더',
    description: '아이의 학습 방향을 부모님이 직접 설계하세요. AI 선생님들을 원하는 과목에 배치하고 커리큘럼을 만들어가는 교육 디렉터가 되어보세요.',
    badge: '핵심 기능',
    gradient: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
    color: 'text-amber-600',
  },
  {
    icon: Sparkles,
    title: 'AI 재능 발굴 시스템',
    description: '6가지 핵심 역량(논리력·창의력·언어력·사회성·예술성·체육)을 AI가 실시간 분석합니다. 데이터에 기반한 정밀한 분석으로 아이만의 고유한 재능을 발견합니다.',
    badge: 'AI 분석',
    gradient: 'from-violet-400 to-purple-600',
    bg: 'bg-violet-50',
    color: 'text-violet-600',
  },
  {
    icon: BarChart3,
    title: '성장 리포트',
    description: '주간·월간 학습 데이터를 시각화하여 아이의 성장 곡선을 한눈에 파악하세요. 어떤 과목에서 빠르게 성장하는지 즉시 확인할 수 있습니다.',
    badge: '데이터 분석',
    gradient: 'from-blue-400 to-indigo-600',
    bg: 'bg-blue-50',
    color: 'text-blue-600',
  },
  {
    icon: Users,
    title: 'AI 선생님 매칭',
    description: '아이의 성향과 학습 스타일에 맞는 AI 선생님을 자동으로 매칭합니다. 수학, 국어, 영어, 코딩 등 다양한 분야의 전문 AI 교사가 대기 중입니다.',
    badge: '맞춤 매칭',
    gradient: 'from-emerald-400 to-teal-600',
    bg: 'bg-emerald-50',
    color: 'text-emerald-600',
  },
  {
    icon: Trophy,
    title: '성장 동기 설계',
    description: '단계별 달성 목표와 지속적인 피드백으로 아이가 스스로 학습에 동기를 갖도록 돕습니다. 작은 성취의 연속이 진정한 성장으로 이어집니다.',
    badge: '성장 설계',
    gradient: 'from-rose-400 to-pink-600',
    bg: 'bg-rose-50',
    color: 'text-rose-600',
  },
  {
    icon: Zap,
    title: '실시간 피드백',
    description: '학습 중 즉각적인 AI 피드백으로 아이가 막히는 부분을 바로 해결합니다. 다음 수업 전 준비 포인트까지 미리 알려드려요.',
    badge: '즉시 응답',
    gradient: 'from-sky-400 to-cyan-600',
    bg: 'bg-sky-50',
    color: 'text-sky-600',
  },
] as const;

/**
 * 랜딩 페이지 핵심 기능 소개 섹션
 * - 6가지 주요 기능을 카드 그리드로 표시
 * - 각 기능은 아이콘, 제목, 설명, 배지로 구성
 * - 호버 시 카드 상승 애니메이션
 */
export function LandingFeatures() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-semibold px-4 py-1.5">
            <Target className="w-3.5 h-3.5 mr-1.5" />
            왜 홈카데미인가요?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            교육의 주인공은
            <br />
            <span className="text-primary">부모님과 아이</span>입니다
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI 기술로 아이의 재능을 발굴하고, 부모님이 교육 방향을 직접 설계하는
            새로운 방식의 홈스쿨링 플랫폼입니다.
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="group border border-border/60 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card overflow-hidden"
            >
              {/* 상단 그라디언트 바 */}
              <div className={`h-1 bg-gradient-to-r ${feature.gradient}`} />
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge variant="secondary" className={`${feature.bg} ${feature.color} border-0 text-xs font-semibold`}>
                    {feature.badge}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
