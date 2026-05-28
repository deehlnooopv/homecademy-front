'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/src/shared/ui/logo';
import { Button } from '@/src/shared/ui/button';
import { Badge } from '@/src/shared/ui/badge';
import { Separator } from '@/src/shared/ui/separator';
import { KeyRound, Sparkles, Brain, Trophy } from 'lucide-react';
import Link from 'next/link';
import { AUTH_TEXT, SOCIAL_BUTTONS } from '../model/constants';
import { getSocialIcon } from './social-icon';

/**
 * 로그인 페이지 소개 배지 목록
 * - 서비스의 핵심 가치를 간결하게 표현
 */
const FEATURE_BADGES = [
  { icon: Brain, label: 'AI 재능 분석' },
  { icon: Trophy, label: '성장 동기 설계' },
  { icon: Sparkles, label: '맞춤 커리큘럼' },
] as const;

/**
 * 로그인 폼 컴포넌트
 * - 소셜 로그인(카카오/네이버/구글/애플) 및 자녀 코드 로그인 지원
 * - 서비스 소개 문구와 함께 브랜드 아이덴티티 강조
 */
export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);

  /**
   * 소셜 로그인 처리 핸들러
   * @param provider - 로그인 제공자 ID (kakao | naver | google | apple)
   */
  const handleLogin = async (provider: string) => {
    setIsLoading(provider);
    try {
      // TODO: 실제 OAuth 인증 로직으로 교체 필요
      await new Promise((resolve) => setTimeout(resolve, 800));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginProvider', provider);
      router.push('/dashboard');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 왼쪽: 브랜드 소개 패널 (데스크탑만 표시) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#FF6B35] via-[#FF8A5B] to-[#7C3AED] flex-col justify-between p-12 relative overflow-hidden">
        {/* 배경 장식 원 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />

        {/* 로고 */}
        <Logo size="lg" variant="white" />

        {/* 중앙 메시지 */}
        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <p className="text-white/80 text-sm font-medium tracking-wide uppercase">For Smart Parents</p>
            <h1 className="text-4xl font-extrabold text-white leading-tight whitespace-pre-line">
              {AUTH_TEXT.headline}
            </h1>
            <p className="text-white/80 text-lg leading-relaxed whitespace-pre-line">
              {AUTH_TEXT.subheadline}
            </p>
          </div>

          {/* 기능 배지 */}
          <div className="flex flex-wrap gap-2">
            {FEATURE_BADGES.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium"
              >
                <Icon className="w-4 h-4" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* 하단 통계 */}
        <div className="relative z-10 grid grid-cols-3 gap-4">
          {[
            { value: '2,400+', label: '가입 가정' },
            { value: '98%', label: '만족도' },
            { value: '15+', label: 'AI 선생님' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-extrabold text-white">{value}</p>
              <p className="text-white/70 text-xs mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 오른쪽: 로그인 폼 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-background">
        <div className="w-full max-w-sm space-y-8">
          {/* 모바일 로고 */}
          <div className="lg:hidden flex justify-center">
            <Logo size="xl" />
          </div>

          {/* 헤더 텍스트 */}
          <div className="space-y-1.5">
            <h2 className="text-2xl font-extrabold text-foreground">시작하기</h2>
            <p className="text-muted-foreground text-sm">
              계정으로 로그인하거나 새로 시작하세요
            </p>
          </div>

          {/* 자녀 코드 로그인 버튼 */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full h-13 rounded-xl font-bold text-base bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] hover:from-[#FF5A20] hover:to-[#FF7A45] text-white shadow-md shadow-orange-200 transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
              size="lg"
            >
              <Link href="/child-login">
                <KeyRound className="w-5 h-5 mr-2" />
                {AUTH_TEXT.childCodeLogin}
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground">{AUTH_TEXT.childCodeDesc}</p>
          </div>

          {/* 구분선 */}
          <div className="flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground px-1">{AUTH_TEXT.or}</span>
            <Separator className="flex-1" />
          </div>

          {/* 소셜 로그인 버튼들 */}
          <div className="space-y-3">
            <p className="text-center text-sm font-medium text-muted-foreground">
              {AUTH_TEXT.socialLogin}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {SOCIAL_BUTTONS.map((provider) => (
                <Button
                  key={provider.id}
                  onClick={() => handleLogin(provider.id)}
                  disabled={isLoading !== null}
                  className={`h-12 rounded-xl font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 ${provider.bgColor} ${provider.textColor} ${provider.hoverColor} ${provider.border} flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none shadow-sm`}
                  variant="ghost"
                >
                  {isLoading === provider.id ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    getSocialIcon(provider.id, 18)
                  )}
                  <span>{provider.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* 약관 동의 문구 */}
          <p className="text-center text-xs text-muted-foreground leading-relaxed">
            {AUTH_TEXT.terms}
          </p>
        </div>
      </div>
    </div>
  );
}
