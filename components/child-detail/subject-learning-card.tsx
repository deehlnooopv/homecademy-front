'use client';

import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';

interface SubjectCard {
  subject: string;
  progress: number;
  rating: number;
  strengths: string[];
  weaknesses: string[];
  challenges: string[];
  nextFocusPoints: string;
}

interface SubjectLearningCardProps {
  card: SubjectCard;
}

export function SubjectLearningCard({ card }: SubjectLearningCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 rounded-lg p-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-bold text-lg text-gray-800">{card.subject}</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{card.rating}점</p>
          <p className="text-xs text-gray-500">만점 100점</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-semibold text-gray-700">학습 진도</p>
          <p className="text-sm text-gray-600">{card.progress}%</p>
        </div>
        <Progress value={card.progress} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <p className="text-xs font-semibold text-green-700 mb-1">재능있어요</p>
          <ul className="text-xs text-green-600 space-y-1">
            {card.strengths.map((strength, idx) => (
              <li key={idx}>• {strength}</li>
            ))}
          </ul>
        </div>

        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <p className="text-xs font-semibold text-orange-700 mb-1">미흡해요</p>
          <ul className="text-xs text-orange-600 space-y-1">
            {card.weaknesses.map((weakness, idx) => (
              <li key={idx}>• {weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-red-50 rounded-lg p-3 border border-red-200">
        <p className="text-xs font-semibold text-red-700 mb-2">어려움을 느끼는 것 같아요</p>
        <div className="flex flex-wrap gap-1">
          {card.challenges.map((challenge, idx) => (
            <Badge key={idx} variant="outline" className="text-xs bg-white border-red-300 text-red-700">
              {challenge}
            </Badge>
          ))}
        </div>
      </div>

      <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-200">
        <p className="text-xs font-semibold text-indigo-700 mb-2">다음 수업 준비 포인트</p>
        <p className="text-xs text-indigo-600 leading-relaxed">
          {card.nextFocusPoints}
        </p>
      </div>
    </div>
  );
}
