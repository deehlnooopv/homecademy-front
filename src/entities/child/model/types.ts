// Child entity types
export interface Child {
  id: string;
  name: string;
  age: number;
  grade: string;
  avatar?: string;
  streak: number;
  todayProgress: number;
  todayLearningTime: number;
  todayGoalTime: number;
  topTalent: string;
}

export interface ChildLearningStats {
  childId: string;
  weeklyProgress: number;
  monthlyProgress: number;
  totalLearningHours: number;
  completedLessons: number;
  achievements: string[];
}

export interface SkillData {
  category: string;
  value: number;
  fullMark: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  reason: string;
  subject: string;
  level: string;
}

export interface SubjectCard {
  subject: string;
  progress: number;
  rating: number;
  strengths: string[];
  weaknesses: string[];
  challenges: string[];
  nextFocusPoints: string;
}

export interface ChildDetail {
  id: string;
  name: string;
  age: number;
  grade?: string;
  level?: number;
  streak?: number;
  totalScore?: number;
  weeklyGrowth?: number;
  rank?: number;
  skills: SkillData[];
  recommendations: Recommendation[];
  subjects: SubjectCard[];
}

// ─── AI 분석 리포트 타입 ───────────────────────────────────────────────────────

/** 발견된 재능 항목 */
export interface TalentDiscovery {
  /** 재능 카테고리 (예: '수학적 직관', '창의적 문제풀이', '음감') */
  category: string;
  /** 관련 과목 */
  subject: string;
  /** 재능 설명 에피소드 (구체적 상황 기반) */
  episode: string;
  /** 상위 퍼센트 (예: 5 = 상위 5%) */
  topPercent?: number;
  /** 성장 배지 레이블 */
  badge: string;
  /** 배지 색상 테마 */
  badgeColor: 'gold' | 'purple' | 'blue' | 'green' | 'rose';
  /** 이전 대비 성장률 (%) */
  growthRate: number;
}

/** 과정 중심 데이터 */
export interface LearningProcessData {
  /** 문제 수정 횟수 (끈기 지표) */
  revisionCount: number;
  /** 평균 사고 시간 (초, 깊이 사고 지표) */
  avgThinkingTime: number;
  /** 포기하지 않고 재시도한 횟수 */
  retryCount: number;
  /** 끈기 점수 (0-100) */
  persistenceScore: number;
  /** 사고 유연성 점수 (0-100) */
  flexibilityScore: number;
}

/** 성장 타임라인 항목 */
export interface GrowthTimelineItem {
  date: string;
  label: string;
  description: string;
  score: number;
  highlight?: boolean;
}

/** 부모 대화 가이드 */
export interface ConversationGuide {
  context: string;
  question: string;
  tip: string;
}

/** AI 성장 분석 리포트 전체 */
export interface AIAnalysisReport {
  childId: string;
  childName: string;
  childAge: number;
  generatedAt: string;
  /** 한 줄 요약 */
  summary: string;
  /** 발견된 재능 목록 */
  talents: TalentDiscovery[];
  /** 과정 중심 데이터 */
  processData: LearningProcessData;
  /** 성장 타임라인 */
  growthTimeline: GrowthTimelineItem[];
  /** 부모 대화 가이드 */
  conversationGuides: ConversationGuide[];
  /** 다음 단계 추천 */
  nextSteps: string[];
  /** 이번 주 학습 시간 (분) */
  weeklyStudyMinutes: number;
  /** 완료 과제 수 */
  completedTasks: number;
  /** 성취도 변화 (%) */
  achievementChange: number;
  /** 역량 스킬 데이터 */
  skills: SkillData[];
}
