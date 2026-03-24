"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/src/shared/ui/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell, User, LogOut, Settings, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/learning", label: "학습관리" },
  { href: "/talent", label: "재능분석" },
  { href: "/community", label: "커뮤니티" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground rounded-lg transition-colors hover:text-primary hover:bg-primary/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative hidden md:flex hover:bg-primary/5">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-accent text-[10px] font-semibold text-accent-foreground flex items-center justify-center">
              3
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild className="hidden md:flex">
              <Button variant="ghost" className="gap-2 pl-2 pr-3 hover:bg-primary/5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/parent.jpg" />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    김
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-foreground">김민지</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem className="gap-2">
                <User className="h-4 w-4" />
                프로필 설정
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Users className="h-4 w-4" />
                자녀 관리
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Settings className="h-4 w-4" />
                구독 관리
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card">
              <div className="flex flex-col gap-6 mt-6">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/avatars/parent.jpg" />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      김
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">김민지</p>
                    <p className="text-xs text-muted-foreground">premium@homecademy.kr</p>
                  </div>
                </div>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-3 py-2.5 text-sm font-medium rounded-lg text-foreground hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="border-t border-border pt-4">
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/5 gap-2">
                    <LogOut className="h-4 w-4" />
                    로그아웃
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
