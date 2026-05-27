'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { Badge } from '@/src/shared/ui/badge';
import { Crown, TrendingUp } from 'lucide-react';
import type { SkillData } from '../model/types';

interface HexagonSkillChartProps {
  data: SkillData[];
  childName: string;
}

/** 역량 카테고리별 이모지 및 설명 매핑 */
const SKILL_META: Record<string, { emoji: string; desc: string }> = {
  '논리력': { emoji: '🧩', desc: '문제 해결 능력' },
  '창의력': { emoji: '🎨', desc: '새로운 아이디어' },
  '언어력': { emoji: '📚', desc: '언어 표현 능력' },
  '사회성': { emoji: '🤝', desc: '관계 형성 능력' },
  '예술성': { emoji: '🎵', desc: '감성 표현 능력' },
  '체육': { emoji: '⚡', desc: '신체 활동 능력' },
  'Logic': { emoji: '🧩', desc: '문제 해결 능력' },
  'Creativity': { emoji: '🎨', desc: '새로운 아이디어' },
  'Language': { emoji: '📚', desc: '언어 표현 능력' },
  'Social': { emoji: '🤝', desc: '관계 형성 능력' },
  'Arts': { emoji: '🎵', desc: '감성 표현 능력' },
  'Sports': { emoji: '⚡', desc: '신체 활동 능력' },
};

/**
 * 역량 레이더 차트 커스텀 툴팁 컴포넌트
 * - 호버 시 역량명, 점수, 설명 표시
 */
function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: SkillData; value: number }> }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  const meta = SKILL_META[item.payload.category] ?? { emoji: '⭐', desc: '' };
  return (
    <div className="bg-white border border-border rounded-xl shadow-lg px-3.5 py-2.5 text-sm">
      <p className="font-bold text-foreground flex items-center gap-1.5">
        <span>{meta.emoji}</span>
        {item.payload.category}
      </p>
      <p className="text-2xl font-extrabold text-primary mt-0.5">
        {item.value}<span className="text-sm font-normal text-muted-foreground">점</span>
      </p>
      {meta.desc && <p className="text-xs text-muted-foreground mt-0.5">{meta.desc}</p>}
    </div>
  );
}

/**
 * 6각형 역량 레이더 차트 컴포넌트
 * - 높은 점수(80+) 항목은 황금색 강조 표시
 * - 굵은 선(strokeWidth=3.5)과 커스텀 dot으로 가독성 향상
 * - 다크 그라디언트 배경으로 시각적 임팩트 강화
 * @param data - 역량 데이터 배열 (category, value)
 * @param childName - 자녀 이름 (차트 제목에 사용)
 */
export function HexagonSkillChart({ data, childName }: HexagonSkillChartProps) {
  const topSkill = data.length > 0 ? data.reduce((max, item) => item.value > max.value ? item : max, data[0]) : null;
  const strongSkills = data.filter((item) => item.value >= 80);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 p-6">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

      {/* 헤더 */}
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-extrabold text-white">{childName}의 6대 역량</h3>
          <p className="text-white/60 text-xs mt-0.5">AI가 분석한 재능 지도</p>
        </div>
        {topSkill && (
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-1.5">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-white text-xs font-semibold">{topSkill.category} {topSkill.value}점</span>
          </div>
        )}
      </div>

      {/* 레이더 차트 */}
      <div className="relative z-10 h-96">
        <ResponsiveContainer width="100%" height="70%">
          <RadarChart data={data} margin={{ top: 24, right: 70, left: 70, bottom: 24 }}>
            <PolarGrid stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
            <PolarAngleAxis
              dataKey="category"
              tick={({ x, y, payload }) => {
                const item = data.find((d) => d.category === payload.value);
                const isTop = item && item.value >= 80;
                const meta = SKILL_META[payload.value];
                return (
                  <g>
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill={isTop ? '#FFD700' : 'rgba(255,255,255,0.85)'}
                      fontSize={isTop ? 13 : 12}
                      fontWeight={isTop ? 800 : 600}
                    >
                      {meta?.emoji ?? ''} {payload.value}
                    </text>
                    {isTop && (
                      <text
                        x={x}
                        y={y + 16}
                        textAnchor="middle"
                        fill="#FFD700"
                        fontSize={10}
                        fontWeight={700}
                      >
                        ★ {item?.value}점
                      </text>
                    )}
                  </g>
                );
              }}
            />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }}
              tickCount={5}
              stroke="transparent"
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="역량"
              dataKey="value"
              stroke="#FF6B35"
              strokeWidth={3.5}
              fill="rgba(255,107,53,0.28)"
              fillOpacity={1}
              dot={(props) => {
                const { cx, cy, payload } = props as { cx: number; cy: number; payload: SkillData };
                const isTop = payload.value >= 80;
                return (
                  <circle
                    key={`dot-${payload.category}`}
                    cx={cx}
                    cy={cy}
                    r={isTop ? 7 : 4.5}
                    fill={isTop ? '#FFD700' : '#FF6B35'}
                    stroke="white"
                    strokeWidth={2}
                  />
                );
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* 강점 역량 배지 */}
      {strongSkills.length > 0 && (
        <div className="relative z-10 flex flex-wrap gap-2 mt-1">
          <div className="flex items-center gap-1.5 text-white/60 text-xs">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>강점 역량:</span>
          </div>
          {strongSkills.map((skill) => (
            <Badge
              key={skill.category}
              className="bg-amber-400/20 text-amber-300 border-amber-400/30 text-xs font-semibold"
              variant="outline"
            >
              {SKILL_META[skill.category]?.emoji} {skill.category} {skill.value}점
            </Badge>
          ))}
        </div>
      )}

      {/* 역량 범례 그리드 */}
      <div className="relative z-10 grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10">
        {data.map((item) => {
          const meta = SKILL_META[item.category];
          const isTop = item.value >= 80;
          return (
            <div key={item.category} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: isTop ? '#FFD700' : 'rgba(255,107,53,0.7)' }}
              />
              <span className={`text-xs ${isTop ? 'text-amber-300 font-bold' : 'text-white/60'}`}>
                {meta?.emoji} {item.category}
              </span>
              <span className={`text-xs ml-auto font-semibold ${isTop ? 'text-amber-300' : 'text-white/50'}`}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
