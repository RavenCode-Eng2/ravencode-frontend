import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import { learningService } from '../services/learningService';
import { ApiResponse, Usuario, Leccion, Token } from '../types';

interface LoginCredentials {
  email: string;
  password: string;
}

// Auth API hooks
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.access_token);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

export const useRequestRecoveryCode = () => {
  return useMutation({
    mutationFn: authService.requestRecoveryCode,
  });
};

export const useVerifyRecoveryCode = () => {
  return useMutation({
    mutationFn: ({ email, code }: { email: string; code: string }) =>
      authService.verifyRecoveryCode(email, code),
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: ({ email, newPassword }: { email: string; newPassword: string }) =>
      authService.updatePassword(email, newPassword),
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