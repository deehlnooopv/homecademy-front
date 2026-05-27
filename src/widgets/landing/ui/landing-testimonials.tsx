'use client';

import { Card, CardContent } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import { Star, Quote } from 'lucide-react';

/** 부모님 후기 데이터 */
const TESTIMONIALS = [
  {
    name: '박지현 님',
    role: '초등 2학년 엄마',
    avatar: '박',
    gradient: 'from-rose-400 to-pink-500',
    rating: 5,
    content: '아이가 수학을 싫어했는데, 홈카데미 AI 선생님과 함께하면서 논리력이 92점까지 올랐어요! 제가 직접 커리큘럼을 짜는 게 처음엔 어색했는데 이제 너무 재밌어요.',
    badge: '논리력 +40점',
  },
  {
    name: '김민수 님',
    role: '초등 4학년 아빠',
    avatar: '김',
    gradient: 'from-blue-400 to-indigo-500',
    rating: 5,
    content: '아들이 게임처럼 레벨업하면서 공부하니까 스스로 하려고 해요. 성장 리포트 보면서 아이가 창의력 분야에 재능이 있다는 걸 처음 알았습니다.',
    badge: '창의력 발견',
  },
  {
    name: '이수진 님',
    role: '7세, 9세 두 아이 엄마',
    avatar: '이',
    gradient: 'from-violet-400 to-purple-500',
    rating: 5,
    content: '두 아이를 동시에 관리할 수 있어서 너무 편해요. 각자 다른 AI 선생님을 배치해서 맞춤 교육이 가능하고, 비교 분석도 되니까 정말 유용합니다.',
    badge: '2자녀 동시 관리',
  },
  {
    name: '최현우 님',
    role: '초등 6학년 아빠',
    avatar: '최',
    gradient: 'from-emerald-400 to-teal-500',
    rating: 5,
    content: '중학교 준비를 어떻게 해야 할지 막막했는데, AI가 아이의 약점을 짚어주고 다음 수업 계획까지 세워줘서 정말 든든합니다. 교육 리더가 된 기분이에요!',
    badge: '중학 준비 완료',
  },
] as const;

/**
 * 랜딩 페이지 부모님 후기 섹션
 * - 실제 사용자 후기를 카드 형태로 표시
 * - 별점, 이름, 역할, 후기 내용, 성과 배지 포함
 * - 호버 시 카드 상승 효과
 */
export function LandingTestimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container max-w-6xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 font-semibold px-4 py-1.5">
            <Star className="w-3.5 h-3.5 mr-1.5 fill-current" />
            부모님들의 이야기
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground leading-tight">
            이미 12,000+ 가족이
            <br />
            <span className="text-primary">재능을 발견</span>했어요
          </h2>
        </div>

        {/* 후기 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.name}
              className="group border border-border/60 hover:border-primary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-card overflow-hidden"
            >
              <CardContent className="p-6 space-y-4">
                {/* 인용 아이콘 */}
                <Quote className="w-8 h-8 text-primary/20" />

                {/* 후기 내용 */}
                <p className="text-foreground/80 leading-relaxed text-sm">
                  "{item.content}"
                </p>

                {/* 성과 배지 */}
                <Badge className="bg-primary/10 text-primary border-0 text-xs font-semibold">
                  🎯 {item.badge}
                </Badge>

                {/* 작성자 정보 */}
                <div className="flex items-center justify-between pt-2 border-t border-border/60">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                      <span className="text-white font-bold text-sm">{item.avatar}</span>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
