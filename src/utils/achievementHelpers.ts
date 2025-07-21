import { AchievementUpdateRequest } from '../types';

export const createAchievementData = (
  email: string,
  achievementName: string,
  courseId: string,
  title: string,
  description: string | null,
  score: number,
  totalPoints: number,
  metadata?: Record<string, any> | null
): AchievementUpdateRequest => {
  return {
    email,
    achievement: {
      achievement_name: achievementName,
      course_id: courseId,
      title,
      description,
      metadata,
    },
    score,
    total_points: totalPoints,
  };
};

export const calculateAchievementPercentage = (score: number, totalPoints: number): number => {
  return Math.round((score / totalPoints) * 100);
};

export const getAchievementRarity = (percentage: number): 'common' | 'rare' | 'epic' | 'legendary' => {
  if (percentage >= 90) return 'legendary';
  if (percentage >= 75) return 'epic';
  if (percentage >= 50) return 'rare';
  return 'common';
};

export const getAchievementXP = (percentage: number): number => {
  return Math.round(percentage * 10);
};

export const createBulkAchievementData = (
  achievements: Array<{
    email: string;
    achievementName: string;
    courseId: string;
    title: string;
    description?: string | null;
    score: number;
    totalPoints: number;
    metadata?: Record<string, any> | null;
  }>
) => {
  return {
    updates: achievements.map(achievement => 
      createAchievementData(
        achievement.email,
        achievement.achievementName,
        achievement.courseId,
        achievement.title,
        achievement.description || null,
        achievement.score,
        achievement.totalPoints,
        achievement.metadata
      )
    )
  };
};

export const createAchievementMetadata = (
  category: string,
  rarity: 'common' | 'rare' | 'epic' | 'legendary',
  xpReward: number,
  additionalData?: Record<string, any>
): Record<string, any> => {
  return {
    category,
    rarity,
    xp_reward: xpReward,
    ...additionalData,
  };
}; 