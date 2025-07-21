import { config } from '../config/env';
import { ApiResponse, Achievement, Diploma, UserProfile, UserAchievements, AchievementUpdateRequest, ApiAchievementRecord, BulkUpdateRequest, AchievementStats, AvailableAchievement, PlantillaDiploma, SolicitudDiploma, DiplomaConfiguracion, ElegibilidadDiploma, DiplomaGenerado, EstadisticasDiploma, VerificacionDiploma } from '../types';
import { TokenManager } from '../utils/tokenManager';

const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await TokenManager.getValidAccessToken();
  if (!token) {
    throw new Error('No token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401) {
    console.log('[achievementService] Got 401, attempting token refresh...');
    const newToken = await TokenManager.refreshAccessToken();
    
    if (newToken) {
      console.log('[achievementService] Token refreshed, retrying request...');
      // Retry the request with the new token
      const retryHeaders = {
        'Authorization': `Bearer ${newToken}`,
        'Content-Type': 'application/json',
        ...options.headers,
      };
      
      return fetch(url, {
        ...options,
        headers: retryHeaders,
      });
    } else {
      // Refresh failed, return the original response
      return response;
    }
  }

  return response;
};

export const achievementService = {
  // New API methods for achievements service
  
  // Get user's achievements from the new API
  getUserAchievementsByEmail: async (email: string): Promise<ApiResponse<ApiAchievementRecord[]>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/achievements/${encodeURIComponent(email)}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener logros del usuario');
    }

    const responseData = await response.json();
    
    // Extract achievements array from the nested response structure
    const achievements = responseData.data?.achievements || responseData.achievements || [];
    return { data: achievements };
  },

  // Update/add achievement for a student
  updateAchievement: async (achievementData: AchievementUpdateRequest): Promise<ApiResponse<any>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/achievements/update`, {
      method: 'POST',
      body: JSON.stringify(achievementData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar logro');
    }

    const data = await response.json();
    return { data };
  },

  // Get user's achievement statistics
  getUserAchievementStats: async (email: string): Promise<ApiResponse<AchievementStats>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/achievements/${encodeURIComponent(email)}/stats`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener estadísticas de logros');
    }

    const responseData = await response.json();
    
    // Handle potentially nested response structure
    const stats = responseData.data || responseData;
    return { data: stats };
  },

  // Get available achievements for a course
  getAvailableAchievements: async (courseId: string): Promise<ApiResponse<AvailableAchievement[]>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/achievements/course/${encodeURIComponent(courseId)}/available`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener logros disponibles');
    }

    const data = await response.json();
    return { data };
  },

  // Bulk update achievements
  bulkUpdateAchievements: async (bulkData: BulkUpdateRequest): Promise<ApiResponse<any[]>> => {
    const response = await makeAuthenticatedRequest(`${config.achievementsApiUrl}/achievements/bulk-update`, {
      method: 'POST',
      body: JSON.stringify(bulkData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error en actualización masiva de logros');
    }

    const data = await response.json();
    return { data };
  },

  // Delete a specific achievement
  deleteAchievement: async (email: string, achievementName: string): Promise<ApiResponse<{ deleted: boolean }>> => {
    const response = await makeAuthenticatedRequest(
      `${config.achievementsApiUrl}/achievements/${encodeURIComponent(email)}/${encodeURIComponent(achievementName)}`, 
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar logro');
    }

    const data = await response.json();
    return { data };
  },

  // Legacy methods (keeping for backward compatibility)
  
  // Get user's achievements and profile
  getUserAchievements: async (userId?: string): Promise<ApiResponse<UserAchievements>> => {
    const endpoint = userId 
      ? `${config.userApiUrl}/achievements/user/${userId}`
      : `${config.userApiUrl}/achievements/me`;
    
    const response = await makeAuthenticatedRequest(endpoint);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener logros del usuario');
    }

    const data = await response.json();
    return { data };
  },

  // Get all available achievements
  getAllAchievements: async (): Promise<ApiResponse<Achievement[]>> => {
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/achievements`);

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
    
    const response = await makeAuthenticatedRequest(endpoint);

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
    
    const response = await makeAuthenticatedRequest(endpoint);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener perfil del usuario');
    }

    const data = await response.json();
    return { data };
  },

  // Claim an achievement (when user meets requirements)
  claimAchievement: async (achievementId: string): Promise<ApiResponse<Achievement>> => {
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/achievements/${achievementId}/claim`, {
      method: 'POST',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al reclamar logro');
    }

    const data = await response.json();
    return { data };
  },
}; 