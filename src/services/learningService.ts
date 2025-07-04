import { config } from '../config/env';
import { ApiResponse, Leccion } from '../types';

export const learningService = {
  getLessons: async (): Promise<ApiResponse<Leccion[]>> => {
    const response = await fetch(`${config.learningApiUrl}/lecciones`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener lecciones');
    }

    return response.json();
  },

  createLesson: async (lessonData: Omit<Leccion, '_id'>): Promise<ApiResponse<Leccion>> => {
    const response = await fetch(`${config.learningApiUrl}/lecciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
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
    const response = await fetch(`${config.learningApiUrl}/lecciones/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(lessonData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar lección');
    }

    return response.json();
  },

  deleteLesson: async (id: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${config.learningApiUrl}/lecciones/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar lección');
    }

    return response.json();
  },

  getGrade: async (email: string, module: string): Promise<ApiResponse<any>> => {
    const response = await fetch(`${config.learningApiUrl}/grades/${email}/${module}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener la calificación');
    }

    return response.json();
  },
}; 