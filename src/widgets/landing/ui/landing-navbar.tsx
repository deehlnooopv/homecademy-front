'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { Logo } from '@/src/shared/ui/logo';
import { useState, useEffect } from 'react';
import { cn } from '@/src/shared/lib/utils';

/**
 * 랜딩 페이지 상단 네비게이션 바
 * - 스크롤 시 배경 블러 효과 적용
 * - 로고, 네비게이션 링크, CTA 버튼 포함
 * - 모바일 반응형 지원
 */
export function LandingNavbar() {
  const [scrolled, setScrolled] = useState(false);

  /** 스크롤 감지하여 네비게이션 배경 변경 */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
          : 'bg-transparent'
      )}
    >
      <div className="container max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/landing" className="flex items-center">
          <Logo size="md" />
        </Link>

        {/* 네비게이션 링크 */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: '기능', href: '#features' },
            { label: '이용 방법', href: '#how-it-works' },
            { label: '후기', href: '#testimonials' },
          ].map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-white/70 hover:text-white text-sm font-medium transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* CTA 버튼 */}
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 rounded-xl hidden sm:flex"
          >
            <Link href="/login">로그인</Link>
          </Button>
          <Button
            asChild
            className="bg-gradient-to-r from-[#FF6B35] to-[#FF8A5B] hover:from-[#FF5A20] hover:to-[#FF7A45] text-white rounded-xl font-semibold shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Link href="/login">무료 시작</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
