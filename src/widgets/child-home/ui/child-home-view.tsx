'use client';

import Link from 'next/link';
import { Flame, Star, Sparkles, BookOpen, ChevronRight, Clock, Trophy, Bell } from 'lucide-react';
import { Card, CardContent } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import { Button } from '@/src/shared/ui/button';
import { Progress } from '@/src/shared/ui/progress';
import {
  CHILD_PROFILE_MOCK,
  ONGOING_COURSES_MOCK,
  RECOMMENDED_LESSONS_MOCK,
  PRAISE_MESSAGES_MOCK,
  SUBJECT_TECH_TREES_MOCK,
} from '@/src/entities/child-view';
import type { OngoingCourse, RecommendedLesson } from '@/src/entities/child-view';

// ─── 색상 테마 헬퍼 ──────────────────────────────────────────────────────────

const COLOR_MAP = {
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    gradient: 'from-orange-400 to-amber-500',
    border: 'border-orange-200',
    light: 'bg-orange-50',
    progress: '[&>div]:bg-orange-400',
  },
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    gradient: 'from-blue-400 to-indigo-500',
    border: 'border-blue-200',
    light: 'bg-blue-50',
    progress: '[&>div]:bg-blue-400',
  },
  green: {
    bg: 'bg-emerald-100',
    text: 'text-emerald-600',
    gradient: 'from-emerald-400 to-teal-500',
    border: 'border-emerald-200',
    light: 'bg-emerald-50',
    progress: '[&>div]:bg-emerald-400',
  },
  violet: {
    bg: 'bg-violet-100',
    text: 'text-violet-600',
    gradient: 'from-violet-400 to-purple-500',
    border: 'border-violet-200',
    light: 'bg-violet-50',
    progress: '[&>div]:bg-violet-400',
  },
  rose: {
    bg: 'bg-rose-100',
    text: 'text-rose-600',
    gradient: 'from-rose-400 to-pink-500',
    border: 'border-rose-200',
    light: 'bg-rose-50',
    progress: '[&>div]:bg-rose-400',
  },
  amber: {
    bg: 'bg-amber-100',
    text: 'text-amber-600',
    gradient: 'from-amber-400 to-yellow-500',
    border: 'border-amber-200',
    light: 'bg-amber-50',
    progress: '[&>div]:bg-amber-400',
  },
};

// ─── 아바타 헬퍼 ─────────────────────────────────────────────────────────────

function getAvatarEmoji(representativeBadgeId: string | null): string {
  if (!representativeBadgeId) return '🧒';
  const allBadges = SUBJECT_TECH_TREES_MOCK.flatMap((t) => t.badges);
  const badge = allBadges.find((b) => b.id === representativeBadgeId);
  return badge?.emoji ?? '🧒';
}

// ─── 프로필 헤더 ─────────────────────────────────────────────────────────────

function ProfileHeader() {
  const profile = CHILD_PROFILE_MOCK;
  const avatarEmoji = getAvatarEmoji(profile.representativeBadgeId);
  const progressPercent = Math.round((profile.todayStudiedMinutes / profile.todayGoalMinutes) * 100);
  const newPraiseCount = PRAISE_MESSAGES_MOCK.filter((m) => m.isNew).length;

  return (
    <div className="relative bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-400 px-5 pt-12 pb-6 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-28 h-28 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl" />

      {/* 상단 알림 버튼 */}
      <div className="absolute top-4 right-4 z-10">
        <Link href="/child/friends" className="relative">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Bell className="w-4 h-4 text-white" />
          </div>
          {newPraiseCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {newPraiseCount}
            </span>
          )}
        </Link>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        {/* 아바타 */}
        <Link href="/child/profile">
          <div className="w-16 h-16 rounded-2xl bg-white/25 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/40 text-3xl hover:scale-105 transition-transform">
            {avatarEmoji}
          </div>
        </Link>

        <div className="flex-1">
          <p className="text-white/80 text-xs font-medium mb-0.5">안녕하세요!</p>
          <h1 className="text-xl font-extrabold text-white leading-tight">{profile.nickname}</h1>
          {/* 스트릭 */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-lg px-2.5 py-1">
              <Flame className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
              <span className="text-white text-xs font-bold">{profile.streak}일 연속 학습 중!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 오늘의 학습 목표 게이지 */}
      <div className="relative z-10 mt-5 bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <Star className="w-4 h-4 text-yellow-200 fill-yellow-200" />
            <span className="text-white text-sm font-bold">오늘의 학습 목표</span>
          </div>
          <span className="text-white/90 text-xs font-semibold">
            {profile.todayStudiedMinutes}분 / {profile.todayGoalMinutes}분
          </span>
        </div>
        <div className="h-3 bg-white/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-700"
            style={{ width: `${Math.min(progressPercent, 100)}%` }}
          />
        </div>
        <p className="text-white/70 text-xs mt-1.5 text-right">
          {progressPercent >= 100 ? '🎉 오늘 목표 달성!' : `${100 - progressPercent}% 남았어요`}
        </p>
      </div>
    </div>
  );
}

// ─── 진행 중인 학습 카드 ──────────────────────────────────────────────────────

