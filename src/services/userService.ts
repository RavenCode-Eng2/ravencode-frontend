import { config } from '../config/env';
import { ApiResponse, Usuario } from '../types';

export const userService = {
  getCurrentUser: async (): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${config.userApiUrl}/user/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener información del usuario');
    }

    const userData = await response.json();
    return { data: userData };
  },

  getUsers: async (): Promise<ApiResponse<Usuario[]>> => {
    const response = await fetch(`${config.userApiUrl}/usuarios`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al obtener usuarios');
    }

    return response.json();
  },

  createUser: async (userData: Omit<Usuario, '_id'>): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${config.userApiUrl}/usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al crear usuario');
    }

    return response.json();
  },

  updateUser: async (email: string, userData: Partial<Usuario>): Promise<ApiResponse<Usuario>> => {
    const response = await fetch(`${config.userApiUrl}/usuarios/${email}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al actualizar usuario');
    }

    return response.json();
  },

  deleteUser: async (email: string): Promise<ApiResponse<void>> => {
    const response = await fetch(`${config.userApiUrl}/usuarios/${email}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al eliminar usuario');
    }

    return response.json();
  },
}; 