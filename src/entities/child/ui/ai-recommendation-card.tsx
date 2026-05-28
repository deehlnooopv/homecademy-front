'use client';

import { Button } from '@/src/shared/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { Recommendation } from '../model/types';

interface AIRecommendationCardProps {
  recommendation: Recommendation;
  onNavigate?: (courseId: string) => void;
}

export function AIRecommendationCard({ recommendation, onNavigate }: AIRecommendationCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-purple-200 p-6 space-y-4">
      <div className="flex items-start gap-3">
        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg p-2">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800">{recommendation.title}</h3>
          <p className="text-sm text-purple-600 font-medium">{recommendation.subject} • {recommendation.level}</p>
        </div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed">
        {recommendation.description}
      </p>

      <div className="bg-white rounded-lg p-3 border border-purple-100">
        <p className="text-xs font-semibold text-purple-700 mb-1">AI 선생님의 추천 이유</p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {recommendation.reason}
        </p>
      </div>

      <Button 
        onClick={() => onNavigate?.(recommendation.id)}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold gap-2"
      >
        수업 듣기
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
