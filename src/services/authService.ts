import { config } from '../config/env';
import { ApiResponse, Token, User } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface PasswordRecoveryVerify {
  email: string;
  code: string;
  new_password: string;
}

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
  fecha_de_nacimiento: string;
  institucion_educativa: string;
  grado_academico: string;
  foto_de_perfil?: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<ApiResponse<Token>> => {
    const response = await fetch(`${config.userApiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al iniciar sesión');
    }

    const data = await response.json();
    return { data };
  },

  // Password recovery flow
  requestRecoveryCode: async (email: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await fetch(`${config.userApiUrl}/auth/recovery/request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al solicitar código de recuperación');
    }

    const data = await response.json();
    return { data };
  },

  verifyAndUpdatePassword: async (data: PasswordRecoveryVerify): Promise<ApiResponse<{ message: string }>> => {
    const response = await fetch(`${config.userApiUrl}/auth/recovery/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al verificar código y actualizar contraseña');
    }

    const responseData = await response.json();
    return { data: responseData };
  },

  register: async (data: RegisterData): Promise<ApiResponse<{ message: string; student: User }>> => {
    const response = await fetch(`${config.userApiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al registrar usuario');
    }

    const responseData = await response.json();
    return { data: responseData };
  },
}; 