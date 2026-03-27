'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { HexagonSkillChart } from '@/components/child-detail/hexagon-skill-chart';
import { AIRecommendationCard } from '@/components/child-detail/ai-recommendation-card';
import { SubjectLearningCard } from '@/components/child-detail/subject-learning-card';

interface ChildDetailPageProps {
  params: {
    id: string;
  };
}

const mockChildData = {
  id: '1',
  name: '김수현',
  age: 8,
  skills: [
    { category: '수학', value: 85, fullMark: 100 },
    { category: '창의력', value: 78, fullMark: 100 },
    { category: '문제해결', value: 82, fullMark: 100 },
    { category: '언어능력', value: 88, fullMark: 100 },
    { category: '사고력', value: 75, fullMark: 100 },
    { category: '흥미도', value: 90, fullMark: 100 },
  ],
  recommendations: [
    {
      id: 'course-1',
      title: 'AI와 함께하는 창의수학',
      description: '수학의 기초를 더욱 탄탄하게 하면서도 창의적 사고를 키울 수 있는 과정입니다.',
      reason: '수현이의 수학 점수는 매우 우수하지만, 창의력 발전을 위해 문제해결 방식을 다양하게 배우는 것이 좋을 것 같습니다. 이 과정은 논리적 사고와 창의력을 동시에 키울 수 있습니다.',
      subject: '수학',
      level: '초급-중급',
    },
    {
      id: 'course-2',
      title: '탐구하는 과학자 프로젝트',
      description: '실생활 과학 현상을 직접 탐구하며 사고력을 키우는 프로젝트 기반 학습입니다.',
      reason: '사고력 발전이 필요한 상황이고, 과학을 통한 탐구학습이 이를 크게 도와줄 수 있습니다. 수현이의 높은 흥미도를 고려할 때 좋은 선택이 될 것 같습니다.',
      subject: '과학',
      level: '중급',
    },
  ],
  subjects: [
    {
      subject: '수학',
      progress: 75,
      rating: 85,
      strengths: ['계산능력', '패턴인식'],
      weaknesses: ['응용문제'],
      challenges: ['다단계 문제', '창의적 접근'],
      nextFocusPoints: '응용문제에 대한 접근 방식을 더 다양하게 배워보는 것이 좋을 것 같습니다. 단순 계산을 넘어 문제의 의도를 파악하고 여러 풀이 방법을 시도하는 연습을 중점으로 진행할 예정입니다.',
    },
    {
      subject: '국어',
      progress: 85,
      rating: 88,
      strengths: ['독해', '어휘력'],
      weaknesses: ['창작능력'],
      challenges: ['글쓰기 표현력'],
      nextFocusPoints: '이미 독해 능력이 우수한 수현이를 위해 이번엔 창작 능력 개발에 집중할 예정입니다. 다양한 주제로 자신의 감정과 생각을 표현하는 글쓰기 연습을 통해 표현력을 키워나가겠습니다.',
    },
    {
      subject: '영어',
      progress: 60,
      rating: 72,
      strengths: ['듣기', '발음'],
      weaknesses: ['쓰기', '문법'],
      challenges: ['문장 구조 이해'],
      nextFocusPoints: '기초 문법 다시 복습하고, 실생활 문장 만들기 연습을 통해 쓰기 능력을 점진적으로 향상시킬 예정입니다. 게임 기반 학습을 통해 동기를 유지하도록 하겠습니다.',
    },
  ],
};

export default function ChildDetailPage({ params }: ChildDetailPageProps) {
  const router = useRouter();
  const [child] = useState(mockChildData);

  const handleNavigateToCourse = (courseId: string) => {
    console.log('[v0] Navigating to course:', courseId);
    router.push(`/dashboard/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            돌아가기
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{child.name}</h1>
            <p className="text-gray-600">{child.age}세 • 학습 상세 분석</p>
          </div>
        </div>

        {/* Skill Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <HexagonSkillChart 
            data={child.skills} 
            childName={child.name}
          />
        </div>

        {/* AI Recommendations */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">AI 선생님의 추천 수업</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {child.recommendations.map(rec => (
              <AIRecommendationCard 
                key={rec.id}
                recommendation={rec}
                onNavigate={handleNavigateToCourse}
              />
            ))}
          </div>
        </div>

        {/* Subject Learning Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">과목별 학습 현황</h2>
          <div className="space-y-4">
            {child.subjects.map(subject => (
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
