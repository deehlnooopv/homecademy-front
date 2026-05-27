'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChildDetailView } from '@/src/widgets/child-detail';
import type { ChildDetail } from '@/src/entities/child';

const mockChildData: ChildDetail = {
  id: '1',
  name: '김수현',
  age: 8,
  skills: [
    { category: '수학', value: 85, fullMark: 100 },
    { category: '창의력', value: 78, fullMark: 100 },
    { category: '문제해결', value: 82, fullMark: 100 },
    { category: '언어', value: 88, fullMark: 100 },
    { category: '사고력', value: 75, fullMark: 100 },
    { category: '관심도', value: 90, fullMark: 100 },
  ],
  recommendations: [
    {
      id: 'course-1',
      title: 'AI와 함께하는 창의 수학',
      description: '수학 기초를 다지면서 창의적 사고력을 키우는 강좌입니다.',
      reason: '수현이는 수학 점수가 우수하지만 다양한 문제 풀이 방식을 경험하면 더욱 성장할 수 있습니다. 논리적 사고와 창의력을 결합한 강좌를 추천드립니다.',
      subject: '수학',
      level: '초급-중급',
    },
    {
      id: 'course-2',
      title: '과학 탐험 프로젝트',
      description: '실생활 과학 현상을 탐구하는 프로젝트 기반 학습입니다.',
      reason: '사고력 향상이 필요합니다. 탐구 기반 학습을 통한 과학 탐험이 크게 도움이 될 수 있습니다. 높은 관심도를 가지고 있어 최적의 선택입니다.',
      subject: '과학',
      level: '중급',
    },
  ],
  subjects: [
    {
      subject: '수학',
      progress: 75,
      rating: 85,
      strengths: ['계산력', '패턴 인식'],
      weaknesses: ['응용 문제'],
      challenges: ['다단계 문제', '창의적 접근'],
      nextFocusPoints: '응용 문제에 대한 다양한 접근법에 집중할 예정입니다. 단순 계산을 넘어 문제의 의도를 파악하고 여러 풀이 방법을 시도하는 연습을 하겠습니다.',
    },
    {
      subject: '국어',
      progress: 85,
      rating: 88,
      strengths: ['독해', '어휘력'],
      weaknesses: ['창작 글쓰기'],
      challenges: ['글쓰기 표현'],
      nextFocusPoints: '수현이의 뛰어난 독해 능력을 바탕으로 창작 글쓰기 능력을 키우는 데 집중하겠습니다. 다양한 주제로 글쓰기 연습을 통해 표현력을 향상시키겠습니다.',
    },
    {
      subject: '영어',
      progress: 60,
      rating: 72,
      strengths: ['듣기', '발음'],
      weaknesses: ['쓰기', '문법'],
      challenges: ['문장 구조 이해'],
      nextFocusPoints: '기초 문법을 복습하고 실생활 문장 만들기 연습을 통해 쓰기 실력을 점진적으로 향상시키겠습니다. 게임 기반 학습으로 동기를 유지하겠습니다.',
    },
  ],
};

export default function ChildDetailPage() {
  const params = useParams();
  const [child, setChild] = useState<ChildDetail>(mockChildData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: params.id를 사용하여 실제 API에서 자녀 데이터를 불러올 것
    setIsLoading(false);
  }, [params]);

  const handleNavigateToCourse = (courseId: string) => {
    // TODO: 강좌 페이지로 이동 구현
    console.log('강좌로 이동:', courseId);
  };

  if (isLoading) return null;

  return (
    <ChildDetailView
      child={child}
      onNavigateToCourse={handleNavigateToCourse}
    />
  );
}
