'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Badge } from '@/src/shared/ui/badge';
import { ArrowRight, Sparkles, Play } from 'lucide-react';

/**
 * 랜딩 페이지 히어로 섹션 컴포넌트
 * - 서비스 핵심 가치 제안(Value Proposition) 전달
 * - 부모가 교육 리더가 되어 AI 선생님을 배치하는 개념 강조
 * - CTA 버튼 2개: 무료 시작하기, 서비스 소개 영상
 */
export function LandingHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />
        {/* 격자 패턴 */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 container max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 상단 배지 */}
          <div className="flex justify-center">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold hover:bg-white/15 transition-colors">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              AI 기반 맞춤형 교육 플랫폼
            </Badge>
          </div>

          {/* 메인 헤드라인 */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
              아이의 재능을
              <br />
              <span className="bg-gradient-to-r from-[#FF6B35] via-amber-400 to-[#FF6B35] bg-clip-text text-transparent">
                찾아주세요
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl mx-auto">
              부모님이 교육 리더가 되어 AI 선생님들을 직접 배치하세요.
              <br className="hidden md:block" />
              홈카데미가 아이의 숨겨진 재능을 함께 찾아드립니다.
            </p>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] hover:from-[#FF5A20] hover:to-[#FF7A45] text-white rounded-2xl h-14 px-8 text-base font-bold shadow-2xl shadow-orange-500/30 hover:-translate-y-0.5 transition-all duration-200"
            >
              <Link href="/login" className="flex items-center gap-2">
                무료로 시작하기
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white bg-white/5 hover:bg-white/10 rounded-2xl h-14 px-8 text-base font-semibold backdrop-blur-sm"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              서비스 소개 보기
            </Button>
          </div>

          {/* 소셜 프루프 */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
            {[
              { num: '12,000+', label: '가입 가족' },
              { num: '98%', label: '만족도' },
              { num: '6가지', label: '재능 분석' },
              { num: '24/7', label: 'AI 선생님' },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-extrabold text-white">{num}</p>
                <p className="text-xs text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 플로팅 카드들 */}
        <div className="hidden lg:block">
          {/* 왼쪽 카드 */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 w-48 animate-float">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <span className="text-white text-sm font-bold">지</span>
              </div>
              <div>
                <p className="text-white text-xs font-bold">김지우</p>
                <p className="text-white/50 text-[10px]">초등 3학년</p>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] text-white/70">
                <span>논리력</span><span className="text-amber-400 font-bold">92점</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[92%] bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* 오른쪽 카드 */}
          <div className="absolute right-8 top-1/3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 w-52 animate-float-delay">
            <p className="text-white/60 text-[10px] mb-1">🤖 AI 선생님 분석</p>
            <p className="text-white text-xs font-semibold leading-relaxed">
              수학적 사고력이 또래보다 높아요! 코딩 과목을 추천드려요 🎯
            </p>
            <div className="mt-2 flex gap-1">
              <Badge className="bg-primary/20 text-primary border-0 text-[10px]">수학</Badge>
              <Badge className="bg-violet-500/20 text-violet-300 border-0 text-[10px]">코딩</Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
