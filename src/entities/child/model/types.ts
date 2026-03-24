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
