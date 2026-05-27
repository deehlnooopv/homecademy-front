import {
  LandingNavbar,
  LandingHero,
  LandingFeatures,
  LandingHowItWorks,
  LandingTestimonials,
  LandingCTA,
  LandingFooter,
} from '@/src/widgets/landing';

/**
 * 홈카데미 홍보 랜딩 페이지
 * - 토스 메인 페이지 스타일 참고
 * - 히어로 섹션, 기능 소개, 이용 방법, 후기, CTA 순서로 구성
 * - FSD app 계층: 위젯들을 조립만 하고 비즈니스 로직 없음
 */
export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <LandingNavbar />
      <LandingHero />
      <section id="features">
        <LandingFeatures />
      </section>
      <section id="how-it-works">
        <LandingHowItWorks />
      </section>
      <section id="testimonials">
        <LandingTestimonials />
      </section>
      <LandingCTA />
      <LandingFooter />
    </main>
  );
}
