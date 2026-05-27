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
