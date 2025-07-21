import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { learningService } from '../services/learningService';
import { ApiResponse, Usuario, Leccion, Token } from '../types';
import { TokenManager } from '../utils/tokenManager';

interface LoginCredentials {
  email: string;
  password: string;
}

// Auth API hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
      console.log('[useLogin] Login successful, tokens received:', {
        hasAccessToken: !!data.data.access_token,
        hasRefreshToken: !!data.data.refresh_token
      });
      
      // Store both access and refresh tokens
      TokenManager.setTokens(data.data);
      console.log('[useLogin] Tokens stored in localStorage');
      
      // Fetch and cache user data immediately after login
      try {
        console.log('[useLogin] Fetching user data...');
        const userResponse = await userService.getCurrentUser();
        if (userResponse.data) {
          TokenManager.setUserData(userResponse.data);
          console.log('[useLogin] User data fetched and cached');
        }
      } catch (error) {
        console.error('[useLogin] Failed to fetch user data:', error);
      }
      
      queryClient.invalidateQueries({ queryKey: ['users'] });
      console.log('[useLogin] Users query invalidated');
    },
    onError: (error) => {
      console.error('[useLogin] Login mutation error:', error);
    }
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: () => {
      const refreshToken = TokenManager.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }
      return authService.refresh(refreshToken);
    },
    onSuccess: (data) => {
      console.log('[useRefreshToken] Token refresh successful');
      TokenManager.setTokens(data.data);
    },
    onError: (error) => {
      console.error('[useRefreshToken] Token refresh failed:', error);
      TokenManager.clearTokens();
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      console.log('[useLogout] Logout successful');
      TokenManager.clearTokens();
    },
    onError: (error) => {
      console.error('[useLogout] Logout failed:', error);
      // Clear tokens anyway on logout error
      TokenManager.clearTokens();
    }
  });
};

export const useRequestRecoveryCode = () => {
  return useMutation({
    mutationFn: authService.requestRecoveryCode,
  });
};

export const useVerifyRecoveryCode = () => {
  return useMutation({
    mutationFn: ({ email, code, new_password }: { email: string; code: string; new_password: string }) =>
      authService.verifyAndUpdatePassword({ email, code, new_password }),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({ email, code, new_password }: { email: string; code: string; new_password: string }) =>
      authService.verifyAndUpdatePassword({ email, code, new_password }),
  });
};

// User API hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userService.getUsers,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, userData }: { email: string; userData: Partial<Usuario> }) =>
      userService.updateUser(email, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Learning API hooks
export const useLessons = () => {
  return useQuery({
    queryKey: ['lessons'],
    queryFn: learningService.getLessons,
  });
};

export const useCreateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: learningService.createLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, lessonData }: { id: string; lessonData: Partial<Leccion> }) =>
      learningService.updateLesson(id, lessonData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: learningService.deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['lessons'] });
    },
  });
}; 