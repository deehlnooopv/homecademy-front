'use client';

import Link from 'next/link';
import { Button } from '@/src/shared/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HexagonSkillChart } from '@/src/entities/child/ui/hexagon-skill-chart';
import { AIRecommendationCard } from '@/src/entities/child/ui/ai-recommendation-card';
import { SubjectLearningCard } from '@/src/entities/child/ui/subject-learning-card';
import type { ChildDetail } from '@/src/entities/child/model/types';

interface ChildDetailViewProps {
  child: ChildDetail;
  onNavigateToCourse: (courseId: string) => void;
}

export function ChildDetailView({ child, onNavigateToCourse }: ChildDetailViewProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              뒤로가기
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
            <p className="text-gray-600">{child.age}세 · 학습 분석</p>
          </div>
        </div>

        {/* 역량 차트 */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <HexagonSkillChart
            data={child.skills}
            childName={child.name}
          />
        </div>

        {/* AI 추천 강좌 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">AI 선생님 추천 강좌</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {child.recommendations.map((rec) => (
              <AIRecommendationCard
                key={rec.id}
                recommendation={rec}
                onNavigate={onNavigateToCourse}
              />
            ))}
          </div>
        </div>

        {/* 과목별 학습 현황 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">과목별 학습 현황</h2>
          <div className="space-y-4">
            {child.subjects.map((subject) => (
              <SubjectLearningCard
                key={subject.subject}
                card={subject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
