'use client';

import Link from 'next/link';
import { Logo } from '@/src/shared/ui/logo';
import { Separator } from '@/src/shared/ui/separator';

/**
 * 랜딩 페이지 푸터 컴포넌트
 * - 로고, 서비스 소개, 링크 목록, 저작권 표시
 * - 다크 배경에 맞는 색상 팔레트 사용
 */
export function LandingFooter() {
  return (
    <footer className="bg-slate-950 text-white/60">
      <div className="container max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 브랜드 */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm leading-relaxed max-w-xs">
              부모님이 교육 리더가 되어 AI 부모님들을 배치하는 새로운 방식의 홈스쿨링 플랫폼입니다.
              아이의 재능을 게임처럼 찾아주세요.
            </p>
            <p className="text-xs text-white/30">
              © 2025 홈카데미. All rights reserved.
            </p>
          </div>

          {/* 서비스 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">서비스</h4>
            <ul className="space-y-2.5 text-sm">
              {['AI 재능 분석', 'AI 부모님 매칭', '성장 리포트', '학습 커리큘럼'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 회사 */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm">회사</h4>
            <ul className="space-y-2.5 text-sm">
              {['회사 소개', '채용', '블로그', '고객센터'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-white transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <div className="flex gap-4">
            {['개인정보처리방침', '이용약관', '쿠키 정책'].map((item) => (
              <Link key={item} href="#" className="hover:text-white/60 transition-colors">{item}</Link>
            ))}
          </div>
          <p>사업자등록번호: 000-00-00000 | 대표: 홈카데미</p>
        </div>
      </div>
    </footer>
  );
}
