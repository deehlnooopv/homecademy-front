import { Header } from "@/src/widgets/header";

/**
 * 대시보드 레이아웃
 * - 대시보드 하위 모든 페이지에 상단 고정 헤더를 공통 적용
 * - 각 페이지는 children으로 렌더링
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
