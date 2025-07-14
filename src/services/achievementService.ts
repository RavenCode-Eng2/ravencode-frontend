import { config } from '../config/env';
import { ApiResponse, Achievement, Diploma, UserProfile, UserAchievements } from '../types';

export const achievementService = {
  // Get user's achievements and profile
  getUserAchievements: async (userId?: string): Promise<ApiResponse<UserAchievements>> => {
    const endpoint = userId 
      ? `${config.userApiUrl}/achievements/user/${userId}`
      : `${config.userApiUrl}/achievements/me`;
    
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener logros del usuario');
    }

    const data = await response.json();
    return { data };
  },

  // Get all available achievements
  getAllAchievements: async (): Promise<ApiResponse<Achievement[]>> => {
    const response = await fetch(`${config.userApiUrl}/achievements`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener logros disponibles');
    }

    const data = await response.json();
    return { data };
  },

  // Get user's diplomas
  getUserDiplomas: async (userId?: string): Promise<ApiResponse<Diploma[]>> => {
    const endpoint = userId 
      ? `${config.userApiUrl}/diplomas/user/${userId}`
      : `${config.userApiUrl}/diplomas/me`;
    
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener diplomas del usuario');
    }

    const data = await response.json();
    return { data };
  },

  // Get user profile with stats
  getUserProfile: async (userId?: string): Promise<ApiResponse<UserProfile>> => {
    const endpoint = userId 
      ? `${config.userApiUrl}/profile/${userId}`
      : `${config.userApiUrl}/profile/me`;
    
    const response = await fetch(endpoint, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener perfil del usuario');
    }

    const data = await response.json();
    return { data };
  },

  // Claim an achievement (when user meets requirements)
  claimAchievement: async (achievementId: string): Promise<ApiResponse<Achievement>> => {
    const response = await fetch(`${config.userApiUrl}/achievements/${achievementId}/claim`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al reclamar logro');
    }

    const data = await response.json();
    return { data };
  },
}; 