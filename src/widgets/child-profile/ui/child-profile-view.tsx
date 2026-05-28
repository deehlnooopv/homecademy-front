'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Pencil, CheckCircle2, Star, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/src/shared/ui/card';
import { Button } from '@/src/shared/ui/button';
import { Badge } from '@/src/shared/ui/badge';
import { CHILD_PROFILE_MOCK, SUBJECT_TECH_TREES_MOCK } from '@/src/entities/child-view';

/**
 * 자녀 프로필 설정 화면
 * - 닉네임 변경
 * - 대표 뱃지 설정 (아바타 변경)
 * - 로그아웃
 */
export function ChildProfileView() {
  const router = useRouter();
  const [nickname, setNickname] = useState(CHILD_PROFILE_MOCK.nickname);
  const [editingNickname, setEditingNickname] = useState(false);
  const [representativeBadgeId, setRepresentativeBadgeId] = useState<string | null>(
    CHILD_PROFILE_MOCK.representativeBadgeId
  );
  const [saved, setSaved] = useState(false);

  const allAcquiredBadges = SUBJECT_TECH_TREES_MOCK.flatMap((t) => t.badges).filter((b) => b.acquired);
  const repBadge = allAcquiredBadges.find((b) => b.id === representativeBadgeId);
  const avatarEmoji = repBadge?.emoji ?? '🧒';

  const handleSaveNickname = () => {
    setEditingNickname(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="flex items-center gap-3 px-5 pt-8 pb-4">
        <button onClick={() => router.back()} className="w-9 h-9 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-xl font-extrabold text-foreground">내 프로필</h1>
      </div>

      <div className="px-4 space-y-5 pb-8">
        {/* 아바타 & 닉네임 */}
        <Card className="border border-border/60">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              {/* 아바타 */}
              <div className="relative">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-5xl shadow-xl border-4 border-white">
                  {avatarEmoji}
                </div>
                {repBadge && (
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-white" />
                    {repBadge.levelTitles[repBadge.level - 1]}
                  </div>
                )}
              </div>

              {/* 닉네임 편집 */}
              {editingNickname ? (
                <div className="flex items-center gap-2 w-full max-w-xs">
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={12}
                    className="flex-1 h-10 px-3 text-sm font-bold rounded-xl border-2 border-orange-300 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-center"
                    autoFocus
                  />
                  <Button size="sm" onClick={handleSaveNickname} className="h-10 px-3 rounded-xl bg-orange-500 text-white border-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-extrabold text-foreground">{nickname}</h2>
                  <button onClick={() => setEditingNickname(true)} className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                    <Pencil className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              )}

              {saved && (
                <div className="flex items-center gap-1.5 text-emerald-600 text-sm font-medium animate-in fade-in slide-in-from-bottom-1">
                  <CheckCircle2 className="w-4 h-4" />
                  저장됐어요!
                </div>
              )}

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-mono font-bold bg-muted px-3 py-1 rounded-lg tracking-widest">
                  {CHILD_PROFILE_MOCK.code}
                </span>
                <span className="text-xs">내 코드</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 대표 뱃지 선택 */}
        <Card className="border border-border/60">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
              <p className="text-sm font-bold text-foreground">대표 뱃지 선택</p>
              <p className="text-xs text-muted-foreground ml-1">아바타가 바뀌어요!</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {allAcquiredBadges.map((badge) => {
                const isSelected = representativeBadgeId === badge.id;
                return (
                  <button
                    key={badge.id}
                    onClick={() => setRepresentativeBadgeId(badge.id)}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border-2 transition-all duration-200
                      ${isSelected
                        ? 'border-orange-400 bg-orange-50 scale-105 shadow-md'
                        : 'border-border/40 hover:border-orange-200 hover:bg-orange-50/50'
                      }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl
                      ${isSelected ? 'bg-gradient-to-br from-orange-400 to-amber-500 shadow-md' : 'bg-muted'}`}>
                      {badge.emoji}
                    </div>
                    <p className="text-[9px] text-center leading-tight text-muted-foreground line-clamp-2">
                      {badge.levelTitles[badge.level - 1]}
                    </p>
                    {isSelected && (
                      <Badge className="text-[8px] px-1 py-0 bg-orange-500 text-white border-0">선택됨</Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* 로그아웃 */}
        <Button
          variant="ghost"
          className="w-full h-11 rounded-xl border border-border/60 text-muted-foreground hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all duration-200"
          onClick={() => {
            localStorage.removeItem('childLoggedIn');
            router.push('/login');
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          로그아웃
        </Button>
      </div>
    </div>
  );
}
