"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Logo } from "@/src/shared/ui/logo";
import { Button } from "@/src/shared/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/shared/ui/sheet";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Settings,
  Users,
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  Sparkles,
  BarChart3,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";

/** 헤더 네비게이션 링크 목록 */
const NAV_LINKS = [
  { label: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { label: "학습 관리", href: "/learning", icon: BookOpen },
  { label: "AI 분석", href: "/dashboard/ai-report", icon: Sparkles },
  { label: "성장 리포트", href: "/reports", icon: BarChart3 },
] as const;

/**
 * 전역 네비게이션 바 (GNB) 컴포넌트
 * - 로고, 네비게이션 링크, 알림, 사용자 메뉴 포함
 * - 모바일: 햄버거 메뉴로 슬라이드 패널 표시
 * - 데스크탑: 인라인 네비게이션 + 드롭다운 메뉴
 * - 현재 경로에 해당하는 메뉴 항목 활성화 표시
 */
export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  /** 현재 경로가 해당 링크와 일치하는지 확인 */
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  /** 로그아웃 처리 */
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginProvider");
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* 로고 */}
        <Link href="/dashboard" className="flex items-center">
          <Logo size="sm" />
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
                isActive(link.href)
                  ? "text-foreground bg-muted/80"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              }`}
            >
              <link.icon className="h-3.5 w-3.5" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* 우측 액션 영역 */}
        <div className="flex items-center gap-2">
          {/* 알림 버튼 */}
          <Button variant="ghost" size="icon" className="relative rounded-xl h-9 w-9">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
          </Button>

          {/* 사용자 드롭다운 (데스크탑) */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 rounded-xl h-9 px-2 hover:bg-muted/60">
                  <Avatar className="h-7 w-7">
                    <AvatarImage src="/avatars/parent.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">김</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">김부모님</span>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52 rounded-xl p-1.5">
                <div className="px-3 py-2 mb-1">
                  <p className="text-sm font-semibold">김부모님</p>
                  <p className="text-xs text-muted-foreground">parent@homecademy.com</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-lg cursor-pointer gap-2.5">
                  <User className="h-4 w-4" />
                  내 프로필
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer gap-2.5">
                  <Users className="h-4 w-4" />
                  자녀 관리
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg cursor-pointer gap-2.5">
                  <Settings className="h-4 w-4" />
                  설정
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="rounded-lg cursor-pointer gap-2.5 text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* 모바일 햄버거 메뉴 */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-xl h-9 w-9">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 p-5 border-b border-border">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">김</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm">김부모님</p>
                      <p className="text-xs text-muted-foreground">교육 리더</p>
                    </div>
                  </div>
                  <nav className="flex-1 p-4 space-y-1">
                    {NAV_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                          isActive(link.href)
                            ? "text-primary bg-primary/8 font-semibold"
                            : "text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive(link.href)
                              ? "bg-primary/15"
                              : "bg-muted/60"
                          }`}
                        >
                          <link.icon
                            className={`h-4 w-4 ${
                              isActive(link.href) ? "text-primary" : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        {link.label}
                        {isActive(link.href) && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />
                        )}
                      </Link>
                    ))}
                  </nav>
                  <div className="p-4 border-t border-border">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2.5 text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      로그아웃
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
