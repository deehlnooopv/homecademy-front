'use client';

import { useState } from 'react';
import { Users, Heart, Mail, UserPlus, CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import { Button } from '@/src/shared/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { FRIENDS_MOCK, PRAISE_MESSAGES_MOCK } from '@/src/entities/child-view';
import type { ChildFriend, PraiseMessage } from '@/src/entities/child-view';

// ─── 친구 카드 ───────────────────────────────────────────────────────────────

function FriendCard({ friend }: { friend: ChildFriend }) {
  const [hearted, setHearted] = useState(false);

  return (
    <Card className="border border-border/60 hover:shadow-md transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          {/* 아바타 */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 border-2 border-orange-200 flex items-center justify-center text-2xl shadow-sm">
              {friend.representativeBadgeEmoji}
            </div>
            {/* 오늘 학습 여부 */}
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white
              ${friend.studiedToday ? 'bg-emerald-400' : 'bg-muted'}`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-foreground truncate">{friend.nickname}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[11px] text-muted-foreground">{friend.representativeBadgeEmoji}</span>
              <span className="text-[11px] text-muted-foreground truncate">{friend.representativeBadgeTitle}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {friend.studiedToday ? (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                  <span className="text-[10px] text-emerald-600 font-medium">오늘 학습 완료</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">아직 학습 전</span>
                </div>
              )}
            </div>
          </div>

          {/* 하트 버튼 */}
          <button
            onClick={() => setHearted(!hearted)}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 shrink-0
              ${hearted ? 'bg-rose-100 scale-110' : 'bg-muted hover:bg-rose-50'}`}
          >
            <Heart className={`w-4 h-4 transition-all duration-200 ${hearted ? 'text-rose-500 fill-rose-500' : 'text-muted-foreground'}`} />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── 친구 추가 섹션 ───────────────────────────────────────────────────────────

function AddFriendSection() {
  const [code, setCode] = useState('');
  return (
    <Card className="border-2 border-dashed border-orange-200 bg-orange-50/50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <UserPlus className="w-4 h-4 text-orange-500" />
          <p className="text-sm font-bold text-orange-700">친구 추가하기</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          친구의 코드를 입력하면 친구로 등록할 수 있어요!
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="친구 코드 입력"
            maxLength={6}
            className="flex-1 h-9 px-3 text-sm font-bold rounded-xl border-2 border-orange-200 bg-white focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder:text-muted-foreground/50 tracking-widest"
          />
          <Button
            size="sm"
            disabled={code.length < 6}
            className="h-9 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-orange-400 to-amber-500 text-white border-0 disabled:opacity-50"
          >
            추가
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── 칭찬 메시지 카드 ─────────────────────────────────────────────────────────

function PraiseCard({ message }: { message: PraiseMessage }) {
  const date = new Date(message.createdAt).toLocaleDateString('ko-KR', {
    month: 'long', day: 'numeric',
  });

  return (
    <div className={`relative rounded-2xl p-4 border-2 transition-all duration-200
      ${message.isNew
        ? 'bg-gradient-to-br from-rose-50 to-pink-50 border-rose-200'
        : 'bg-muted/30 border-border/40'
      }`}>
      {message.isNew && (
        <div className="absolute -top-2 -right-1 bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          NEW
        </div>
      )}
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0
          ${message.isNew ? 'bg-rose-100' : 'bg-muted'}`}>
          {message.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className={`text-sm font-bold ${message.isNew ? 'text-rose-700' : 'text-foreground'}`}>
              {message.senderName}의 칭찬
            </p>
            <span className="text-[10px] text-muted-foreground">{date}</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{message.message}</p>
        </div>
      </div>
    </div>
  );
}

// ─── 자랑하기 섹션 ────────────────────────────────────────────────────────────

function BoastSection() {
  const [sent, setSent] = useState(false);

  return (
    <Card className="border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-violet-500" />
          <p className="text-sm font-bold text-violet-700">부모님께 자랑하기</p>
        </div>
        <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
          오늘 학습한 내용이나 획득한 뱃지를 부모님께 알려보세요!
        </p>
        {sent ? (
          <div className="flex items-center justify-center gap-2 py-2 bg-violet-100 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-violet-600" />
            <p className="text-sm font-bold text-violet-700">부모님께 전달됐어요! 🎉</p>
          </div>
        ) : (
          <Button
            onClick={() => setSent(true)}
            className="w-full h-9 rounded-xl font-bold text-sm bg-gradient-to-r from-violet-500 to-purple-600 text-white border-0"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" />
            오늘의 성과 자랑하기
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ─── 메인 친구 & 칭찬 우체통 뷰 ─────────────────────────────────────────────

/**
 * 자녀 친구 목록 & 칭찬 우체통 화면
 * - 친구 탭: 친구 목록, 친구 추가, 오늘 학습 여부 표시
 * - 칭찬 탭: 부모님 칭찬 메시지, 자랑하기 버튼
 */
export function ChildFriendsView() {
  const newPraiseCount = PRAISE_MESSAGES_MOCK.filter((m) => m.isNew).length;

  return (
    <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Users className="w-5 h-5 text-blue-500" />
          <h1 className="text-xl font-extrabold text-foreground">친구 & 칭찬 우체통</h1>
        </div>
        <p className="text-sm text-muted-foreground">친구들과 함께 성장해요!</p>
      </div>

      <div className="px-4">
        <Tabs defaultValue="friends">
          <TabsList className="w-full grid grid-cols-2 rounded-xl bg-muted/60 p-1 mb-5">
            <TabsTrigger value="friends" className="rounded-lg font-bold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="w-3.5 h-3.5 mr-1.5" />
              친구 목록
            </TabsTrigger>
            <TabsTrigger value="praise" className="rounded-lg font-bold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm relative">
              <Mail className="w-3.5 h-3.5 mr-1.5" />
              칭찬 우체통
              {newPraiseCount > 0 && (
                <span className="ml-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {newPraiseCount}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* 친구 탭 */}
          <TabsContent value="friends" className="space-y-3 mt-0">
            <AddFriendSection />
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-muted-foreground">친구 {FRIENDS_MOCK.length}명</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-muted-foreground">오늘 학습 완료</span>
              </div>
            </div>
            {FRIENDS_MOCK.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </TabsContent>

          {/* 칭찬 우체통 탭 */}
          <TabsContent value="praise" className="space-y-3 mt-0">
            <BoastSection />
            <div className="flex items-center gap-2 mb-1">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <p className="text-sm font-bold text-foreground">부모님의 칭찬 메시지</p>
              {newPraiseCount > 0 && (
                <Badge className="text-[10px] px-1.5 py-0 bg-rose-500 text-white border-0">
                  {newPraiseCount}개 새 메시지
                </Badge>
              )}
            </div>
            <div className="space-y-3">
              {PRAISE_MESSAGES_MOCK.map((msg) => (
                <PraiseCard key={msg.id} message={msg} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
