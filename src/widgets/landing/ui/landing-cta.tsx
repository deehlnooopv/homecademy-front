'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { ArrowRight, Sparkles, Shield, Clock } from 'lucide-react';

/**
 * 랜딩 페이지 최종 CTA(Call to Action) 섹션
 * - 무료 시작 유도 메시지와 버튼
 * - 신뢰 요소 (무료 체험, 결제 불필요, 즉시 시작) 표시
 */
export function LandingCTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* 배경 장식 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-6 text-center space-y-8">
        {/* 이모지 장식 */}
        <div className="flex justify-center gap-3 text-3xl">
          <span>🎯</span>
          <span>🚀</span>
          <span>✨</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            아이의 숨겨진 재능을 찾아주는 여정,
            <br />
            홈카데미와 함께라면 더 즐겁고 효과적입니다.
          </p>
        </div>

        {/* CTA 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] hover:from-[#FF5A20] hover:to-[#FF7A45] text-white rounded-2xl h-14 px-10 text-lg font-bold shadow-2xl shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Link href="/login" className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              무료로 시작하기
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* 신뢰 요소 */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-2">
          {[
            { icon: Shield, text: '14일 무료 체험' },
            { icon: Clock, text: '즉시 시작 가능' },
            { icon: Sparkles, text: '신용카드 불필요' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-white/60">
              <Icon className="w-4 h-4" />
              <span className="text-sm">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
