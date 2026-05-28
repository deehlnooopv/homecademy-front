'use client';

import { Badge } from '@/src/shared/ui/badge';
import { ArrowRight } from 'lucide-react';

/** 사용 방법 단계 데이터 */
const STEPS = [
  {
    step: '01',
    emoji: '👨‍👩‍👧',
    title: '가족 프로필 만들기',
    description: '부모님과 아이의 기본 정보를 입력하세요. 아이의 나이, 학년, 관심사를 설정하면 AI가 최적의 학습 환경을 준비합니다.',
    gradient: 'from-orange-400 to-rose-500',
  },
  {
    step: '02',
    emoji: '🎯',
    title: 'AI 재능 진단',
    description: '간단한 진단 학습으로 아이의 6가지 역량을 분석합니다. 논리력, 창의력, 언어력 등 숨겨진 재능을 발견해드려요.',
    gradient: 'from-violet-400 to-purple-600',
  },
  {
    step: '03',
    emoji: '🤖',
    title: 'AI 부모님 배치',
    description: '부모님이 교육 리더로서 AI 부모님들을 원하는 과목에 배치하세요. 수학, 국어, 영어, 코딩 등 전문 AI 교사가 준비되어 있습니다.',
    gradient: 'from-blue-400 to-indigo-600',
  },
  {
    step: '04',
    emoji: '🌱',
    title: '지속적인 성장 확인',
    description: '단계별 달성과 성취를 철저히 기록하며 아이가 스스로 성장합니다. 부모님은 실시간 성장 리포트로 아이의 발전을 함께 지켜보세요.',
    gradient: 'from-emerald-400 to-teal-600',
  },
] as const;

/**
 * 랜딩 페이지 서비스 이용 방법 섹션
 * - 4단계 플로우를 시각적으로 표현
 * - 각 단계는 번호, 이모지, 제목, 설명으로 구성
 * - 단계 간 화살표 연결로 흐름 표현
 */
export function LandingHowItWorks() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-semibold px-4 py-1.5">
            이렇게 시작해요
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            단 4단계로
            <br />
            <span className="text-primary">교육 리더</span>가 되세요
          </h2>
        </div>

        {/* 단계 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((step, idx) => (
            <div key={step.step} className="relative">
              <div className="bg-card border border-border/60 rounded-2xl p-6 h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group">
                {/* 단계 번호 */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-5xl font-extrabold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent opacity-30`}>
                    {step.step}
                  </span>
                  <span className="text-3xl">{step.emoji}</span>
                </div>

                {/* 그라디언트 선 */}
                <div className={`h-1 w-12 rounded-full bg-gradient-to-r ${step.gradient} mb-4`} />

                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>

              {/* 화살표 (마지막 제외) */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-background border border-border rounded-full items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
