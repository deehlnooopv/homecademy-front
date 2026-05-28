import { ChildBottomNav } from '@/src/widgets/child-nav/ui/child-bottom-nav';

export const metadata = {
  title: '나의 학습 공간 | 홈카데미',
};

export default function ChildLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50/60 to-white">
      <main className="flex-1 pb-24">{children}</main>
      <ChildBottomNav />
    </div>
  );
}
