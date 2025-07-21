import { config } from '../config/env';
import { ApiResponse, Leccion } from '../types';
import { TokenManager } from '../utils/tokenManager';

const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const token = await TokenManager.getValidAccessToken();
  if (!token) {
    throw new Error('No token found');
  }

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If we get a 401, try to refresh the token and retry once
  if (response.status === 401) {
    console.log('[learningService] Got 401, attempting token refresh...');
    const newToken = await TokenManager.refreshAccessToken();
    
    if (newToken) {
      console.log('[learningService] Token refreshed, retrying request...');
      // Retry the request with the new token
      const retryHeaders = {
        'Authorization': `Bearer ${newToken}`,
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

export const learningService = {
  getLessons: async (): Promise<ApiResponse<Leccion[]>> => {
    const response = await makeAuthenticatedRequest(`${config.learningApiUrl}/lecciones`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener lecciones');
    }

    return response.json();
  },

  createLesson: async (lessonData: Omit<Leccion, '_id'>): Promise<ApiResponse<Leccion>> => {
    const response = await makeAuthenticatedRequest(`${config.learningApiUrl}/lecciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear lección');
    }

    return response.json();
  },

  updateLesson: async (id: string, lessonData: Partial<Leccion>): Promise<ApiResponse<Leccion>> => {
    const response = await makeAuthenticatedRequest(`${config.learningApiUrl}/lecciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(lessonData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar lección');
    }

    return response.json();
  },

  deleteLesson: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await makeAuthenticatedRequest(`${config.learningApiUrl}/lecciones/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar lección');
    }

    return response.json();
  },

  getGrade: async (email: string, module: string): Promise<ApiResponse<any>> => {
    const response = await makeAuthenticatedRequest(`${config.learningApiUrl}/grades/${email}/${module}`);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener la calificación');
    }

    return response.json();
  },
}; 