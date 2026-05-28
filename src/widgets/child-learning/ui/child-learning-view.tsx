'use client';

import Link from 'next/link';
import { BookOpen, Clock, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import { Button } from '@/src/shared/ui/button';
import { Progress } from '@/src/shared/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/ui/tabs';
import { ONGOING_COURSES_MOCK, RECOMMENDED_LESSONS_MOCK } from '@/src/entities/child-view';
import type { OngoingCourse, RecommendedLesson } from '@/src/entities/child-view';

const COLOR_MAP = {
  orange: { bg: 'bg-orange-100', text: 'text-orange-600', gradient: 'from-orange-400 to-amber-500', border: 'border-orange-200', light: 'bg-orange-50', progress: '[&>div]:bg-orange-400' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-600', gradient: 'from-blue-400 to-indigo-500', border: 'border-blue-200', light: 'bg-blue-50', progress: '[&>div]:bg-blue-400' },
  green: { bg: 'bg-emerald-100', text: 'text-emerald-600', gradient: 'from-emerald-400 to-teal-500', border: 'border-emerald-200', light: 'bg-emerald-50', progress: '[&>div]:bg-emerald-400' },
  violet: { bg: 'bg-violet-100', text: 'text-violet-600', gradient: 'from-violet-400 to-purple-500', border: 'border-violet-200', light: 'bg-violet-50', progress: '[&>div]:bg-violet-400' },
  rose: { bg: 'bg-rose-100', text: 'text-rose-600', gradient: 'from-rose-400 to-pink-500', border: 'border-rose-200', light: 'bg-rose-50', progress: '[&>div]:bg-rose-400' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-600', gradient: 'from-amber-400 to-yellow-500', border: 'border-amber-200', light: 'bg-amber-50', progress: '[&>div]:bg-amber-400' },
};

function OngoingCard({ course }: { course: OngoingCourse }) {
  const c = COLOR_MAP[course.color];
  return (
    <Card className={`border-2 ${c.border} hover:shadow-md transition-all duration-200`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-2xl shadow-md shrink-0`}>
            {course.subject === '수학' ? '🔢' : course.subject === '음악' ? '🎵' : '📖'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`text-[10px] px-2 py-0 ${c.bg} ${c.text} border-0`}>{course.subject}</Badge>
              <span className="text-[11px] text-muted-foreground">{course.tutorEmoji} {course.tutorName}</span>
            </div>
            <h3 className="text-sm font-bold text-foreground">{course.title}</h3>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex-1">
                <Progress value={course.progressPercent} className={`h-2.5 ${c.progress}`} />
              </div>
              <span className={`text-sm font-extrabold ${c.text} shrink-0`}>{course.progressPercent}%</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">
                  {course.doneMinutes}분 완료 / {course.totalMinutes}분
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{course.totalMinutes - course.doneMinutes}분 남음</span>
              </div>
            </div>
          </div>
        </div>
        <Button className={`w-full mt-4 h-9 text-sm font-bold bg-gradient-to-r ${c.gradient} text-white border-0 rounded-xl`}>
          이어서 학습하기
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

function RecommendedCard({ lesson }: { lesson: RecommendedLesson }) {
  const c = COLOR_MAP[lesson.color];
  return (
    <Card className={`border-2 ${c.border} hover:shadow-md transition-all duration-200`}>
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.gradient} flex items-center justify-center text-2xl shadow-md shrink-0`}>
            {lesson.tutorEmoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge className={`text-[10px] px-2 py-0 bg-gradient-to-r ${c.gradient} text-white border-0`}>{lesson.subject}</Badge>
              <div className="flex items-center gap-0.5">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground">{lesson.durationMinutes}분</span>
              </div>
            </div>
            <h3 className="text-sm font-bold text-foreground">{lesson.title}</h3>
            <div className={`mt-2 ${c.light} rounded-xl p-2.5 border ${c.border}`}>
              <div className="flex items-start gap-1.5">
                <Sparkles className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${c.text}`} />
                <p className="text-[11px] text-muted-foreground leading-relaxed">{lesson.reason}</p>
              </div>
            </div>
          </div>
        </div>
        <Button className={`w-full mt-4 h-9 text-sm font-bold bg-gradient-to-r ${c.gradient} text-white border-0 rounded-xl`}>
          지금 시작하기
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </CardContent>
    </Card>
  );
}

/**
 * 자녀 학습 목록 화면
 * - 진행 중인 학습 / AI 추천 학습 탭 구성
 */
export function ChildLearningView() {
  return (
    <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-orange-500" />
          <h1 className="text-xl font-extrabold text-foreground">학습</h1>
        </div>
        <p className="text-sm text-muted-foreground">오늘도 열심히 해볼까요? 💪</p>
      </div>

      <div className="px-4">
        <Tabs defaultValue="ongoing">
          <TabsList className="w-full grid grid-cols-2 rounded-xl bg-muted/60 p-1 mb-5">
            <TabsTrigger value="ongoing" className="rounded-lg font-bold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              진행 중인 학습
            </TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-lg font-bold text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm">
              AI 추천 학습
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ongoing" className="space-y-4 mt-0">
            {ONGOING_COURSES_MOCK.map((course) => (
              <OngoingCard key={course.id} course={course} />
            ))}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-4 mt-0">
            {RECOMMENDED_LESSONS_MOCK.map((lesson) => (
              <RecommendedCard key={lesson.id} lesson={lesson} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
