import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { achievementService } from '../services/achievementService';
import { Achievement, Diploma, UserProfile, UserAchievements, AchievementUpdateRequest, ApiAchievementRecord, BulkUpdateRequest, AchievementStats, AvailableAchievement } from '../types';
import toast from 'react-hot-toast';

// New hooks for the achievements API

export const useUserAchievementsByEmail = (email: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['userAchievementsByEmail', email],
    queryFn: () => achievementService.getUserAchievementsByEmail(email),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled && !!email,
  });
};

export const useUpdateAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (achievementData: AchievementUpdateRequest) => achievementService.updateAchievement(achievementData),
    onSuccess: (data, variables) => {
      // Show success message
      toast.success('¡Logro actualizado exitosamente!');
      
      // Invalidate and refetch user achievements
      queryClient.invalidateQueries({ queryKey: ['userAchievementsByEmail', variables.email] });
      queryClient.invalidateQueries({ queryKey: ['userAchievementStats', variables.email] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar logro');
    },
  });
};

export const useUserAchievementStats = (email: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['userAchievementStats', email],
    queryFn: () => achievementService.getUserAchievementStats(email),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled && !!email,
  });
};

export const useAvailableAchievements = (courseId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['availableAchievements', courseId],
    queryFn: () => achievementService.getAvailableAchievements(courseId),
    select: (data) => data.data,
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: enabled && !!courseId,
  });
};

export const useBulkUpdateAchievements = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bulkData: BulkUpdateRequest) => achievementService.bulkUpdateAchievements(bulkData),
    onSuccess: (data, variables) => {
      // Show success message
      toast.success(`¡${variables.updates.length} logros actualizados exitosamente!`);
      
      // Invalidate queries for all affected users
      const affectedEmails = [...new Set(variables.updates.map(update => update.email))];
      affectedEmails.forEach(email => {
        queryClient.invalidateQueries({ queryKey: ['userAchievementsByEmail', email] });
        queryClient.invalidateQueries({ queryKey: ['userAchievementStats', email] });
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error en actualización masiva de logros');
    },
  });
};

export const useDeleteAchievement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, achievementName }: { email: string; achievementName: string }) => 
      achievementService.deleteAchievement(email, achievementName),
    onSuccess: (data, variables) => {
      // Show success message
      toast.success('Logro eliminado exitosamente');
      
      // Invalidate and refetch user achievements
      queryClient.invalidateQueries({ queryKey: ['userAchievementsByEmail', variables.email] });
      queryClient.invalidateQueries({ queryKey: ['userAchievementStats', variables.email] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar logro');
    },
  });
};

// Legacy hooks (keeping for backward compatibility)

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