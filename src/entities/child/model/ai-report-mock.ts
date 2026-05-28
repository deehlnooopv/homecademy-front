import type { AIAnalysisReport } from './types';

/**
 * AI 분석 리포트 목 데이터
 * 실제 서비스에서는 API에서 가져와야 합니다.
 */
export const AI_REPORT_MOCK_DATA: AIAnalysisReport[] = [
  {
    childId: '1',
    childName: '김서준',
    childAge: 8,
    generatedAt: '2025-05-27T09:00:00',
    summary:
      '서준이는 이번 주 수학 연산 속도에서 또래 대비 상위 3%의 놀라운 능력을 보였습니다. 특히 어려운 문제를 포기하지 않고 끝까지 해결하는 끈기가 빛났어요.',
    talents: [
      {
        category: '수학 연산 속도',
        subject: '수학',
        episode:
          '오늘 서준이가 평소보다 3배 빠르게 곱셈 문제를 해결했어요! 20문제를 단 4분 만에 풀어냈는데, 이는 같은 나이 아이들의 상위 3%에 해당하는 속도입니다. 문제 해결 패턴에서 효율을 찾는 뛰어난 직관력이 보입니다.',
        topPercent: 3,
        badge: '수학 천재',
        badgeColor: 'gold',
        growthRate: 28,
      },
      {
        category: '창의적 문제풀이',
        subject: '수학',
        episode:
          '서준이는 교과서에 없는 방법으로 도형 문제를 풀었어요. 선생님도 생각하지 못한 독창적인 접근법으로 정답을 찾아냈습니다. 이런 창의적 사고는 미래 수학·과학 분야에서 큰 강점이 될 거예요.',
        topPercent: 8,
        badge: '창의 탐험가',
        badgeColor: 'purple',
        growthRate: 15,
      },
      {
        category: '끈기와 집중력',
        subject: '전 과목',
        episode:
          '어려운 문제 앞에서 두 번이나 다시 도전해 결국 정답을 찾아냈어요. 한 문제에 평균 3분 이상 깊이 생각하는 모습이 관찰됩니다. 이 끈기는 어떤 분야에서도 성공의 열쇠가 됩니다.',
        badge: '불굴의 도전자',
        badgeColor: 'blue',
        growthRate: 20,
      },
    ],
    processData: {
      revisionCount: 7,
      avgThinkingTime: 185,
      retryCount: 4,
      persistenceScore: 88,
      flexibilityScore: 76,
    },
    growthTimeline: [
      {
        date: '5월 1주',
        label: '수학 기초 완성',
        description: '덧셈·뺄셈 100% 마스터',
        score: 72,
      },
      {
        date: '5월 2주',
        label: '곱셈 돌파',
        description: '곱셈 구구단 완벽 암기',
        score: 78,
      },
      {
        date: '5월 3주',
        label: '창의 문제풀이 발견',
        description: '독창적 풀이법으로 도형 문제 해결',
        score: 83,
        highlight: true,
      },
      {
        date: '5월 4주',
        label: '연산 속도 급성장',
        description: '상위 3% 연산 속도 달성',
        score: 91,
        highlight: true,
      },
    ],
    conversationGuides: [
      {
        context: '서준이가 어려운 문제를 두 번 다시 풀어 정답을 찾았어요.',
        question:
          '"정답을 맞힌 것보다, 서준이가 끝까지 포기하지 않고 두 번이나 다시 풀어본 점이 정말 멋져. 어떻게 그 답을 찾아냈어?"',
        tip: '결과보다 과정을 칭찬하면 아이의 내적 동기가 강해집니다.',
      },
      {
        context: '서준이가 교과서에 없는 방법으로 문제를 풀었어요.',
        question:
          '"서준아, 선생님도 생각 못 한 방법으로 풀었다고 하던데? 어떻게 그런 아이디어가 떠올랐어?"',
        tip: '창의적 사고를 구체적으로 인정해주면 자신감이 높아집니다.',
      },
    ],
    nextSteps: [
      '수학 심화: 창의 수학 올림피아드 입문 과정 도전',
      '연산 속도를 활용한 암산 챔피언십 참가',
      '도형·공간 감각을 키우는 블록 코딩 수업 추천',
    ],
    weeklyStudyMinutes: 320,
    completedTasks: 24,
    achievementChange: 18,
    skills: [
      { category: '수학', value: 91, fullMark: 100 },
      { category: '창의력', value: 83, fullMark: 100 },
      { category: '집중력', value: 88, fullMark: 100 },
      { category: '언어', value: 70, fullMark: 100 },
      { category: '사고력', value: 85, fullMark: 100 },
      { category: '끈기', value: 88, fullMark: 100 },
    ],
  },
  {
    childId: '2',
    childName: '김하은',
    childAge: 6,
    generatedAt: '2025-05-27T09:00:00',
    summary:
      '하은이는 이번 주 음악 시간에 음정 정확도에서 눈부신 재능을 보였습니다. 처음 듣는 멜로디도 정확하게 따라 부르는 절대음감 가능성이 관찰됩니다.',
    talents: [
      {
        category: '음감 & 음정 정확도',
        subject: '음악',
        episode:
          '하은이가 처음 듣는 동요를 단 한 번 듣고 음정을 정확하게 따라 불렀어요! 음정 정확도가 94%로, 또래 아이들의 상위 5%에 해당합니다. 절대음감의 가능성이 보이는 특별한 재능이에요.',
        topPercent: 5,
        badge: '음악 천재',
        badgeColor: 'rose',
        growthRate: 32,
      },
      {
        category: '언어 감각 & 어휘력',
        subject: '국어',
        episode:
          '하은이는 6세임에도 불구하고 8세 수준의 어휘를 자연스럽게 사용해요. 동화책을 읽으며 어려운 단어의 뜻을 문맥으로 유추하는 능력이 뛰어납니다. 언어 영재의 가능성이 엿보입니다.',
        topPercent: 10,
        badge: '언어 마법사',
        badgeColor: 'purple',
        growthRate: 22,
      },
      {
        category: '리듬감 & 박자 감각',
        subject: '음악',
        episode:
          '손뼉 치기 활동에서 복잡한 리듬 패턴을 완벽하게 재현했어요. 음악적 패턴 인식 능력이 또래보다 훨씬 발달해 있습니다.',
        badge: '리듬 마스터',
        badgeColor: 'green',
        growthRate: 18,
      },
    ],
    processData: {
      revisionCount: 5,
      avgThinkingTime: 120,
      retryCount: 3,
      persistenceScore: 82,
      flexibilityScore: 90,
    },
    growthTimeline: [
      {
        date: '5월 1주',
        label: '한글 읽기 완성',
        description: '받침 있는 글자 완전 습득',
        score: 85,
      },
      {
        date: '5월 2주',
        label: '동요 음정 정확도 향상',
        description: '음정 정확도 78% 달성',
        score: 78,
      },
      {
        date: '5월 3주',
        label: '어휘력 급성장',
        description: '8세 수준 어휘 자연스럽게 사용',
        score: 88,
        highlight: true,
      },
      {
        date: '5월 4주',
        label: '음감 재능 발견',
        description: '처음 듣는 멜로디 정확 재현',
        score: 94,
        highlight: true,
      },
    ],
    conversationGuides: [
      {
        context: '하은이가 처음 듣는 노래를 정확하게 따라 불렀어요.',
        question:
          '"하은아, 그 노래 처음 들었는데 어떻게 그렇게 잘 불렀어? 노래 들을 때 어떤 느낌이야?"',
        tip: '음악적 경험을 언어로 표현하게 하면 감수성과 언어 능력이 함께 자랍니다.',
      },
      {
        context: '하은이가 어려운 단어를 문맥으로 유추했어요.',
        question:
          '"이 단어 어떻게 알았어? 책에서 읽었어? 하은이가 어떻게 뜻을 알아냈는지 엄마한테 알려줄 수 있어?"',
        tip: '아이가 스스로 설명하게 하면 메타인지 능력이 발달합니다.',
      },
    ],
    nextSteps: [
      '음악 심화: 피아노 또는 바이올린 입문 레슨 추천',
      '절대음감 발달을 위한 계이름 읽기 활동',
      '언어 재능 연계: 영어 동요로 외국어 감각 키우기',
    ],
    weeklyStudyMinutes: 210,
    completedTasks: 18,
    achievementChange: 24,
    skills: [
      { category: '음악', value: 94, fullMark: 100 },
      { category: '언어', value: 90, fullMark: 100 },
      { category: '창의력', value: 85, fullMark: 100 },
      { category: '집중력', value: 78, fullMark: 100 },
      { category: '사고력', value: 72, fullMark: 100 },
      { category: '끈기', value: 82, fullMark: 100 },
    ],
  },
];
