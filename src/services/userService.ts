import { config } from '../config/env';
import { ApiResponse, Usuario } from '../types';
import { TokenManager } from '../utils/tokenManager';

// New types for user management API
export interface CreateUserRequest {
  nombre: string;
  correo_electronico: string;
  contrasena: string;
  foto_de_perfil?: string | null;
  role: 'student' | 'admin';
  // Student-specific fields
  fecha_de_nacimiento?: string;
  institucion_educativa?: string;
  grado_academico?: string;
  // Admin-specific fields
  departamento?: string;
  nivel_acceso?: string;
}

export interface UpdateUserRequest {
  nombre?: string;
  correo_electronico?: string;
  contrasena?: string;
  foto_de_perfil?: string | null;
  // Student-specific fields
  fecha_de_nacimiento?: string;
  institucion_educativa?: string;
  grado_academico?: string;
  // Admin-specific fields
  departamento?: string;
  nivel_acceso?: string;
}

const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    // Token might be expired, try to refresh
    console.log('[userService] 401 error, attempting token refresh...');
    const newToken = await TokenManager.refreshAccessToken();
    
    if (!newToken) {
      // Refresh failed, clear tokens and throw error
      TokenManager.clearTokens();
      throw new Error('Session expired');
    }
    
    // Refresh succeeded but this request still failed
    // The calling code should retry the request with the new token
    throw new Error('Token refreshed - retry request');
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error en la solicitud');
  }

  const result = await response.json();
  console.log('[userService] Raw API response:', result);
  
  // If the response is already in ApiResponse format, return it
  if (result && typeof result === 'object' && 'data' in result) {
    console.log('[userService] Response is already in ApiResponse format');
    return result;
  }
  
  // Otherwise, wrap it in ApiResponse format
  console.log('[userService] Wrapping response in ApiResponse format');
  return { data: result };
};

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
    console.log('[userService] Got 401, attempting token refresh...');
    const newToken = await TokenManager.refreshAccessToken();
    
    if (newToken) {
      console.log('[userService] Token refreshed, retrying request...');
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

export const userService = {
  getCurrentUser: async (): Promise<ApiResponse<Usuario>> => {
    console.log('[userService] Fetching current user...');
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/me`);

    const result = await handleResponse(response);
    console.log('[userService] Processed getCurrentUser response:', result);
    return result;
  },

  // Updated to use correct endpoint and handle array response
  getUsers: async (): Promise<ApiResponse<Usuario[]>> => {
    console.log('[userService] Fetching all users...');
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/`);
    
    const result = await handleResponse(response);
    console.log('[userService] Processed getUsers response:', result);
    return result;
  },

  // Get user by email
  getUserByEmail: async (email: string): Promise<ApiResponse<Usuario>> => {
    console.log('[userService] Fetching user by email:', email);
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/${encodeURIComponent(email)}`);
    
    const result = await handleResponse(response);
    console.log('[userService] Processed getUserByEmail response:', result);
    return result;
  },

  // Create new user (admin only)
  createUser: async (userData: CreateUserRequest): Promise<ApiResponse<Usuario>> => {
    console.log('[userService] Creating new user:', userData);
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await handleResponse(response);
    console.log('[userService] Processed createUser response:', result);
    return result;
  },

  // Update user by email
  updateUser: async (email: string, userData: UpdateUserRequest): Promise<ApiResponse<Usuario>> => {
    console.log('[userService] Updating user:', email, userData);
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/${encodeURIComponent(email)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const result = await handleResponse(response);
    console.log('[userService] Processed updateUser response:', result);
    return result;
  },

  // Delete user by email
  deleteUser: async (email: string): Promise<ApiResponse<{ message: string; email: string }>> => {
    console.log('[userService] Deleting user:', email);
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/users/${encodeURIComponent(email)}`, {
      method: 'DELETE',
    });

    const result = await handleResponse(response);
    console.log('[userService] Processed deleteUser response:', result);
    return result;
  },

  // Grade-related methods
  submitGrade: async (gradeData: { email: string; module: string; grade: number }): Promise<ApiResponse<any>> => {
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/students/grade`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gradeData),
    });

    return handleResponse(response);
  },

  getGrade: async (email: string, module: string): Promise<ApiResponse<any>> => {
    const response = await makeAuthenticatedRequest(
      `${config.userApiUrl}/students/${email}/grade/${module}`
    );

    return handleResponse(response);
  },

  submitResponses: async (responseData: { email: string; responses: any[] }): Promise<ApiResponse<any>> => {
    const response = await makeAuthenticatedRequest(`${config.userApiUrl}/students/responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    });

    return handleResponse(response);
  },
}; 