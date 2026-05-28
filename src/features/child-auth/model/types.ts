export interface ChildProfile {
  id: string;
  nickname: string;
  code: string;
  avatar: string; // 대표 뱃지 ID 기반 아바타 키
  representativeBadgeId: string | null;
  streak: number;
  todayGoalMinutes: number;
  todayStudiedMinutes: number;
}
