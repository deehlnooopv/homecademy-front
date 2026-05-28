// ─── 자녀 전용 화면 타입 정의 ────────────────────────────────────────────────

/** 자녀 프로필 */
export interface ChildViewProfile {
  id: string;
  nickname: string;
  code: string;
  /** 대표 뱃지 ID (null이면 기본 아바타) */
  representativeBadgeId: string | null;
  streak: number;
  todayGoalMinutes: number;
  todayStudiedMinutes: number;
}

/** 진행 중인 학습 코스 */
export interface OngoingCourse {
  id: string;
  subject: string;
  title: string;
  /** 담당 AI 튜터 이름 */
  tutorName: string;
  /** 담당 AI 튜터 이모지 */
  tutorEmoji: string;
  progressPercent: number;
  totalMinutes: number;
  doneMinutes: number;
  /** 과목 테마 색상 */
  color: 'orange' | 'blue' | 'green' | 'violet' | 'rose' | 'amber';
}

/** AI 추천 학습 */
export interface RecommendedLesson {
  id: string;
  subject: string;
  title: string;
  reason: string;
  tutorName: string;
  tutorEmoji: string;
  durationMinutes: number;
  color: 'orange' | 'blue' | 'green' | 'violet' | 'rose' | 'amber';
}

// ─── 뱃지 & 테크트리 타입 ─────────────────────────────────────────────────────

/**
 * 뱃지 레벨 (1~5)
 * 각 레벨은 상위 퍼센트 구간에 대응
 * 1: 상위 80~100% / 2: 상위 40~80% / 3: 상위 20~40% / 4: 상위 5~20% / 5: 상위 1~5%
 */
export type BadgeLevel = 1 | 2 | 3 | 4 | 5;

/** 단일 뱃지 */
export interface Badge {
  id: string;
  /** 과목 (예: 수학, 음악, 국어) */
  subject: string;
  /** 능력 분야 (예: 암산, 창의적 문제 해결, 음감) */
  ability: string;
  /** 현재 레벨 (1~5) */
  level: BadgeLevel;
  /** 레벨별 칭호 목록 (index 0 = 레벨1) */
  levelTitles: [string, string, string, string, string];
  /** 현재 상위 퍼센트 */
  topPercent: number;
  /** 획득 여부 */
  acquired: boolean;
  /** 재검토 필요 여부 */
  needsReview: boolean;
  /** 뱃지 색상 테마 */
  color: 'gold' | 'blue' | 'green' | 'violet' | 'rose';
  /** 뱃지 이모지 */
  emoji: string;
}

/** 과목별 테크트리 */
export interface SubjectTechTree {
  subject: string;
  subjectEmoji: string;
  tutorName: string;
  tutorEmoji: string;
  badges: Badge[];
}

// ─── 친구 & 칭찬 타입 ────────────────────────────────────────────────────────

/** 친구 */
export interface ChildFriend {
  id: string;
  nickname: string;
  representativeBadgeId: string | null;
  representativeBadgeEmoji: string;
  representativeBadgeTitle: string;
  /** 오늘 학습 여부 */
  studiedToday: boolean;
}

/** 부모님 칭찬 메시지 */
export interface PraiseMessage {
  id: string;
  senderName: string;
  message: string;
  emoji: string;
  createdAt: string;
  isNew: boolean;
}
