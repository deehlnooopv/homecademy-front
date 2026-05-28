'use client';

import { Badge } from '@/src/shared/ui/badge';
import { Card, CardContent } from '@/src/shared/ui/card';
import { Separator } from '@/src/shared/ui/separator';
import type { SubjectCard } from '../model/types';

/**
 * 과목별 테마 색상 및 이모지 매핑
 * - 각 과목의 특색에 맞는 시각적 표현 제공
 */
const SUBJECT_THEMES: Record<string, {
  gradient: string;
  lightBg: string;
  emoji: string;
  strengthEmoji: string;
  weaknessEmoji: string;
  color: string;
}> = {
  '수학': { gradient: 'from-blue-500 to-indigo-600', lightBg: 'bg-blue-50', emoji: '🔢', strengthEmoji: '🧮', weaknessEmoji: '📐', color: 'text-blue-600' },
  '국어': { gradient: 'from-emerald-500 to-teal-600', lightBg: 'bg-emerald-50', emoji: '📖', strengthEmoji: '✍️', weaknessEmoji: '📝', color: 'text-emerald-600' },
  '영어': { gradient: 'from-violet-500 to-purple-600', lightBg: 'bg-violet-50', emoji: '🌍', strengthEmoji: '🗣️', weaknessEmoji: '📕', color: 'text-violet-600' },
  '과학': { gradient: 'from-cyan-500 to-sky-600', lightBg: 'bg-cyan-50', emoji: '🔬', strengthEmoji: '⚗️', weaknessEmoji: '🧪', color: 'text-cyan-600' },
  '사회': { gradient: 'from-amber-500 to-orange-600', lightBg: 'bg-amber-50', emoji: '🗺️', strengthEmoji: '🌏', weaknessEmoji: '📊', color: 'text-amber-600' },
  '미술': { gradient: 'from-rose-500 to-pink-600', lightBg: 'bg-rose-50', emoji: '🎨', strengthEmoji: '🖌️', weaknessEmoji: '✏️', color: 'text-rose-600' },
  '음악': { gradient: 'from-fuchsia-500 to-purple-600', lightBg: 'bg-fuchsia-50', emoji: '🎵', strengthEmoji: '🎶', weaknessEmoji: '🎼', color: 'text-fuchsia-600' },
  '체육': { gradient: 'from-orange-500 to-red-600', lightBg: 'bg-orange-50', emoji: '⚽', strengthEmoji: '🏃', weaknessEmoji: '🤸', color: 'text-orange-600' },
};

const DEFAULT_THEME = {
  gradient: 'from-slate-500 to-gray-600',
  lightBg: 'bg-slate-50',
  emoji: '📚',
  strengthEmoji: '⭐',
  weaknessEmoji: '📌',
  color: 'text-slate-600',
};

interface SubjectLearningCardProps {
  card: SubjectCard;
}

/**
 * 과목별 학습 분석 카드 컴포넌트
 * - 과목 특색에 맞는 이모지 이미지와 그라디언트 헤더
 * - 학습 진도 바 차트
 * - 재능(강점) / 미흡 영역 2단 레이아웃
 * - 어려움을 느끼는 연관 과목 배지
 * - AI 다음 수업 준비 포인트 섹션
 * @param card - 과목 학습 카드 데이터
 */
export function SubjectLearningCard({ card }: SubjectLearningCardProps) {
  const theme = SUBJECT_THEMES[card.subject] ?? DEFAULT_THEME;

  return (
    <Card className="overflow-hidden border border-border/60 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 bg-card">
      {/* 과목 헤더 - 그라디언트 배경 */}
      <div className={`bg-gradient-to-r ${theme.gradient} p-5 relative overflow-hidden`}>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-20 select-none">{theme.emoji}</div>
        <div className="absolute right-16 top-2 text-3xl opacity-10 select-none rotate-12">{theme.strengthEmoji}</div>
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{theme.emoji}</span>
              <h3 className="text-xl font-extrabold text-white">{card.subject}</h3>
            </div>
            <p className="text-white/70 text-xs">AI 학습 분석 리포트</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-white">{card.rating}</p>
            <p className="text-white/70 text-xs">/ 100점</p>
          </div>
        </div>
        <div className="relative z-10 mt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-white/80">
            <span className="font-medium">학습 진도</span>
            <span className="font-bold">{card.progress}%</span>
          </div>
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${card.progress}%` }} />
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* 재능 / 미흡 2단 레이아웃 */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`${theme.lightBg} rounded-xl p-3.5`}>
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-lg">{theme.strengthEmoji}</span>
              <p className={`text-xs font-bold ${theme.color}`}>재능 있어요 ✨</p>
            </div>
            <ul className="space-y-1.5">
              {card.strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-foreground/80">
                  <span className="text-emerald-500 mt-0.5 shrink-0">●</span>
                  <span className="leading-relaxed">{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-orange-50 rounded-xl p-3.5">
            <div className="flex items-center gap-1.5 mb-2.5">
              <span className="text-lg">{theme.weaknessEmoji}</span>
              <p className="text-xs font-bold text-orange-600">미흡해요 📌</p>
            </div>
            <ul className="space-y-1.5">
              {card.weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-xs text-foreground/80">
                  <span className="text-orange-400 mt-0.5 shrink-0">●</span>
                  <span className="leading-relaxed">{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* 어려움을 느끼는 연관 과목 */}
        <div className="space-y-2">
          <p className="text-xs font-bold text-foreground flex items-center gap-1.5">
            <span>🤔</span>
            어려움을 느끼는 것 같아요
          </p>
          <div className="flex flex-wrap gap-1.5">
            {card.challenges.map((challenge, idx) => (
              <Badge key={idx} variant="outline" className="text-xs bg-red-50 border-red-200 text-red-700 font-medium">
                {challenge}
              </Badge>
            ))}
          </div>
        </div>

        <Separator className="opacity-50" />

        {/* AI 다음 수업 준비 포인트 */}
        <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-3.5 border border-violet-100">
          <p className="text-xs font-bold text-violet-700 flex items-center gap-1.5 mb-2">
            <span>🤖</span>
            AI 부모님의 다음 수업 계획
          </p>
          <p className="text-xs text-violet-600/90 leading-relaxed">{card.nextFocusPoints}</p>
        </div>
      </CardContent>
    </Card>
  );
}