function OngoingCourseCard({ course }: { course: OngoingCourse }) {
  const c = COLOR_MAP[course.color];
  const remaining = course.totalMinutes - course.doneMinutes;

  return (
    <Link href={`/child/learning/${course.id}`}>
      <Card className={`border ${c.border} ${c.light} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl shrink-0`}>
              {course.subject === '수학' ? '🔢' : course.subject === '음악' ? '🎵' : '📖'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-0.5">
                <Badge variant="secondary" className={`text-[10px] px-1.5 py-0 ${c.bg} ${c.text} border-0`}>
                  {course.subject}
                </Badge>
              </div>
              <p className="text-sm font-bold text-foreground truncate">{course.title}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-[11px] text-muted-foreground">{course.tutorEmoji} {course.tutorName}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className={`text-sm font-extrabold ${c.text}`}>{course.progressPercent}%</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">{remaining}분 남음</span>
              </div>
            </div>
          </div>
          <div className="mt-3">
            <Progress value={course.progressPercent} className={`h-2 ${c.progress}`} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── AI 추천 학습 카드 ────────────────────────────────────────────────────────

function RecommendedLessonCard({ lesson }: { lesson: RecommendedLesson }) {
  const c = COLOR_MAP[lesson.color];

  return (
    <Link href={`/child/learning/rec-${lesson.id}`}>
      <Card className={`border-2 ${c.border} hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 cursor-pointer`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-2xl shadow-md shrink-0`}>
              {lesson.tutorEmoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <Badge className={`text-[10px] px-1.5 py-0 bg-gradient-to-r ${c.gradient} text-white border-0`}>
                  {lesson.subject}
                </Badge>
                <div className="flex items-center gap-0.5">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-[10px] text-muted-foreground">{lesson.durationMinutes}분</span>
                </div>
              </div>
              <p className="text-sm font-bold text-foreground">{lesson.title}</p>
              <div className={`mt-2 ${c.light} rounded-lg p-2 border ${c.border}`}>
                <div className="flex items-start gap-1.5">
                  <Sparkles className={`w-3 h-3 mt-0.5 shrink-0 ${c.text}`} />
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{lesson.reason}</p>
                </div>
              </div>
            </div>
          </div>
          <Button
            className={`w-full mt-3 h-8 text-xs font-bold bg-gradient-to-r ${c.gradient} text-white border-0 rounded-xl`}
            size="sm"
          >
            지금 바로 시작하기
            <ChevronRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

// ─── 최근 획득 뱃지 미리보기 ─────────────────────────────────────────────────

function RecentBadgesPreview() {
  const allBadges = SUBJECT_TECH_TREES_MOCK.flatMap((t) => t.badges).filter((b) => b.acquired);

  return (
    <div className="flex items-center gap-3">
      {allBadges.slice(0, 3).map((badge) => (
        <div key={badge.id} className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-md">
            {badge.emoji}
          </div>
          <p className="text-[10px] text-muted-foreground text-center leading-tight max-w-[52px] truncate">
            {badge.levelTitles[badge.level - 1]}
          </p>
        </div>
      ))}
      <Link href="/child/badges">
        <div className="flex flex-col items-center gap-1">
          <div className="w-12 h-12 rounded-2xl bg-muted border-2 border-dashed border-border flex items-center justify-center">
            <Trophy className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-[10px] text-orange-500 font-bold">전체 보기</p>
        </div>
      </Link>
    </div>
  );
}

// ─── 메인 자녀 홈 뷰 ─────────────────────────────────────────────────────────

/**
 * 자녀 홈 화면 위젯
 * - 상단: 프로필 헤더 (아바타, 닉네임, 스트릭, 오늘 목표 게이지)
 * - 중앙: 진행 중인 학습 / AI 추천 학습
 * - 하단: 최근 획득 뱃지 미리보기
 */
export function ChildHomeView() {
  return (
    <div className="bg-background">
      {/* 프로필 헤더 */}
      <ProfileHeader />

      <div className="max-w-lg mx-auto px-4 py-6 space-y-7">

        {/* 진행 중인 학습 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-orange-100 flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-orange-500" />
              </div>
              <h2 className="text-base font-extrabold text-foreground">진행 중인 학습</h2>
            </div>
            <Link href="/child/learning" className="text-xs text-orange-500 font-bold flex items-center gap-0.5 hover:underline">
              전체 보기 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {ONGOING_COURSES_MOCK.map((course) => (
              <OngoingCourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>

        {/* AI 추천 학습 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-foreground">AI 추천 학습</h2>
              <p className="text-[11px] text-muted-foreground">나를 위한 맞춤 학습이에요!</p>
            </div>
          </div>
          <div className="space-y-3">
            {RECOMMENDED_LESSONS_MOCK.map((lesson) => (
              <RecommendedLessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>

        {/* 내 뱃지 미리보기 */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>
              <h2 className="text-base font-extrabold text-foreground">내가 얻은 뱃지</h2>
            </div>
            <Link href="/child/badges" className="text-xs text-orange-500 font-bold flex items-center gap-0.5 hover:underline">
              도감 보기 <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <RecentBadgesPreview />
        </section>

      </div>
    </div>
  );
}
