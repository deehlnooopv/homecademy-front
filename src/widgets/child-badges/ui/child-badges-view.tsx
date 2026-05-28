'use client';

import { useState } from 'react';
import { Award, Star, Lock, AlertCircle, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/shared/ui/card';
import { Badge } from '@/src/shared/ui/badge';
import { Progress } from '@/src/shared/ui/progress';
import { SUBJECT_TECH_TREES_MOCK, CHILD_PROFILE_MOCK } from '@/src/entities/child-view';
import type { Badge as BadgeType, SubjectTechTree } from '@/src/entities/child-view';

// ─── 색상 헬퍼 ───────────────────────────────────────────────────────────────

const BADGE_COLOR_MAP = {
  gold: { gradient: 'from-amber-400 to-yellow-500', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', ring: 'ring-amber-300' },
  blue: { gradient: 'from-blue-400 to-indigo-500', bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', ring: 'ring-blue-300' },
  green: { gradient: 'from-emerald-400 to-teal-500', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', ring: 'ring-emerald-300' },
  violet: { gradient: 'from-violet-400 to-purple-500', bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', ring: 'ring-violet-300' },
  rose: { gradient: 'from-rose-400 to-pink-500', bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', ring: 'ring-rose-300' },
};

/** 상위 퍼센트 → 레벨 구간 텍스트 */
function getPercentLabel(topPercent: number): string {
  if (topPercent <= 1) return '상위 1%';
  if (topPercent <= 5) return '상위 5%';
  if (topPercent <= 10) return '상위 10%';
  if (topPercent <= 20) return '상위 20%';
  if (topPercent <= 40) return '상위 40%';
  if (topPercent <= 80) return '상위 80%';
  return '상위 100%';
}

/** 레벨 달성에 필요한 상위 퍼센트 기준 */
const LEVEL_THRESHOLDS: Record<number, string> = {
  1: '상위 80% 이상',
  2: '상위 40% 이상',
  3: '상위 20% 이상',
  4: '상위 5% 이상',
  5: '상위 1% 이상',
};

// ─── 단일 뱃지 카드 ──────────────────────────────────────────────────────────

function BadgeCard({ badge, isRepresentative, onSetRepresentative }: {
  badge: BadgeType;
  isRepresentative: boolean;
  onSetRepresentative: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const c = BADGE_COLOR_MAP[badge.color];
  const currentTitle = badge.acquired ? badge.levelTitles[badge.level - 1] : badge.levelTitles[0];

  return (
    <div
      className={`relative rounded-2xl border-2 p-4 transition-all duration-200
        ${badge.acquired ? `${c.bg} ${c.border}` : 'bg-muted/30 border-border/40'}
        ${isRepresentative ? `ring-2 ring-offset-2 ${c.ring}` : ''}
        ${badge.needsReview ? 'border-amber-400 bg-amber-50/60' : ''}
      `}
    >
      {/* 대표 뱃지 리본 */}
      {isRepresentative && (
        <div className={`absolute -top-2.5 -right-2 bg-gradient-to-r ${c.gradient} text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5`}>
          <Star className="w-2.5 h-2.5 fill-white" /> 대표
        </div>
      )}

      {/* 재검토 필요 알림 */}
      {badge.needsReview && (
        <div className="absolute -top-2.5 left-2 bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
          <AlertCircle className="w-2.5 h-2.5" /> 재검토 필요
        </div>
      )}

      <div className="flex items-start gap-3">
        {/* 뱃지 아이콘 */}
        <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0
          ${badge.acquired
            ? `bg-gradient-to-br ${c.gradient}`
            : 'bg-muted border-2 border-dashed border-border'
          }`}>
          {badge.acquired ? badge.emoji : <Lock className="w-5 h-5 text-muted-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <p className={`text-sm font-extrabold ${badge.acquired ? c.text : 'text-muted-foreground'}`}>
              {currentTitle}
            </p>
            {badge.acquired && (
              <Badge className={`text-[9px] px-1.5 py-0 bg-gradient-to-r ${c.gradient} text-white border-0`}>
                Lv.{badge.level}
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">{badge.ability}</p>

          {badge.acquired && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <TrendingUp className={`w-3 h-3 ${c.text}`} />
              <span className={`text-[11px] font-bold ${c.text}`}>{getPercentLabel(badge.topPercent)}</span>
            </div>
          )}
        </div>

        {/* 펼치기 버튼 */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-muted-foreground hover:text-foreground transition-colors shrink-0 mt-1"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* 레벨 진행 바 */}
      {badge.acquired && (
        <div className="mt-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted-foreground">다음 레벨까지</span>
            {badge.level < 5 && (
              <span className="text-[10px] text-muted-foreground">{LEVEL_THRESHOLDS[badge.level + 1]} 달성 시</span>
            )}
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((lv) => (
              <div
                key={lv}
                className={`flex-1 h-2 rounded-full transition-all duration-300
                  ${lv <= badge.level
                    ? `bg-gradient-to-r ${c.gradient}`
                    : 'bg-muted'
                  }`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {badge.levelTitles.map((title, i) => (
              <span key={i} className={`text-[8px] text-center flex-1 leading-tight
                ${i < badge.level ? c.text : 'text-muted-foreground/50'}`}>
                {i === badge.level - 1 ? '●' : '○'}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 펼쳐진 상세 정보 */}
      {expanded && (
        <div className={`mt-3 pt-3 border-t ${badge.acquired ? c.border : 'border-border/40'} space-y-2`}>
          {/* 레벨별 칭호 목록 */}
          <div className="space-y-1.5">
            {badge.levelTitles.map((title, i) => {
              const lv = i + 1;
              const isAchieved = badge.acquired && lv <= badge.level;
              const isCurrent = badge.acquired && lv === badge.level;
              return (
                <div key={i} className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5
                  ${isCurrent ? `${c.bg} border ${c.border}` : 'bg-transparent'}`}>
                  <span className={`text-xs font-bold w-8 shrink-0 ${isAchieved ? c.text : 'text-muted-foreground/50'}`}>
                    Lv.{lv}
                  </span>
                  <span className={`text-xs ${isAchieved ? 'font-bold text-foreground' : 'text-muted-foreground/50'}`}>
                    {title}
                  </span>
                  {isCurrent && <Badge className={`ml-auto text-[9px] px-1.5 py-0 bg-gradient-to-r ${c.gradient} text-white border-0`}>현재</Badge>}
                  {!isAchieved && lv > (badge.acquired ? badge.level : 0) && (
                    <span className="ml-auto text-[9px] text-muted-foreground/50">{LEVEL_THRESHOLDS[lv]}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* 대표 뱃지 설정 버튼 */}
          {badge.acquired && !isRepresentative && (
            <button
              onClick={() => onSetRepresentative(badge.id)}
              className={`w-full mt-1 py-2 rounded-xl text-xs font-bold border-2 ${c.border} ${c.text} hover:${c.bg} transition-colors`}
            >
              ⭐ 대표 뱃지로 설정하기
            </button>
          )}
          {isRepresentative && (
            <div className={`w-full py-2 rounded-xl text-xs font-bold text-center ${c.bg} ${c.text}`}>
              ✨ 현재 대표 뱃지로 설정됨
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── 과목별 테크트리 섹션 ─────────────────────────────────────────────────────

function SubjectSection({ tree, representativeBadgeId, onSetRepresentative }: {
  tree: SubjectTechTree;
  representativeBadgeId: string | null;
  onSetRepresentative: (id: string) => void;
}) {
  const acquiredCount = tree.badges.filter((b) => b.acquired).length;

  return (
    <Card className="border border-border/60">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-xl shadow-md">
              {tree.subjectEmoji}
            </div>
            <div>
              <CardTitle className="text-base font-extrabold">{tree.subject}</CardTitle>
              <p className="text-[11px] text-muted-foreground">{tree.tutorEmoji} {tree.tutorName}</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {acquiredCount}/{tree.badges.length} 획득
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {tree.badges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
            isRepresentative={representativeBadgeId === badge.id}
            onSetRepresentative={onSetRepresentative}
          />
        ))}
      </CardContent>
    </Card>
  );
}

// ─── 메인 뱃지 도감 뷰 ───────────────────────────────────────────────────────

/**
 * 자녀 뱃지 도감 & 성장 테크트리 화면
 * - 과목별 테크트리 및 뱃지 목록 표시
 * - 레벨별 칭호, 상위 퍼센트, 재검토 필요 여부 표시
 * - 대표 뱃지 설정 기능
 */
export function ChildBadgesView() {
  const [representativeBadgeId, setRepresentativeBadgeId] = useState<string | null>(
    CHILD_PROFILE_MOCK.representativeBadgeId
  );

  const allAcquired = SUBJECT_TECH_TREES_MOCK.flatMap((t) => t.badges).filter((b) => b.acquired);
  const needsReview = allAcquired.filter((b) => b.needsReview);

  return (
    <div className="max-w-lg mx-auto">
      {/* 헤더 */}
      <div className="px-5 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-5 h-5 text-amber-500" />
          <h1 className="text-xl font-extrabold text-foreground">뱃지 도감</h1>
        </div>
        <p className="text-sm text-muted-foreground">나만의 성장 기록을 모아봐요!</p>
      </div>

      {/* 요약 통계 */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold text-amber-600">{allAcquired.length}</p>
            <p className="text-[11px] text-amber-600/80 font-medium mt-0.5">획득한 뱃지</p>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold text-orange-600">
              {SUBJECT_TECH_TREES_MOCK.flatMap((t) => t.badges).length}
            </p>
            <p className="text-[11px] text-orange-600/80 font-medium mt-0.5">전체 뱃지</p>
          </div>
          <div className={`rounded-2xl p-3 text-center border ${needsReview.length > 0 ? 'bg-amber-50 border-amber-300' : 'bg-emerald-50 border-emerald-200'}`}>
            <p className={`text-2xl font-extrabold ${needsReview.length > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {needsReview.length}
            </p>
            <p className={`text-[11px] font-medium mt-0.5 ${needsReview.length > 0 ? 'text-amber-600/80' : 'text-emerald-600/80'}`}>
              재검토 필요
            </p>
          </div>
        </div>
      </div>

      {/* 재검토 필요 알림 배너 */}
      {needsReview.length > 0 && (
        <div className="px-4 mb-4">
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-bold text-amber-700">재검토가 필요한 뱃지가 있어요!</p>
                <p className="text-xs text-amber-600/80 mt-0.5 leading-relaxed">
                  {needsReview.map((b) => b.levelTitles[b.level - 1]).join(', ')} 뱃지를 유지하려면 학습을 이어가세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 과목별 테크트리 */}
      <div className="px-4 space-y-5 pb-6">
        {SUBJECT_TECH_TREES_MOCK.map((tree) => (
          <SubjectSection
            key={tree.subject}
            tree={tree}
            representativeBadgeId={representativeBadgeId}
            onSetRepresentative={setRepresentativeBadgeId}
          />
        ))}
      </div>
    </div>
  );
}
