import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementService } from '../services/achievementService';
import { Achievement, Diploma, UserProfile, UserAchievements } from '../types';
import toast from 'react-hot-toast';

export const useUserAchievements = (userId?: string) => {
  return useQuery({
    queryKey: ['userAchievements', userId],
    queryFn: () => achievementService.getUserAchievements(userId),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useAllAchievements = () => {
  return useQuery({
    queryKey: ['allAchievements'],
    queryFn: () => achievementService.getAllAchievements(),
    select: (data) => data.data,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useUserDiplomas = (userId?: string) => {
  return useQuery({
    queryKey: ['userDiplomas', userId],
    queryFn: () => achievementService.getUserDiplomas(userId),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUserProfile = (userId?: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => achievementService.getUserProfile(userId),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useClaimAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (achievementId: string) => achievementService.claimAchievement(achievementId),
    onSuccess: (data, achievementId) => {
      // Show success message
      toast.success('¡Logro desbloqueado!');
      
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: ['userAchievements'] });
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      queryClient.invalidateQueries({ queryKey: ['allAchievements'] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al reclamar el logro');
    },
  });
};

// Hook for managing achievement filters and sorting
export const useAchievementFilters = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    rarity: 'all',
    status: 'all', // all, earned, unearned
    sortBy: 'dateEarned', // dateEarned, rarity, name
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  const updateFilter = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filterAchievements = (achievements: Achievement[]) => {
    let filtered = [...achievements];

    // Filter by category
    if (filters.category !== 'all') {
      filtered = filtered.filter(achievement => achievement.category === filters.category);
    }

    // Filter by rarity
    if (filters.rarity !== 'all') {
      filtered = filtered.filter(achievement => achievement.rarity === filters.rarity);
    }

    // Filter by status
    if (filters.status !== 'all') {
      filtered = filtered.filter(achievement => 
        filters.status === 'earned' ? achievement.isEarned : !achievement.isEarned
      );
    }

    // Sort achievements
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'dateEarned':
          if (a.dateEarned && b.dateEarned) {
            comparison = new Date(a.dateEarned).getTime() - new Date(b.dateEarned).getTime();
          } else if (a.dateEarned) {
            comparison = -1;
          } else if (b.dateEarned) {
            comparison = 1;
          }
          break;
        case 'rarity':
          const rarityOrder = { common: 1, rare: 2, epic: 3, legendary: 4 };
          comparison = rarityOrder[a.rarity] - rarityOrder[b.rarity];
          break;
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  };

  return {
    filters,
    updateFilter,
    filterAchievements,
  };
}; 