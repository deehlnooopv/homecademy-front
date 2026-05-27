'use client';

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import type { SkillData } from '../model/types';

interface HexagonSkillChartProps {
  data: SkillData[];
  childName: string;
}

export function HexagonSkillChart({ data, childName }: HexagonSkillChartProps) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{childName}의 역량 분석</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart data={data} margin={{ top: 20, right: 80, left: 80, bottom: 20 }}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="category" stroke="#6b7280" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#9ca3af" />
          <Radar name="역량" dataKey="value" stroke="#3b82f6" fill="#60a5fa" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
