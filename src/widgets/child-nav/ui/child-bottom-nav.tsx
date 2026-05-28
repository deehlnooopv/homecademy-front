'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Award, Users } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/child', label: '홈', icon: Home },
  { href: '/child/learning', label: '학습', icon: BookOpen },
  { href: '/child/badges', label: '뱃지', icon: Award },
  { href: '/child/friends', label: '친구', icon: Users },
];

/**
 * 자녀 전용 하단 고정 네비게이션 바
 */
export function ChildBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-border/60 shadow-lg shadow-black/5">
      <div className="max-w-lg mx-auto flex items-center justify-around px-2 py-2 safe-area-pb">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/child' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all duration-200 min-w-[60px]
                ${isActive
                  ? 'text-orange-500'
                  : 'text-muted-foreground hover:text-foreground'
                }`}
            >
              <div className={`relative p-1.5 rounded-xl transition-all duration-200
                ${isActive ? 'bg-orange-100' : ''}`}>
                <Icon className={`w-5 h-5 transition-all duration-200 ${isActive ? 'scale-110' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-orange-500 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] font-semibold transition-all duration-200 ${isActive ? 'text-orange-500' : ''}`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
